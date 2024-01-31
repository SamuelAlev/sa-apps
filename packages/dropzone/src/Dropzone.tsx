import type { ChangeEvent } from 'react';
import { forwardRef, useRef } from 'react';
import { Album, Upload } from 'lucide-react';
import { useTranslations, withTranslations } from '@sa-apps/i18n';

import { messages } from './i18n';

type DropzoneProps = {
    onUploadClick: (event: ChangeEvent<HTMLInputElement>) => void;
    onBrowseAssetClick: () => void;
};

export const Dropzone = withTranslations(messages)(
    // eslint-disable-next-line prefer-arrow-callback
    forwardRef<HTMLDivElement, DropzoneProps>(function SADropzone(props, ref) {
        const { t } = useTranslations();
        const fileInput = useRef<HTMLInputElement>(null);

        const handleClick = () => fileInput.current?.click();

        return (
            <div
                ref={ref}
                className="m-2 flex h-[calc(100%-16px)] w-full overflow-hidden rounded-2xl border border-dashed border-border bg-gray-100"
                {...props}
            >
                <input type="file" className="hidden" onChange={props.onUploadClick} ref={fileInput} />
                <button
                    className="m-4 flex w-full items-center justify-center gap-2 rounded-2xl text-slate-800 transition-colors duration-300 ease-out hover:bg-gray-200/75 hover:text-slate-900 active:bg-gray-200 active:text-slate-950"
                    onClick={handleClick}
                    aria-label={t('upload')}
                >
                    <Upload size={20} />
                    {t('upload')}
                </button>

                <div className="my-4 w-px border-r border-r-gray-300" />

                <button
                    className="m-4 flex w-full items-center justify-center gap-2 rounded-2xl text-slate-800 transition-colors duration-300 ease-out hover:bg-gray-200/75 hover:text-slate-900 active:bg-gray-200 active:text-slate-950"
                    onClick={props.onBrowseAssetClick}
                    aria-label={t('browse')}
                >
                    <Album size={20} />
                    {t('browse')}
                </button>
            </div>
        );
    }),
);
