import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { cn } from '@sa-apps/utilities';
import type { ReactElement } from 'react';
import Marquee from 'react-fast-marquee';
import { trackEvent } from '@sa-apps/tracking';

import { useDraggableHeightHandle } from './utilities/useDraggableHeightHandle';
import { ContentTextsEdit } from './ContentTextsEdit';
import type { BlockSettings } from './types';
import { getMarqueeRootStyle } from './helpers';
import { borderClasses, borderRadiusClasses } from './constants';
import { ContentTextsView } from './ContentTextsView';
import { ContentAssetsEdit } from './ContentAssetsEdit';
import { ContentAssetsView } from './ContentAssetsView';
import { useBlockAssets } from './utilities/useBlockAssets';

export const MarqueeBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge, { enabled: blockSettings.type === 'asset' });
    const isEditing = useEditorState(appBridge);

    const handleTextChange = (index: number, value: string) => {
        const cloneContent = [...(blockSettings.contentTexts ?? [])];
        cloneContent[index] = value;
        setBlockSettings({ contentTexts: cloneContent });
    };

    const handleRemoveText = (index: number) => {
        const cloneContent = [...(blockSettings.contentTexts ?? [])];
        cloneContent.splice(index, 1);
        setBlockSettings({ contentTexts: cloneContent });
    };

    const handleAddText = (value: string) => {
        setBlockSettings({ contentTexts: [...(blockSettings.contentTexts ?? []), value] });
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
        <div data-test-id="marquee-block" style={getMarqueeRootStyle(blockSettings)}>
            <ResizeWrapper>
                <Marquee
                    style={{ height: `${height}px` }}
                    className={cn('overflow-y-hidden h-[--height] [&_.rfm-child]:flex', borderClasses, borderRadiusClasses)}
                    loop={0}
                    autoFill={blockSettings.autoFill}
                    speed={blockSettings.speed ? Number.parseInt(blockSettings.speed) : undefined}
                    direction={blockSettings.directionHV === 'horizontal' ? blockSettings.directionH : blockSettings.directionV}
                    pauseOnHover={blockSettings.pauseHover}
                    pauseOnClick={blockSettings.pauseClick}
                >
                    {blockSettings.type === 'text' ? (
                        <ContentTextsView values={blockSettings.contentTexts} direction={blockSettings.directionHV} />
                    ) : (
                        <ContentAssetsView values={blockAssets.items} direction={blockSettings.directionHV} />
                    )}
                </Marquee>
                <ResizeHandle />
            </ResizeWrapper>

            {isEditing ? (
                blockSettings.type === 'text' ? (
                    <ContentTextsEdit values={blockSettings.contentTexts} onSaveItem={handleTextChange} onAddItem={handleAddText} onRemoveItem={handleRemoveText} />
                ) : (
                    <ContentAssetsEdit
                        appBridge={appBridge}
                        values={blockAssets.items}
                        onSaveItem={(index, asset) => {
                            // TODO
                        }}
                        onAddItem={(asset) => addAssetIdsToKey('items', [asset.id])}
                        onRemoveItem={(index) => deleteAssetIdsFromKey('items', [blockAssets.items[index].id])}
                    />
                )
            ) : null}
        </div>
    );
};
