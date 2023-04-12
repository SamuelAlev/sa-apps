import { IconEnum, defineSettings } from '@frontify/guideline-themes';

export const settings = defineSettings({
    main: [
        {
            id: 'easy-docs',
            type: 'dropdown',
            defaultValue: 'easy-docs',
            size: 'large',
            disabled: true,
            choices: [
                {
                    value: 'easy-docs',
                    icon: IconEnum.Masonry,
                    label: 'EasyDocs',
                },
            ],
        },
    ],
});
