import { IconEnum, appendUnit, createFooter, defineSettings, minimumPixelRule, numericalOrPixelRule } from '@frontify/guideline-blocks-settings';

import manifestJson from '../manifest.json';
import packageJson from '../package.json';

export const settings = defineSettings({
    main: [
        {
            id: 'accordion',
            type: 'dropdown',
            defaultValue: 'accordion',
            size: 'large',
            disabled: true,
            choices: [
                {
                    value: 'accordion',
                    icon: IconEnum.StackVertical,
                    label: 'Accordion',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'accordionMultiple',
            type: 'switch',
            label: 'Allow multiple items open',
            defaultValue: false,
        },
    ],
    layout: [
        {
            id: 'itemsLayoutSection',
            type: 'sectionHeading',
            label: 'Items',
            blocks: [
                {
                    id: 'itemsGapCustomEnabled',
                    type: 'switch',
                    label: 'Gap',
                    switchLabel: 'Custom',
                    on: [
                        {
                            id: 'itemsGapCustom',
                            type: 'input',
                            placeholder: '4px',
                            onChange: (bundle) => appendUnit(bundle, 'triggerThicknessCustom'),
                            rules: [numericalOrPixelRule, minimumPixelRule(0)],
                        },
                    ],
                    off: [
                        {
                            id: 'itemsGapSimple',
                            type: 'slider',
                            defaultValue: '16px',
                            choices: [
                                { value: '0px', label: 'None' },
                                { value: '8px', label: 'S' },
                                { value: '16px', label: 'M' },
                                { value: '24px', label: 'L' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'itemHeadingSection',
            type: 'sectionHeading',
            label: 'Heading',
            blocks: [
                {
                    id: 'itemHeadingPaddingCustomEnabled',
                    type: 'switch',
                    defaultValue: false,
                    switchLabel: 'Custom',
                    label: 'Padding',
                    on: [
                        {
                            id: 'itemHeadingPaddingMultiInput',
                            type: 'multiInput',
                            layout: 'spider',
                            blocks: [
                                {
                                    id: 'itemHeadingPaddingTop',
                                    type: 'input',
                                    label: 'Top',
                                    placeholder: '12px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemHeadingPaddingTop'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                                {
                                    id: 'itemHeadingPaddingLeft',
                                    type: 'input',
                                    label: 'Left',
                                    placeholder: '8px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemHeadingPaddingLeft'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                                {
                                    id: 'itemHeadingPaddingRight',
                                    type: 'input',
                                    label: 'Right',
                                    placeholder: '8px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemHeadingPaddingRight'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                                {
                                    id: 'itemHeadingPaddingBottom',
                                    type: 'input',
                                    label: 'Bottom',
                                    placeholder: '12px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemHeadingPaddingBottom'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                            ],
                        },
                    ],
                    off: [
                        {
                            id: 'itemHeadingPaddingSimple',
                            type: 'segmentedControls',
                            defaultValue: '32px',
                            choices: [
                                { value: '0px', label: 'None' },
                                { value: '12px', label: 'S' },
                                { value: '24px', label: 'M' },
                                { value: '32px', label: 'L' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'itemContentLayoutSection',
            type: 'sectionHeading',
            label: 'Content',
            blocks: [
                {
                    id: 'itemContentPaddingCustomEnabled',
                    type: 'switch',
                    defaultValue: false,
                    switchLabel: 'Custom',
                    label: 'Padding',
                    on: [
                        {
                            id: 'itemContentPaddingMultiInput',
                            type: 'multiInput',
                            layout: 'spider',
                            blocks: [
                                {
                                    id: 'itemContentPaddingTop',
                                    type: 'input',
                                    label: 'Top',
                                    placeholder: '12px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemContentPaddingTop'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                                {
                                    id: 'itemContentPaddingLeft',
                                    type: 'input',
                                    label: 'Left',
                                    placeholder: '8px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemContentPaddingLeft'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                                {
                                    id: 'itemContentPaddingRight',
                                    type: 'input',
                                    label: 'Right',
                                    placeholder: '8px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemContentPaddingRight'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                                {
                                    id: 'itemContentPaddingBottom',
                                    type: 'input',
                                    label: 'Bottom',
                                    placeholder: '12px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemContentPaddingBottom'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                            ],
                        },
                    ],
                    off: [
                        {
                            id: 'itemContentPaddingSimple',
                            type: 'segmentedControls',
                            defaultValue: '32px',
                            choices: [
                                { value: '0px', label: 'None' },
                                { value: '12px', label: 'S' },
                                { value: '24px', label: 'M' },
                                { value: '32px', label: 'L' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'itemsStyleSection',
            type: 'sectionHeading',
            label: 'Items',
            blocks: [
                {
                    id: 'itemsBorderEnabled',
                    label: 'Border',
                    type: 'switch',
                    defaultValue: false,
                    on: [
                        {
                            id: 'itemsBorderMultiInput',
                            type: 'multiInput',
                            onChange: (bundle) => appendUnit(bundle, 'itemsBorderWidth'),
                            lastItemFullWidth: true,
                            blocks: [
                                {
                                    id: 'itemsBorderStyle',
                                    type: 'dropdown',
                                    defaultValue: 'solid',
                                    choices: [
                                        {
                                            value: 'solid',
                                            label: 'Solid',
                                        },
                                        {
                                            value: 'dotted',
                                            label: 'Dotted',
                                        },
                                        {
                                            value: 'dashed',
                                            label: 'Dashed',
                                        },
                                    ],
                                },
                                {
                                    id: 'itemsBorderWidth',
                                    type: 'input',
                                    defaultValue: '1px',
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                    placeholder: '3px',
                                },
                                {
                                    id: 'itemsBorderColor',
                                    type: 'colorInput',
                                    defaultValue: { r: 0, g: 0, b: 0, a: 1 },
                                },
                            ],
                        },
                    ],
                    off: [],
                },
            ],
        },
        {
            id: 'triggerSection',
            type: 'sectionHeading',
            label: 'Trigger',
            blocks: [
                {
                    id: 'triggerIcon',
                    type: 'slider',
                    defaultValue: 'plus',
                    choices: [
                        { value: 'plus', label: 'Plus' },
                        { value: 'chevron-right', label: 'Right' },
                        { value: 'chevron-left', label: 'Left' },
                    ],
                },
                {
                    id: 'triggerDirection',
                    type: 'slider',
                    label: 'Position',
                    defaultValue: 'right',
                    info: 'The direction of the trigger icon will be reversed when the text is right to left.',
                    choices: [
                        { value: 'left', label: 'Left' },
                        { value: 'right', label: 'Right' },
                    ],
                },
                {
                    id: 'triggerSizeCustomEnabled',
                    type: 'switch',
                    label: 'Size',
                    switchLabel: 'Custom',
                    on: [
                        {
                            id: 'triggerSizeCustom',
                            type: 'input',
                            placeholder: '16px',
                            rules: [minimumPixelRule(0)],
                        },
                    ],
                    off: [
                        {
                            id: 'triggerSizeSimple',
                            type: 'slider',
                            defaultValue: '16px',
                            choices: [
                                { value: '16px', label: 'S' },
                                { value: '24px', label: 'M' },
                                { value: '32px', label: 'L' },
                            ],
                        },
                    ],
                },
                {
                    id: 'triggerBorderEnabled',
                    label: 'Border',
                    type: 'switch',
                    defaultValue: false,
                    on: [
                        {
                            id: 'triggerBorderMultiInput',
                            type: 'multiInput',
                            onChange: (bundle) => appendUnit(bundle, 'triggerBorderWidth'),
                            lastItemFullWidth: true,
                            blocks: [
                                {
                                    id: 'triggerBorderStyle',
                                    type: 'dropdown',
                                    defaultValue: 'solid',
                                    choices: [
                                        {
                                            value: 'solid',
                                            label: 'Solid',
                                        },
                                        {
                                            value: 'dotted',
                                            label: 'Dotted',
                                        },
                                        {
                                            value: 'dashed',
                                            label: 'Dashed',
                                        },
                                    ],
                                },
                                {
                                    id: 'triggerBorderWidth',
                                    type: 'input',
                                    defaultValue: '1px',
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                    placeholder: '3px',
                                },
                                {
                                    id: 'triggerBorderColor',
                                    type: 'colorInput',
                                    defaultValue: { r: 0, g: 0, b: 0, a: 1 },
                                },
                            ],
                        },
                    ],
                    off: [],
                },
                {
                    id: 'triggerThicknessCustomEnabled',
                    type: 'switch',
                    label: 'Thickness',
                    switchLabel: 'Custom',
                    on: [
                        {
                            id: 'triggerThicknessCustom',
                            type: 'input',
                            placeholder: '2px',
                            onChange: (bundle) => appendUnit(bundle, 'triggerThicknessCustom'),
                            rules: [numericalOrPixelRule, minimumPixelRule(0)],
                        },
                    ],
                    off: [
                        {
                            id: 'triggerThicknessSimple',
                            type: 'slider',
                            defaultValue: '2px',
                            choices: [
                                { value: '1px', label: 'S' },
                                { value: '2px', label: 'M' },
                                { value: '4px', label: 'L' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    informations: [
        {
            id: 'trackingInformationHeading',
            type: 'sectionHeading',
            label: 'Tracking information',
            blocks: [
                {
                    id: 'trackingInformation',
                    type: 'notification',
                    text: 'This block anonymously tracks page views, print counts, and various emitted events. Your privacy is ensured as no personal data is collected.',
                    styles: {
                        type: 'info',
                    },
                },
            ],
        },
        {
            id: 'versionInformationHeading',
            type: 'sectionHeading',
            label: 'Marketplace link',
            blocks: [
                {
                    id: 'versionInformation',
                    type: 'notification',
                    footer: createFooter({
                        label: 'View on Marketplace',
                        href: `${window.location.origin}/marketplace/app/${manifestJson.appId}`,
                    }),
                    styles: {
                        type: 'info',
                    },
                },
            ],
        },
        {
            id: 'versionInformationHeading',
            type: 'sectionHeading',
            label: 'Block version',
            blocks: [
                {
                    id: 'versionInformation',
                    type: 'notification',
                    text: packageJson.version,
                    styles: {
                        type: 'info',
                    },
                },
            ],
        },
    ],
});
