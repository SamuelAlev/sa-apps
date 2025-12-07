import { appendUnit, createFooter, defineSettings, minimumPixelRule, numericalOrPixelRule } from "@frontify/guideline-blocks-settings";

import manifestJson from "../manifest.json";
import packageJson from "../package.json";

export const settings = defineSettings({
	main: [
		{
			id: "stackable-images",
			type: "dropdown",
			defaultValue: "stackable-images",
			size: "large",
			disabled: true,
			choices: [
				{
					value: "stackable-images",
					icon: "ImageStack",
					label: "stackable Images",
				},
			],
		},
	],
	basics: [
		{
			id: "tiltEnabled",
			type: "switch",
			label: "Tilt enabled",
			defaultValue: true,
		},
		{
			id: "tiltReversed",
			type: "switch",
			label: "Tilt reversed",
		},
		{
			id: "tiltMaxAngleX",
			type: "input",
			label: "Tilt max angle X",
			defaultValue: "5",
			rules: [], // TODO: Add numerical rule
		},
		{
			id: "tiltMaxAngleY",
			type: "input",
			label: "Tilt max angle Y",
			defaultValue: "5",
			rules: [], // TODO: Add numerical rule
		},
		{
			id: "tiltPerspective",
			type: "input",
			label: "Perspective",
			defaultValue: "1800",
		},
		{
			id: "tiltScale",
			type: "input",
			label: "Scale",
			defaultValue: "1.0",
			rules: [], // TODO: Add numerical rule
		},
		{
			id: "tiltTransitionSpeed",
			type: "input",
			label: "Transition speed",
			defaultValue: "50",
			rules: [], // TODO: Add numerical rule
		},
	],
	style: [
		{
			id: "height",
			type: "input",
			label: "Height",
			defaultValue: "300px",
			rules: [numericalOrPixelRule, minimumPixelRule(0)],
		},
		{
			id: "borderEnabled",
			label: "Border",
			type: "switch",
			defaultValue: false,
			on: [
				{
					id: "borderMultiInput",
					type: "multiInput",
					onChange: (bundle) => appendUnit(bundle, "borderWidth"),
					lastItemFullWidth: true,
					blocks: [
						{
							id: "borderStyle",
							type: "dropdown",
							defaultValue: "solid",
							choices: [
								{
									value: "solid",
									label: "Solid",
								},
								{
									value: "dotted",
									label: "Dotted",
								},
								{
									value: "dashed",
									label: "Dashed",
								},
							],
						},
						{
							id: "borderWidth",
							type: "input",
							defaultValue: "1px",
							rules: [numericalOrPixelRule, minimumPixelRule(0)],
							placeholder: "3px",
						},
						{
							id: "borderColor",
							type: "colorInput",
							defaultValue: { r: 0, g: 0, b: 0, a: 1 },
						},
					],
				},
			],
			off: [],
		},
		{
			id: "borderRadiusCustomEnabled",
			label: "Corner radius",
			type: "switch",
			defaultValue: false,
			switchLabel: "Custom",
			on: [
				{
					id: "borderRadiusMultiInput",
					type: "multiInput",
					blocks: [
						{
							id: "borderRadiusCustomTopLeft",
							type: "input",
							label: "Top",
							placeholder: "8px",
							onChange: (bundle) => appendUnit(bundle, "borderRadiusTopLeft"),
							rules: [numericalOrPixelRule, minimumPixelRule(0)],
						},
						{
							id: "borderRadiusCustomTopRight",
							type: "input",
							label: "Left",
							placeholder: "8px",
							onChange: (bundle) => appendUnit(bundle, "borderRadiusCustomTopRight"),
							rules: [numericalOrPixelRule, minimumPixelRule(0)],
						},
						{
							id: "borderRadiusCustomBottomLeft",
							type: "input",
							label: "Right",
							placeholder: "8px",
							onChange: (bundle) => appendUnit(bundle, "borderRadiusCustomBottomLeft"),
							rules: [numericalOrPixelRule, minimumPixelRule(0)],
						},
						{
							id: "borderRadiusCustomBottomRight",
							type: "input",
							label: "Bottom",
							placeholder: "8px",
							onChange: (bundle) => appendUnit(bundle, "borderRadiusCustomBottomRight"),
							rules: [numericalOrPixelRule, minimumPixelRule(0)],
						},
					],
				},
			],
			off: [
				{
					id: "borderRadiusSimple",
					type: "slider",
					defaultValue: "8px",
					choices: [
						{ value: "0px", label: "None" },
						{ value: "4px", label: "S" },
						{ value: "8px", label: "M" },
						{ value: "12px", label: "L" },
					],
				},
			],
		},
	],

	informations: [
		{
			id: "trackingInformationHeading",
			type: "sectionHeading",
			label: "Tracking information",
			blocks: [
				{
					id: "trackingInformation",
					type: "notification",
					text: "This block anonymously tracks page views, print counts, and various emitted events. Your privacy is ensured as no personal data is collected.",
					styles: {
						type: "info",
					},
				},
			],
		},
		{
			id: "versionInformationHeading",
			type: "sectionHeading",
			label: "Marketplace link",
			blocks: [
				{
					id: "versionInformation",
					type: "notification",
					footer: createFooter({
						label: "View on Marketplace",
						href: `${window.location.origin}/marketplace/app/${manifestJson.appId}`,
					}),
					styles: {
						type: "info",
					},
				},
			],
		},
		{
			id: "versionInformationHeading",
			type: "sectionHeading",
			label: "Block version",
			blocks: [
				{
					id: "versionInformation",
					type: "notification",
					text: packageJson.version,
					styles: {
						type: "info",
					},
				},
			],
		},
	],
});
