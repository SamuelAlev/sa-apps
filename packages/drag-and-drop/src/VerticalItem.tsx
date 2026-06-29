import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import styles from "./VerticalItem.module.scss";

type VerticalItemProps = {
	id: string;
	children: ReactNode;
	disabled?: boolean;
};

export const VerticalItem = ({ id, children, disabled }: VerticalItemProps): ReactElement => {
	const { attributes, listeners, setNodeRef, transform, transition, setDraggableNodeRef } = useSortable({
		id,
		disabled,
	});

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} className={styles.item}>
			<button type="button" ref={setDraggableNodeRef} {...attributes} {...listeners} disabled={disabled} className={styles.handle}>
				<GripVertical />
			</button>

			{children}
		</div>
	);
};
VerticalItem.displayName = "SAVerticalItem";
