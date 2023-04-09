import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@sa-apps/utilities';

type SwappableItemProps = {
    id: string;
    children: ReactNode;
    disabled?: boolean;
};

export const SwappableItem = ({ id, children, disabled }: SwappableItemProps) => {
    const { active, attributes, isDragging, isOver, listeners, over, setNodeRef, transform, transition } = useSortable({
        id,
        disabled,
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                transition,
                transform: isDragging ? CSS.Translate.toString(transform) : undefined,
                opacity: isOver && over?.id !== active?.id ? 0.5 : 1,
            }}
            {...attributes}
            {...listeners}
            className={cn(disabled ? 'cursor-auto' : 'cursor-grab active:cursor-grabbing')}
        >
            {children}
        </div>
    );
};
SwappableItem.displayName = 'SASwappableItem';
