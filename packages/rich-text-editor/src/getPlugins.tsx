import type { AppBridgeBlock } from '@frontify/app-bridge';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    AutoformatPlugin,
    BoldPlugin,
    CheckboxListPlugin,
    CodePlugin,
    ItalicPlugin,
    OrderedListPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';
import { ButtonPlugin, LinkPlugin, TextStylePluginsWithoutImage, TextStylesWithoutImage } from '@frontify/guideline-blocks-settings';

export const getPlugins = (appBridge: AppBridgeBlock): PluginComposer => {
    const plugins = new PluginComposer();

    plugins.setPlugin([
        new SoftBreakPlugin(),
        new TextStylePlugin({
            textStyles: TextStylePluginsWithoutImage,
        }),
    ]);

    plugins.setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        // @ts-expect-error version missmatch?
        new LinkPlugin({ appBridge }),
        // @ts-expect-error version missmatch?
        new ButtonPlugin({ appBridge }),
        new CodePlugin(),
    ]);

    plugins.setPlugin([
        new AlignLeftPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new AlignCenterPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new AlignRightPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new AlignJustifyPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new UnorderedListPlugin(),
        new CheckboxListPlugin(),
        new OrderedListPlugin(),
        new ResetFormattingPlugin(),
        new AutoformatPlugin(),
    ]);

    return plugins;
};
