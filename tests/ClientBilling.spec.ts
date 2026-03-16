import { test, expect, Page, BrowserContext } from '@playwright/test';
import * as clientController from '../controller/ClientBillingController';
import {getGenerateEmployee} from '../utils/CommonUtils';
import {getClientBillingLocators} from '../pages/ClientBillingPage';


test.describe('Employee Management Tests - @Regression', () => {
  let context: BrowserContext;
  let page: Page;
 
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User is able to add Client',async({page})=>{
    const clientName = getGenerateEmployee();
    const locators= getClientBillingLocators(page);
    await clientController.AddClientWithValidData(page,clientName,locators);
    await clientController.deleteClient(page,locators);
  });

  test('User is able to add client with empty fields',async({page})=>{
    const clientName = getGenerateEmployee();
    const locators= getClientBillingLocators(page);
    await clientController.addClientWithoutEnteringData(page,locators);
  });

  


  test('User is able to Update Client',async({page})=>{
    const clientName = getGenerateEmployee();
    const locators= getClientBillingLocators(page)
    await clientController.AddClientWithValidData(page,clientName,locators);
    await clientController.updateClient(page,locators);
    await clientController.deleteClient(page,locators);
  });
});