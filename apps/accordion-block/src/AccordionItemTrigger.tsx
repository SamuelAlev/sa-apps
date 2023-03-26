import { ReactElement } from 'react';
import { ChevronRight } from 'lucide-react';

import type { AccordionItemTriggerProps } from './types';

const PlusMinusIcon = (): ReactElement => {
    return (
        <div>
            <svg
                className="max-w-[var(--accordion-trigger-size)] w-[var(--accordion-trigger-size)] max-h-[var(--accordion-trigger-size)] h-[var(--accordion-trigger-size)] stroke-[number:var(--accordion-trigger-thickness)]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line
                    className="group-[[data-state='open']]/trigger:rotate-90 origin-center transition-transform duration-500 ease-out motion-reduce:transition-none"
                    x1="12"
                    y1="5"
                    x2="12"
                    y2="19"
                />

                <line
                    className="group-[[data-state='open']]/trigger:opacity-0 transition-opacity ease-out group-[[data-state='open']]/trigger:ease-in duration-300 motion-reduce:transition-none"
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                />
            </svg>
        </div>
    );
};

export const AccordionItemTrigger = ({ icon }: AccordionItemTriggerProps): ReactElement => {
    return (
        <>
            {icon === 'plus' && <PlusMinusIcon />}

            {icon === 'chevron-right' && (
                <ChevronRight
                    className="max-w-[var(--accordion-trigger-size)] w-[var(--accordion-trigger-size)] max-h-[var(--accordion-trigger-size)] h-[var(--accordion-trigger-size)] group-[[data-state='open']]/trigger:rotate-90 transition-transform ease-out motion-reduce:transition-none stroke-[number:var(--accordion-trigger-thickness)]"
                    aria-hidden
                />
            )}

            {icon === 'chevron-left' && (
                <ChevronRight
                    className="max-w-[var(--accordion-trigger-size)] w-[var(--accordion-trigger-size)] max-h-[var(--accordion-trigger-size)] h-[var(--accordion-trigger-size)] rotate-180 group-[[data-state='open']]/trigger:rotate-90 transition-transform ease-out motion-reduce:transition-none stroke-[number:var(--accordion-trigger-thickness)]"
                    aria-hidden
                />
            )}
        </>
    );
};
