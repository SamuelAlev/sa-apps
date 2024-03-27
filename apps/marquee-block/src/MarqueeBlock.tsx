import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
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
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { useTranslations } from '@sa-apps/i18n';
import { TextInput } from '@sa-apps/text-input';
import { Button, buttonVariants } from '@sa-apps/button';
import { useState, type ChangeEvent, type ReactElement, type FormEventHandler } from 'react';
import Marquee from 'react-fast-marquee';
import type { BlockSettings } from './types';
import { cn } from '@sa-apps/utilities';

export const MarqueeBlock = ({ appBridge }: BlockProps): ReactElement => {
    const { t } = useTranslations();
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const handleTextChange = (index: number, value: string) => {
        const cloneContent = [...(blockSettings.contentTexts ?? [])];
        cloneContent[index] = value;
        setBlockSettings({ contentTexts: cloneContent });
    };

    const handleRemoveText = (index: number) => {
        const cloneContent = [...(blockSettings.contentTexts ?? [])];
        cloneContent.splice(index, 1);
        setBlockSettings({ contentTexts: cloneContent });
    };

    const handleAddText = () => {
        setBlockSettings({ contentTexts: [...(blockSettings.contentTexts ?? []), ''] });
    };

    return (
        <div data-test-id="marquee-block">
            <Marquee
                className="overflow-y-hidden"
                loop={0}
                autoFill={blockSettings.autoFill}
                speed={blockSettings.speed ? Number.parseInt(blockSettings.speed) : undefined}
                direction={blockSettings.directionHV === 'horizontal' ? blockSettings.directionH : blockSettings.directionV}
                pauseOnHover={blockSettings.pauseHover}
                pauseOnClick={blockSettings.pauseClick}
            >
                {blockSettings.contentTexts?.map((contentText) => (
                    <span className={cn(blockSettings.directionHV === 'horizontal' ? 'mx-6' : 'my-6')}>{contentText}</span>
                ))}
            </Marquee>

            {isEditing ? <ContentTextEdit values={blockSettings.contentTexts} onSaveItem={handleTextChange} onAddItem={handleAddText} onRemoveItem={handleRemoveText} /> : null}
        </div>
    );
};

const ContentTextEdit = ({
    values,
    onSaveItem,
    onAddItem,
    onRemoveItem,
}: { values?: string[]; onSaveItem: (index: number, value: string) => void; onAddItem: () => void; onRemoveItem: (index: number) => void }) => {
    return (
        <>
            <div className="pt-8 flex flex-col gap-4 w-full">
                {values?.map((value, index) => (
                    <ContentTextRowEdit value={value} onSave={(value) => onSaveItem(index, value)} onRemove={() => onRemoveItem(index)} />
                ))}

                <div>
                    <Button size="sm" onClick={onAddItem}>
                        Add item
                    </Button>
                </div>
            </div>
        </>
    );
};

const ContentTextRowEdit = ({ value, onSave, onRemove }: { value: string; onSave: (value: string) => void; onRemove: () => void }) => {
    const { t } = useTranslations();
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const handleSave: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSave((event.target as unknown as { text: HTMLInputElement }).text.value);
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
                    <Button size="sm" type="submit">
                        Save
                    </Button>

                    <Button size="sm" variant="destructive" onClick={handleDropdownDeleteClick}>
                        Delete
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
