import type { FormEventHandler } from 'react';

import { Button } from '@sa-apps/button';
import { TextInput } from '@sa-apps/text-input';

type ContentTextRowAddProps = {
    onSave: (value: string) => void;
};

export const ContentTextsRowAdd = ({ onSave }: ContentTextRowAddProps) => {
    const handleSave: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSave((event.target as unknown as { text: HTMLInputElement }).text.value);
        (event.target as unknown as { text: HTMLInputElement }).text.value = '';
    };

    return (
        <form onSubmit={handleSave} className="relative flex w-full">
            <TextInput name="text" placeholder="My Text" />

            <div className="absolute top-0 bottom-0 right-2 flex items-center justify-center gap-2">
                <Button size="sm" type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
};
