/**
 * @vitest-environment jsdom
 */

import { withAppBridgeThemeStubs } from '@frontify/app-bridge';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { EasyDocsTheme } from '../src/EasyDocsTheme';

const EASY_DOCS_THEME_TEST_ID = 'easy-docs-theme';

describe.todo('Easy Docs Theme', () => {
    it.todo('renders the theme', () => {
        const [EasyDocsThemeWithStubs] = withAppBridgeThemeStubs(EasyDocsTheme);
        const { getByTestId } = render(<EasyDocsThemeWithStubs router={{ navigate: vi.fn() }} Content={vi.fn()} />);

        expect(getByTestId(EASY_DOCS_THEME_TEST_ID)).toBeTruthy();
    });
});
