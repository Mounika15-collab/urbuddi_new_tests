import { test, expect, Page, BrowserContext } from '@playwright/test';
import * as clientController from '../controller/ClientBillingController';
import {getGenerateEmployee} from '../utils/CommonUtils';
import {getClientBillingLocators} from '../pages/ClientBillingPage';


test.describe('Client Positive Tests - @Regression', () => {
   
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User is able to add Client',async({page})=>{
    const clientName = getGenerateEmployee();
    const locators= getClientBillingLocators(page);
    await clientController.AddClientWithValidData(page,clientName,locators);
    // await clientController.deleteClient(page,locators);
  });

  test('User is able to Update Client',async({page})=>{
    const clientName = getGenerateEmployee();
    const locators= getClientBillingLocators(page)
    await clientController.AddClientWithValidData(page,clientName,locators);
    await clientController.updateClient(page,locators);
    await clientController.deleteClient(page,locators);
  });
});

test.describe('Client Negative Tests',()=>{
 
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User is able to add client with empty fields',async({page})=>{
    const locators= getClientBillingLocators(page);
    await clientController.addClientWithoutEnteringData(page,locators);
  });

  test('User is able to add client with invalid Email',async({page})=>{
    const clientName = getGenerateEmployee();
     const locators= getClientBillingLocators(page);
     await clientController.addClientWithInvalidData(page,locators,clientName)
  })  
  
  test('USer is able to add client with duplicate data',async({page})=>{
    const clientName = getGenerateEmployee();
    const locators= getClientBillingLocators(page);
    await clientController.addclientWithDuplicateData(page,clientName,locators)
  })
})