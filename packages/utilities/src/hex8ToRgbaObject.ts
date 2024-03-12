export const hex8ToRgbaObject = (hex8: string): { r: number; g: number; b: number; a: number } => {
    const hex = hex8.slice(0, 7);
    const alpha = hex8.length === 7 ? 1 : Number.parseInt(hex8.slice(7), 16) / 255;
    const r = Number.parseInt(hex.slice(1, 3), 16);
    const g = Number.parseInt(hex.slice(3, 5), 16);
    const b = Number.parseInt(hex.slice(5, 7), 16);

    return { r, g, b, a: alpha };
};
