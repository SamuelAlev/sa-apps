import { describe, expect, it, afterEach, vi, beforeEach } from 'vitest';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render, getByText, getByTestId, fireEvent, waitFor } from '@testing-library/react';

import { AccordionBlock } from '../src/AccordionBlock';
import { BlockSettings } from '../src/types';

const ACCORDION_BLOCK_TEST_ID = 'accordion-block';
const ACCORDION_ITEM_HEADING_TEST_ID = 'accordion-item-heading';
const ACCORDION_ITEM_CONTENT_TEST_ID = 'accordion-item-content';
const ACCORDION_ITEM_TRIGGER_TEST_ID = 'accordion-item-trigger';
const ACCORDION_ITEM_TEST_ID = 'accordion-item-';
const ACCORDION_EMPTY_ITEM_TEST_ID = 'accordion-item-empty';

const ACCORDION_ITEMS: BlockSettings['accordionItems'] = [
    {
        id: '1',
        heading: 'Heading 1',
        content: 'Content 1',
    },
    {
        id: '2',
        heading: 'Heading 2',
        content: 'Content 2',
    },
];

describe('Accordion Block', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders an empty accordion block', () => {
        const [AccordionBlockWithStubs] = withAppBridgeBlockStubs(AccordionBlock);
        const { getByTestId } = render(<AccordionBlockWithStubs />);

        expect(getByTestId(ACCORDION_BLOCK_TEST_ID)).toBeTruthy();
    });

    it('renders an empty accordion when no settings and in edit mode', () => {
        const date = new Date(2023, 2, 15);
        vi.setSystemTime(date);

        const [AccordionBlockWithStubs] = withAppBridgeBlockStubs(AccordionBlock, {
            editorState: true,
        });
        const { getByTestId } = render(<AccordionBlockWithStubs />);

        expect(getByTestId(`${ACCORDION_ITEM_TEST_ID}${date.getTime()}`)).toBeTruthy();
    });

    it('renders nothing when no settings and in preview mode', () => {
        const [AccordionBlockWithStubs] = withAppBridgeBlockStubs(AccordionBlock);
        const { getByTestId, queryByTestId } = render(<AccordionBlockWithStubs />);

        expect(getByTestId(ACCORDION_BLOCK_TEST_ID)).toBeTruthy();
        expect(queryByTestId(ACCORDION_EMPTY_ITEM_TEST_ID)).toBeFalsy();
    });

    it.skip('renders an accordion block with content', async () => {
        const [AccordionBlockWithStubs] = withAppBridgeBlockStubs(AccordionBlock, {
            blockSettings: {
                accordionMultiple: true,
                accordionItems: ACCORDION_ITEMS,
            },
        });

        const { getByTestId: componentGetByTestId } = render(<AccordionBlockWithStubs />);

        for (const item of ACCORDION_ITEMS) {
            const $accordionItem = componentGetByTestId(`${ACCORDION_ITEM_TEST_ID}${item.id}`);
            const $accordionItemHeading = getByTestId($accordionItem, ACCORDION_ITEM_HEADING_TEST_ID);
            const $accordionItemHeadingTrigger = getByTestId($accordionItemHeading, ACCORDION_ITEM_TRIGGER_TEST_ID);
            const $accordionItemContent = getByTestId($accordionItem, ACCORDION_ITEM_CONTENT_TEST_ID);

            // Open accordion item
            fireEvent.click($accordionItemHeadingTrigger);

            await waitFor(() => {
                expect($accordionItemHeadingTrigger.dataset.state).toEqual('open');
                expect(getByText($accordionItemHeading, item.heading)).toBeTruthy();
                expect(getByText($accordionItemContent, item.content)).toBeTruthy();
            });
        }
    });

    it.skip('renders an empty accordion item in edit mode if the last item has heading text', () => {
        // noop
    });

    it.skip('renders an empty accordion item in edit mode if the last item has content', () => {
        // noop
    });

    it.skip('does not render a second empty accordion item if the last item is empty', () => {
        // noop
    });

    it.skip('does not render an empty accordion item in preview mode', () => {
        // noop
    });

    it.skip('only open one accordion item at a time', () => {
        // noop
    });

    it.skip('opens multiple accordion item at the same time', () => {
        // noop
    });
});
