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
import { TextInput } from "@sa-apps/text-input";
import { type FormEventHandler, useState } from "react";
import styles from "./ContentAssetsRowEdit.module.scss";
import { prepareImageUrl } from "./helpers";

type ContentAssetsRowEditProps = {
	asset: Asset;
	contentText?: string;
	onUpdateAsset: (asset: Asset) => void;
	onUpdateContentText: (contentText: string) => void;
	onRemove: () => void;
};

export const ContentAssetsRowEdit = ({ asset, contentText, onUpdateAsset, onUpdateContentText, onRemove }: ContentAssetsRowEditProps) => {
	const { t } = useTranslations();
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

	const handleUpdateContentText: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		onUpdateContentText((event.target as unknown as { contentText: HTMLInputElement }).contentText.value);
	};

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
		<div className={styles.root}>
			<form onSubmit={handleUpdateContentText} className={styles.form}>
				<img draggable={false} className={styles.image} src={prepareImageUrl(asset.previewUrl)} alt={contentText} />

				<div className={styles.contentText}>
					<TextInput defaultValue={contentText} name="contentText" placeholder="Content text (alt)" />

					<div className={styles.actions}>
						<Button size="sm" variant="destructive" onClick={handleFirstDeleteClick}>
							Delete
						</Button>

						<Button size="sm" type="submit">
							Save
						</Button>
					</div>
				</div>
			</form>

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
