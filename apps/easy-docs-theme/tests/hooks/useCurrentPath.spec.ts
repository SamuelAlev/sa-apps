/**
 * @vitest-environment jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useCurrentPath } from "../../src/hooks/useCurrentPath";

describe("useCurrentPath", () => {
	it("should return the current path on initial render", () => {
		const { result } = renderHook(() => useCurrentPath());
		expect(result.current).toBe(window.location.pathname + window.location.hash);
	});

	it("should update the current path when the path changes", () => {
		const { result } = renderHook(() => useCurrentPath());

		const newPath = "/new-path#hash";
		act(() => {
			window.history.pushState({}, "", newPath);
			window.dispatchEvent(new Event("popstate"));
		});

		expect(result.current).toBe(newPath);
	});
});
