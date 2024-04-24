import { AssetChooserObjectType, useAssetChooser, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { trackEvent } from '@sa-apps/tracking';
import { cn } from '@sa-apps/utilities';
import type { ReactElement } from 'react';
import Tilt from 'react-parallax-tilt';

import { AssetRowAdd } from './AssetRowAdd';
import { AssetRowEdit } from './AssetRowEdit';
import { borderClasses, borderRadiusClasses } from './constants';
import { getTiltImageStyle, prepareImageUrl } from './helpers';
import type { BlockSettings } from './types';
import { useUploadFile } from './useUploadFile';
import { useBlockAssets } from './utilities/useBlockAssets';
import { useDraggableHeightHandle } from './utilities/useDraggableHeightHandle';

export const StackableImagesBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge, { enabled: true });
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const isEditing = useEditorState(appBridge);
    const { uploadFile, loading: loadingUpload } = useUploadFile(async (assetId) => await addAssetIdsToKey('image-stack', [assetId]));

    const handleBrowseAsset = () => {
        openAssetChooser(
            async (selectedAssets) => {
                await addAssetIdsToKey('image-stack', [selectedAssets[0].id]);
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

    const handleAssetDelete = (assetId: number) => {
        deleteAssetIdsFromKey('image-stack', [assetId]);
        trackEvent('deleted asset');
    };

    const handleHeightChange = (height: number) => {
        setBlockSettings({ height: `${height}px` }).catch(() => console.error("Couldn't save the block setttings"));
        trackEvent('changed height');
    };

    const { height, ResizeHandle, ResizeWrapper } = useDraggableHeightHandle({
        id: 'draggable',
        initialHeight: Number.parseInt(blockSettings.height) ?? 0,
        enabled: isEditing,
        onMouseUp: (height) => handleHeightChange(height),
    });

    return (
        <div data-test-id="image-stack-block" style={getTiltImageStyle(blockSettings)}>
            <ResizeWrapper>
                <Tilt
                    style={{ height: `${height}px`, transformStyle: 'preserve-3d' }}
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    perspective={1700}
                    transitionSpeed={50}
                    gyroscope={true}
                    className={cn('h-[--height] rounded-[inherit]', borderClasses, borderRadiusClasses)}
                >
                    {blockAssets['image-stack']?.map((asset, index) => (
                        <div
                            key={asset.id}
                            className="flex h-[--height] w-full rounded-[inherit] overflow-clip"
                            style={{ transform: `translate3d(0, calc(var(--height) * -1 * ${index}), calc(100px * ${index}))` }}
                        >
                            <img
                                draggable={false}
                                className="h-full flex-grow select-none overflow-hidden object-cover"
                                src={prepareImageUrl(asset.previewUrl)}
                                alt={'TODO'} // TODO: Add alt text
                            />
                        </div>
                    ))}
                </Tilt>
                <ResizeHandle />

                {isEditing && (
                    <>
                        {blockAssets['image-stack']?.map((asset) => (
                            <AssetRowEdit key={asset.id} asset={asset} onRemove={() => handleAssetDelete(asset.id)} onUpdate={() => {}} />
                        ))}
                        <AssetRowAdd onBrowseAssetClick={handleBrowseAsset} onUploadClick={handleUploadAsset} />
                    </>
                )}
            </ResizeWrapper>
        </div>
    );
};
