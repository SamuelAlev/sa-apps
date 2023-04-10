import {
    IconEnum,
    appendUnit,
    defineSettings,
    minimumNumericRule,
    minimumPixelRule,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
    main: [
        {
            id: 'masonry',
            type: 'dropdown',
            defaultValue: 'masonry',
            size: 'large',
            disabled: true,
            choices: [
                {
                    value: 'masonry',
                    icon: IconEnum.Masonry,
                    label: 'Masonry',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'columnsLayoutSection',
            type: 'sectionHeading',
            label: 'Columns',
            blocks: [
                {
                    id: 'columnsCountCustomEnabled',
                    type: 'switch',
                    label: 'Columns count',
                    switchLabel: 'Custom',
                    on: [
                        {
                            id: 'columnsCountCustom',
                            type: 'input',
                            placeholder: '2',
                            defaultValue: '2',
                            rules: [minimumNumericRule(0)],
                        },
                    ],
                    off: [
                        {
                            id: 'columnsCountSimple',
                            type: 'slider',
                            defaultValue: '2',
                            choices: [
                                { value: '1', label: '1' },
                                { value: '2', label: '2' },
                                { value: '3', label: '3' },
                            ],
                        },
                    ],
                },
            ],
        },
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
            id: 'itemContentLayoutSection',
            type: 'sectionHeading',
            label: 'Content',
            blocks: [
                {
                    id: 'itemContentPosition',
                    type: 'slider',
                    label: 'Text position',
                    defaultValue: 'bottom',
                    choices: [
                        { value: 'top', icon: IconEnum.ArrowAlignUp },
                        { value: 'bottom', icon: IconEnum.ArrowAlignDown },
                    ],
                },
                {
                    id: 'itemContentPaddingMultiInput',
                    type: 'multiInput',
                    layout: 'spider',
                    label: 'Padding',
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
        },
    ],
    style: [
        {
            id: 'itemsStyleSection',
            type: 'sectionHeading',
            label: 'Items',
            blocks: [
                {
                    id: 'itemsVideoAutoPlayEnabled',
                    label: 'Auto play videos',
                    type: 'switch',
                    defaultValue: true,
                },
                {
                    id: 'itemsVideoLoopEnabled',
                    label: 'Loop videos',
                    type: 'switch',
                    defaultValue: true,
                },
                {
                    id: 'itemsVideoControlsEnabled',
                    label: 'Show video controls',
                    type: 'switch',
                    defaultValue: false,
                },
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
                {
                    id: 'itemsCornerRadiusCustomEnabled',
                    label: 'Corner radius',
                    type: 'switch',
                    defaultValue: false,
                    switchLabel: 'Custom',
                    on: [
                        {
                            id: 'itemsCornerRadiusMultiInput',
                            type: 'multiInput',
                            blocks: [
                                {
                                    id: 'itemsCornerRadiusCustomTopLeft',
                                    type: 'input',
                                    label: 'Top',
                                    placeholder: '8px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemsCornerRadiusTopLeft'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                                {
                                    id: 'itemsCornerRadiusCustomTopRight',
                                    type: 'input',
                                    label: 'Left',
                                    placeholder: '8px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemsCornerRadiusCustomTopRight'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                                {
                                    id: 'itemsCornerRadiusCustomBottomLeft',
                                    type: 'input',
                                    label: 'Right',
                                    placeholder: '8px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemsCornerRadiusCustomBottomLeft'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                                {
                                    id: 'itemsCornerRadiusCustomBottomRight',
                                    type: 'input',
                                    label: 'Bottom',
                                    placeholder: '8px',
                                    onChange: (bundle) => appendUnit(bundle, 'itemsCornerRadiusCustomBottomRight'),
                                    rules: [numericalOrPixelRule, minimumPixelRule(0)],
                                },
                            ],
                        },
                    ],
                    off: [
                        {
                            id: 'itemsCornerRadiusSimple',
                            type: 'slider',
                            defaultValue: '8px',
                            choices: [
                                { value: '0px', label: 'None' },
                                { value: '4px', label: 'S' },
                                { value: '8px', label: 'M' },
                                { value: '12px', label: 'L' },
                            ],
                        },
                    ],
                },
                {
                    id: 'itemsBoxShadow',
                    type: 'slider',
                    label: 'Box shadow',
                    defaultValue: 'medium',
                    choices: [
                        { value: 'none', label: 'None' },
                        { value: 'small', label: 'S' },
                        { value: 'medium', label: 'M' },
                        { value: 'large', label: 'L' },
                    ],
                },
            ],
        },
    ],
});
