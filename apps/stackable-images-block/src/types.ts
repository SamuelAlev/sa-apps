export type BlockSettings = {
    tiltEnabled: boolean;
    tiltReversed: boolean;
    tiltMaxAngleX: string;
    tiltMaxAngleY: string;
    tiltPerspective: string;
    tiltScale: string;
    tiltTransitionSpeed: string;

    height: string;

    borderEnabled: boolean;
    borderStyle: 'solid' | 'dashed' | 'dotted';
    borderWidth: string;
    borderColor: { r: number; g: number; b: number; a: number };

    borderRadiusCustomEnabled: boolean;
    borderRadiusSimple: '0px' | '4px' | '8px' | '16px';
    borderRadiusCustomTopLeft: string;
    borderRadiusCustomTopRight: string;
    borderRadiusCustomBottomRight: string;
    borderRadiusCustomBottomLeft: string;
};
