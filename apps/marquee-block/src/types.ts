export type BlockSettings = {
    contentTexts?: string[];
    directionHV: 'horizontal' | 'vertical';
    directionH: 'left' | 'right';
    directionV: 'up' | 'down';
    speed: string;
    pauseHover: boolean;
    pauseClick: boolean;
    loop: boolean;
    autoFill: boolean;
};
