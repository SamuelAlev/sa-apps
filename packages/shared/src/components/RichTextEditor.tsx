/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { RichTextEditor as FondueRichTextEditor } from '@frontify/fondue/dist/components/RichTextEditor/RichTextEditor.es.js';
//@ts-ignore
import { parseRawValue } from '@frontify/fondue/dist/components/RichTextEditor/Utils/parseRawValue.es.js';
//@ts-ignore
import { serializeRawToHtml } from '@frontify/fondue/dist/components/RichTextEditor/serializer/serializeToHtml.es.js';
//@ts-ignore
import { PluginComposer } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/PluginComposer.es.js';
//@ts-ignore
import { AlignCenterPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/AlignPlugin/AlignCenterPlugin/index.es.js';
//@ts-ignore
import { AlignLeftPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/AlignPlugin/AlignLeftPlugin/index.es.js';
//@ts-ignore
import { AlignRightPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/AlignPlugin/AlignRightPlugin/index.es.js';
//@ts-ignore
import { AlignJustifyPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/AlignPlugin/AlignJustifyPlugin/index.es.js';
//@ts-ignore
import { SoftBreakPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/SoftBreakPlugin/index.es.js';
//@ts-ignore
import { StrikethroughPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/StrikethroughPlugin/index.es.js';
//@ts-ignore
import { BoldPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/BoldPlugin/index.es.js';
//@ts-ignore
import { CheckboxListPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/CheckboxListPlugin/index.es.js';
//@ts-ignore
import { CodePlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/CodePlugin/index.es.js';
//@ts-ignore
import { EmojiPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/EmojiPlugin/index.es.js';
//@ts-ignore
import { ItalicPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/ItalicPlugin/index.es.js';
//@ts-ignore
import { LinkPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/LinkPlugin/index.es.js';
//@ts-ignore
import { UnderlinePlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/UnderlinePlugin/index.es.js';
//@ts-ignore
import { TextStylePlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/TextStylePlugin/index.es.js';
//@ts-ignore
import { ResetFormattingPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/ResetFormattingPlugin/index.es.js';
//@ts-ignore
import { ParagraphPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/ParagraphPlugin/index.es.js';
//@ts-ignore
import { OrderedListPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/ListPlugin/OrderedListPlugin/index.es.js';
//@ts-ignore
import { UnorderedListPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/ListPlugin/UnorderedListPlugin/index.es.js';
//@ts-ignore
import { ButtonPlugin } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/ButtonPlugin/createButtonPlugin.es.js';

import { ReactElement, useMemo } from 'react';

type RichTextEditorProps = {
    id: string;
    readonly?: boolean;
    designTokens?: any;
    content?: string;
    placeholder?: string;
    onTextChange?: (value: string) => void;
};

export const RichTextEditor = ({
    readonly = false,
    id,
    designTokens,
    content = '',
    placeholder = 'Enter your text...',
    onTextChange,
}: RichTextEditorProps): ReactElement => {
    const plugins = useMemo(() => {
        const pluginsComposer = new PluginComposer();
        pluginsComposer.setPlugin([new SoftBreakPlugin(), new ParagraphPlugin(), new TextStylePlugin()]);
        pluginsComposer.setPlugin([
            new BoldPlugin(),
            new ItalicPlugin(),
            new UnderlinePlugin(),
            new StrikethroughPlugin(),
            new LinkPlugin(),
            new ButtonPlugin(),
            new CodePlugin(),
        ]);
        pluginsComposer.setPlugin([
            new AlignLeftPlugin(),
            new AlignCenterPlugin(),
            new AlignRightPlugin(),
            new AlignJustifyPlugin(),
            new UnorderedListPlugin(),
            new CheckboxListPlugin(),
            new OrderedListPlugin(),
            new ResetFormattingPlugin(),
            new EmojiPlugin(),
        ]);
        return pluginsComposer;
    }, []);

    const rawValue = JSON.stringify(parseRawValue({ raw: content }));
    const html = serializeRawToHtml(rawValue, designTokens);

    return readonly ? (
        <div data-test-id="fondue-rich-text-editor-content" dangerouslySetInnerHTML={{ __html: html }} />
    ) : (
        <div onClick={(event) => !readonly && event.stopPropagation()} className="cursor-text">
            <FondueRichTextEditor
                id={id}
                designTokens={designTokens}
                value={content}
                border={false}
                placeholder={placeholder}
                onTextChange={onTextChange}
                onBlur={onTextChange}
                plugins={plugins}
            />
        </div>
    );
};
RichTextEditor.displayName = 'RichTextEditor';
