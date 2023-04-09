import { ReactElement, ReactNode } from 'react';
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
                className="disabled:hidden absolute -left-8 top-0 bottom-0 hover:cursor-grab active:cursor-grabbing text-slate-700 hover:text-slate-800 active:text-slate-900"
            >
                <GripVertical />
            </button>

            {children}
        </div>
    );
};
VerticalItem.displayName = 'SAVerticalItem';
