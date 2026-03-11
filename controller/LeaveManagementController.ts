import { Page, expect } from '@playwright/test';
import * as LeavePage from '../pages/LeaveManagementPage';
import { calculateExpectedDays } from '../utils/CommonUtils';
import * as LoginPage from '../pages/LoginPage';
import * as MenuPage from '../pages/DashboardPage';
import testData from '../testdata/StaticData.json';
import * as EmployeeController from '../controller/EmployeeController';
import * as EmployeePage from '../pages/EmployeePage';
import fs from 'fs';
import path from 'path';

interface DateRange {
  start: string;
  end: string;
}

interface LoginData {
  url: string;
  username: string;
  password: string;
}


export interface SharedData {
  empID: string;
  email: string;
  password: string;
  firstname:string;
  lastname:string;
}


function getSharedEmployeeData(): SharedData {
  const relativepath=testData.employeeDetails.sharedEmployeeJsonFile;
  const filePath = path.join(process.cwd(), relativepath);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}


function getAdminLoginData(): LoginData {
  const relativepath=testData.employeeDetails.employeeDataJsonFile;
  const filePath = path.join(process.cwd(), relativepath);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(rawData);

  return parsed.login_Data;
}


export async function loginWithNewUser(page:Page,sharedData: SharedData){
    if (!sharedData.email || !sharedData.password) {
    throw new Error('Email or password missing in SharedData');
  }
  await page.goto('/');
  await MenuPage.clickOnLogOutMenu(page);
  await MenuPage.clickOnConfirmButton(page);
  await expect(page).toHaveURL(/login/);

  await LoginPage.enterUserName(page, sharedData.email);
  await LoginPage.enterPassword(page, sharedData.password);
  await LoginPage.clickOnLoginButton(page);
}


export async function applyLeave(page: Page,dateRange: DateRange): Promise<number> {
  const locators = LeavePage.getLocators(page);
  await LeavePage.clickLeaveManagementMenu(page,locators);
  await LeavePage.clickApplyLeaveButton(locators);
  await LeavePage.verifyLOPConfirmationPopup(locators);
  await LeavePage.enterLeaveDates(locators, dateRange.start, dateRange.end);
  const expectedDays = calculateExpectedDays(dateRange.start, dateRange.end);
  const actualDays = await LeavePage.getCalculatedDaysOnUI(locators);
  if (actualDays === '0') {
    throw new Error('Dates already applied.');
  }
  if (actualDays !== expectedDays) {
    throw new Error(`Expected ${expectedDays} days but got ${actualDays}`);
  }
  await LeavePage.selectLeadDropdown(locators);
  await LeavePage.enterLeaveDetails(locators);
  await LeavePage.clickLeaveButton(locators);
  await LeavePage.clickSubmitButton(locators);
  await LeavePage.verifyLeaveSuccessToast(page);

  return Number(expectedDays);
}


export async function applyWorkFromHome(page: Page,dateRange: DateRange,): Promise<number> {
  const locators = LeavePage.getLocators(page);
  await LeavePage.clickLeaveManagementMenu(page,locators);
  await LeavePage.clickApplyLeaveButton(locators);
  await LeavePage.verifyLOPConfirmationPopup(locators);
  await LeavePage.enterLeaveDates(locators, dateRange.start, dateRange.end);
  const expectedDays = calculateExpectedDays(dateRange.start, dateRange.end);
  const actualDays = await LeavePage.getCalculatedDaysOnUI(locators);
  if (actualDays === '0') {
    throw new Error('Dates already applied.');
  }
  if (actualDays !== expectedDays) {
    throw new Error(`Expected ${expectedDays} days but got ${actualDays}`);
  }
  await LeavePage.selectLeadDropdown(locators);
  await LeavePage.enterWorkFromHomeDetails(locators);
  await LeavePage.clickWorkFromHomeButton(locators);
  await LeavePage.clickSubmitButton(locators);
  await LeavePage.verifyWFHSuccessToast(page);

  return Number(expectedDays);
}


export async function loginAsAdmin(page: Page): Promise<void> {

  const loginData = getAdminLoginData();
  await MenuPage.clickOnLogOutMenu(page);
  await MenuPage.clickOnConfirmButton(page);
  await expect(page).toHaveURL(/login/);
  await LoginPage.enterUserName(page, loginData.username);
  await LoginPage.enterPassword(page, loginData.password);
  await LoginPage.clickOnLoginButton(page);
  await expect(page).not.toHaveURL(/login/);
}


export async function rejectAppliedLeave(page: Page,expectedDays: number): Promise<void> {
  const locators = LeavePage.getLocators(page);
  const sharedData = getSharedEmployeeData();
  await loginAsAdmin(page);
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  await validateLeaveNotification(page,sharedData,expectedDays);
  await LeavePage.clickLeaveManagementMenu(page,locators);
  await LeavePage.clickRequestButton(locators);
  await LeavePage.searchEmployee(locators,sharedData);
  await LeavePage.scrollToRightAndReject(page,locators);
  await LeavePage.rejectLeave(page,locators);
}


