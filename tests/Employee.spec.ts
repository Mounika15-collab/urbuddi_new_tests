import { test, expect, Page, BrowserContext } from '@playwright/test';
import * as EmployeeController from '../controller/EmployeeController';
import { getEmployeeDataFromJSON, FullEmployee } from '../controller/EmployeeController';
import employeeData from '../testdata/StaticData.json';
import * as EmployeePage from '../pages/EmployeePage';


test.describe('Employee Management Tests - @Regression', () => {
  let context: BrowserContext;
  let page: Page;
  let employeeData: FullEmployee;

  test.beforeEach(async ({ page }) => {
    employeeData = getEmployeeDataFromJSON();
    const locators = EmployeePage.getEmployeeLocators(page);
    await page.goto('/');
    await EmployeeController.addEmployeeDetails(page, locators, employeeData);
  });

  test('User is able to Create Employee ', async ({ page }) => {
    expect(employeeData.empID).toBeDefined();
    expect(employeeData.email).toBeDefined();
    const locators = EmployeePage.getEmployeeLocators(page);
    await EmployeeController.deleteEmployeeDetails(page,locators,)
  });

  test('User is able to update Employee ', async ({ page }) => {
    const locators = EmployeePage.getEmployeeLocators(page);
    await EmployeeController.updateEmployeeDetails(page, locators, employeeData);
    await EmployeeController.deleteEmployeeDetails(page,locators)
  });

  test('User ia able to delete Employee ', async ({ page }) => {
    const locators = EmployeePage.getEmployeeLocators(page);
    await EmployeeController.deleteEmployeeDetails(page, locators);
  });
});

test.describe('Employee Upload Tests ', () => {

  test('User is able to upload multiple employee data', async ({ page }) => {
    await page.goto('/');
    const jsonFilePath = employeeData.employeeDetails.employeeDataJsonFile;
    const locators = EmployeePage.getEmployeeLocators(page);
    await EmployeeController.uploadMultipleEmployeeData(page, locators, jsonFilePath);
    await EmployeeController.deleteImportedEmployeesInEmployeeList(page);
  });
});
