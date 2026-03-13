import { test,Page, BrowserContext } from '@playwright/test';
import * as projectController from '../controller/ProjectBillingController';
import { getProjectBillingLocators } from '../pages/ProjectsBillingPage';
import { getEmployeeDataFromJSON } from '../controller/EmployeeController';

test.describe('Project Tests - @Regression', () => {
  let context: BrowserContext;
  let page: Page;
 
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User is able to create project',async({page})=>
  {
    const locators=getProjectBillingLocators(page);
    await projectController.navigateToProjectBillingModule(locators);
    await projectController.addNewProject(locators);
    await projectController.deleteProject(page,locators);    
  })

  test('User is able to update project',async({page})=>{

    const locators=getProjectBillingLocators(page);
    await projectController.navigateToProjectBillingModule(locators);
    await projectController.addNewProject(locators);
    await projectController.updateProject(page,locators);
    await projectController.deleteProject(page,locators); 
  })

  test('User is able to assign employee to project',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.assignEmployeeToProject(page,locators,data);
  })

});
