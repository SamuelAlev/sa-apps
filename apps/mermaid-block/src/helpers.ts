import { type CSSProperties } from 'react';
import { type BlockSettings } from './types';

export const getMermaidRootStyle = (blockSettings: BlockSettings) => {
    return {
        '--border-disabled': blockSettings.borderEnabled ? undefined : '0',
        '--border-style': blockSettings.borderStyle,
        '--border-width': blockSettings.borderWidth,
        '--border-color': blockSettings.borderColor ? rgbaObjectToString(blockSettings.borderColor) : undefined,
    } as CSSProperties;
};

export const rgbaObjectToString = (color: {
    r: number;
    g: number;
    b: number;
    a: number;
}) => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
