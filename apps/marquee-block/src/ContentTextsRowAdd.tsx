import { Button } from "@sa-apps/button";
import { TextInput } from "@sa-apps/text-input";
import type { FormEventHandler } from "react";
import styles from "./ContentTextsRowAdd.module.scss";

type ContentTextRowAddProps = {
	onAdd: (value: string) => void;
};

export const ContentTextsRowAdd = ({ onAdd }: ContentTextRowAddProps) => {
	const handleAddItem: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		onAdd((event.target as unknown as { text: HTMLInputElement }).text.value);
		(event.target as unknown as { text: HTMLInputElement }).text.value = "";
	};

	return (
		<form onSubmit={handleAddItem} className={styles.form}>
			<TextInput name="text" placeholder="My Text" />

			<div className={styles.actions}>
				<Button size="sm" type="submit">
					Add
				</Button>
			</div>
		</form>
	);
};
