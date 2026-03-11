import { Page, expect } from '@playwright/test';
import { fillInput, clickElement,verifyToast } from '../utils/CommonActions';
import { selectDropdownOption, handleCheckboxes } from '../utils/CommonUtils';
import testData from '../testdata/StaticData.json';
import path from 'path';
import { GeneratedEmployee } from '../utils/CommonUtils';
 
export function getEmployeeLocators(page: Page) {
  return {
    employeesMenu: page.getByText('Employees', { exact: true }).first(),
    addEmployeeButton: page.getByText('Add Employee'),
    firstNameField: page.locator('input[name="firstName"]'),
    lastNameField: page.locator('input[name="lastName"]'),
    employeeIdField: page.locator('#employeeID'),
    emailField: page.locator('input[name="email"]'),
    roleDropdown: page.locator('#role'),
    passwordField: page.locator('input[name="password"]'),
    dobField: page.locator('input[name="dob"]'),
    joiningDate: page.locator('input[name="joiningDate"]'),
    qualificationsDropdown: page.locator('#qualifications'),
    departmentField: page.locator('input[name="department"]'),
    genderDropdown: page.locator('#gender'),
    mobileNumberField: page.locator('input[name="mobileNumber"]'),
    bloodgroupDropdown: page.locator('#bloodGroup'),
    designationField: page.locator('input[name="designation"]'),
    salaryField: page.locator('#salary'),
    locationField: page.locator('input[name="location"]'),
    reportingToDropdown: page.locator('#reportingTo'),
    addButton: page.locator('button[type="submit"]'),
    submitButton: page.locator('//button[text()="Submit"]'),
    searchEmpIdField: page.locator('input[aria-label="EMP ID Filter Input"]'),
    editIcon: page.locator('svg[style*="cursor: pointer"]'),
    certificateDropdown: page.getByRole('button', { name: 'Certificates' }),
    rowCheckBox: page.locator('.ag-row .ag-selection-checkbox'),
    deleteIcon: page.locator('svg:has(path[d*="M6 19c0 1.1"])'),
    importExcelSheetButton: page.locator('//button[text()="Import Excel Sheet"]'),
    fileInput: page.locator('input[type="file"]'),
  };
}

export async function navigateToEmployee(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await page.waitForLoadState('domcontentloaded');
  await locators.employeesMenu.waitFor({ state: 'visible', timeout: 10000 });
  await clickElement(locators.employeesMenu);
  await expect(page).toHaveURL(/allemployees/);
}

export async function clickOnAddEmployeeButton(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await locators.addEmployeeButton.waitFor({ state: 'visible' });
  await clickElement(locators.addEmployeeButton);
  await page.locator('p', { hasText: 'Add Employee' }).waitFor({ state: 'visible' });
}

export async function enterFirstName(page: Page, locators: ReturnType<typeof getEmployeeLocators>, employee: GeneratedEmployee) {
  await fillInput(locators.firstNameField,employee.firstname);
}

export async function enterLastName(page: Page, locators: ReturnType<typeof getEmployeeLocators>, employee: GeneratedEmployee) {
   await fillInput(locators.lastNameField,employee.lastname);
}

export async function enterEmployeeId(page: Page, locators: ReturnType<typeof getEmployeeLocators>, empID: string) {
  await fillInput(locators.employeeIdField,empID);
}

export async function enterEmail(page: Page, locators: ReturnType<typeof getEmployeeLocators>, email: string) {
  await fillInput(locators.emailField,email);
}

export async function enterPassword(page: Page, locators: ReturnType<typeof getEmployeeLocators>, password: string) {
  await fillInput(locators.passwordField,password);
}

export async function selectRole(page: Page, locators: ReturnType<typeof getEmployeeLocators>, role: string) {
  await selectDropdownOption(locators.roleDropdown, role);
}

export async function enterDateOfBirth(page: Page, locators: ReturnType<typeof getEmployeeLocators>, employee: any) {
  await fillInput(locators.dobField,employee.dob);
}

export async function enterJoiningDate(page: Page, locators: ReturnType<typeof getEmployeeLocators>, employee: any) {
  await fillInput(locators.joiningDate,employee.joiningDate);  
}

export async function selectBloodGroup(page: Page, locators: ReturnType<typeof getEmployeeLocators>, bloodgroup: string) {
  await selectDropdownOption(locators.bloodgroupDropdown, bloodgroup);
}

export async function selectQualification(page: Page, locators: ReturnType<typeof getEmployeeLocators>, qualification: string) {
  await selectDropdownOption(locators.qualificationsDropdown, qualification);
}

export async function enterDepartment(page: Page, locators: ReturnType<typeof getEmployeeLocators>, department: string) {
  await fillInput(locators.departmentField,department);
}

export async function selectGender(page: Page, locators: ReturnType<typeof getEmployeeLocators>, gender: string) {
  await selectDropdownOption(locators.genderDropdown, gender);
}

export async function enterMobileNumber(page: Page, locators: ReturnType<typeof getEmployeeLocators>, mobileNumber: string) {
  await fillInput(locators.mobileNumberField,mobileNumber);
}

export async function enterDesignation(page: Page, locators: ReturnType<typeof getEmployeeLocators>, designation: string) {
  await fillInput(locators.designationField,designation);
}

export async function enterSalary(page: Page, locators: ReturnType<typeof getEmployeeLocators>, salary: string) {
  await fillInput(locators.salaryField,salary);
}

export async function enterLocation(page: Page, locators: ReturnType<typeof getEmployeeLocators>, location: string) {
  await fillInput(locators.locationField,location);
}

export async function selectReportingTo(page: Page, locators: ReturnType<typeof getEmployeeLocators>, reportingTo: string) {
  await locators.reportingToDropdown.selectOption({ label: reportingTo });
}

export async function clickOnAddButton(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await clickElement(locators.addButton);
}

export async function verifyEmployeeCreatedToast(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await verifyToast(page,testData.toastMessages.createSuccess);
}

export async function searchEmployee(page: Page,locators: ReturnType<typeof getEmployeeLocators>,employeeId: string){
  await fillInput(locators.searchEmpIdField,employeeId);
  await page.keyboard.press('Enter');
}

export async function clickOnEditIcon(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await clickElement(locators.editIcon.first());
}

export async function checkCertificates(page: Page, locators: ReturnType<typeof getEmployeeLocators>, certificates: string[] = []) {
  await clickElement(locators.certificateDropdown);
  await handleCheckboxes(page, certificates);
}

export async function clickOnSubmitButton(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await clickElement(locators.submitButton);
}

export async function verifyEmployeeUpdatedToast(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await verifyToast(page,testData.toastMessages.updateSuccess);
}

export async function clickOnDeleteCheckBox(page: Page,locators: ReturnType<typeof getEmployeeLocators>){
  await clickElement(locators.rowCheckBox.first());
}

export async function clickOnDeleteIcon(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await clickElement(locators.deleteIcon);
}

export async function verifyEmployeeDeletedToast(page:Page,locators:ReturnType<typeof getEmployeeLocators>){
   await verifyToast(page,testData.toastMessages.deleteSuccess);
}

export async function clickOnImportExcelSheetButton(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await clickElement(locators.importExcelSheetButton);
}

export async function uploadEmployeeFile(page: Page, locators: ReturnType<typeof getEmployeeLocators>, filePath: string) 
{
  await locators.fileInput.setInputFiles(path.resolve(filePath));
}

export async function verifyFileUploadSuccessToast(page:Page,locator:ReturnType<typeof getEmployeeLocators>)
{
  await verifyToast(page,testData.toastMessages.fileUploadSuccess);
}