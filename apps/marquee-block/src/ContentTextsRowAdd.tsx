import { Button } from "@sa-apps/button";
import { TextInput } from "@sa-apps/text-input";
import type { FormEventHandler } from "react";

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
		<form onSubmit={handleAddItem} className="relative flex w-full">
			<TextInput name="text" placeholder="My Text" />

			<div className="absolute top-0 bottom-0 right-2 flex items-center justify-center gap-2">
				<Button size="sm" type="submit">
					Add
				</Button>
			</div>
		</form>
	);
};
