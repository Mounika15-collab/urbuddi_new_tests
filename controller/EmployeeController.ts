import { Page } from '@playwright/test';
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


interface SharedData {
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
  await EmployeePage.enterFirstName(page, locators, data);
  await EmployeePage.enterLastName(page, locators, data);
  await EmployeePage.enterEmployeeId(page, locators, data.empID);
  await EmployeePage.enterEmail(page, locators, data.email);
  await EmployeePage.selectRole(page, locators, data.role);
  await EmployeePage.enterPassword(page, locators, data.employeePassword);
  await EmployeePage.enterDateOfBirth(page, locators, data);
  await EmployeePage.enterJoiningDate(page, locators, data);
  await EmployeePage.selectBloodGroup(page, locators, data.bloodgroup);
  await EmployeePage.selectQualification(page, locators, data.qualification);
  await EmployeePage.enterDepartment(page, locators, data.department);
  await EmployeePage.selectGender(page, locators, data.gender);
  await EmployeePage.enterMobileNumber(page, locators, data.mobileNumber);
  await EmployeePage.enterDesignation(page, locators, data.designation);
  await EmployeePage.enterSalary(page, locators, data.salary);
  await EmployeePage.enterLocation(page, locators, data.location);
  await EmployeePage.selectReportingTo(page, locators, data.reportingTo);
  await EmployeePage.clickOnAddButton(page, locators);
  await EmployeePage.verifyEmployeeCreatedToast(page, locators);
  
  appendFakerEmployeeToExcel(data);
  await writeBackToSharedData(data);
}

export async function updateEmployeeDetails(page: Page,locators: ReturnType<typeof EmployeePage.getEmployeeLocators>,
  data: FullEmployee): Promise<void> {
  const employeeDataFromExcel = getEmployeeIdAndEmails();
  const empID = employeeDataFromExcel.empID;
  await EmployeePage.searchEmployee(page, locators,empID);
  await EmployeePage.clickOnEditIcon(page, locators);
  await EmployeePage.checkCertificates(page, locators, data.certificates);
  await EmployeePage.clickOnSubmitButton(page, locators);
  await EmployeePage.verifyEmployeeUpdatedToast(page, locators);
}

export async function deleteEmployeeDetails(page: Page,locators: ReturnType<typeof EmployeePage.getEmployeeLocators>): Promise<void> 
 {
  const employeeDataFromExcel = getEmployeeIdAndEmails();
  const empID = employeeDataFromExcel.empID;
  await EmployeePage.searchEmployee(page, locators,empID);
  await page.waitForLoadState('networkidle');
  await EmployeePage.clickOnDeleteCheckBox(page, locators);
  await EmployeePage.clickOnDeleteIcon(page, locators);
  await EmployeePage.verifyEmployeeDeletedToast(page,locators);
  await page.waitForLoadState("domcontentloaded");
  // await page.waitForTimeout(2000);
  // await EmployeePage.searchEmployee(page, locators, empID);
  // const employeeRow = page.locator(`.ag-cell[col-id="id"]:has-text("${empID}")`);
  // await expect(employeeRow).toHaveCount(0,{timeout:5000});
}

export async function uploadMultipleEmployeeData(page: Page,locators: ReturnType<typeof EmployeePage.getEmployeeLocators>,
  jsonFilePath: string,
  sheetName: string= testData.excelData.sheetName,
  numberOfEmployees: number= testData.excelData.countofEmployees) 
{
  await generateAndWriteEmployees(jsonFilePath, sheetName, numberOfEmployees);
  const excelFilePath = path.resolve(process.cwd(),testData.excelData.uploadmultipleDataFile);
  await EmployeePage.navigateToEmployee(page, locators);
  await EmployeePage.clickOnImportExcelSheetButton(page, locators);
  await EmployeePage.uploadEmployeeFile(page, locators, excelFilePath);
  await EmployeePage.clickOnSubmitButton(page, locators);
  await EmployeePage.verifyFileUploadSuccessToast(page, locators);  
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
    await EmployeePage.clickOnDeleteCheckBox(page, locators);
    await EmployeePage.clickOnDeleteIcon(page, locators);
    await EmployeePage.verifyEmployeeDeletedToast(page,locators);
    await page.waitForLoadState("domcontentloaded"); 
    // await page.waitForTimeout(2000);   
    // await EmployeePage.searchEmployee(page,locators,empID); 
    // const employeeRow = page.locator(`.ag-cell[col-id="id"]:has-text("${empID}")`);
    // await expect(employeeRow).toHaveCount(0);
  }
}