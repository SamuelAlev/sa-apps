export const rgbaObjectToHex8 = (rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
}): string => {
    const hex = `#${((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b).toString(16).slice(1)}`;
    const alpha = Math.round(rgba.a * 255).toString(16);
    return hex.length === 7 ? hex : `${hex}${alpha}`;
};
