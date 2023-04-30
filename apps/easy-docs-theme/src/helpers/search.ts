// TODO: Rely on @frontify/guideline-themes when released

import type { GuidelineSearchResult } from '@frontify/app-bridge';

export const getLinkFromGuidelineSearchResult = (searchResult: GuidelineSearchResult): string => {
    switch (searchResult.type) {
        case 'BLOCK':
            return getDocumentBlockUrl(searchResult);
        case 'SECTION':
            return getDocumentSectionUrl(searchResult);
        case 'PAGE':
            return getDocumentPageUrl(searchResult);
        case 'COLOR':
            return getDocumentBlockUrl(searchResult);
        default:
            return '';
    }
};

export const getDocumentBlockUrl = ({
    documentId,
    pageCategorySlug,
    pageSlug,
    objectId,
}: GuidelineSearchResult): string => {
    const documentPrefix = `/document/${documentId}`;
    const pageCategoryPrefix = pageCategorySlug ? `${pageCategorySlug}/` : '';

    return `${documentPrefix}#/${pageCategoryPrefix}${pageSlug}:${objectId}`;
};

const getDocumentSectionUrl = ({ documentId, pageCategorySlug, pageSlug }: GuidelineSearchResult): string => {
    const documentPrefix = getRedirectionUrlDocumentPart(documentId);
    const categoryPart = getRedirectionUrlCategoryPart(pageCategorySlug);
    return `${documentPrefix}#/${categoryPart}${pageSlug}`;
};

const getDocumentPageUrl = ({ documentId, pageCategorySlug, pageSlug }: GuidelineSearchResult): string => {
    const documentPrefix = getRedirectionUrlDocumentPart(documentId);
    const categoryPart = getRedirectionUrlCategoryPart(pageCategorySlug);
    return `${documentPrefix}#/${categoryPart}${pageSlug}`;
};

const getRedirectionUrlDocumentPart = (documentId: GuidelineSearchResult['documentId']): string => {
    return `/document/${documentId}`;
};

const getRedirectionUrlCategoryPart = (pageCategorySlug: GuidelineSearchResult['pageCategorySlug']): string => {
    return pageCategorySlug ? `${pageCategorySlug}/` : '';
};
