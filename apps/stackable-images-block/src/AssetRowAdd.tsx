import { Dropzone } from "@sa-apps/dropzone";
import type { ChangeEvent } from "react";
import styles from "./AssetRowAdd.module.scss";

type AssetRowAddProps = {
	onUploadClick: (file: File) => void;
	onBrowseAssetClick: () => void;
};

export const AssetRowAdd = ({ onUploadClick, onBrowseAssetClick }: AssetRowAddProps) => {
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
		<div className={styles.dropzone}>
			<Dropzone onUploadClick={handleUploadClick} onBrowseAssetClick={handleBrowseAssetClick} />
		</div>
	);
};
