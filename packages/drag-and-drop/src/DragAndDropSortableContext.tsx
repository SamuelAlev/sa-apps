import type { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';
import type { DragEndEvent as DndKitDragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import {
    DndContext,
    KeyboardSensor as LibKeyboardSensor,
    MouseSensor as LibMouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    rectSwappingStrategy,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export type DragEndEvent = DndKitDragEndEvent;
type ItemsArray = (UniqueIdentifier | { id: UniqueIdentifier })[];

type DragAndDropSortableContextProps = {
    items: ItemsArray;
    children: ReactNode;
    strategy: keyof typeof sortingStrategy;
    onDragEnd?: (event: DragEndEvent) => void;
};

const sortingStrategy = {
    'vertical-list': verticalListSortingStrategy,
    'rect-swapping': rectSwappingStrategy,
};

export class MouseSensor extends LibMouseSensor {
    static activators = [
        {
            eventName: 'onMouseDown' as const,
            handler: ({ nativeEvent: event }: MouseEvent) => {
                return shouldHandleEvent(event.target as HTMLElement);
            },
        },
    ];
}

export class KeyboardSensor extends LibKeyboardSensor {
    static activators = [
        {
            eventName: 'onKeyDown' as const,
            handler: ({ nativeEvent: event }: KeyboardEvent<Element>) => {
                return shouldHandleEvent(event.target as HTMLElement);
            },
        },
    ];
}

function shouldHandleEvent(element: HTMLElement | null) {
    let cur = element;

    while (cur) {
        if (cur.dataset && cur.dataset.noDnd) {
            return false;
        }
        cur = cur.parentElement;
    }

    return true;
}

export const DragAndDropSortableContext = ({
    items,
    children,
    strategy,
    onDragEnd,
}: DragAndDropSortableContextProps): ReactElement => {
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={items} strategy={sortingStrategy[strategy]}>
                {children}
            </SortableContext>
        </DndContext>
    );
};
DragAndDropSortableContext.displayName = 'SADragAndDropSortableContext';
