import { cn } from "@sa-apps/utilities";
import type { ReactElement, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./useDraggableHeightHandle.module.scss";

type UseDraggableHeightHandleProps = {
	id: string;
	initialHeight: number;
	enabled: boolean;
	onMouseUp: (height: number) => void;
};

type UseDraggableHeightHandleReturn = {
	ResizeHandle: () => ReactElement;
	ResizeWrapper: (props: { children: ReactNode }) => ReactElement;
	height: number;
};

export const useDraggableHeightHandle = ({
	id,
	initialHeight,
	enabled,
	onMouseUp,
}: UseDraggableHeightHandleProps): UseDraggableHeightHandleReturn => {
	const [height, setHeight] = useState(initialHeight);
	const [dragging, setDragging] = useState(false);
	const dragYRef = useRef<number | null>(null);

	const ResizeHandle = (): ReactElement => {
		return (
			<div data-no-dnd={true} className={cn(styles.handleContainer, !enabled && styles.handleContainerHidden)}>
				<button
					type="button"
					id={`resize-handle-${id}`}
					className={cn(styles.handle, dragging ? styles.handleDragging : styles.handleIdle)}
					onMouseDown={handleMouseDown}
					onTouchStart={handleTouchStart}
				/>
			</div>
		);
	};

	const ResizeWrapper = useCallback(
		({ children }: { children: ReactNode }): ReactElement => <div className={styles.wrapper}>{children}</div>,
		[],
	);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (dragging && dragYRef.current !== null) {
				const deltaY = event.clientY - dragYRef.current;
				setHeight((prevHeight) => prevHeight + deltaY);
				dragYRef.current = event.clientY;
			}
		},
		[dragging],
	);

	const handleTouchMove = useCallback(
		(event: TouchEvent) => {
			if (dragging && dragYRef.current !== null) {
				const touch = event.touches[0];
				const deltaY = touch.clientY - dragYRef.current;
				setHeight((prevHeight) => prevHeight + deltaY);
				dragYRef.current = touch.clientY;
			}
		},
		[dragging],
	);

	const handleMouseDown = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (enabled && (event.target as HTMLButtonElement).id === `resize-handle-${id}`) {
				setDragging(true);
				dragYRef.current = event.clientY;
			}
		},
		[enabled, id],
	);

	const handleTouchStart = useCallback(
		(event: React.TouchEvent<HTMLButtonElement>) => {
			if (enabled && (event.target as HTMLButtonElement).id === `resize-handle-${id}`) {
				setDragging(true);
				const touch = event.touches[0];
				dragYRef.current = touch.clientY;
			}
		},
		[enabled, id],
	);

	const handleMouseUp = useCallback(() => {
		if (dragging) {
			setDragging(false);
			onMouseUp(height);
		}
	}, [dragging, height, onMouseUp]);

	const handleTouchEnd = useCallback(() => {
		if (dragging) {
			setDragging(false);
			onMouseUp(height);
		}
	}, [dragging, height, onMouseUp]);

	useEffect(() => {
		if (enabled) {
			window.document.addEventListener("mousemove", handleMouseMove);
			window.document.addEventListener("mouseup", handleMouseUp);
			window.document.addEventListener("touchmove", handleTouchMove);
			window.document.addEventListener("touchend", handleTouchEnd);
		}

		return () => {
			window.document.removeEventListener("mousemove", handleMouseMove);
			window.document.removeEventListener("mouseup", handleMouseUp);
			window.document.removeEventListener("touchmove", handleTouchMove);
			window.document.removeEventListener("touchend", handleTouchEnd);
		};
	}, [enabled, handleMouseMove, handleMouseUp, handleTouchEnd, handleTouchMove]);

	return { height, ResizeHandle, ResizeWrapper };
};
