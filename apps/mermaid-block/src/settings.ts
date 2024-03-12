import { appendUnit, defineSettings, minimumPixelRule, numericalOrPixelRule } from '@frontify/guideline-blocks-settings';

export const MERMAID_FILE_ID = 'mermaid-file';

export const settings = defineSettings({
    main: [
        {
            id: 'mermaid',
            type: 'dropdown',
            defaultValue: 'mermaid',
            size: 'large',
            disabled: true,
            choices: [
                {
                    value: 'mermaid',
                    icon: 'Icon',
                    label: 'Mermaid',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'alwaysShowCode',
            type: 'switch',
            label: 'Always show code',
            defaultValue: false,
        },
        {
            id: 'displayShowCodeButton',
            type: 'switch',
            label: 'Show code button',
            defaultValue: false,
            show: (bundle) => bundle.getBlock('alwaysShowCode')?.value === false,
        },
    ],
    style: [
        {
            id: 'height',
            type: 'input',
            label: 'Height',
            defaultValue: '300px',
            rules: [numericalOrPixelRule, minimumPixelRule(0)],
        },
        {
            id: 'borderEnabled',
            label: 'Border',
            type: 'switch',
            defaultValue: false,
            on: [
                {
                    id: 'borderMultiInput',
                    type: 'multiInput',
                    onChange: (bundle) => appendUnit(bundle, 'borderWidth'),
                    lastItemFullWidth: true,
                    blocks: [
                        {
                            id: 'borderStyle',
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
                            id: 'borderWidth',
                            type: 'input',
                            defaultValue: '1px',
                            rules: [numericalOrPixelRule, minimumPixelRule(0)],
                            placeholder: '3px',
                        },
                        {
                            id: 'borderColor',
                            type: 'colorInput',
                            defaultValue: { r: 0, g: 0, b: 0, a: 1 },
                        },
                    ],
                },
            ],
            off: [],
        },
    ],
});
