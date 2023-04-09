import { MouseEvent, ReactElement, useState } from 'react';
import { useTranslations } from '@sa-apps/i18n';
import { Button } from '@sa-apps/button';
import { Menu } from 'lucide-react';
import { cn } from '@sa-apps/utilities';
import { RichTextEditor } from '@sa-apps/rich-text-editor';
import { Popover, PopoverContent, PopoverTrigger } from '@sa-apps/popover';

import type { MasonryItemProps } from './types';
import { isMasonryItemEmpty, prepareVideoUrl, rgbaObjectToString } from './helpers';
import {
    DEFAULT_MASONRY_ITEM,
    contentPaddingClasses,
    itemBorderClasses,
    itemCornerRadiusClasses,
    itemsAssetFilterToStyle,
} from './constant';
import { useDraggableHeightHandle } from './utilities/useDraggableHeightHandle';
import { MasonryItemPopoverContent } from './MasonryItemPopoverContent';
import { FileExtension, FileExtensionSets } from '@frontify/app-bridge';

export const MasonryItem = ({
    id,
    readonly,
    coverAsset,
    showControls,
    loopVideo,
    autoPlayEnabled,
    contentPosition,
    content,
    style,
    onUploadClick,
    onBrowseAssetClick,
    onContentChange,
    onStyleChange,
    onDeleteClick,
}: MasonryItemProps): ReactElement => {
    const { t } = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const isEmpty = isMasonryItemEmpty({ id, content }, coverAsset ? { [`masonry-item-${id}`]: [coverAsset] } : {});

    const handleUploadClick = () => {
        alert('Not yet implemented 😢');
        onUploadClick();
    };

    const handleBrowseAssetClick = () => {
        onBrowseAssetClick();
    };

    const handleDeleteClick = (event: MouseEvent) => {
        event.stopPropagation();
        onDeleteClick?.();
    };

    const handleStyleChange = (newStyle: Partial<MasonryItemProps['style']>) => {
        onStyleChange(newStyle);
    };

    const handleTriggerClick = (event: MouseEvent) => {
        event.stopPropagation();
        setIsOpen((isOpen) => !isOpen);
    };

    const { height, ResizeHandle, ResizeWrapper } = useDraggableHeightHandle({
        id,
        initialHeight: style?.height ?? 0,
        enabled: !readonly,
        onMouseUp: (height) => onStyleChange({ height }),
    });
    console.log(id, content === DEFAULT_MASONRY_ITEM['content'], readonly);

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
                    itemCornerRadiusClasses
                )}
            >
                {coverAsset?.previewUrl &&
                    !FileExtensionSets.Videos.includes(coverAsset.extension as FileExtension) && (
                        <img
                            draggable={false}
                            className="overflow-hidden select-none object-cover h-full"
                            src={coverAsset.previewUrl}
                        />
                    )}

                {coverAsset?.previewUrl && FileExtensionSets.Videos.includes(coverAsset.extension as FileExtension) && (
                    <video
                        className="overflow-hidden select-none object-cover h-full"
                        draggable={false}
                        controls={showControls}
                        loop={loopVideo}
                        autoPlay={autoPlayEnabled}
                        src={prepareVideoUrl(coverAsset?.previewUrl)}
                    />
                )}

                {!coverAsset?.previewUrl && !readonly && (
                    <div className="min-h-[120px] h-[120px] w-full flex items-center justify-center text-white">
                        <button
                            className="h-full w-full flex items-center justify-center cursor-not-allowed"
                            title="Not yet implemented"
                            onClick={handleUploadClick}
                        >
                            {t('upload')}
                        </button>

                        <button
                            className="h-full w-full flex items-center justify-center"
                            onClick={handleBrowseAssetClick}
                        >
                            {t('browse')}
                        </button>
                    </div>
                )}

                {onDeleteClick && !isEmpty && !readonly ? (
                    <Popover open={isOpen}>
                        <PopoverTrigger
                            data-no-dnd={true}
                            onClick={handleTriggerClick}
                            className="absolute top-4 right-4 invisible group-hover/masonryItem:visible"
                        >
                            <Button size="sm">
                                <Menu className="max-w-[20px] w-[20px] max-h-[20px] h-[20px] text-inherit" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            data-no-dnd={true}
                            onClick={(event) => event.stopPropagation()}
                            onEscapeKeyDown={() => setIsOpen(false)}
                            onInteractOutside={() => setIsOpen(false)}
                        >
                            <MasonryItemPopoverContent
                                style={style}
                                onStyleChange={handleStyleChange}
                                onCloseClick={() => setIsOpen(false)}
                                onDeleteClick={handleDeleteClick}
                            />
                        </PopoverContent>
                    </Popover>
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
