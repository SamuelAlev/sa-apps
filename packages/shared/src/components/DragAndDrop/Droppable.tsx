import { ReactElement } from 'react';
import { useDroppable } from '@dnd-kit/core';

type DroppableProps = {
    id: string;
    children: ReactElement | ReactElement[];
    disabled?: boolean;
};

export const Droppable = ({ id, children, disabled }: DroppableProps): ReactElement => {
    const { isOver, setNodeRef } = useDroppable({
        id,
        disabled,
    });

    return (
        <div ref={setNodeRef}>
            {children}
            <div className={`transition-[height] ease-in ${isOver ? 'h-[20px] border' : 'h-0'}`}></div>
        </div>
    );
};
