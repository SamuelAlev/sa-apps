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
        {
            id: 'trackingInformation',
            type: 'notification',
            title: 'Tracking information',
            text: 'This theme anonymously tracks page views, print counts, and various emitted events. Your privacy is ensured as no personal data is collected.',
            styles: {
                type: 'info',
            },
        },
    ],
});
