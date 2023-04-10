import { MouseEvent, ReactElement, useRef, useState } from 'react';
import { Button, buttonVariants } from '@sa-apps/button';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@sa-apps/dropdown-menu';
import { useTranslations } from '@sa-apps/i18n';
import { Popover, PopoverContent, PopoverTrigger } from '@sa-apps/popover';
import { RgbaColorPicker } from '@sa-apps/color-picker';
import { Label } from '@sa-apps/label';
import { debounce } from '@sa-apps/utilities';
import { Menu, Paintbrush2, Trash } from 'lucide-react';

import { MasonryItemProps } from './types';

type MasonryItemMenuProps = {
    style: MasonryItemProps['style'];
    onStyleChange: MasonryItemProps['onStyleChange'];
    onDeleteClick: MasonryItemProps['onDeleteClick'];
};

export const MasonryItemMenu = ({ style, onStyleChange, onDeleteClick }: MasonryItemMenuProps): ReactElement => {
    const { t } = useTranslations();
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isStylePopoverOpen, setIsStylePopoverOpen] = useState(false);
    const itemDropdownRef = useRef<HTMLButtonElement>(null);

    const handleModalCancelClick = () => {
        setIsDeleteAlertOpen(false);
    };

    const handleDropdownDeleteClick = () => {
        setIsDeleteAlertOpen(true);
    };

    const handlePopoverCancelClick = () => {
        setIsStylePopoverOpen(false);
    };

    const handleDropdownStyleClick = (event: MouseEvent) => {
        event?.stopPropagation();
        setIsStylePopoverOpen(true);
    };

    const handleModalDeleteClick = () => {
        onDeleteClick?.();
        setIsDeleteAlertOpen(false);
    };

    const handleStyleChange = (newStyle: Partial<typeof style>) => {
        onStyleChange(newStyle);
    };

    const handlePopoverClickOutside = (target: EventTarget | null) => {
        if (target === itemDropdownRef.current) {
            return;
        }

        handlePopoverCancelClick();
    };

    return (
        <>
            <Popover open={isStylePopoverOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger data-no-dnd={true} asChild className="absolute top-4 right-4">
                        <PopoverTrigger data-no-dnd={true} asChild>
                            <Button size="sm" variant="subtle" ref={itemDropdownRef}>
                                <Menu className="max-w-[20px] w-[20px] max-h-[20px] h-[20px]" />
                            </Button>
                        </PopoverTrigger>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent data-no-dnd={true}>
                        <DropdownMenuLabel>{t('item')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDropdownStyleClick}>
                            <Paintbrush2 className="mr-2 h-4 w-4" />
                            {t('styles')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600 dark:text-red-600"
                            onClick={handleDropdownDeleteClick}
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            {t('delete')}
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    <PopoverContent
                        asChild
                        data-no-dnd={true}
                        onEscapeKeyDown={handlePopoverCancelClick}
                        onInteractOutside={(event) => handlePopoverClickOutside(event.target)}
                    >
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">{t('styles')}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('stylesDescription')}.</p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label>{t('backgroundColor')}</Label>
                                    <RgbaColorPicker
                                        color={style?.backgroundColor ?? { r: 0, g: 0, b: 0, a: 1 }}
                                        onColorChange={debounce(
                                            (backgroundColor) => handleStyleChange({ backgroundColor }),
                                            300
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end w-full pt-4">
                                <Button onClick={handlePopoverCancelClick} size="lg">
                                    {t('close')}
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </DropdownMenu>
            </Popover>
            <AlertDialog open={isDeleteAlertOpen}>
                <AlertDialogContent data-no-dnd={true}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('deleteItemQuestion')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('areYouSureDeleteItem')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleModalCancelClick}>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleModalDeleteClick}
                            className={buttonVariants({ variant: 'destructive' })}
                        >
                            {t('delete')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
