import { test, expect, Page, BrowserContext } from '@playwright/test';
import * as projectController from '../controller/ProjectBillingController';

test.describe('Employee Management Tests - @Regression', () => {
  let context: BrowserContext;
  let page: Page;
 
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User is able to create project',async({page})=>
  {
    await projectController.navigateToProjectBillingModule(page);
    await projectController.addNewProject(page);
    await projectController.deleteProject(page);    
  })

  test('User is able to update project',async({page})=>{
    await projectController.navigateToProjectBillingModule(page);
    await projectController.addNewProject(page);
    await projectController.updateProject(page);
    await projectController.deleteProject(page); 
  })
});
