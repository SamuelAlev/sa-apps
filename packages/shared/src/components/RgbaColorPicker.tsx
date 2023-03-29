import { ReactElement, useState } from 'react';
import { RgbaColorPicker as ReactColofulRgbaColorPicker } from 'react-colorful';
import { Input } from './Input';

type RgbaColorPickerProps = {
    color: { r: number; g: number; b: number; a: number };
    onColorChange: (color: { r: number; g: number; b: number; a: number }) => void;
};

export const RgbaColorPicker = ({ color, onColorChange }: RgbaColorPickerProps): ReactElement => {
    const [localColor, setLocalColor] = useState<RgbaColorPickerProps['color']>(color);

    const handleColorChange = (newColor: RgbaColorPickerProps['color']) => {
        setLocalColor(newColor);
        onColorChange(newColor);
    };

    return (
        <div className="flex flex-col gap-4">
            <ReactColofulRgbaColorPicker color={localColor} onChange={handleColorChange} />
            <Input
                value={rgbaObjectToHex8(localColor)}
                onChange={(event) => handleColorChange(hex8ToRgbaObject(event.target.value))}
            />
        </div>
    );
};

const hex8ToRgbaObject = (hex8: string): RgbaColorPickerProps['color'] => {
    const hex = hex8.slice(0, 7);
    const alpha = hex8.length === 7 ? 1 : parseInt(hex8.slice(7), 16) / 255;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return { r, g, b, a: alpha };
};

const rgbaObjectToHex8 = (rgba: RgbaColorPickerProps['color']): string => {
    const hex = `#${((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b).toString(16).slice(1)}`;
    const alpha = Math.round(rgba.a * 255).toString(16);
    return hex.length === 7 ? hex : `${hex}${alpha}`;
};
