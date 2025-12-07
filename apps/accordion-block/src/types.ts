import type { AppBridgeBlock } from "@frontify/app-bridge";

export type BlockSettings = {
	accordionItems?: AccordionItem[];

	accordionMultiple: boolean;

	itemsGapCustomEnabled: boolean;
	itemsGapSimple?: "0px" | "8px" | "16px" | "24px";
	itemsGapCustom?: string;

	itemHeadingPaddingCustomEnabled: boolean;
	itemHeadingPaddingSimple: "0px" | "12px" | "24px" | "32px";
	itemHeadingPaddingTop: string;
	itemHeadingPaddingRight: string;
	itemHeadingPaddingBottom: string;
	itemHeadingPaddingLeft: string;

	itemContentPaddingCustomEnabled: boolean;
	itemContentPaddingSimple: "0px" | "12px" | "24px" | "32px";
	itemContentPaddingTop: string;
	itemContentPaddingRight: string;
	itemContentPaddingBottom: string;
	itemContentPaddingLeft: string;

	itemsBorderEnabled: boolean;
	itemsBorderStyle: "solid" | "dashed" | "dotted";
	itemsBorderWidth: string;
	itemsBorderColor: { r: number; g: number; b: number; a: number };

	triggerIcon: "plus" | "chevron-right" | "chevron-left";

	triggerSizeCustomEnabled: boolean;
	triggerSizeSimple?: "16px" | "24px" | "32px";
	triggerSizeCustom?: string;

	triggerBorderEnabled: boolean;
	triggerBorderStyle: "solid" | "dashed" | "dotted";
	triggerBorderWidth: string;
	triggerBorderColor: { r: number; g: number; b: number; a: number };

	triggerThicknessCustomEnabled: boolean;
	triggerThicknessSimple?: "1px" | "2px" | "4px";
	triggerThicknessCustom?: string;

	triggerDirection: "left" | "right";
};

export type AccordionItem = {
	id: string;
	heading: string;
	content: string;

	style?: {
		backgroundColor?: { r: number; g: number; b: number; a: number };
	};
};

export type AccordionItemProps = AccordionItem & {
	appBridge: AppBridgeBlock;
	readonly: boolean;
	triggerIcon: "plus" | "chevron-right" | "chevron-left";
	triggerDirection: "left" | "right";
	onContentChange: (content: string) => void;
	onHeadingChange: (heading: string) => void;
	onStyleChange: (style: AccordionItem["style"]) => void;
	onDeleteClick?: () => void;
};

export type AccordionItemTriggerProps = {
	icon: "plus" | "chevron-right" | "chevron-left";
};
