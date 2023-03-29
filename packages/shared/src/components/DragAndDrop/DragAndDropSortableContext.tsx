import { ReactElement, ReactNode } from 'react';
import {
    DndContext,
    DragEndEvent as DndKitDragEndEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

export type DragEndEvent = DndKitDragEndEvent;
type ItemsArray = (
    | UniqueIdentifier
    | {
          id: UniqueIdentifier;
      }
)[];

type DragAndDropSortableContextProps = {
    items: ItemsArray;
    children: ReactNode;
    onDragEnd?: (event: DragEndEvent) => void;
};

export const DragAndDropSortableContext = ({
    items,
    children,
    onDragEnd,
}: DragAndDropSortableContextProps): ReactElement => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    );
};
DragAndDropSortableContext.displayName = 'SADragAndDropSortableContext';
