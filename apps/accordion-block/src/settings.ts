import { DropdownSize, IconEnum, defineSettings, minimumPixelRule } from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
    main: [
        {
            id: 'accordion',
            type: 'dropdown',
            defaultValue: 'accordion',
            size: DropdownSize.Large,
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
    basics: [{ id: 'accordionMultiple', type: 'switch', label: 'Allow multiple items open', defaultValue: false }],
    layout: [
        {
            id: 'gapCustomEnabled',
            type: 'switch',
            label: 'Gap',
            switchLabel: 'Custom',
            on: [{ id: 'gapCustom', type: 'input', placeholder: '4px', rules: [minimumPixelRule(0)] }],
            off: [
                {
                    id: 'gapSimple',
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
    style: [
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
                    on: [{ id: 'triggerSizeCustom', type: 'input', placeholder: '16px', rules: [minimumPixelRule(0)] }],
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
                    id: 'triggerThicknessCustomEnabled',
                    type: 'switch',
                    label: 'Thickness',
                    switchLabel: 'Custom',
                    on: [
                        {
                            id: 'triggerThicknessCustom',
                            type: 'input',
                            placeholder: '2px',
                            rules: [minimumPixelRule(0)],
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
});
