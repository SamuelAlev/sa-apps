import { describe, expect, it, vi } from 'vitest';
import { withAppBridgeThemeStubs } from '@frontify/app-bridge';
import { render } from '@testing-library/react';

import { EasyDocsTheme } from '../src/EasyDocsTheme';

const EASY_DOCS_THEME_TEST_ID = 'easy-docs-theme';

describe.skip('Easy Docs Theme', () => {
    it('renders the theme', () => {
        const [EasyDocsThemeWithStubs] = withAppBridgeThemeStubs(EasyDocsTheme);
        const { getByTestId } = render(
            <EasyDocsThemeWithStubs context={{ template: 'cover' }} router={{ navigate: vi.fn() }} Content={vi.fn()} />
        );

        expect(getByTestId(EASY_DOCS_THEME_TEST_ID)).toBeTruthy();
    });
});
