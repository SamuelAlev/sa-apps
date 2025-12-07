import type { Asset } from "@frontify/app-bridge";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@sa-apps/alert-dialog";
import { Button, buttonVariants } from "@sa-apps/button";
import { useTranslations } from "@sa-apps/i18n";
import { useState } from "react";
import { prepareImageUrl } from "./helpers";

type AssetRowEditProps = {
	asset: Asset;
	onUpdate: (asset: Asset) => void;
	onRemove: () => void;
};

export const AssetRowEdit = ({ asset, onUpdate, onRemove }: AssetRowEditProps) => {
	const { t } = useTranslations();
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

	const handleModalCancelClick = () => {
		setIsDeleteAlertOpen(false);
	};

	const handleFirstDeleteClick = () => {
		setIsDeleteAlertOpen(true);
	};

	const handleSecondDeleteClick = () => {
		onRemove();
		setIsDeleteAlertOpen(false);
	};

	return (
		<div className="flex relative">
			<div className="grid w-full gap-6 items-center grid-cols-[140px_minmax(200px,1fr)] h-48">
				<img
					draggable={false}
					className="h-full w-full object-contain"
					src={prepareImageUrl(asset.previewUrl)}
					// biome-ignore lint/a11y/noRedundantAlt: <explanation>
					alt="layer for the stackable image"
				/>

				{/* <div className="w-full flex">
                    <TextInput defaultValue={contentText} name="contentText" placeholder="Content text (alt)" />
                </div> */}

				<div className="absolute top-0 bottom-0 right-2 flex items-center justify-center gap-2">
					<Button size="sm" variant="destructive" onClick={handleFirstDeleteClick}>
						Delete
					</Button>
				</div>
			</div>

			<AlertDialog open={isDeleteAlertOpen}>
				<AlertDialogContent onClick={(event) => event.stopPropagation()}>
					<AlertDialogHeader>
						<AlertDialogTitle>{t("deleteItemQuestion")}</AlertDialogTitle>
						<AlertDialogDescription>{t("areYouSureDeleteItem")}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={handleModalCancelClick}>{t("cancel")}</AlertDialogCancel>
						<AlertDialogAction onClick={handleSecondDeleteClick} className={buttonVariants({ variant: "destructive" })}>
							{t("delete")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
