import type { AppBridgeBlock, Asset } from "@frontify/app-bridge";

export type BlockSettings = {
	masonryItems?: MasonryItem[];

	itemsGapCustomEnabled: boolean;
	itemsGapSimple?: "0px" | "8px" | "16px" | "24px";
	itemsGapCustom?: string;

	columnsCountCustomEnabled: boolean;
	columnsCountSimple: "1" | "2" | "3";
	columnsCountCustom: string;

	itemContentPosition: "top" | "bottom";

	itemContentPaddingCustomEnabled: boolean;
	itemContentPaddingSimple: "0px" | "12px" | "24px" | "32px";
	itemContentPaddingTop: string;
	itemContentPaddingRight: string;
	itemContentPaddingBottom: string;
	itemContentPaddingLeft: string;

	itemsVideoAutoPlayEnabled: boolean;
	itemsVideoLoopEnabled: boolean;
	itemsVideoControlsEnabled: boolean;

	itemsBorderEnabled: boolean;
	itemsBorderStyle: "solid" | "dashed" | "dotted";
	itemsBorderWidth: string;
	itemsBorderColor: { r: number; g: number; b: number; a: number };

	itemsCornerRadiusCustomEnabled: boolean;
	itemsCornerRadiusSimple: "0px" | "4px" | "8px" | "16px";
	itemsCornerRadiusCustomTopLeft: string;
	itemsCornerRadiusCustomTopRight: string;
	itemsCornerRadiusCustomBottomRight: string;
	itemsCornerRadiusCustomBottomLeft: string;

	itemsBoxShadow: "none" | "small" | "medium" | "large";
};

export type MasonryItem = {
	id: string;
	content: string;

	style?: {
		height?: number;
		backgroundColor?: { r: number; g: number; b: number; a: number };
	};
};

export type MasonryItemProps = MasonryItem & {
	appBridge: AppBridgeBlock;
	coverAsset?: Asset;
	showControls: boolean;
	loopVideo: boolean;
	autoPlayEnabled: boolean;
	boxShadow: BlockSettings["itemsBoxShadow"];
	contentPosition: BlockSettings["itemContentPosition"];
	readonly: boolean;
	onContentChange: (content: string) => void;
	onStyleChange: (style: MasonryItem["style"]) => void;
	onDeleteClick?: () => void;
	onUploadedFile: (assetId: number) => Promise<void>;
	onUnlinkAsset: () => void;
	onBrowseAssetClick: () => void;
};
