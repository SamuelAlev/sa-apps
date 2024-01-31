import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useTranslations } from '@sa-apps/i18n';
import { cn } from '@sa-apps/utilities';

const useSections = (): { id: string; title: string | undefined }[] => {
    const [sections, setSections] = useState<{ id: string; title: string | undefined }[]>([]);

    useEffect(() => {
        const selected = document.querySelectorAll('.page-content section[id]');
        if (selected) {
            setSections(
                [...selected].map((node) => ({
                    id: node.id,
                    title: node.querySelector('.js-b-section__title')?.textContent?.trim(),
                })),
            );
        }

        const observer = new MutationObserver(() => {
            const selected = document.querySelectorAll('.page-content section[id]');
            if (selected) {
                setSections(
                    [...selected].map((node) => ({
                        id: node.id,
                        title: node.querySelector('.js-b-section__title')?.textContent?.trim(),
                    })),
                );
            }
        });

        const pageContent = document.querySelector('#content-area');
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
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: '0% 0% -80% 0%' },
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
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const activeItem = useActiveItem(sections.map((section) => section.id));

    return sections.length > 0 ? (
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
            <div className="space-y-2">
                <p className="font-medium">{t('onThisPage')}</p>
                <ul className="m-0 list-none">
                    {sections.map((section) => (
                        <li key={section.id} className="mt-0 pt-2">
                            <button
                                title={section.title}
                                aria-label={section.title}
                                onClick={() => handleSectionClick(section.id)}
                                className={cn(
                                    'inline-block text-sm no-underline transition-colors',
                                    section.id === activeItem
                                        ? 'font-medium text-primary'
                                        : 'cursor-pointer text-sm text-muted-foreground hover:text-primary',
                                )}
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
