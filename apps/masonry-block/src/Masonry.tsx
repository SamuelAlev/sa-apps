import { range } from '@sa-apps/utilities';
import type { ReactElement, ReactNode } from 'react';
import { Children } from 'react';

type MasonryProps = {
    columnCount: number;
    gap?: number | string;
    children: ReactNode;
};

export const Masonry = ({ columnCount, children }: MasonryProps): ReactElement => {
    const childrenArray = Children.toArray(children);

    return (
        <div className="flex gap-[var(--masonry-items-gap)]">
            {range(columnCount).map((columnIndex) => (
                <div key={columnIndex} className="flex flex-1 flex-col gap-[var(--masonry-items-gap)]">
                    {range(columnIndex, childrenArray.length, columnCount).map((itemIndex) => childrenArray[itemIndex])}
                </div>
            ))}
        </div>
    );
};
