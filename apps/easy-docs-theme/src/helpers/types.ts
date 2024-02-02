import { DocumentGroup } from '@frontify/app-bridge';

export const isDocumentGroup = (group: unknown): group is DocumentGroup => {
    return !!group && typeof group === 'object' && 'number_of_documents' in group;
};
