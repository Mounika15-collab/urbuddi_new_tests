import { Page,expect } from '@playwright/test';
import * as EmployeePage from '../pages/EmployeePage';
import { GeneratedEmployee, getGenerateEmployee } from '../utils/CommonUtils';
import {
  appendFakerEmployeeToExcel,
  getEmployeeIdAndEmails,
  generateAndWriteEmployees,
  getAllEmployeeIds} from '../utils/ExcelUtils';
import testData from '../testdata/StaticData.json';
import fs from 'fs';
import path from 'path';


export interface SharedData {
  empID: string;
  email: string;
  password: string;
  firstname:string;
  lastname:string;
}

export interface FullEmployee extends GeneratedEmployee {
  employeePassword: string;
  uploadFile?: string;
  role: string;
  dob: string;
  joiningDate: string;
  qualification: string;
  department: string;
  gender: string;
  mobileNumber: string;
  bloodgroup: string;
  designation: string;
  salary: string;
  location: string;
  reportingTo: string;
  certificates: string[];
}

export function getEmployeeDataFromJSON(): FullEmployee {
  const staticData = testData.employeeDetails;
  const generated: GeneratedEmployee = getGenerateEmployee(); 

  return {
    ...generated,
    employeePassword: staticData.password,
    role: staticData.role,
    dob: staticData.dob,
    joiningDate: staticData.joiningDate,
    qualification: staticData.qualification,
    department: staticData.department,
    gender: staticData.gender,
    mobileNumber: staticData.mobileNumber,
    bloodgroup: staticData.bloodgroup,
    designation: staticData.designation,
    salary: staticData.salary,
    location: staticData.location,
    reportingTo: staticData.reportingTo,
    certificates: staticData.certificates,
  };
}

export async function writeBackToSharedData(data: FullEmployee){
  const sharedData: SharedData = {
    empID: data.empID,
    email: data.email,
    password: data.employeePassword,
    firstname: data.firstname,
    lastname:data.lastname,
  };
  const filePath = path.join(process.cwd(),testData.employeeDetails.sharedEmployeeJsonFile);
  fs.writeFileSync(filePath, JSON.stringify(sharedData, null, 2));
}


export async function addEmployeeDetails(page: Page,locators: ReturnType<typeof EmployeePage.getEmployeeLocators>,data: FullEmployee): Promise<void> 
{
  await EmployeePage.navigateToEmployee(page, locators);
  await EmployeePage.clickOnAddEmployeeButton(page, locators); 
  await EmployeePage.enterFirstName(locators, data);
  await EmployeePage.enterLastName(locators, data);
  await EmployeePage.enterEmployeeId(locators, data.empID);
  await EmployeePage.enterEmail(locators, data.email);
  await EmployeePage.selectRole(locators, data.role);
  await EmployeePage.enterPassword(locators, data.employeePassword);
  await EmployeePage.enterDateOfBirth(locators, data);
  await EmployeePage.enterJoiningDate(locators, data);
  await EmployeePage.selectBloodGroup(locators, data.bloodgroup);
  await EmployeePage.selectQualification(locators, data.qualification);
  await EmployeePage.enterDepartment(locators, data.department);
  await EmployeePage.selectGender(locators, data.gender);
  await EmployeePage.enterMobileNumber(locators, data.mobileNumber);
  await EmployeePage.enterDesignation(locators, data.designation);
  await EmployeePage.enterSalary(locators, data.salary);
  await EmployeePage.enterLocation(locators, data.location);
  await EmployeePage.selectReportingTo(locators, data.reportingTo);
  await EmployeePage.clickOnAddButton(locators);
  await EmployeePage.verifyEmployeeCreatedToast(page);
  
  appendFakerEmployeeToExcel(data);
  await writeBackToSharedData(data);
}

export async function addEmployeeWithInvalidData(page:Page,locators: ReturnType<typeof EmployeePage.getEmployeeLocators>,data:FullEmployee):Promise<void>
{
   await EmployeePage.navigateToEmployee(page, locators);
  await EmployeePage.clickOnAddEmployeeButton(page, locators); 
  await EmployeePage.enterFirstName(locators, data);
  await EmployeePage.enterLastName(locators, data);
  await EmployeePage.enterInvalidEmpID(locators,data.invalidEmpID);
  await EmployeePage.enterInvalidEmail(locators,data.invalidEmail);
  await EmployeePage.selectRole(locators, data.role);
  await EmployeePage.enterInvalidPassword(locators);
  await EmployeePage.enterInvalidDOB(locators);
  await EmployeePage.enterJoiningDate(locators, data);
  await EmployeePage.selectBloodGroup(locators, data.bloodgroup);
  await EmployeePage.selectQualification(locators, data.qualification);
  await EmployeePage.enterDepartment(locators, data.department);
  await EmployeePage.selectGender(locators, data.gender);
  await EmployeePage.enterInvalidMobileNumber(locators);
  await EmployeePage.enterDesignation(locators, data.designation);
  await EmployeePage.enterSalary(locators, data.salary);
  await EmployeePage.enterLocation(locators, data.location);
  await EmployeePage.selectReportingTo(locators, data.reportingTo);
  await EmployeePage.clickOnAddButton(locators);
  await EmployeePage.verifyEmployeeCreatedSuccesToast(page);
}

