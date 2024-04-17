import { cn } from '@sa-apps/utilities';

type ContentTextViewProps = {
    contentTexts?: string[];
    direction: 'horizontal' | 'vertical';
};

export const ContentTextsView = ({ contentTexts, direction }: ContentTextViewProps) => {
    // biome-ignore lint/correctness/useJsxKeyInIterable: no proper key
    return contentTexts?.map((contentText) => <span className={cn(direction === 'horizontal' ? 'mx-6' : 'my-6')}>{contentText}</span>);
};
