import { ContentTextsRowAdd } from './ContentTextsRowAdd';
import { ContentTextsRowEdit } from './ContentTextsRowEdit';

type ContentTextEditProps = {
    values?: string[];
    onSaveItem: (index: number, value: string) => void;
    onAddItem: (value: string) => void;
    onRemoveItem: (index: number) => void;
};

export const ContentTextsEdit = ({ values, onSaveItem, onAddItem, onRemoveItem }: ContentTextEditProps) => {
    return (
        <>
            <div className="pt-8 flex flex-col gap-4 w-full">
                {values?.map((value, index) => (
                    <ContentTextsRowEdit value={value} onSave={(value) => onSaveItem(index, value)} onRemove={() => onRemoveItem(index)} />
                ))}

                <ContentTextsRowAdd onSave={onAddItem} />
            </div>
        </>
    );
};
