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
});
