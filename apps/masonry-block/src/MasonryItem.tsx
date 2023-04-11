import { ReactElement } from 'react';
import { cn } from '@sa-apps/utilities';
import { RichTextEditor } from '@sa-apps/rich-text-editor';
import { Dropzone } from '@sa-apps/dropzone';
import { FileExtension, FileExtensionSets } from '@frontify/app-bridge';

import type { MasonryItemProps } from './types';
import { isMasonryItemEmpty, prepareImageUrl, prepareVideoUrl, rgbaObjectToString } from './helpers';
import {
    DEFAULT_MASONRY_ITEM,
    contentPaddingClasses,
    itemBorderClasses,
    itemBoxShadowClasses,
    itemCornerRadiusClasses,
} from './constant';
import { useDraggableHeightHandle } from './utilities';
import { MasonryItemMenu } from './MasonryItemMenu';
import { Video } from './Video';

export const MasonryItem = ({
    id,
    readonly,
    coverAsset,
    showControls,
    loopVideo,
    autoPlayEnabled,
    contentPosition,
    boxShadow,
    content,
    style,
    onUploadClick,
    onBrowseAssetClick,
    onContentChange,
    onStyleChange,
    onUnlinkAsset,
    onDeleteClick,
}: MasonryItemProps): ReactElement => {
    const isEmpty = isMasonryItemEmpty({ id, content }, coverAsset ? { [`masonry-item-${id}`]: [coverAsset] } : {});

    const handleUploadClick = () => {
        alert('Not yet implemented 😢\nPlease the "Browse" button instead.');
        onUploadClick();
    };

    const handleBrowseAssetClick = () => {
        onBrowseAssetClick();
    };

    const handleUnlinkAsset = () => {
        onUnlinkAsset();
    };

    const handleDeleteClick = () => {
        onDeleteClick?.();
    };

    const handleStyleChange: MasonryItemProps['onStyleChange'] = (style) => {
        onStyleChange(style);
    };

    const { height, ResizeHandle, ResizeWrapper } = useDraggableHeightHandle({
        id,
        initialHeight: style?.height ?? 0,
        enabled: !readonly,
        onMouseUp: (height) => onStyleChange({ height }),
    });

    return (
        <ResizeWrapper>
            <div
                style={{
                    height: `${height}px`,
                    backgroundColor: style?.backgroundColor ? rgbaObjectToString(style.backgroundColor) : undefined,
                }}
                className={cn(
                    'relative group/masonryItem flex overflow-auto',
                    contentPosition === 'top' ? 'flex-col-reverse' : 'flex-col',
                    itemBorderClasses,
                    itemCornerRadiusClasses,
                    itemBoxShadowClasses[boxShadow]
                )}
            >
                {coverAsset?.previewUrl &&
                    !FileExtensionSets.Videos.includes(coverAsset.extension as FileExtension) && (
                        <img
                            draggable={false}
                            className="overflow-hidden select-none object-cover h-full flex-grow"
                            src={prepareImageUrl(coverAsset.previewUrl)}
                        />
                    )}

                {coverAsset?.previewUrl && FileExtensionSets.Videos.includes(coverAsset.extension as FileExtension) && (
                    <Video
                        className="overflow-hidden select-none object-cover h-full flex-grow"
                        draggable={false}
                        controls={showControls}
                        loop={loopVideo}
                        autoPlay={autoPlayEnabled}
                        src={prepareVideoUrl(coverAsset.previewUrl)}
                    />
                )}

                {!coverAsset?.previewUrl && readonly && <div className="flex-grow" />}

                {!coverAsset?.previewUrl && !readonly && (
                    <div className="min-h-[120px] h-[120px] w-full flex items-center justify-center">
                        <Dropzone onUploadClick={handleUploadClick} onBrowseAssetClick={handleBrowseAssetClick} />
                    </div>
                )}

                {onDeleteClick && !isEmpty && !readonly ? (
                    <MasonryItemMenu
                        style={style}
                        onStyleChange={handleStyleChange}
                        onUnlinkAsset={handleUnlinkAsset}
                        onDeleteClick={handleDeleteClick}
                    />
                ) : null}

                <div
                    className={cn(
                        contentPaddingClasses,
                        content === DEFAULT_MASONRY_ITEM['content'] && readonly && 'hidden'
                    )}
                >
                    <RichTextEditor id={id} content={content} onTextChange={onContentChange} readonly={readonly} />
                </div>
            </div>

            <ResizeHandle />
        </ResizeWrapper>
    );
};
