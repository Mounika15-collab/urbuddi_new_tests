import { Page, Locator,expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

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
  await expect(toast).toBeVisible({ timeout: 10000 });
}

export async function verifyToastMessage(page:Page,message:string)
{
  const toast=page.getByText(message,{ exact: false }).first();
  await expect(toast).not.toBeVisible();
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
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
}


export async function getErrorCount(locator:Locator):Promise<number>{
  return await locator.count();
}

export function updateSharedData(key: string, value: string, filePath: string) {
    const absolutePath = path.resolve(filePath);
    
    const dir = path.dirname(absolutePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    const data = JSON.parse(fileContent || '{}');
    data[key] = value;
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2));
}


export function getSharedData(filePath: string) {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
        throw new Error(`Data file not found at ${absolutePath}`);
    }
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
}
