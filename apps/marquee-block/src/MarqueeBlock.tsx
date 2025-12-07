import { useBlockSettings, useEditorState } from "@frontify/app-bridge";
import type { BlockProps } from "@frontify/guideline-blocks-settings";
import { trackEvent } from "@sa-apps/tracking";
import { cn } from "@sa-apps/utilities";
import type { ReactElement } from "react";
import Marquee from "react-fast-marquee";

import { ContentAssetsEdit } from "./ContentAssetsEdit";
import { ContentAssetsView } from "./ContentAssetsView";
import { ContentTextsEdit } from "./ContentTextsEdit";
import { ContentTextsView } from "./ContentTextsView";
import { borderClasses, borderRadiusClasses } from "./constants";
import { getMarqueeRootStyle } from "./helpers";
import type { BlockSettings } from "./types";
import { useBlockAssets } from "./utilities/useBlockAssets";
import { useDraggableHeightHandle } from "./utilities/useDraggableHeightHandle";

export const MarqueeBlock = ({ appBridge }: BlockProps): ReactElement => {
	const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
	const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge, { enabled: blockSettings.type === "asset" });
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
		trackEvent("deleted item");
	};

	const handleAddText = (value: string) => {
		setBlockSettings({ contentTexts: [...(blockSettings.contentTexts ?? []), value] });
		trackEvent("added item");
	};

	const handleHeightChange = (height: number) => {
		setBlockSettings({ height: `${height}px` }).catch(() => console.error("Couldn't save the block setttings"));
		trackEvent("changed height");
	};

	const { height, ResizeHandle, ResizeWrapper } = useDraggableHeightHandle({
		id: "draggable",
		initialHeight: Number.parseInt(blockSettings.height, 10) ?? 0,
		enabled: isEditing,
		onMouseUp: (height) => handleHeightChange(height),
	});

	return (
		<div data-test-id="marquee-block" style={getMarqueeRootStyle(blockSettings)}>
			<ResizeWrapper>
				<Marquee
					style={{ height: `${height}px` }}
					className={cn("overflow-y-hidden h-[--height] [&_.rfm-child]:flex", borderClasses, borderRadiusClasses)}
					loop={0}
					autoFill={blockSettings.autoFill}
					speed={blockSettings.speed ? Number.parseInt(blockSettings.speed, 10) : undefined}
					direction={blockSettings.directionHV === "horizontal" ? blockSettings.directionH : blockSettings.directionV}
					pauseOnHover={blockSettings.pauseHover}
					pauseOnClick={blockSettings.pauseClick}
				>
					{blockSettings.type === "text" ? (
						<ContentTextsView contentTexts={blockSettings.contentTexts} direction={blockSettings.directionHV} />
					) : (
						<ContentAssetsView
							assets={blockAssets.items}
							contentTexts={blockSettings.contentTexts}
							direction={blockSettings.directionHV}
						/>
					)}
				</Marquee>
				<ResizeHandle />
			</ResizeWrapper>

			{isEditing ? (
				blockSettings.type === "text" ? (
					<ContentTextsEdit
						values={blockSettings.contentTexts}
						onUpdateItem={handleTextChange}
						onAddItem={handleAddText}
						onRemoveItem={handleRemoveText}
					/>
				) : (
					<ContentAssetsEdit
						appBridge={appBridge}
						assets={blockAssets.items}
						contentTexts={blockSettings.contentTexts}
						onUpdateAsset={async (_index, _asset) => {
							// TODO
						}}
						onUpdateContentText={async (index, contentText) => {
							const cloneContent = [...(blockSettings.contentTexts ?? [])];
							cloneContent[index] = contentText;
							setBlockSettings({ contentTexts: cloneContent });
						}}
						onAddItem={async (assetId) => {
							await setBlockSettings({ contentTexts: [...(blockSettings.contentTexts ?? []), ""] });
							await addAssetIdsToKey("items", [assetId]);
							trackEvent("added item");
						}}
						onRemoveItem={async (index) => {
							const cloneContent = [...(blockSettings.contentTexts ?? [])];
							cloneContent.splice(index, 1);
							setBlockSettings({ contentTexts: cloneContent });
							await deleteAssetIdsFromKey("items", [blockAssets.items[index].id]);
							trackEvent("deleted item");
						}}
					/>
				)
			) : null}
		</div>
	);
};
