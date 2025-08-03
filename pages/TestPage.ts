import { Page } from "@playwright/test";


export let page: Page;

export function setTestPage(thePage: Page) {
    page = thePage;
}