import { cn } from "@sa-apps/utilities";
import type { CSSProperties } from "react";
import styles from "./ContentTextsView.module.scss";

type ContentTextViewProps = {
	contentTexts?: string[];
	direction: "horizontal" | "vertical";
	style?: CSSProperties;
};

export const ContentTextsView = ({ contentTexts, direction, style }: ContentTextViewProps) => {
	// biome-ignore lint/correctness/useJsxKeyInIterable: no proper key
	return contentTexts?.map((contentText) => (
		<span key={contentText} style={style} className={cn(direction === "horizontal" ? styles.horizontal : styles.vertical)}>
			{contentText}
		</span>
	));
};
