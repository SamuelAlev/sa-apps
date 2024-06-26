import { useAssetChooser, useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import type { DragEndEvent } from '@sa-apps/drag-and-drop';
import { DragAndDropSortableContext, SwappableItem } from '@sa-apps/drag-and-drop';
import { trackEvent } from '@sa-apps/tracking';
import { arraySwap } from '@sa-apps/utilities';
import type { ReactElement } from 'react';

import { Masonry } from './Masonry';
import { MasonryItem } from './MasonryItem';
import { DEFAULT_MASONRY_ITEM } from './constant';
import { getMasonryRootStyles, getNewMasonryItemId, isLastMasonryItemEmpty } from './helpers';
import type { BlockSettings, MasonryItem as MasonryItemType } from './types';

export const MasonryBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey, deleteAssetIdsFromKey, addAssetIdsToKey } = useBlockAssets(appBridge);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const isEditing = useEditorState(appBridge);

    const masonryItems: MasonryItemType[] = blockSettings.masonryItems ?? [];
    const isMasonryItemsEmpty = masonryItems.length === 0;

    const isLastItemEmpty = !isMasonryItemsEmpty && isLastMasonryItemEmpty(masonryItems, blockAssets);

    const handleContentChange = (id: string, content: string) => {
        const masonryItemsIndex = masonryItems.findIndex((masonryItems) => masonryItems.id === id);
        const newMasonryItems = structuredClone(masonryItems);
        if (masonryItemsIndex !== -1) {
            newMasonryItems[masonryItemsIndex].content = content;
        } else {
            newMasonryItems.push({ ...DEFAULT_MASONRY_ITEM, id, content });
        }

        setBlockSettings({
            ...blockSettings,
            masonryItems: newMasonryItems,
        }).catch(() => console.error("Couldn't save the block setttings"));
    };

    const handleDeleteClick = (id: string) => {
        const masonryItemsIndex = masonryItems.findIndex((masonryItems) => masonryItems.id === id);
        if (masonryItemsIndex !== -1) {
            const newMasonryItems = structuredClone(masonryItems);
            newMasonryItems.splice(masonryItemsIndex, 1);

            setBlockSettings({
                ...blockSettings,
                masonryItems: newMasonryItems,
            }).catch(() => console.error("Couldn't save the block setttings"));

            trackEvent('deleted item');
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const oldIndex = masonryItems.findIndex((masonryItem) => masonryItem.id === active.id);
        const newIndex = masonryItems.findIndex((masonryItem) => masonryItem.id === over?.id);

        if (over && active.id !== over.id && oldIndex !== undefined && newIndex !== undefined) {
            const newMasonryItems = structuredClone(masonryItems);

            setBlockSettings({
                ...blockSettings,
                masonryItems: arraySwap(newMasonryItems, oldIndex, newIndex),
            }).catch(() => console.error("Couldn't save the block setttings"));

            trackEvent('drag and dropped item');
        }
    };

    const handleUnlinkAssetClick = (id: string) => {
        deleteAssetIdsFromKey(
            `masonry-item-${id}`,
            blockAssets[`masonry-item-${id}`]?.map((asset) => asset.id),
        ).catch(() => console.error("Couldn't unlink the asset from the block"));
    };

    const handleUploadedFile = async (id: string, assetId: number) => {
        if (masonryItems.findIndex((masonryItem) => masonryItem.id === id) !== -1) {
            await updateAssetIdsFromKey(`masonry-item-${id}`, [assetId]).catch(() => console.error("Couldn't add the asset to the block"));
        } else {
            const newMasonryItems = structuredClone(masonryItems);
            newMasonryItems.push({ ...DEFAULT_MASONRY_ITEM, id });
            await setBlockSettings({
                ...blockSettings,
                masonryItems: newMasonryItems,
            }).catch(() => console.error("Couldn't save the block setttings"));

            await addAssetIdsToKey(`masonry-item-${id}`, [assetId]).catch(() => console.error("Couldn't add the asset to the block"));
        }

        trackEvent('uploaded file');
    };

    const handleBrowseAssetClick = (id: string) => {
        openAssetChooser(
            (result) => {
                const masonryItemsIndex = masonryItems.findIndex((masonryItems) => masonryItems.id === id);
                if (masonryItemsIndex === -1) {
                    setBlockSettings({
                        ...blockSettings,
                        masonryItems: [...(blockSettings.masonryItems ? blockSettings.masonryItems : []), { ...DEFAULT_MASONRY_ITEM, id }],
                    }).catch(() => console.error("Couldn't save the block setttings"));
                }

                updateAssetIdsFromKey(`masonry-item-${id}`, [result[0].id]).catch(() => console.error("Couldn't add the asset to the block"));
                closeAssetChooser();
                trackEvent('chose asset');
            },
            { selectedValueId: blockAssets[`masonry-item-${id}`]?.[0]?.id },
        );

        trackEvent('open asset chooser item');
    };

    const handleStyleChange = (id: string, style: Partial<MasonryItemType['style']>) => {
        const masonryItemsIndex = masonryItems.findIndex((masonryItems) => masonryItems.id === id);
        const newMasonryItems = structuredClone(masonryItems);
        if (masonryItemsIndex !== -1) {
            newMasonryItems[masonryItemsIndex].style = {
                ...newMasonryItems[masonryItemsIndex].style,
                ...style,
            };
        } else {
            newMasonryItems.push({ ...DEFAULT_MASONRY_ITEM, id, style });
        }

        setBlockSettings({
            ...blockSettings,
            masonryItems: newMasonryItems,
        }).catch(() => console.error("Couldn't save the block setttings"));
    };

    return (
        <div style={getMasonryRootStyles(blockSettings)} data-test-id="masonry-block">
            <DragAndDropSortableContext items={masonryItems} strategy="rect-swapping" onDragEnd={handleDragEnd}>
                <Masonry columnCount={Number.parseInt(blockSettings.columnsCountCustomEnabled ? blockSettings.columnsCountCustom : blockSettings.columnsCountSimple)}>
                    {masonryItems.map((masonryItem) => (
                        <SwappableItem key={masonryItem.id} id={masonryItem.id} disabled={!isEditing}>
                            <MasonryItem
                                appBridge={appBridge}
                                onContentChange={(value) => handleContentChange(masonryItem.id, value)}
                                onStyleChange={(value) => handleStyleChange(masonryItem.id, value)}
                                onBrowseAssetClick={() => handleBrowseAssetClick(masonryItem.id)}
                                onUploadedFile={async (assetId) => await handleUploadedFile(masonryItem.id, assetId)}
                                onUnlinkAsset={() => handleUnlinkAssetClick(masonryItem.id)}
                                onDeleteClick={() => handleDeleteClick(masonryItem.id)}
                                readonly={!isEditing}
                                coverAsset={blockAssets[`masonry-item-${masonryItem.id}`]?.[0]}
                                showControls={blockSettings.itemsVideoControlsEnabled}
                                loopVideo={blockSettings.itemsVideoLoopEnabled}
                                autoPlayEnabled={blockSettings.itemsVideoAutoPlayEnabled}
                                contentPosition={blockSettings.itemContentPosition}
                                boxShadow={blockSettings.itemsBoxShadow}
                                {...masonryItem}
                            />
                        </SwappableItem>
                    ))}

                    {(!isLastItemEmpty || isMasonryItemsEmpty) && isEditing && (
                        <MasonryItem
                            appBridge={appBridge}
                            id={getNewMasonryItemId()}
                            onContentChange={(value) => handleContentChange(getNewMasonryItemId(), value)}
                            onBrowseAssetClick={() => handleBrowseAssetClick(getNewMasonryItemId())}
                            onUploadedFile={async (assetId) => await handleUploadedFile(getNewMasonryItemId(), assetId)}
                            onStyleChange={() => null}
                            onUnlinkAsset={() => null}
                            readonly={false}
                            showControls={blockSettings.itemsVideoControlsEnabled}
                            loopVideo={blockSettings.itemsVideoLoopEnabled}
                            autoPlayEnabled={blockSettings.itemsVideoAutoPlayEnabled}
                            contentPosition={blockSettings.itemContentPosition}
                            boxShadow={blockSettings.itemsBoxShadow}
                            {...DEFAULT_MASONRY_ITEM}
                        />
                    )}
                </Masonry>
            </DragAndDropSortableContext>
        </div>
    );
};
