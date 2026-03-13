import { Page, expect } from '@playwright/test';
import { fillInput, clickElement,verifyToast, verifyToastMessage, getTodayDate } from '../utils/CommonActions';
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
    rowCheckBox: page.locator('input[aria-label*="row selection"]'),
    deleteIcon: page.locator('button[class="deleteIcon"]'),
    importExcelSheetButton: page.locator('//button[text()="Import Excel Sheet"]'),
    fileInput: page.locator('input[type="file"]'),
    duplicateEmployeeErrorMessage:page.locator('//p[text()="Employee with ID or Email already exists."]'),
  };
}

export async function navigateToEmployee(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await page.waitForLoadState('domcontentloaded');
  await locators.employeesMenu.waitFor({ state: 'visible', timeout: 10000 });
  await expect(locators.employeesMenu).toBeVisible();
  await clickElement(locators.employeesMenu);
  await expect(page).toHaveURL(/allemployees/);
}

export async function clickOnAddEmployeeButton(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await locators.addEmployeeButton.waitFor({ state: 'visible' });
  await expect(locators.addEmployeeButton).toBeVisible();
  await clickElement(locators.addEmployeeButton);
  await page.locator('p', { hasText: 'Add Employee' }).waitFor({ state: 'visible' });
}

export async function enterFirstName(locators: ReturnType<typeof getEmployeeLocators>, employee: GeneratedEmployee) {
   await expect(locators.firstNameField).toBeVisible();
  await fillInput(locators.firstNameField,employee.firstname);
}

export async function enterLastName( locators: ReturnType<typeof getEmployeeLocators>, employee: GeneratedEmployee) {
  await expect(locators.lastNameField).toBeVisible(); 
  await fillInput(locators.lastNameField,employee.lastname);
}

export async function enterEmployeeId(locators: ReturnType<typeof getEmployeeLocators>, empID: string) {
  await expect(locators.employeeIdField).toBeVisible();
  await fillInput(locators.employeeIdField,empID);
}

export async function enterDuplicateEmployeeID(locators:ReturnType<typeof getEmployeeLocators>,duplicateEmpID:string){
  await expect(locators.employeeIdField).toBeVisible();
  await fillInput(locators.employeeIdField,duplicateEmpID);
}

export async function enterInvalidEmpID(locators:ReturnType<typeof getEmployeeLocators>,invalidEmployeeID:string){
  await expect(locators.employeeIdField).toBeVisible();
  await fillInput(locators.employeeIdField,invalidEmployeeID);
}

export async function enterEmail(locators: ReturnType<typeof getEmployeeLocators>, email: string) {
  await expect(locators.emailField).toBeVisible();
  await fillInput(locators.emailField,email);
}

export async function enterInvalidEmail(locators:ReturnType<typeof getEmployeeLocators>,invalidEmail:string){
  await expect(locators.emailField).toBeVisible();
  await fillInput(locators.emailField,invalidEmail);
}

export async function enterDuplicateEmail(locators:ReturnType<typeof getEmployeeLocators>, duplicateEmail:string){
   await expect(locators.emailField).toBeVisible();
  await fillInput(locators.emailField,duplicateEmail); 
}

export async function enterPassword( locators: ReturnType<typeof getEmployeeLocators>, password: string) {
   await expect(locators.passwordField).toBeVisible();
  await fillInput(locators.passwordField,password);
}

export async function enterInvalidPassword(locators:ReturnType<typeof getEmployeeLocators>)
{
  await expect(locators.passwordField).toBeVisible();
  await fillInput(locators.passwordField,testData.invalidEmployeeDetails.invalidPassword);
}

export async function selectRole(locators: ReturnType<typeof getEmployeeLocators>, role: string) {
   await expect(locators.roleDropdown).toBeVisible();
  await selectDropdownOption(locators.roleDropdown, role);
}

export async function enterDateOfBirth(locators: ReturnType<typeof getEmployeeLocators>, employee: any) {
   await expect(locators.dobField).toBeVisible();
  await fillInput(locators.dobField,employee.dob);
}

export async function enterInvalidDOB(locators:ReturnType<typeof getEmployeeLocators>){
  await expect(locators.dobField).toBeVisible();
  const today=getTodayDate();
  await fillInput(locators.dobField,today);
}

export async function enterJoiningDate(locators: ReturnType<typeof getEmployeeLocators>, employee: any) {
   await expect(locators.joiningDate).toBeVisible();
  await fillInput(locators.joiningDate,employee.joiningDate);  
}

export async function selectBloodGroup( locators: ReturnType<typeof getEmployeeLocators>, bloodgroup: string) {
   await expect(locators.bloodgroupDropdown).toBeVisible();
  await selectDropdownOption(locators.bloodgroupDropdown, bloodgroup);
}

export async function selectQualification(locators: ReturnType<typeof getEmployeeLocators>, qualification: string) {
   await expect(locators.qualificationsDropdown).toBeVisible();
  await selectDropdownOption(locators.qualificationsDropdown, qualification);
}

