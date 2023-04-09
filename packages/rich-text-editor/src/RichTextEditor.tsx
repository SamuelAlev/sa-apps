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
} from '@frontify/fondue';
import { ReactElement, useMemo } from 'react';
import { cn } from '@sa-apps/utilities';

type RichTextEditorProps = {
    id: string;
    readonly?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    designTokens?: any;
    content?: string;
    placeholder?: string;
    onTextChange?: (value: string) => void;
};

export const RichTextEditor = ({
    readonly = false,
    id,
    // designTokens,
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

    return (
        <div
            data-no-dnd={true}
            onClick={(event) => !readonly && event.stopPropagation()}
            className={cn(!readonly && 'cursor-text', 'w-full items-start [&]:text-left')}
        >
            <FondueRichTextEditor
                readonly={readonly}
                id={id}
                // designTokens={designTokens}
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
RichTextEditor.displayName = 'SARichTextEditor';
