import * as Accordion from "@radix-ui/react-accordion";
import { RichTextEditor } from "@sa-apps/rich-text-editor";
import type { ReactElement } from "react";
import styles from "./AccordionItem.module.scss";
import { AccordionItemMenu } from "./AccordionItemMenu";
import { AccordionItemTrigger } from "./AccordionItemTrigger";
import { isAccordionItemEmpty, rgbaObjectToString } from "./helpers";
import type { AccordionItemProps } from "./types";

export const AccordionItem = ({
	appBridge,
	id,
	triggerIcon,
	triggerDirection,
	heading,
	content,
	readonly,
	style,
	onHeadingChange,
	onContentChange,
	onStyleChange,
	onDeleteClick,
}: AccordionItemProps): ReactElement => {
	const isEmpty = isAccordionItemEmpty({ id, heading, content });

	const handleDeleteClick = () => {
		onDeleteClick?.();
	};

	const handleStyleChange = (newStyle: Partial<AccordionItemProps["style"]>) => {
		onStyleChange(newStyle);
	};

	return (
		<Accordion.Item
			id={id}
			data-test-id={`accordion-item-${id}`}
			value={id}
			className={styles.item}
			style={{
				backgroundColor: style?.backgroundColor ? rgbaObjectToString(style.backgroundColor) : undefined,
			}}
		>
			<Accordion.Header data-test-id="accordion-item-heading">
				<Accordion.Trigger className={styles.trigger} data-test-id="accordion-item-trigger">
					{triggerDirection === "left" && <AccordionItemTrigger icon={triggerIcon} />}

					<div className={styles.rtlGrowSpacer} />

					<RichTextEditor appBridge={appBridge} id={id} content={heading} readonly={readonly} onTextChange={onHeadingChange} />

					<div className={styles.ltrGrowSpacer} />

					<div className={styles.actions}>
						{onDeleteClick && !isEmpty && !readonly ? (
							<AccordionItemMenu style={style} onStyleChange={handleStyleChange} onDeleteClick={handleDeleteClick} />
						) : null}

						{triggerDirection === "right" && <AccordionItemTrigger icon={triggerIcon} />}
					</div>
				</Accordion.Trigger>
			</Accordion.Header>

			<Accordion.Content data-test-id="accordion-item-content" className={styles.content}>
				<div className={styles.contentInner}>
					<RichTextEditor appBridge={appBridge} id={id} content={content} readonly={readonly} onTextChange={onContentChange} />
				</div>
			</Accordion.Content>
		</Accordion.Item>
	);
};
