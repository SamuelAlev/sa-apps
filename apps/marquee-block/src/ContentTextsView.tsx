import { cn } from '@sa-apps/utilities';

type ContentTextViewProps = {
    values?: string[];
    direction: 'horizontal' | 'vertical';
};

export const ContentTextsView = ({ values, direction }: ContentTextViewProps) => {
    return values?.map((value) => <span className={cn(direction === 'horizontal' ? 'mx-6' : 'my-6')}>{value}</span>);
};
