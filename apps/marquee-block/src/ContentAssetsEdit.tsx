import { type AppBridgeBlock, type Asset, AssetChooserObjectType, useAssetChooser } from '@frontify/app-bridge';
import { trackEvent } from '@sa-apps/tracking';
import { ContentAssetsRowAdd } from './ContentAssetsRowAdd';
import { ContentAssetsRowEdit } from './ContentAssetsRowEdit';
import { useUploadFile } from './useUploadFile';

type ContentAssetsEditProps = {
    appBridge: AppBridgeBlock;
    assets?: Asset[];
    contentTexts?: string[];
    onUpdateAsset: (index: number, value: Asset) => Promise<void>;
    onUpdateContentText: (index: number, value: string) => Promise<void>;
    onAddItem: (assetId: number) => Promise<void>;
    onRemoveItem: (index: number) => Promise<void>;
};

export const ContentAssetsEdit = ({ appBridge, assets, contentTexts, onUpdateAsset, onUpdateContentText, onAddItem, onRemoveItem }: ContentAssetsEditProps) => {
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const { uploadFile, loading: loadingUpload } = useUploadFile(async (assetId) => await onAddItem(assetId));

    const handleBrowseAsset = () => {
        openAssetChooser(
            (selectedAssets) => {
                onAddItem(selectedAssets[0].id);
                closeAssetChooser();
                trackEvent('chose asset');
            },
            { objectTypes: [AssetChooserObjectType.ImageVideo] },
        );

        trackEvent('open asset chooser item');
    };

    const handleUploadAsset = (files: File | FileList) => {
        uploadFile(files);
        trackEvent('uploaded file');
    };

    return (
        <>
            <div className="pt-8 flex flex-col gap-4 w-full">
                {assets?.map((asset, index) => (
                    <ContentAssetsRowEdit
                        key={asset.id}
                        asset={asset}
                        contentText={contentTexts?.[index]}
                        onUpdateAsset={(asset) => onUpdateAsset(index, asset)}
                        onUpdateContentText={(contentText) => onUpdateContentText(index, contentText)}
                        onRemove={() => onRemoveItem(index)}
                    />
                ))}

                {loadingUpload && <div>Uploading...</div>}

                <ContentAssetsRowAdd onBrowseAssetClick={handleBrowseAsset} onUploadClick={handleUploadAsset} />
            </div>
        </>
    );
};
