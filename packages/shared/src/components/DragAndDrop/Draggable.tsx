import { ReactElement } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Menu } from 'lucide-react';

type DraggableProps = {
    id: string;
    children: ReactElement | ReactElement[];
    disabled?: boolean;
};

export const Draggable = ({ id, children, disabled }: DraggableProps): ReactElement => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        disabled,
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div ref={setNodeRef} style={style} className="flex gap-2 items-center">
            {!disabled && (
                <button {...listeners} {...attributes} className="flex items-center h-full">
                    <Menu />
                </button>
            )}

            {children}
        </div>
    );
};
