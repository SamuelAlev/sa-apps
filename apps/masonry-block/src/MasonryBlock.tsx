import type { ReactElement } from 'react';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { useAssetChooser, useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { DragAndDropSortableContext, DragEndEvent, SwappableItem } from '@sa-apps/drag-and-drop';
import { arraySwap } from '@sa-apps/utilities';

import { Masonry } from './Masonry';
import type { BlockSettings, MasonryItem as MasonryItemType } from './types';
import { MasonryItem } from './MasonryItem';
import { DEFAULT_MASONRY_ITEM } from './constant';
import { getMasonryRootStyles, getNewMasonryItemId, isLastMasonryItemEmpty } from './helpers';

export const MasonryBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
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
        setBlockSettings({ ...blockSettings, masonryItems: newMasonryItems });
    };

    const handleDeleteClick = (id: string) => {
        const masonryItemsIndex = masonryItems.findIndex((masonryItems) => masonryItems.id === id);
        if (masonryItemsIndex !== -1) {
            const newMasonryItems = structuredClone(masonryItems);
            newMasonryItems.splice(masonryItemsIndex, 1);
            setBlockSettings({ ...blockSettings, masonryItems: newMasonryItems });
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
            });
        }
    };

    const handleUploadClick = (id: string) => {
        //TODO
        console.log(id);
    };

    const handleBrowseAssetClick = (id: string) => {
        openAssetChooser(
            async (result) => {
                const masonryItemsIndex = masonryItems.findIndex((masonryItems) => masonryItems.id === id);
                if (masonryItemsIndex === -1) {
                    setBlockSettings({
                        ...blockSettings,
                        masonryItems: [
                            ...(blockSettings.masonryItems ? blockSettings.masonryItems : []),
                            { ...DEFAULT_MASONRY_ITEM, id },
                        ],
                    });
                }

                await updateAssetIdsFromKey(`mansory-item-${id}`, [result[0].id]);
                closeAssetChooser();
            },
            { selectedValueId: blockAssets[`mansory-item-${id}`]?.[0]?.id }
        );
    };

    const handleStyleChange = (id: string, style: Partial<MasonryItemType['style']>) => {
        const masonryItemsIndex = masonryItems.findIndex((masonryItems) => masonryItems.id === id);
        const newMasonryItems = structuredClone(masonryItems);
        if (masonryItemsIndex !== -1) {
            newMasonryItems[masonryItemsIndex].style = { ...newMasonryItems[masonryItemsIndex].style, ...style };
        } else {
            newMasonryItems.push({ ...DEFAULT_MASONRY_ITEM, id, style });
        }
        setBlockSettings({ ...blockSettings, masonryItems: newMasonryItems });
    };

    return (
        <div style={getMasonryRootStyles(blockSettings)}>
            <DragAndDropSortableContext items={masonryItems} strategy="rect-swapping" onDragEnd={handleDragEnd}>
                <Masonry
                    columnCount={parseInt(
                        blockSettings.columnsCountCustomEnabled
                            ? blockSettings.columnsCountCustom
                            : blockSettings.columnsCountSimple
                    )}
                >
                    {masonryItems.map((masonryItem) => (
                        <SwappableItem key={masonryItem.id} id={masonryItem.id} disabled={!isEditing}>
                            <MasonryItem
                                onContentChange={(value) => handleContentChange(masonryItem.id, value)}
                                onStyleChange={(value) => handleStyleChange(masonryItem.id, value)}
                                onBrowseAssetClick={() => handleBrowseAssetClick(masonryItem.id)}
                                onUploadClick={() => handleUploadClick(masonryItem.id)}
                                onDeleteClick={() => handleDeleteClick(masonryItem.id)}
                                readonly={!isEditing}
                                coverAsset={blockAssets[`mansory-item-${masonryItem.id}`]?.[0]}
                                showControls={blockSettings.itemsVideoControlsEnabled}
                                loopVideo={blockSettings.itemsVideoLoopEnabled}
                                autoPlayEnabled={blockSettings.itemsVideoAutoPlayEnabled}
                                contentPosition={blockSettings.itemContentPosition}
                                {...masonryItem}
                            />
                        </SwappableItem>
                    ))}

                    {(!isLastItemEmpty || isMasonryItemsEmpty) && isEditing && (
                        <MasonryItem
                            id={getNewMasonryItemId()}
                            onContentChange={(value) => handleContentChange(getNewMasonryItemId(), value)}
                            onStyleChange={(value) => handleStyleChange(getNewMasonryItemId(), value)}
                            onBrowseAssetClick={() => handleBrowseAssetClick(getNewMasonryItemId())}
                            onUploadClick={() => handleUploadClick(getNewMasonryItemId())}
                            readonly={false}
                            showControls={blockSettings.itemsVideoControlsEnabled}
                            loopVideo={blockSettings.itemsVideoLoopEnabled}
                            autoPlayEnabled={blockSettings.itemsVideoAutoPlayEnabled}
                            contentPosition={blockSettings.itemContentPosition}
                            {...DEFAULT_MASONRY_ITEM}
                        />
                    )}
                </Masonry>
            </DragAndDropSortableContext>
        </div>
    );
};