export async function enterDepartment(locators: ReturnType<typeof getEmployeeLocators>, department: string) {
   await expect(locators.departmentField).toBeVisible();
  await fillInput(locators.departmentField,department);
}

export async function selectGender( locators: ReturnType<typeof getEmployeeLocators>, gender: string) {
   await expect(locators.genderDropdown).toBeVisible();
  await selectDropdownOption(locators.genderDropdown, gender);
}

export async function enterMobileNumber( locators: ReturnType<typeof getEmployeeLocators>, mobileNumber: string) {
   await expect(locators.mobileNumberField).toBeVisible();
  await fillInput(locators.mobileNumberField,mobileNumber);
}

export async function enterInvalidMobileNumber(locators: ReturnType<typeof getEmployeeLocators>){
  await expect(locators.mobileNumberField).toBeVisible();
  await fillInput(locators.mobileNumberField,testData.invalidEmployeeDetails.invalidMobileNumber);
}

export async function enterDesignation(locators: ReturnType<typeof getEmployeeLocators>, designation: string) {
   await expect(locators.designationField).toBeVisible();
  await fillInput(locators.designationField,designation);
}

export async function enterSalary(locators: ReturnType<typeof getEmployeeLocators>, salary: string) {
   await expect(locators.salaryField).toBeVisible();
  await fillInput(locators.salaryField,salary);
}

export async function enterLocation( locators: ReturnType<typeof getEmployeeLocators>, location: string) {
  await expect(locators.locationField).toBeVisible();
  await fillInput(locators.locationField,location);
}

export async function selectReportingTo(locators: ReturnType<typeof getEmployeeLocators>, reportingTo: string) {
  await expect(locators.reportingToDropdown).toBeVisible();
  await locators.reportingToDropdown.selectOption({ label: reportingTo });
}

export async function clickOnAddButton(locators: ReturnType<typeof getEmployeeLocators>) {
  await expect(locators.addButton).toBeVisible();
  await clickElement(locators.addButton);
}

export async function verifyEmployeeCreatedToast(page: Page) {
  await verifyToast(page,testData.toastMessages.createSuccess);
}

export async function verifyEmployeeCreatedSuccesToast(page:Page){
  await verifyToastMessage(page,testData.toastMessages.createSuccess);
}

export async function validateduplicateEmployeeErrorMessage(locators: ReturnType<typeof getEmployeeLocators>){
  await expect(locators.duplicateEmployeeErrorMessage).toBeVisible();
}

export async function searchEmployee(page: Page,locators: ReturnType<typeof getEmployeeLocators>,employeeId: string){
   await expect(locators.searchEmpIdField).toBeVisible();
  await fillInput(locators.searchEmpIdField,employeeId);
  await page.keyboard.press('Enter');
}

export async function clickOnEditIcon(locators: ReturnType<typeof getEmployeeLocators>) {
   await expect(locators.editIcon).toBeVisible();
  await clickElement(locators.editIcon.first());
}

export async function checkCertificates(page: Page, locators: ReturnType<typeof getEmployeeLocators>, certificates: string[] = []) {
  await expect(locators.certificateDropdown).toBeVisible();
  await clickElement(locators.certificateDropdown);
  await handleCheckboxes(page, certificates);
}

export async function clickOnSubmitButton( locators: ReturnType<typeof getEmployeeLocators>) {
  await expect(locators.submitButton).toBeVisible();
  await clickElement(locators.submitButton);
}

export async function verifyEmployeeUpdatedToast(page: Page, locators: ReturnType<typeof getEmployeeLocators>) {
  await verifyToast(page,testData.toastMessages.updateSuccess);
}

export async function clickOnDeleteCheckBox(locators: ReturnType<typeof getEmployeeLocators>){
  await locators.rowCheckBox.waitFor({state:'visible',timeout: 5000 })
  await expect(locators.rowCheckBox).toBeVisible();
  await clickElement(locators.rowCheckBox);
}

export async function clickOnDeleteIcon(locators: ReturnType<typeof getEmployeeLocators>) {
  await locators.deleteIcon.waitFor({state:'visible',timeout: 5000 })
  await expect(locators.deleteIcon).toBeVisible();
  await clickElement(locators.deleteIcon);
}

export async function verifyEmployeeDeletedToast(page:Page){
  await verifyToast(page,testData.toastMessages.deleteSuccess);
}

export async function clickOnImportExcelSheetButton( locators: ReturnType<typeof getEmployeeLocators>) {
  await expect(locators.importExcelSheetButton).toBeVisible();
  await clickElement(locators.importExcelSheetButton);
}

export async function uploadEmployeeFile( locators: ReturnType<typeof getEmployeeLocators>, filePath: string) 
{
  await expect(locators.fileInput).toBeVisible();
  await locators.fileInput.setInputFiles(path.resolve(filePath));
}

export async function verifyFileUploadSuccessToast(page:Page)
{
  await verifyToast(page,testData.toastMessages.fileUploadSuccess);
}