import type { GuidelineSearchResult } from '@frontify/app-bridge';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandLoading } from '@sa-apps/command';
import { useTranslations } from '@sa-apps/i18n';
import { debounce, isWindows } from '@sa-apps/utilities';
import { File } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { useThemeContext } from './Context';
import { getLinkFromGuidelineSearchResult } from './helpers';

export const Search = () => {
    const { appBridge, router } = useThemeContext();
    const { t } = useTranslations();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResults, setSearchResults] = useState<GuidelineSearchResult[]>([]);

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const debouncedSearch = useCallback(
        debounce(async (searchValue: string) => {
            const result = await appBridge.searchInGuideline(searchValue);

            setSearchResults(result);
            setLoading(false);
        }, 300),
        [appBridge],
    );

    const handleSuggestionGoToLibraries = () => {
        window.location.href = `/brands/${appBridge.getBrandId()}/undefined/libraries`;
    };

    const handleSuggestionGoToProjects = () => {
        window.location.href = `/brands/${appBridge.getBrandId()}/undefined/projects`;
    };

    const handleSuggestionGoToGuidelines = () => {
        window.location.href = `/brands/${appBridge.getBrandId()}/undefined/guidelines`;
    };

    const handleSearchResultClick = (result: GuidelineSearchResult) => {
        const link = getLinkFromGuidelineSearchResult(result);
        if (link) {
            router.navigate(link);
            setOpen(false);
        }
    };

    const handleInputInput = (newSearchValue: string) => {
        setLoading(true);
        setSearchValue(newSearchValue);

        if (newSearchValue.length > 0) {
            debouncedSearch(newSearchValue).catch(() => console.error('Error searching in guideline'));
        } else {
            setLoading(false);
            setSearchResults([]);
        }
    };

    return (
        <>
            <button
                type="button"
                className="relative inline-flex h-auto w-full items-center justify-start rounded-[0.5rem] border border-input px-4 py-2 text-sm font-medium text-muted-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:w-64 sm:pr-12"
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">{t('searchInGuidelineDotDotDot')}</span>
                <span className="inline-flex lg:hidden">{t('searchDotDotDot')}</span>
                <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border border-input bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    {isWindows() ? 'ctrl ' : <span className="text-xs">⌘ </span>}K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen} commandProps={{ shouldFilter: false }}>
                <CommandInput placeholder={t('searchPlaceholderDotDotDot')} value={searchValue} onValueChange={handleInputInput} />

                <CommandList>
                    {loading && searchValue.length > 0 ? <CommandLoading>{t('loadingDotDotDot')}</CommandLoading> : <CommandEmpty>{t('noResultsFoundDot')}</CommandEmpty>}

                    {!loading && searchResults.length > 0 && searchValue.length > 0 && (
                        <CommandGroup heading={t('results')}>
                            {searchResults.map((searchResult) => (
                                <CommandItem
                                    key={searchResult.objectId}
                                    onSelect={() => handleSearchResultClick(searchResult)}
                                    className="flex"
                                    value={searchResult.objectId.toString()}
                                >
                                    <File className="mr-4 h-4 w-4 shrink-0" />
                                    <div className="flex flex-col items-start">
                                        <span className="mb-1 border-b border-b-input pb-1">{searchResult.pageTitle}</span>

                                        {searchResult.highlights.map((highlight, index) => (
                                            <span
                                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                                key={index}
                                                className="[&>em]:font-bold [&>em]:not-italic [&>em]:underline"
                                                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                                                dangerouslySetInnerHTML={{
                                                    __html: highlight,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}

                    {searchValue.length === 0 && !loading && (
                        <CommandGroup heading={t('suggestions')}>
                            <CommandItem onSelect={handleSuggestionGoToLibraries}>{t('goToLibraries')}</CommandItem>
                            <CommandItem onSelect={handleSuggestionGoToProjects}>{t('goToProjects')}</CommandItem>
                            <CommandItem onSelect={handleSuggestionGoToGuidelines}>{t('goToGuidelines')}</CommandItem>
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
};
