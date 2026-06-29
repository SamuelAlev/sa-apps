import { Dropzone } from "@sa-apps/dropzone";
import type { ChangeEvent } from "react";
import styles from "./ContentAssetsRowAdd.module.scss";

type ContentAssetsRowAddProps = {
	onUploadClick: (file: File) => void;
	onBrowseAssetClick: () => void;
};

export const ContentAssetsRowAdd = ({ onUploadClick, onBrowseAssetClick }: ContentAssetsRowAddProps) => {
	const handleUploadClick = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files?.[0];
		if (file) {
			onUploadClick(file);
		}
	};

	const handleBrowseAssetClick = () => {
		onBrowseAssetClick();
	};

	return (
		<div className={styles.addContainer}>
			<Dropzone onUploadClick={handleUploadClick} onBrowseAssetClick={handleBrowseAssetClick} />
		</div>
	);
};
