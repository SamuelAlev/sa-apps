export const isMacOs = () => {
    return navigator.platform.includes('Mac');
};

export const isWindows = () => {
    return navigator.platform.includes('Win');
};
