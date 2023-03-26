import { ReactElement } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

type DragAndDropContextProps = {
    children: ReactElement | ReactElement[];
    onDragEnd?: (event: DragEndEvent) => void;
};

export const DragAndDropContext = ({ children, onDragEnd }: DragAndDropContextProps): ReactElement => {
    return <DndContext onDragEnd={onDragEnd}>{children}</DndContext>;
};
