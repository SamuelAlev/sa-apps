import styles from "./ContentTextsEdit.module.scss";
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
		<div className={styles.editContainer}>
			{values?.map((value, index) => (
				// biome-ignore lint/correctness/useJsxKeyInIterable: no proper key
				<ContentTextsRowEdit value={value} onUpdate={(value) => onUpdateItem(index, value)} onRemove={() => onRemoveItem(index)} />
			))}

			<ContentTextsRowAdd onAdd={onAddItem} />
		</div>
	);
};
