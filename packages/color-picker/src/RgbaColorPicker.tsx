import type { ReactElement } from 'react';
import { RgbaColorPicker as ReactColofulRgbaColorPicker } from 'react-colorful';

export type RgbaColorPickerProps = {
    color: { r: number; g: number; b: number; a: number };
    onColorChange: (color: { r: number; g: number; b: number; a: number }) => void;
};

export const RgbaColorPicker = ({ color, onColorChange }: RgbaColorPickerProps): ReactElement => {
    const handleColorChange = (newColor: RgbaColorPickerProps['color']) => {
        onColorChange(newColor);
    };

    return <ReactColofulRgbaColorPicker className="!w-full" color={color} onChange={handleColorChange} />;
};
