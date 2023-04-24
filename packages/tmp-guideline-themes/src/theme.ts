import type { FC } from 'react';
import type { AppBridgeTheme } from '@frontify/app-bridge';
import type {
    AssetInputBlock as AssetInputBlockSidebarSettings,
    BaseBlock as BaseBlockSidebarSettings,
    Bundle as BundleSidebarSettings,
    ChecklistBlock as ChecklistBlockSidebarSettings,
    ChoicesType as ChoicesTypeSidebarSettings,
    ColorInputBlock as ColorInputBlockSidebarSettings,
    DropdownBlock as DropdownBlockSidebarSettings,
    DynamicSettingBlock as DynamicSettingBlockSidebarSettings,
    DynamicSupportedBlock as DynamicSupportedBlockSidebarSettings,
    InputBlock as InputBlockSidebarSettings,
    LegacyAssetInputBlock as LegacyAssetInputBlockSidebarSettings,
    LinkChooserBlock as LinkChooserBlockSidebarSettings,
    MultiInputBlock as MultiInputBlockSidebarSettings,
    NotificationBlock as NotificationBlockSidebarSettings,
    SectionHeadingBlock as SectionHeadingBlockSidebarSettings,
    SegmentedControlsBlock as SegmentedControlsBlockSidebarSettings,
    SettingBlock as SettingBlockSidebarSettings,
    SimpleSettingBlock as SimpleSettingBlockSidebarSettings,
    SwitchBlock as SwitchBlockSidebarSettings,
    TemplateInputBlock as TemplateInputBlockSidebarSettings,
    TextareaBlock as TextareaBlockSidebarSettings,
    ValueOrPromisedValue as ValueOrPromisedValueSidebarSettings,
} from '@frontify/sidebar-settings';

export * from '@frontify/sidebar-settings';

export type AssetInputBlock = AssetInputBlockSidebarSettings<AppBridgeTheme>;
export type BaseBlock<T = undefined> = BaseBlockSidebarSettings<AppBridgeTheme, T>;
export type Bundle = BundleSidebarSettings<AppBridgeTheme>;
export type ChecklistBlock = ChecklistBlockSidebarSettings<AppBridgeTheme>;
export type ChoicesType = ChoicesTypeSidebarSettings<AppBridgeTheme>;
export type ColorInputBlock = ColorInputBlockSidebarSettings<AppBridgeTheme>;
export type DropdownBlock = DropdownBlockSidebarSettings<AppBridgeTheme>;
export type DynamicSettingBlock<Block extends DynamicSupportedBlock = DynamicSupportedBlock> =
    DynamicSettingBlockSidebarSettings<AppBridgeTheme, Block>;
export type DynamicSupportedBlock = DynamicSupportedBlockSidebarSettings<AppBridgeTheme>;
export type InputBlock = InputBlockSidebarSettings<AppBridgeTheme>;
export type LegacyAssetInputBlock = LegacyAssetInputBlockSidebarSettings<AppBridgeTheme>;
export type LinkChooserBlock = LinkChooserBlockSidebarSettings<AppBridgeTheme>;
export type MultiInputBlock = MultiInputBlockSidebarSettings<AppBridgeTheme>;
export type NotificationBlock = NotificationBlockSidebarSettings<AppBridgeTheme>;
export type SectionHeadingBlock = SectionHeadingBlockSidebarSettings<AppBridgeTheme>;
export type SegmentedControlsBlock = SegmentedControlsBlockSidebarSettings<AppBridgeTheme>;
export type SettingBlock = SettingBlockSidebarSettings<AppBridgeTheme>;
export type SimpleSettingBlock = SimpleSettingBlockSidebarSettings<AppBridgeTheme>;
export type SwitchBlock = SwitchBlockSidebarSettings<AppBridgeTheme>;
export type TemplateInputBlock = TemplateInputBlockSidebarSettings<AppBridgeTheme>;
export type TextareaBlock = TextareaBlockSidebarSettings<AppBridgeTheme>;
export type ValueOrPromisedValue<T> = ValueOrPromisedValueSidebarSettings<AppBridgeTheme, T>;

type FrontifyRouter = { navigate: (path: string) => void };
type FrontifyContext = { templateId?: string } & (
    | { documentPageId: number; documentId: number; template: 'documentPage' }
    | { documentId: number; template: 'library' }
    | { template: 'cover' }
);

export type ThemeSettingsStructureExport = { [customSectionName: string]: SettingBlock[] };

export type ThemeProps = {
    appBridge: AppBridgeTheme;
    Content: FC;
    router: FrontifyRouter;
    context: FrontifyContext;
};

export type ThemeTemplateExport = {
    component: FC<ThemeProps>;
    settings: ThemeSettingsStructureExport;
};

export type ThemeConfigExport = {
    templates: {
        cover: { default: ThemeTemplateExport } & Record<string, ThemeTemplateExport>;
        documentPage: { default: ThemeTemplateExport } & Record<string, ThemeTemplateExport>;
        library: { default: ThemeTemplateExport } & Record<string, ThemeTemplateExport>;
    };
};

/**
 * Type helper to make it easier to export a theme, accepts a direct {@link ThemeConfigExport} object.
 */
export const defineTheme = (config: ThemeConfigExport): ThemeConfigExport => config;

/**
 * Type helper to make it easier to export theme's settings structure, accepts a direct {@link ThemeSettingsStructureExport} object.
 */
export const defineSettings = (settingsStructure: ThemeSettingsStructureExport): ThemeSettingsStructureExport =>
    settingsStructure;
