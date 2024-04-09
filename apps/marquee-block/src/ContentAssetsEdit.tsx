import { type AppBridgeBlock, type Asset, AssetChooserObjectType, useAssetChooser } from '@frontify/app-bridge';
import { ContentAssetsRowAdd } from './ContentAssetsRowAdd';
import { ContentAssetsRowEdit } from './ContentAssetsRowEdit';

type ContentAssetsEditProps = {
    appBridge: AppBridgeBlock;
    assets?: Asset[];
    contentTexts?: string[];
    onUpdateAsset: (index: number, value: Asset) => Promise<void>;
    onUpdateContentText: (index: number, value: string) => Promise<void>;
    onAddItem: (value: Asset) => Promise<void>;
    onRemoveItem: (index: number) => Promise<void>;
};

export const ContentAssetsEdit = ({ appBridge, assets, contentTexts, onUpdateAsset, onUpdateContentText, onAddItem, onRemoveItem }: ContentAssetsEditProps) => {
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);

    const handleBrowseAsset = () => {
        openAssetChooser(
            (selectedAssets) => {
                onAddItem(selectedAssets[0]);
                closeAssetChooser();
            },
            { objectTypes: [AssetChooserObjectType.ImageVideo] },
        );
    };

    return (
        <>
            <div className="pt-8 flex flex-col gap-4 w-full">
                {assets?.map((asset, index) => (
                    <ContentAssetsRowEdit
                        asset={asset}
                        contentText={contentTexts?.[index]}
                        onUpdateAsset={(asset) => onUpdateAsset(index, asset)}
                        onUpdateContentText={(contentText) => onUpdateContentText(index, contentText)}
                        onRemove={() => onRemoveItem(index)}
                    />
                ))}

                <ContentAssetsRowAdd onBrowseAssetClick={handleBrowseAsset} onUploadClick={() => {}} />
            </div>
        </>
    );
};
