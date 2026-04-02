import { test,Page, BrowserContext } from '@playwright/test';
import * as projectController from '../controller/ProjectBillingController';
import { getProjectBillingLocators } from '../pages/ProjectsBillingPage';
import { getEmployeeDataFromJSON } from '../controller/EmployeeController';

test.describe('Project Tests - @Regression', () => 
{
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User is able to create project',async({page})=>
  {
    const locators=getProjectBillingLocators(page);
    await projectController.navigateToProjectBillingModule(locators);
    await projectController.addNewProject(page,locators);
    await projectController.deleteProject(page,locators);    
  })

  test('User is able to update project',async({page})=> {
    const locators=getProjectBillingLocators(page);
    await projectController.navigateToProjectBillingModule(locators);
    await projectController.addNewProject(page,locators);
    await projectController.updateProject(page,locators);
    await projectController.deleteProject(page,locators); 
  })

  test('User is able to assign employee to project',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.assignEmployeeToProject(page,locators,data);
  })

  test('User is able assign employee in projects details',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.assignEmployeeInProjectDetailsPage(page,locators,data);
  })

  test('User is able to update assigned employee in project Details page',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.updateAssignedEmployeeInProjectDetails(page,locators,data);
  })

  test('User is able to delete assigned employee in Project details page',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.deleteAssignedEmployeeInProjectDetails(page,locators,data);
  })

  test('User is able to offboard an employee from the Project Details page',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.offBoardingEmployeeInProjectDetailsPage(page,locators,data);
  })

  test('User is able to view the worklogs of Sigle Employee in Project Details Page',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.viewWorkLogsForTheSingleEmployee(page,locators,data);
  })

  test.only('User is able to view the worklogs of multiple Employee in Project Details Page',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.viewWorkLogsOfMultipleEmployeesInProjectDetailsPage(page,locators);
  })
});


test.describe('Project Tests - @Regression', () => 
{
  let context: BrowserContext;
  let page: Page;
 
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User is able to create project with Empty data',async({page})=>{
     const locators=getProjectBillingLocators(page);
     await projectController.addProjectWithEmptyData(locators);
  })

  test('User is able to add duplicate project',async({page})=>{
    const locators=getProjectBillingLocators(page);
    await projectController.addDuplicateProjects(locators);
  })

  test('User is able to assign employee with empty data to the project',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.assignEmployeeWithEmptyDataToProject(page,locators,data)
  })

  test('User is able to assign employee with empty data in Project Details page',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.assignEmployeeWithEmptyDataInProjectDetailsPage(page,locators,data)
  })

  test('User is able to assign employee with duplicate data to the project',async({page})=>{
    const locators=getProjectBillingLocators(page);
    const data=getEmployeeDataFromJSON();
    await projectController.assignEmployeeWithDuplicateDataToProject(page,locators);
  })

});

