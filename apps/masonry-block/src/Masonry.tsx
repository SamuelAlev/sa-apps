import { Children, ReactElement, ReactNode } from 'react';

import { range } from './utilities';

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
                <div key={columnIndex} className="flex flex-col flex-1 gap-[var(--masonry-items-gap)]">
                    {range(columnIndex, childrenArray.length, columnCount).map((itemIndex) => childrenArray[itemIndex])}
                </div>
            ))}
        </div>
    );
};
