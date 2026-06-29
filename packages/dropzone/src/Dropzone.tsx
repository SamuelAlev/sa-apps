import { useTranslations, withTranslations } from "@sa-apps/i18n";
import { cn } from "@sa-apps/utilities";
import { Album, Upload } from "lucide-react";
import type { ChangeEvent, HTMLAttributes } from "react";
import { forwardRef, useRef } from "react";

import styles from "./Dropzone.module.scss";
import { messages } from "./i18n";

type DropzoneProps = HTMLAttributes<HTMLDivElement> & {
	onUploadClick: (event: ChangeEvent<HTMLInputElement>) => void;
	onBrowseAssetClick: () => void;
};

export const Dropzone = withTranslations(messages)(
	forwardRef<HTMLDivElement, DropzoneProps>(function SADropzone({ className, onUploadClick, onBrowseAssetClick, ...props }, ref) {
		const { t } = useTranslations();
		const fileInput = useRef<HTMLInputElement>(null);

		const handleClick = () => fileInput.current?.click();

		return (
			<div ref={ref} className={cn(styles.dropzone, className)} {...props}>
				<input type="file" className={styles.input} onChange={onUploadClick} ref={fileInput} />
				<button type="button" className={styles.action} onClick={handleClick} aria-label={t("upload")}>
					<Upload size={20} />
					{t("upload")}
				</button>

				<div className={styles.separator} />

				<button type="button" className={styles.action} onClick={onBrowseAssetClick} aria-label={t("browse")}>
					<Album size={20} />
					{t("browse")}
				</button>
			</div>
		);
	}),
);
