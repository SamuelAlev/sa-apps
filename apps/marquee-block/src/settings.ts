import { appendUnit, createFooter, defineSettings, minimumPixelRule, numericalOrPixelRule } from '@frontify/guideline-blocks-settings';

import packageJson from '../package.json';
import manifestJson from '../manifest.json';

export const settings = defineSettings({
    main: [
        {
            id: 'marquee',
            type: 'dropdown',
            defaultValue: 'marquee',
            size: 'large',
            disabled: true,
            choices: [
                {
                    value: 'marquee',
                    icon: 'Icon',
                    label: 'Marquee',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'directionHV',
            type: 'segmentedControls',
            label: 'Direction',
            defaultValue: 'horizontal',
            choices: [
                {
                    value: 'horizontal',
                    label: 'Horizontal',
                },
                {
                    value: 'vertical',
                    label: 'Vertical',
                },
            ],
        },
        {
            // Need to have different IDs for the two segmentedControls (`directionH` and `directionV`)
            // else it will render the same item (key/memo problem?)
            id: 'directionH',
            type: 'segmentedControls',
            show: (bundle) => bundle.getBlock('directionHV')?.value === 'horizontal',
            defaultValue: 'left',
            choices: [
                {
                    value: 'left',
                    label: 'Left',
                },
                {
                    value: 'right',
                    label: 'Right',
                },
            ],
        },
        {
            id: 'directionV',
            type: 'segmentedControls',
            show: (bundle) => bundle.getBlock('directionHV')?.value === 'vertical',
            defaultValue: 'up',
            choices: [
                {
                    value: 'up',
                    label: 'Up',
                },
                {
                    value: 'down',
                    label: 'Down',
                },
            ],
        },
        {
            id: 'speed',
            type: 'input',
            label: 'Speed',
            defaultValue: '40',
            rules: [], // TODO: Add numerical rule
        },
        {
            id: 'pauseHover',
            type: 'switch',
            label: 'Pause on hover',
            defaultValue: false,
        },
        {
            id: 'pauseClick',
            type: 'switch',
            label: 'Pause on click',
            defaultValue: false,
        },
        {
            id: 'autoFill',
            type: 'switch',
            label: 'Auto fill',
            defaultValue: true,
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
