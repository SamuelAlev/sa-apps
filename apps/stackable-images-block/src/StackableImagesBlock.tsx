import { AssetChooserObjectType, useAssetChooser, useBlockSettings, useEditorState } from "@frontify/app-bridge";
import type { BlockProps } from "@frontify/guideline-blocks-settings";
import { trackEvent } from "@sa-apps/tracking";
import { cn } from "@sa-apps/utilities";
import { type ReactElement, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";

import { AssetRowAdd } from "./AssetRowAdd";
import { AssetRowEdit } from "./AssetRowEdit";
import { borderClasses, borderRadiusClasses } from "./constants";
import { getTiltImageStyle, prepareImageUrl } from "./helpers";
import styles from "./StackableImagesBlock.module.scss";
import type { BlockSettings } from "./types";
import { useUploadFile } from "./useUploadFile";
import { useBlockAssets } from "./utilities/useBlockAssets";
import { useDraggableHeightHandle } from "./utilities/useDraggableHeightHandle";

export const StackableImagesBlock = ({ appBridge }: BlockProps): ReactElement => {
	const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
	const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge, { enabled: true });
	const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
	const isEditing = useEditorState(appBridge);
	const { uploadFile, loading: loadingUpload } = useUploadFile(async (assetId) => await addAssetIdsToKey("image-stack", [assetId]));

	const handleBrowseAsset = () => {
		openAssetChooser(
			async (selectedAssets) => {
				await addAssetIdsToKey("image-stack", [selectedAssets[0].id]);
				closeAssetChooser();
				trackEvent("chose asset");
			},
			{ objectTypes: [AssetChooserObjectType.ImageVideo] },
		);

		trackEvent("open asset chooser item");
	};

	const handleUploadAsset = (files: File | FileList) => {
		uploadFile(files);
		trackEvent("uploaded file");
	};

	const handleAssetDelete = (assetId: number) => {
		deleteAssetIdsFromKey("image-stack", [assetId]);
		trackEvent("deleted asset");
	};

	const handleHeightChange = (height: number) => {
		setBlockSettings({ height: `${height}px` }).catch(() => console.error("Couldn't save the block setttings"));
		trackEvent("changed height");
	};

	const [manualAngles, setManualAngles] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
	const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

	const handleMouseEnter = () => {
		clearTimeout(leaveTimer.current);
		setManualAngles({ x: null, y: null });
	};

	const handleMouseLeave = () => {
		leaveTimer.current = setTimeout(() => setManualAngles({ x: 0, y: 0 }), 150);
	};

	const { height, ResizeHandle, ResizeWrapper } = useDraggableHeightHandle({
		id: "draggable",
		initialHeight: Number.parseInt(blockSettings.height, 10) ?? 0,
		enabled: isEditing,
		onMouseUp: (height) => handleHeightChange(height),
	});

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
		<div
			className="sa-root"
			data-test-id="image-stack-block"
			style={getTiltImageStyle(blockSettings)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<ResizeWrapper>
				<Tilt
					style={{ height: `${height}px`, transformStyle: "preserve-3d" }}
					tiltMaxAngleX={Number.parseFloat(blockSettings.tiltMaxAngleX)}
					tiltMaxAngleY={Number.parseFloat(blockSettings.tiltMaxAngleY)}
					perspective={Number.parseFloat(blockSettings.tiltPerspective)}
					transitionSpeed={Number.parseFloat(blockSettings.tiltTransitionSpeed)}
					scale={Number.parseFloat(blockSettings.tiltScale)}
					gyroscope={true}
					reset={false}
					tiltAngleXManual={manualAngles.x}
					tiltAngleYManual={manualAngles.y}
					className={cn(styles.stack, borderClasses, borderRadiusClasses)}
				>
					{blockAssets["image-stack"]?.map((asset, index) => (
						<div
							key={asset.id}
							className={styles.layer}
							style={{ transform: `translate3d(0, calc(var(--height) * -1 * ${index}), calc(100px * ${index}))` }}
						>
							<img
								draggable={false}
								className={styles.image}
								src={prepareImageUrl(asset.previewUrl)}
								alt={"TODO"} // TODO: Add alt text
							/>
						</div>
					))}
				</Tilt>
				<ResizeHandle />

				{isEditing && (
					<>
						{blockAssets["image-stack"]?.map((asset) => (
							<AssetRowEdit key={asset.id} asset={asset} onRemove={() => handleAssetDelete(asset.id)} onUpdate={() => {}} />
						))}
						<AssetRowAdd onBrowseAssetClick={handleBrowseAsset} onUploadClick={handleUploadAsset} />
					</>
				)}
			</ResizeWrapper>
		</div>
	);
};
