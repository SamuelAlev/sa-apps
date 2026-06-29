import type { MasonryItem } from "./types";

export const DEFAULT_RTE_CONTENT = '[{"type":"p","children":[{"text":""}]}]';

export const DEFAULT_MASONRY_ITEM: Omit<MasonryItem, "id"> = {
	content: DEFAULT_RTE_CONTENT,
	style: {
		height: 400,
		backgroundColor: { r: 247, g: 247, b: 247, a: 1 },
	},
};
