import { Page, Locator,expect } from '@playwright/test';
import fs from 'fs';

export async function fillInput(locator: Locator, value: string): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  await locator.fill(value);
}

export async function clickElement(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  await locator.click();
}

export async function verifyToast(page: Page, message: string) {
  const toast = page.getByText(message, { exact: false }).first();
  await expect(toast).toBeVisible();
}

export async function verifyStatus(locator:Locator,expectedValue:string):Promise<void>
{
  await locator.waitFor({state:'visible'});
  await expect(locator).toHaveText(expectedValue);
}

export async function scrollToRightAndClick(page: Page, element: Locator): Promise<void> {
  await page.evaluate(() => {
    const viewport = document.querySelector('.ag-body-horizontal-scroll-viewport') as HTMLElement | null;
    if (viewport) {
      viewport.scrollLeft = viewport.scrollWidth;
    }
  });
  await element.waitFor({ state: 'visible' });
  await clickElement(element);
}

export function getCreatedEmployeeDetails(filePath: string): string {
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);

    if (!json.firstname || !json.lastname) {
        throw new Error('JSON does not contain firstname or lastname for employee');
    }
    return `${json.firstname} ${json.lastname}`;
}

export function getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
}

