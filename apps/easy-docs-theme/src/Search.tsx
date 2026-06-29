import type { GuidelineSearchResult } from "@frontify/app-bridge";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandLoading } from "@sa-apps/command";
import { useTranslations } from "@sa-apps/i18n";
import { debounce, isWindows } from "@sa-apps/utilities";
import { File } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { useThemeContext } from "./Context";
import { getLinkFromGuidelineSearchResult } from "./helpers/search";
import styles from "./Search.module.scss";

export const Search = () => {
	const { appBridge, router } = useThemeContext();
	const { t } = useTranslations();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchResults, setSearchResults] = useState<GuidelineSearchResult[]>([]);

	useEffect(() => {
		const down = (event: KeyboardEvent) => {
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
			debouncedSearch(newSearchValue).catch(() => console.error("Error searching in guideline"));
		} else {
			setLoading(false);
			setSearchResults([]);
		}
	};

	return (
		<>
			<button type="button" className={styles.searchButton} onClick={() => setOpen(true)}>
				<span className={styles.searchPlaceholderLg}>{t("searchInGuidelineDotDotDot")}</span>
				<span className={styles.searchPlaceholderSm}>{t("searchDotDotDot")}</span>
				<kbd className={styles.kbd}>{isWindows() ? "ctrl " : <span className={styles.kbdKey}>⌘ </span>}K</kbd>
			</button>

			<CommandDialog open={open} onOpenChange={setOpen} commandProps={{ shouldFilter: false }}>
				<CommandInput placeholder={t("searchPlaceholderDotDotDot")} value={searchValue} onValueChange={handleInputInput} />

				<CommandList>
					{loading && searchValue.length > 0 ? (
						<CommandLoading>{t("loadingDotDotDot")}</CommandLoading>
					) : (
						<CommandEmpty>{t("noResultsFoundDot")}</CommandEmpty>
					)}

					{!loading && searchResults.length > 0 && searchValue.length > 0 && (
						<CommandGroup heading={t("results")}>
							{searchResults.map((searchResult) => (
								<CommandItem
									key={searchResult.objectId}
									onSelect={() => handleSearchResultClick(searchResult)}
									className={styles.searchResultItem}
									value={searchResult.objectId.toString()}
								>
									<File className={styles.searchResultIcon} />
									<div className={styles.searchResultBody}>
										<span className={styles.searchResultTitle}>{searchResult.pageTitle}</span>

										{searchResult.highlights.map((highlight, index) => (
											<span
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={index}
												className={styles.highlight}
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
						<CommandGroup heading={t("suggestions")}>
							<CommandItem onSelect={handleSuggestionGoToLibraries}>{t("goToLibraries")}</CommandItem>
							<CommandItem onSelect={handleSuggestionGoToProjects}>{t("goToProjects")}</CommandItem>
							<CommandItem onSelect={handleSuggestionGoToGuidelines}>{t("goToGuidelines")}</CommandItem>
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
};
