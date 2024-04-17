import type { Asset } from '@frontify/app-bridge';
import { cn } from '@sa-apps/utilities';
import { prepareImageUrl } from './helpers';

type ContentTextViewProps = {
    assets?: Asset[];
    contentTexts?: string[];
    direction: 'horizontal' | 'vertical';
};

export const ContentAssetsView = ({ assets, contentTexts, direction }: ContentTextViewProps) => {
    return assets?.map((asset, index) => (
        <div key={asset.id} className={cn('flex h-[--height]', direction === 'horizontal' ? 'mx-6' : 'my-6')}>
            <img draggable={false} className="h-full flex-grow select-none overflow-hidden object-cover" src={prepareImageUrl(asset.previewUrl)} alt={contentTexts?.[index]} />
        </div>
    ));
};
