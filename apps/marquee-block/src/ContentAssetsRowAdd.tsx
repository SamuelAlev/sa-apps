import { Dropzone } from '@sa-apps/dropzone';

type ContentAssetsRowAddProps = {
    onUploadClick?: () => void;
    onBrowseAssetClick: () => void;
};

export const ContentAssetsRowAdd = ({ onUploadClick, onBrowseAssetClick }: ContentAssetsRowAddProps) => {
    const handleUploadClick = () => {
        alert('Not yet implemented 😢\nPlease the "Browse" button instead.');
        onUploadClick?.();
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
