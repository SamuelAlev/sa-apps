import { cn, range } from "@sa-apps/utilities";
import type { ReactElement, ReactNode } from "react";
import { Children } from "react";
import styles from "./Masonry.module.scss";

type MasonryProps = {
	columnCount: number;
	gap?: number | string;
	children: ReactNode;
};

export const Masonry = ({ columnCount, children }: MasonryProps): ReactElement => {
	const childrenArray = Children.toArray(children);

	return (
		<div className={cn(styles.columns)}>
			{range(columnCount).map((columnIndex) => (
				<div key={columnIndex} className={cn(styles.column)}>
					{range(columnIndex, childrenArray.length, columnCount).map((itemIndex) => childrenArray[itemIndex])}
				</div>
			))}
		</div>
	);
};
