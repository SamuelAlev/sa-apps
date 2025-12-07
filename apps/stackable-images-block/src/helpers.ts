import type { CSSProperties } from "react";
import type { BlockSettings } from "./types";

export const getTiltImageStyle = (blockSettings: BlockSettings) => {
	return {
		"--height": blockSettings.height,

		"--border-disabled": blockSettings.borderEnabled ? undefined : "0",
		"--border-style": blockSettings.borderStyle,
		"--border-width": blockSettings.borderWidth,
		"--border-color": blockSettings.borderColor ? rgbaObjectToString(blockSettings.borderColor) : undefined,

		"--border-radius-top-left": blockSettings.borderRadiusCustomEnabled
			? blockSettings.borderRadiusCustomTopLeft
			: blockSettings.borderRadiusSimple,
		"--border-radius-top-right": blockSettings.borderRadiusCustomEnabled
			? blockSettings.borderRadiusCustomTopRight
			: blockSettings.borderRadiusSimple,
		"--border-radius-bottom-right": blockSettings.borderRadiusCustomEnabled
			? blockSettings.borderRadiusCustomBottomRight
			: blockSettings.borderRadiusSimple,
		"--border-radius-bottom-left": blockSettings.borderRadiusCustomEnabled
			? blockSettings.borderRadiusCustomBottomLeft
			: blockSettings.borderRadiusSimple,
	} as CSSProperties;
};

export const rgbaObjectToString = (color: { r: number; g: number; b: number; a: number }) =>
	`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

export const prepareImageUrl = (url: string) => {
	const urlObj = new URL(url);
	urlObj.searchParams.set("width", "1280");
	urlObj.searchParams.set("format", "webp");
	return urlObj.toString();
};
