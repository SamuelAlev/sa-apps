import { type AppBridgeBlock, useAssetChooser, type Asset, AssetChooserObjectType } from '@frontify/app-bridge';
import { ContentAssetsRowAdd } from './ContentAssetsRowAdd';
import { ContentAssetsRowEdit } from './ContentAssetsRowEdit';

type ContentAssetsEditProps = {
    appBridge: AppBridgeBlock;
    values?: Asset[];
    onSaveItem: (index: number, value: Asset) => void;
    onAddItem: (value: Asset) => void;
    onRemoveItem: (index: number) => void;
};

export const ContentAssetsEdit = ({ appBridge, values, onSaveItem, onAddItem, onRemoveItem }: ContentAssetsEditProps) => {
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
                {values?.map((value, index) => (
                    <ContentAssetsRowEdit value={value} onSave={onSaveItem} onRemove={() => onRemoveItem(index)} />
                ))}

                <ContentAssetsRowAdd onBrowseAssetClick={handleBrowseAsset} onUploadClick={() => {}} />
            </div>
        </>
    );
};