export async function approveAppliedLeave(page:Page,expectedDays: number):Promise<void>{
  const locators=LeavePage.getLocators(page);
  const sharedData=getSharedEmployeeData();

  await loginAsAdmin(page);
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  await validateLeaveNotification(page,sharedData,expectedDays);
  await LeavePage.clickLeaveManagementMenu(page,locators);
  await LeavePage.clickRequestButton(locators);
  await LeavePage.searchEmployee(locators,sharedData);
  await page.waitForTimeout(2000);
  await LeavePage.scrollToRightAndApproveWorkFromHome(page,locators);  
  await LeavePage.verifyApprovedLeaveToast(page);
}


export async function approveAppliedWorkFromHome(page:Page):Promise<void>{
    const locators = LeavePage.getLocators(page);  
    const sharedData = getSharedEmployeeData();
    await loginAsAdmin(page);
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await LeavePage.clickLeaveManagementMenu(page,locators);
    await LeavePage.clickRequestButton(locators);
    await LeavePage.searchEmployee(locators,sharedData);
    await LeavePage.scrollToRightAndApproveWorkFromHome(page,locators);
    await LeavePage.verifyApprovedWFHToast(page);
}


export async function rejectAppliedWorkFromHome(page:Page):Promise<void>{
    const locators = LeavePage.getLocators(page);  
    const sharedData = getSharedEmployeeData();
    await loginAsAdmin(page);
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await LeavePage.clickLeaveManagementMenu(page,locators);
    await LeavePage.clickRequestButton(locators);
    await LeavePage.searchEmployee(locators,sharedData);
    await LeavePage.scrollToRightAndReject(page,locators);
    await LeavePage.rejectWorkFromHome(page,locators);
}


export async function deleteEmployeeAfterApplyLeaveOrWorkFromHome(page:Page):Promise<void>{
  const locators = EmployeePage.getEmployeeLocators(page);
  await loginAsAdmin(page);
  await EmployeePage.navigateToEmployee(page,locators); 
  await await EmployeeController.deleteEmployeeDetails(page, locators);
  
}


export async function deleteEmployeeAfterRejectingLeaveOrWorkFromHome(page:Page):Promise<void>{
  const locators = EmployeePage.getEmployeeLocators(page);
  await EmployeePage.navigateToEmployee(page,locators); 
  await await EmployeeController.deleteEmployeeDetails(page, locators);
}


export async function deleteEmployeeAfterApprovingWorkFromHomeOrLeave(page:Page):Promise<void>{
  const locators = EmployeePage.getEmployeeLocators(page);
  await EmployeePage.navigateToEmployee(page,locators); 
  await await EmployeeController.deleteEmployeeDetails(page, locators);
}


export async function cancelAppliedLeave(page:Page):Promise<void>{
  const locators = LeavePage.getLocators(page);
  await LeavePage.scrollToRightAndCancelLeave(page,locators);
  await LeavePage.enterCancelReason(locators);
  await LeavePage.clickSubmitButton(locators);
  await LeavePage.verifyLeaveCancelToast(page);
  await LeavePage.verifyLeaveCancelInViewList(locators)
}


export async function cancelAppliedWorkFromHome(page:Page):Promise<void>
{
  const locators = LeavePage.getLocators(page);
  await LeavePage.scrollToRightAndCancelLeave(page,locators);
  await LeavePage.enterCancelReason(locators);
  await LeavePage.clickSubmitButton(locators);
  await LeavePage.verifyWFHCancelToast(page);
  await LeavePage.verifyWFHCancelInViewList(locators);
}


export async function verifyLeaveCountAfterApprovingLeave(page:Page,sharedData:SharedData,initialLeaveCount: number,dateRange:DateRange)
{
   const locators=LeavePage.getLocators(page);
   await loginWithNewUser(page,sharedData);
   await page.reload();
   await page.waitForLoadState('domcontentloaded');
   await LeavePage.clickLeaveManagementMenu(page,locators);   
   await LeavePage.validateLeaveCount(dateRange,initialLeaveCount,locators);
}

export async function validateLeaveNotification(page: Page,sharedData: SharedData,expectedDays: number) {

  const locators=LeavePage.getLocators(page);

  await LeavePage.clickNotificationIcon(locators);
  await expect(locators.notificationText).toBeVisible();
  const text = await locators.notificationText.innerText();
  console.log("Notification text:", text);
  const match = text.match(testData.notificationTexts.requestLeave);

  const actualName = match?.[1];
  const actualDays = Number(match?.[2]);
  const expectedName = `${sharedData.firstname} ${sharedData.lastname}`;
  expect(actualName).toBe(expectedName);
  expect(actualDays).toBe(expectedDays);
}

