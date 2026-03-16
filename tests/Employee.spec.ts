import { test, expect, Page, BrowserContext } from '@playwright/test';
import * as EmployeeController from '../controller/EmployeeController';
import { getEmployeeDataFromJSON, FullEmployee } from '../controller/EmployeeController';
import employeeData from '../testdata/StaticData.json';
import * as EmployeePage from '../pages/EmployeePage';
import {SharedData} from '../controller/EmployeeController';
import testData from '../testdata/StaticData.json';
import fs from 'fs';
import path from 'path';


function getSharedEmployee(): SharedData {
  const relativePath=testData.employeeDetails.sharedEmployeeJsonFile;
  const filePath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test.describe('Employee Management Tests -Positive Test cases', () => {
  let context: BrowserContext;
  let page: Page;
  let employeeData: FullEmployee;
  let sharedData: SharedData; 

  test.beforeEach(async ({ page }) => {
    employeeData = getEmployeeDataFromJSON();
    sharedData = getSharedEmployee();
    const locators = EmployeePage.getEmployeeLocators(page);
    await page.goto('/');
    await EmployeeController.addEmployeeDetails(page, locators, employeeData);
  });

  test('User is able to Create Employee ', async ({ page }) => {
    expect(employeeData.empID).toBeDefined();
    expect(employeeData.email).toBeDefined();
    const locators = EmployeePage.getEmployeeLocators(page);
    await EmployeeController.deleteEmployeeDetails(page,locators)
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

test.describe('Employee Management - Negative Test cases',()=>{

  let employeeData: FullEmployee;
  let sharedData: SharedData; 
  
  test.beforeEach(async ({ page }) => {
    employeeData = getEmployeeDataFromJSON();
    sharedData = getSharedEmployee();
    const locators = EmployeePage.getEmployeeLocators(page);
    await page.goto('/');
  });

  test('User ia able to create employee with invalid data',async({page})=>{
     const locators = EmployeePage.getEmployeeLocators(page);
     await EmployeeController.addEmployeeWithInvalidData(page,locators,employeeData);
  })

  test('User is able to create employee with duplicate data',async({page})=>{
    const locators = EmployeePage.getEmployeeLocators(page);
    await EmployeeController.addEmployeeWithDuplicateData(page,locators,sharedData,employeeData);
  })

  test('User is able to create employee without entering data',async({page})=>{
    const locators = EmployeePage.getEmployeeLocators(page);
    await EmployeeController.addEmployeeWithoutEnteringData(page,locators);
  })
})

test.describe('Employee Upload Tests ', () => {

  test('User is able to upload multiple employee data', async ({ page }) => {
    await page.goto('/');
    const jsonFilePath = employeeData.employeeDetails.employeeDataJsonFile;
    const locators = EmployeePage.getEmployeeLocators(page);
    await EmployeeController.uploadMultipleEmployeeData(page, locators, jsonFilePath);
    await EmployeeController.deleteImportedEmployeesInEmployeeList(page);
  });
});
