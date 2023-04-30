import type { ReactElement, ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

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
        <div ref={setNodeRef} style={style} className="relative">
            <button
                ref={setDraggableNodeRef}
                {...attributes}
                {...listeners}
                disabled={disabled}
                className="absolute inset-y-0 -left-8 text-slate-700 hover:cursor-grab hover:text-slate-800 active:cursor-grabbing active:text-slate-900 disabled:hidden"
            >
                <GripVertical />
            </button>

            {children}
        </div>
    );
};
VerticalItem.displayName = 'SAVerticalItem';
