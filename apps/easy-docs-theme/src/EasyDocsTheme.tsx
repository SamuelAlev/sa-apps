import type { ReactElement } from 'react';
import type { ThemeProps } from '@frontify/guideline-themes';
import { usePageTemplateSettings } from '@frontify/app-bridge';

import { Header } from './Header';
import { ThemeContext } from './Context';
import { Sidebar } from './Sidebar';

export const EasyDocsTheme = ({ appBridge, router, context, Content }: ThemeProps): ReactElement | null => {
    const { pageTemplateSettings, isLoading } = usePageTemplateSettings(
        appBridge,
        context.template,
        context.template !== 'cover' ? context.documentId : undefined
    );

    return !isLoading ? (
        <ThemeContext.Provider value={{ appBridge, router, context }}>
            <div
                data-test-id="easy-docs-theme"
                className="flex flex-col min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50"
            >
                <Header />

                <div className="container flex-1">
                    {context.template === 'cover' ? (
                        <Content />
                    ) : (
                        <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                            <Sidebar />
                            <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
                                <div className="mx-auto w-full min-w-0 pl-4">
                                    <Content />
                                </div>
                                <div className="hidden text-sm xl:block">Table of content</div>
                            </main>
                        </div>
                    )}
                </div>
            </div>
        </ThemeContext.Provider>
    ) : null;
};
