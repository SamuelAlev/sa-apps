import type { Asset } from '@frontify/app-bridge';
import { cn } from '@sa-apps/utilities';
import { prepareImageUrl } from './helpers';

type ContentTextViewProps = {
    values?: Asset[];
    direction: 'horizontal' | 'vertical';
};

export const ContentAssetsView = ({ values, direction }: ContentTextViewProps) => {
    return values?.map((value) => (
        <div className={cn('flex h-[--height]', direction === 'horizontal' ? 'mx-6' : 'my-6')}>
            <img draggable={false} className="h-full flex-grow select-none overflow-hidden object-cover" src={prepareImageUrl(value.previewUrl)} alt="TODO" />
        </div>
    ));
};
