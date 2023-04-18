import { useEffect, useState } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@sa-apps/command';
import { useTranslations } from '@sa-apps/i18n';

import { useThemeContext } from './Context';

export const Search = () => {
    const { appBridge } = useThemeContext();
    const { t } = useTranslations();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === 'k' && event.metaKey) {
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const handleSuggestionGoToLibraries = () => {
        window.location.href = `/brands/${appBridge.getBrandId()}/undefined/libraries`;
    };

    const handleSuggestionGoToProjects = () => {
        window.location.href = `/brands/${appBridge.getBrandId()}/undefined/projects`;
    };

    const handleSuggestionGoToGuidelines = () => {
        window.location.href = `/brands/${appBridge.getBrandId()}/undefined/guidelines`;
    };

    return (
        <>
            <button
                className="inline-flex h-auto items-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground py-2 px-4 relative w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:w-64 sm:pr-12"
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">Search in guideline...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border border-input bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem onSelect={handleSuggestionGoToLibraries}>{t('goToLibraries')}</CommandItem>
                        <CommandItem onSelect={handleSuggestionGoToProjects}>{t('goToProjects')}</CommandItem>
                        <CommandItem onSelect={handleSuggestionGoToGuidelines}>{t('goToGuidelines')}</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};
