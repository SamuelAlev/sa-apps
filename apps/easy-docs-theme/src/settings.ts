import { IconEnum, createFooter, defineSettings } from '@frontify/guideline-themes';

import packageJson from '../package.json';
import manifestJson from '../manifest.json';

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
    informations: [
        {
            id: 'trackingInformationHeading',
            type: 'sectionHeading',
            label: 'Tracking information',
            blocks: [
                {
                    id: 'trackingInformation',
                    type: 'notification',
                    text: 'This theme anonymously tracks page views, print counts, and various emitted events. Your privacy is ensured as no personal data is collected.',
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
            label: 'Theme version',
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
