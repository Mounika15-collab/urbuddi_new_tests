import { Page, Locator, expect } from '@playwright/test';

export interface DashboardLocators {
  logOutMenu: Locator;
  confirmButton: Locator;
  modalHeading: Locator;
}

export function getDashboardLocators(page: Page): DashboardLocators {
  return {
    
    logOutMenu: page.locator('//p[text()="Logout"]'),
    confirmButton: page.locator('//button[text()="Yes"]'),
    modalHeading: page.locator('.modal-heading')
  };
}

export async function clickOnLogOutMenu(page: Page): Promise<void> {
  const locators = getDashboardLocators(page);

  await page.waitForLoadState('domcontentloaded');
  await locators.logOutMenu.waitFor({ state: 'visible', timeout: 10000 });
  await locators.logOutMenu.click();

  await expect(locators.modalHeading).toHaveText('Logout');
}

export async function clickOnConfirmButton(page: Page): Promise<void> {
  const locators = getDashboardLocators(page);
  await locators.confirmButton.click();
}