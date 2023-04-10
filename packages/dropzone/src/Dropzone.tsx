import { ChangeEvent, forwardRef, useRef } from 'react';
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
                className="flex w-full h-[calc(100%-16px)] bg-gray-100 border border-gray-300 border-dashed rounded-2xl m-2 overflow-hidden"
                {...props}
            >
                <input type="file" className="hidden" onChange={props.onUploadClick} ref={fileInput} />
                <button
                    className="w-full flex items-center justify-center rounded-2xl gap-2 text-slate-800 hover:text-slate-900 active:text-slate-950 m-4 hover:bg-gray-200/75 active:bg-gray-200 transition-colors ease-out duration-300"
                    onClick={handleClick}
                    aria-label={t('upload')}
                >
                    <Upload size={20} />
                    {t('upload')}
                </button>

                <div className="w-px my-4 border-r border-r-gray-300" />

                <button
                    className="w-full flex items-center justify-center rounded-2xl gap-2 text-slate-800 hover:text-slate-900 active:text-slate-950 m-4 hover:bg-gray-200/75 active:bg-gray-200 transition-colors ease-out duration-300"
                    onClick={props.onBrowseAssetClick}
                    aria-label={t('browse')}
                >
                    <Album size={20} />
                    {t('browse')}
                </button>
            </div>
        );
    })
);
