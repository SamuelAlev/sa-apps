import { RichTextEditor as FondueRichTextEditor } from '@frontify/fondue';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { cn } from '@sa-apps/utilities';
import { type AppBridgeBlock } from '@frontify/app-bridge';
import { getPlugins } from './getPlugins';

type RichTextEditorProps = {
    appBridge: AppBridgeBlock;
    id: string;
    readonly?: boolean;
    content?: string;
    placeholder?: string;
    onTextChange?: (value: string) => void;
};

export const RichTextEditor = ({
    appBridge,
    id,
    readonly = false,
    content = '',
    placeholder = 'Enter your text...',
    onTextChange,
}: RichTextEditorProps): ReactElement => {
    const plugins = useMemo(() => getPlugins(appBridge), [appBridge]);

    return (
        <div
            data-no-dnd={true}
            onClick={(event) => !readonly && event.stopPropagation()}
            className={cn(!readonly && 'cursor-text', 'w-full items-start [&]:text-left')}
        >
            <FondueRichTextEditor
                id={id}
                readonly={readonly}
                value={content}
                plugins={plugins}
                placeholder={placeholder}
                onTextChange={onTextChange}
                onBlur={onTextChange}
                border={false}
            />
        </div>
    );
};
RichTextEditor.displayName = 'SARichTextEditor';
