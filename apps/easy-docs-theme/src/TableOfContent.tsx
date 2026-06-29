import { useTranslations } from "@sa-apps/i18n";
import { cn } from "@sa-apps/utilities";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import styles from "./TableOfContent.module.scss";

const useSections = (): { id: string; title: string | undefined }[] => {
	const [sections, setSections] = useState<{ id: string; title: string | undefined }[]>([]);

	useEffect(() => {
		const selected = document.querySelectorAll(".page-content section[id]");
		if (selected) {
			setSections(
				[...selected].map((node) => ({
					id: node.id,
					title: node.querySelector(".js-b-section__title")?.textContent?.trim(),
				})),
			);
		}

		const observer = new MutationObserver(() => {
			const selected = document.querySelectorAll(".page-content section[id]");
			if (selected) {
				setSections(
					[...selected].map((node) => ({
						id: node.id,
						title: node.querySelector(".js-b-section__title")?.textContent?.trim(),
					})),
				);
			}
		});

		const pageContent = document.querySelector("#content-area");
		if (pageContent) {
			observer.observe(pageContent, {
				childList: true,
				subtree: true,
			});
		}

		return () => observer.disconnect();
	}, []);

	return sections;
};

const useActiveItem = (itemIds: string[]) => {
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: "0% 0% -80% 0%" },
		);

		for (const id of itemIds) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			for (const id of itemIds) {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			}
		};
	}, [itemIds]);

	return activeId;
};

export const TableOfContent = (): ReactElement | null => {
	const { t } = useTranslations();
	const sections = useSections();

	const handleSectionClick = (sectionId: string) => {
		const section = document.querySelector(`#${sectionId} .js-b-section__title`);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	const activeItem = useActiveItem(sections.map((section) => section.id));

	return sections.length > 0 ? (
		<div className={styles.toc}>
			<div className={styles.tocInner}>
				<p className={styles.tocTitle}>{t("onThisPage")}</p>
				<ul className={styles.tocList}>
					{sections.map((section) => (
						<li key={section.id} className={styles.tocItem}>
							<button
								type="button"
								title={section.title}
								aria-label={section.title}
								onClick={() => handleSectionClick(section.id)}
								className={cn(styles.tocLink, section.id === activeItem ? styles.tocLinkActive : styles.tocLinkInactive)}
							>
								{section.title}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	) : null;
};
