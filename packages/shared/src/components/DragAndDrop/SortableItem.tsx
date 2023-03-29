import { ReactElement, ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

type SortableItemProps = {
    id: string;
    children: ReactNode;
    disabled?: boolean;
};

export const SortableItem = ({ id, children, disabled }: SortableItemProps): ReactElement => {
    const { attributes, listeners, setNodeRef, transform, transition, setDraggableNodeRef } = useSortable({
        id,
        disabled,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="relative">
            <button
                ref={setDraggableNodeRef}
                {...attributes}
                {...listeners}
                disabled={disabled}
                className="disabled:hidden absolute -left-8 top-0 bottom-0 hover:cursor-grabactive:cursor-grabbing"
            >
                <GripVertical />
            </button>

            {children}
        </div>
    );
};
SortableItem.displayName = 'SASortableItem';
