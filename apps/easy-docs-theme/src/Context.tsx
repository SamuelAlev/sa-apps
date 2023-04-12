import { createContext, useContext } from 'react';
import type { AppBridgeTheme } from '@frontify/app-bridge';
import type { ThemeProps } from '@frontify/guideline-themes';

type ThemeContextType = {
    appBridge: AppBridgeTheme;
    router: ThemeProps['router'];
    context: ThemeProps['context'];
};

export const ThemeContext = createContext<ThemeContextType>({
    appBridge: (() => console.error('App Bridge is not mounted in context')) as unknown as AppBridgeTheme,
    router: {
        navigate: () => console.error('Router is not mounted in context'),
    },
    context: (() => console.error('Context is not mounted in context')) as unknown as ThemeProps['context'],
});

export const useThemeContext = (): ThemeContextType => useContext(ThemeContext);
