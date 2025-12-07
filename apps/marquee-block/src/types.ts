export type BlockSettings = {
	type: "text" | "asset";

	contentTexts?: string[];
	directionHV: "horizontal" | "vertical";
	directionH: "left" | "right";
	directionV: "up" | "down";
	speed: string;
	pauseHover: boolean;
	pauseClick: boolean;
	loop: boolean;
	autoFill: boolean;

	height: string;

	borderEnabled: boolean;
	borderStyle: "solid" | "dashed" | "dotted";
	borderWidth: string;
	borderColor: { r: number; g: number; b: number; a: number };

	borderRadiusCustomEnabled: boolean;
	borderRadiusSimple: "0px" | "4px" | "8px" | "16px";
	borderRadiusCustomTopLeft: string;
	borderRadiusCustomTopRight: string;
	borderRadiusCustomBottomRight: string;
	borderRadiusCustomBottomLeft: string;
};
