import type { Asset } from "@frontify/app-bridge";
import { cn } from "@sa-apps/utilities";
import type { CSSProperties } from "react";
import styles from "./ContentAssetsView.module.scss";
import { prepareImageUrl } from "./helpers";

type ContentTextViewProps = {
	assets?: Asset[];
	contentTexts?: string[];
	direction: "horizontal" | "vertical";
	style: CSSProperties;
};

export const ContentAssetsView = ({ assets, contentTexts, direction, style }: ContentTextViewProps) => {
	return assets?.map((asset, index) => (
		<div
			key={asset.id}
			style={style}
			className={cn(styles.assetItem, direction === "horizontal" ? styles.assetItemHorizontal : styles.assetItemVertical)}
		>
			<img draggable={false} className={styles.image} src={prepareImageUrl(asset.previewUrl)} alt={contentTexts?.[index]} />
		</div>
	));
};
