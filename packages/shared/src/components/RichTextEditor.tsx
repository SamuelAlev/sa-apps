import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    ButtonPlugin,
    CheckboxListPlugin,
    CodePlugin,
    EmojiPlugin,
    RichTextEditor as FondueRichTextEditor,
    ItalicPlugin,
    LinkPlugin,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
    parseRawValue,
    serializeRawToHtml,
} from '@frontify/fondue';
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
        <div onClick={(event) => !readonly && event.stopPropagation()}>
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