export async function addEmployeeWithoutEnteringData(page:Page,locators:ReturnType<typeof EmployeePage.getEmployeeLocators>){
  await EmployeePage.navigateToEmployee(page, locators);
  await EmployeePage.clickOnAddEmployeeButton(page, locators);
  await EmployeePage.clickOnAddButton(locators);
  await EmployeePage.verifyEmployeeCreatedSuccesToast(page);
}

export async function addEmployeeWithDuplicateData(page:Page,locators:ReturnType<typeof EmployeePage.getEmployeeLocators>,sharedData:SharedData,data:FullEmployee){
   await EmployeePage.navigateToEmployee(page, locators);
  await EmployeePage.clickOnAddEmployeeButton(page, locators); 
  await EmployeePage.enterFirstName(locators, data);
  await EmployeePage.enterLastName(locators, data);
  await EmployeePage.enterDuplicateEmployeeID(locators,sharedData.empID);
  await EmployeePage.enterDuplicateEmail(locators,sharedData.email);
  await EmployeePage.selectRole(locators, data.role);
  await EmployeePage.enterPassword(locators, data.employeePassword);
  await EmployeePage.enterDateOfBirth(locators, data);
  await EmployeePage.enterJoiningDate(locators, data);
  await EmployeePage.selectBloodGroup(locators, data.bloodgroup);
  await EmployeePage.selectQualification(locators, data.qualification);
  await EmployeePage.enterDepartment(locators, data.department);
  await EmployeePage.selectGender(locators, data.gender);
  await EmployeePage.enterMobileNumber(locators, data.mobileNumber);
  await EmployeePage.enterDesignation(locators, data.designation);
  await EmployeePage.enterSalary(locators, data.salary);
  await EmployeePage.enterLocation(locators, data.location);
  await EmployeePage.selectReportingTo(locators, data.reportingTo);
  await EmployeePage.clickOnAddButton(locators);
  await EmployeePage.validateduplicateEmployeeErrorMessage(locators);
}

export async function updateEmployeeDetails(page: Page,locators: ReturnType<typeof EmployeePage.getEmployeeLocators>,
  data: FullEmployee): Promise<void> {
  const employeeDataFromExcel = getEmployeeIdAndEmails();
  const empID = employeeDataFromExcel.empID;
  await EmployeePage.searchEmployee(page, locators,empID);
  await EmployeePage.clickOnEditIcon(locators);
  await EmployeePage.checkCertificates(page, locators, data.certificates);
  await EmployeePage.clickOnSubmitButton(locators);
  await EmployeePage.verifyEmployeeUpdatedToast(page, locators);
}

export async function deleteEmployeeDetails(page: Page,locators: ReturnType<typeof EmployeePage.getEmployeeLocators>): Promise<void> 
 {
  const employeeDataFromExcel = getEmployeeIdAndEmails();
  const empID = employeeDataFromExcel.empID;
  await EmployeePage.searchEmployee(page, locators,empID);
  await page.waitForLoadState('networkidle');
  await EmployeePage.clickOnDeleteCheckBox(locators);
  await EmployeePage.clickOnDeleteIcon(locators);
  await EmployeePage.verifyEmployeeDeletedToast(page);
  await page.waitForLoadState("domcontentloaded");
  await EmployeePage.searchEmployee(page, locators, empID);
  const employeeRow = page.locator(`.ag-cell[col-id="id"]:has-text("${empID}")`);
  await expect(employeeRow).toHaveCount(0,{timeout:5000});
}

export async function uploadMultipleEmployeeData(page: Page,locators: ReturnType<typeof EmployeePage.getEmployeeLocators>,
  jsonFilePath: string,
  sheetName: string= testData.excelData.sheetName,
  numberOfEmployees: number= testData.excelData.countofEmployees) 
{
  await generateAndWriteEmployees(jsonFilePath, sheetName, numberOfEmployees);
  const excelFilePath = path.resolve(process.cwd(),testData.excelData.uploadmultipleDataFile);
  await EmployeePage.navigateToEmployee(page, locators);
  await EmployeePage.clickOnImportExcelSheetButton(locators);
  await EmployeePage.uploadEmployeeFile(locators, excelFilePath);
  await EmployeePage.clickOnSubmitButton(locators);
  await EmployeePage.verifyFileUploadSuccessToast(page);  
}


export async function deleteImportedEmployeesInEmployeeList(page:Page)
{
  const employeeIds = getAllEmployeeIds();
  const locators = EmployeePage.getEmployeeLocators(page);
  for(const empID of employeeIds)
  {
    await EmployeePage.searchEmployee(page, locators,empID);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await EmployeePage.clickOnDeleteCheckBox(locators);
    await EmployeePage.clickOnDeleteIcon(locators);
    await EmployeePage.verifyEmployeeDeletedToast(page);
    await page.waitForLoadState("domcontentloaded"); 
    await page.waitForTimeout(2000);   
    await EmployeePage.searchEmployee(page,locators,empID); 
    const employeeRow = page.locator(`.ag-cell[col-id="id"]:has-text("${empID}")`);
    await expect(employeeRow).toHaveCount(0);
  }
}