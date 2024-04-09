import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@sa-apps/alert-dialog';
import { Button, buttonVariants } from '@sa-apps/button';
import { useTranslations } from '@sa-apps/i18n';
import { TextInput } from '@sa-apps/text-input';
import { type FormEventHandler, useState } from 'react';

type ContentTextRowEditProps = {
    value: string;
    onUpdate: (value: string) => void;
    onRemove: () => void;
};

export const ContentTextsRowEdit = ({ value, onUpdate, onRemove }: ContentTextRowEditProps) => {
    const { t } = useTranslations();
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const handleSave: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onUpdate((event.target as unknown as { text: HTMLInputElement }).text.value);
    };

    const handleModalCancelClick = () => {
        setIsDeleteAlertOpen(false);
    };

    const handleDropdownDeleteClick = () => {
        setIsDeleteAlertOpen(true);
    };

    return (
        <div className="flex relative">
            <form onSubmit={handleSave} className="flex w-full">
                <TextInput defaultValue={value} name="text" placeholder="My Text" />

                <div className="absolute top-0 bottom-0 right-2 flex items-center justify-center gap-2">
                    <Button size="sm" variant="destructive" onClick={handleDropdownDeleteClick}>
                        Delete
                    </Button>

                    <Button size="sm" type="submit">
                        Save
                    </Button>
                </div>
            </form>

            <AlertDialog open={isDeleteAlertOpen}>
                <AlertDialogContent onClick={(event) => event.stopPropagation()}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('deleteItemQuestion')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('areYouSureDeleteItem')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleModalCancelClick}>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={onRemove} className={buttonVariants({ variant: 'destructive' })}>
                            {t('delete')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
