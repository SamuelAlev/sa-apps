import type { FileExtension } from "@frontify/app-bridge";
import { FileExtensionSets } from "@frontify/app-bridge";
import { Dropzone } from "@sa-apps/dropzone";
import { RichTextEditor } from "@sa-apps/rich-text-editor";
import { cn } from "@sa-apps/utilities";
import { Loader2 } from "lucide-react";
import type { ChangeEvent, ReactElement } from "react";
import { DEFAULT_MASONRY_ITEM } from "./constant";
import { isMasonryItemEmpty, prepareImageUrl, prepareVideoUrl, rgbaObjectToString } from "./helpers";
import styles from "./MasonryItem.module.scss";
import { MasonryItemMenu } from "./MasonryItemMenu";
import type { MasonryItemProps } from "./types";
import { useUploadFile } from "./useUploadFile";
import { useDraggableHeightHandle } from "./utilities";
import { Video } from "./Video";

const boxShadowClass: Record<MasonryItemProps["boxShadow"], string> = {
	none: "",
	small: styles.boxShadowSmall,
	medium: styles.boxShadowMedium,
	large: styles.boxShadowLarge,
};

export const MasonryItem = ({
	appBridge,
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
	onUploadedFile,
	onBrowseAssetClick,
	onContentChange,
	onStyleChange,
	onUnlinkAsset,
	onDeleteClick,
}: MasonryItemProps): ReactElement => {
	const isEmpty = isMasonryItemEmpty({ id, content }, coverAsset ? { [`masonry-item-${id}`]: [coverAsset] } : {});
	const { uploadFile, loading: loadingUpload } = useUploadFile(async (assetId) => await onUploadedFile(assetId));

	const handleUploadClick = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.currentTarget.files;

		if (files) {
			uploadFile(files);
		}
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

	const handleStyleChange: MasonryItemProps["onStyleChange"] = (style) => {
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
					styles.item,
					contentPosition === "top" ? styles.flexColReverse : styles.flexCol,
					styles.border,
					styles.cornerRadius,
					boxShadowClass[boxShadow],
				)}
			>
				{coverAsset?.previewUrl && !FileExtensionSets.Videos.includes(coverAsset.extension as FileExtension) && (
					// biome-ignore lint/a11y/useAltText: <explanation>
					<img draggable={false} className={styles.coverImage} src={prepareImageUrl(coverAsset.previewUrl)} />
				)}

				{coverAsset?.previewUrl && FileExtensionSets.Videos.includes(coverAsset.extension as FileExtension) && (
					<Video
						className={styles.coverImage}
						draggable={false}
						controls={showControls}
						loop={loopVideo}
						autoPlay={autoPlayEnabled}
						src={prepareVideoUrl(coverAsset.previewUrl)}
					/>
				)}

				{!coverAsset?.previewUrl && readonly ? <div className={styles.flexGrow} /> : null}

				{loadingUpload ? (
					<div className={styles.loadingOverlay}>
						<Loader2 className={styles.loader} size={32} />
					</div>
				) : null}

				{!coverAsset?.previewUrl && !loadingUpload && !readonly && (
					<div className={styles.dropzoneWrapper}>
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

				<div className={cn(styles.contentPadding, content === DEFAULT_MASONRY_ITEM.content && readonly && styles.hidden)}>
					<RichTextEditor appBridge={appBridge} id={id} content={content} onTextChange={onContentChange} readonly={readonly} />
				</div>
			</div>

			<ResizeHandle />
		</ResizeWrapper>
	);
};
