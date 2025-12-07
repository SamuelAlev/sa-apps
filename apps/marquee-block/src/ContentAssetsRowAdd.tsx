import { Dropzone } from "@sa-apps/dropzone";
import type { ChangeEvent } from "react";

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
		<div className="flex h-[120px] min-h-[120px] w-full items-center justify-center">
			<Dropzone onUploadClick={handleUploadClick} onBrowseAssetClick={handleBrowseAssetClick} />
		</div>
	);
};
