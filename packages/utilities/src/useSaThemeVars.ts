import type { CSSProperties } from "react";
import { useLayoutEffect, useState } from "react";

// Design tokens emitted by `@sa-apps/design-system` on the app's `.sa-root`
// wrapper. Radix portals render overlays at `document.body` — outside of
// `.sa-root` — so they lose custom-property inheritance and `hsl(var(--sa-*))`
// resolves to nothing (transparent backgrounds, missing colors). This hook
// copies the computed `--sa-*` values from the `.sa-root` that owns the open
// overlay onto the portaled element so the tokens resolve again. Per-block
// theming (e.g. `.sa-root.is-dark`) is preserved because we read the live
// computed values.
const SA_TOKENS = [
	"--sa-background",
	"--sa-foreground",
	"--sa-muted",
	"--sa-muted-foreground",
	"--sa-popover",
	"--sa-popover-foreground",
	"--sa-card",
	"--sa-card-foreground",
	"--sa-border",
	"--sa-input",
	"--sa-primary",
	"--sa-primary-foreground",
	"--sa-secondary",
	"--sa-secondary-foreground",
	"--sa-accent",
	"--sa-accent-foreground",
	"--sa-destructive",
	"--sa-destructive-foreground",
	"--sa-ring",
	"--sa-radius",
	"--sa-font-sans",
] as const;

function findSaRoot(): HTMLElement | null {
	if (typeof document === "undefined") return null;

	// Prefer the element that currently holds focus (the trigger for overlays
	// opened by interaction lives in the originating `.sa-root`).
	const active = document.activeElement as HTMLElement | null;
	const fromActive = active?.closest<HTMLElement>(".sa-root");
	if (fromActive) return fromActive;

	// Fall back to any Radix trigger in the "open" state (`open`,
	// `delayed-open`, `instant-open`) — covers hover-driven overlays like
	// tooltips where focus has not moved.
	const openTrigger = document.querySelector<HTMLElement>('[data-state$="open"]');
	const fromTrigger = openTrigger?.closest<HTMLElement>(".sa-root");
	if (fromTrigger) return fromTrigger;

	// Last resort: the first `.sa-root` on the page.
	return document.querySelector<HTMLElement>(".sa-root");
}

function resolveSaVars(): CSSProperties {
	const root = findSaRoot();
	if (!root) return {};

	const computed = getComputedStyle(root);
	const vars: Record<string, string> = {};

	for (const token of SA_TOKENS) {
		const value = computed.getPropertyValue(token).trim();
		if (value) vars[token] = value;
	}

	return vars as CSSProperties;
}

/**
 * Returns the `--sa-*` custom properties of the `.sa-root` that owns the
 * currently open overlay, ready to spread onto a portaled element's `style`
 * prop so scoped tokens resolve outside of `.sa-root`.
 */
export function useSaThemeVars(): CSSProperties {
	const [vars, setVars] = useState<CSSProperties>(resolveSaVars);

	// Re-resolve after mount in case the trigger's `data-state` was not yet set
	// during the first render.
	useLayoutEffect(() => {
		setVars(resolveSaVars());
	}, []);

	return vars;
}
