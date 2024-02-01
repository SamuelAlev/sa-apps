/**
 * @vitest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useThemeMode } from '../../src/hooks/useThemeMode';

describe('useThemeMode', () => {
    afterEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('dark');
        vi.clearAllMocks();
    });

    it('should initialize with the system preference for dark mode', () => {
        vi.spyOn(window, 'matchMedia').mockReturnValue({
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        } as unknown as MediaQueryList);

        const { result } = renderHook(() => useThemeMode());

        expect(result.current[0]).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should initialize with the system preference for light mode', () => {
        vi.spyOn(window, 'matchMedia').mockReturnValue({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        } as unknown as MediaQueryList);

        const { result } = renderHook(() => useThemeMode());

        expect(result.current[0]).toBe(false);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should initialize with the preference from local storage', () => {
        localStorage.setItem('themeMode', 'dark');

        const { result } = renderHook(() => useThemeMode());

        expect(result.current[0]).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should toggle dark mode on click', () => {
        const { result } = renderHook(() => useThemeMode());

        expect(result.current[0]).toBe(false);
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        act(() => {
            result.current[1]('dark');
        });

        expect(result.current[0]).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        act(() => {
            result.current[1]('light');
        });

        expect(result.current[0]).toBe(false);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should toggle light mode on click if it was dark', () => {
        const { result } = renderHook(() => useThemeMode());

        expect(result.current[0]).toBe(false);
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        act(() => {
            result.current[1]('dark');
        });

        expect(result.current[0]).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        act(() => {
            result.current[1]('light');
        });

        expect(result.current[0]).toBe(false);
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        act(() => {
            result.current[1]('dark');
        });

        expect(result.current[0]).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should add the dark class when toggling dark', () => {
        const { result } = renderHook(() => useThemeMode());

        expect(document.documentElement.classList.contains('dark')).toBe(false);

        act(() => {
            result.current[1]('dark');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove the dark class when toggling light', () => {
        const { result } = renderHook(() => useThemeMode());

        act(() => {
            result.current[1]('dark');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(true);

        act(() => {
            result.current[1]('light');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should update the preference in local storage on toggle', () => {
        expect(localStorage.getItem('themeMode')).toBeNull();

        const { result } = renderHook(() => useThemeMode());

        expect(localStorage.getItem('themeMode')).toBe('light');

        act(() => {
            result.current[1]('dark');
        });

        expect(localStorage.getItem('themeMode')).toBe('dark');

        act(() => {
            result.current[1]('light');
        });

        expect(localStorage.getItem('themeMode')).toBe('light');
    });

    it('should react to changes in local storage', () => {
        const { result } = renderHook(() => useThemeMode());

        act(() => {
            localStorage.setItem('themeMode', 'dark');
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key: 'themeMode',
                    newValue: 'dark',
                }),
            );
        });

        expect(result.current[0]).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        act(() => {
            localStorage.setItem('themeMode', 'light');
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key: 'themeMode',
                    newValue: 'light',
                }),
            );
        });

        expect(result.current[0]).toBe(false);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should add the dark class when toggling system and system is dark', () => {
        vi.spyOn(window, 'matchMedia').mockReturnValue({
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        } as unknown as MediaQueryList);
        const { result } = renderHook(() => useThemeMode());

        act(() => {
            result.current[1]('light');
        });

        expect(localStorage.getItem('themeMode')).toBe('light');

        expect(document.documentElement.classList.contains('dark')).toBe(false);

        act(() => {
            result.current[1]('system');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove the dark class when toggling system and system is light', () => {
        vi.spyOn(window, 'matchMedia').mockReturnValue({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        } as unknown as MediaQueryList);
        const { result } = renderHook(() => useThemeMode());

        act(() => {
            result.current[1]('dark');
        });

        expect(localStorage.getItem('themeMode')).toBe('dark');

        expect(document.documentElement.classList.contains('dark')).toBe(true);

        act(() => {
            result.current[1]('system');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
});
