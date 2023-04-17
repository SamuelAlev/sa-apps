import type { ReactElement } from 'react';
import type { ThemeProps } from '@frontify/guideline-themes';

import { Header } from './Header';
import { ThemeContext } from './Context';
import { Sidebar } from './Sidebar';
import { TableOfContent } from './TableOfContent';

export const EasyDocsTheme = ({ appBridge, router, context, Content }: ThemeProps): ReactElement | null => {
    return (
        <ThemeContext.Provider value={{ appBridge, router, context }}>
            <div
                data-test-id="easy-docs-theme"
                className="flex flex-col h-screen overflow-y-auto bg-background text-primary antialiased"
            >
                <Header />

                {context.template === 'document' ? (
                    <div className="sa-container flex-1">
                        <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                            <Sidebar />
                            <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
                                <div id="content-area" className="mx-auto w-full min-w-0 md:pl-4">
                                    <Content />
                                </div>
                                <div className="hidden text-sm xl:block">
                                    <TableOfContent />
                                </div>
                            </main>
                        </div>
                    </div>
                ) : (
                    <Content />
                )}
            </div>
        </ThemeContext.Provider>
    );
};
