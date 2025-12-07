import type { AppBridgeTheme, ThemeContext as AppBridgeThemeContext } from "@frontify/app-bridge";
import type { ThemeProps } from "@frontify/guideline-themes";
import { createContext, useContext } from "react";

type ThemeContextType = {
	appBridge: AppBridgeTheme;
	router: ThemeProps["router"];
	context: AppBridgeThemeContext;
};

export const ThemeContext = createContext<ThemeContextType>({
	appBridge: (() => console.error("App Bridge is not mounted in context")) as unknown as AppBridgeTheme,
	router: {
		navigate: () => console.error("Router is not mounted in context"),
	},
	context: (() => console.error("Context is not mounted in context")) as unknown as AppBridgeThemeContext,
});

export const useThemeContext = (): ThemeContextType => useContext(ThemeContext);
