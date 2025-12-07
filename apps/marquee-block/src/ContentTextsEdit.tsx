import { ContentTextsRowAdd } from "./ContentTextsRowAdd";
import { ContentTextsRowEdit } from "./ContentTextsRowEdit";

type ContentTextEditProps = {
	values?: string[];
	onUpdateItem: (index: number, value: string) => void;
	onAddItem: (value: string) => void;
	onRemoveItem: (index: number) => void;
};

export const ContentTextsEdit = ({ values, onUpdateItem, onAddItem, onRemoveItem }: ContentTextEditProps) => {
	return (
		<div className="pt-8 flex flex-col gap-4 w-full">
			{values?.map((value, index) => (
				// biome-ignore lint/correctness/useJsxKeyInIterable: no proper key
				<ContentTextsRowEdit value={value} onUpdate={(value) => onUpdateItem(index, value)} onRemove={() => onRemoveItem(index)} />
			))}

			<ContentTextsRowAdd onAdd={onAddItem} />
		</div>
	);
};
