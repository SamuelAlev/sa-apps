export type BlockSettings = {
    height: string;
    borderEnabled: boolean;
    borderStyle: 'solid' | 'dashed' | 'dotted';
    borderWidth: string;
    borderColor: { r: number; g: number; b: number; a: number };

    // Private
    code: string;
};
