import test, { Page, expect } from '@playwright/test';
import { selectDropdownOption,calculateExpectedDays } from '../utils/CommonUtils';
import testData from '../testdata/StaticData.json';
import { fillInput, clickElement, verifyToast,verifyStatus } from '../utils/CommonActions';

interface DateRange {
  start: string;
  end: string;
}

interface SharedData {
  empID: string;
  email: string;
  password: string;
  appliedLeave?: DateRange;
}

export function getLocators(page: Page) {
  return {
    leaveManagementMenu: page.getByText('Leave Management', { exact: true }).first(),
    applyLeaveButton: page.locator('//button[text()="Apply Leave"]'),
    lopPopup: page.getByText('LOP Warning'),
    okButton :page.getByRole('dialog').getByRole('button', { name: 'Ok' }),
    fromDate: page.locator('#fromDate'),
    toDate: page.locator('#toDate'),
    noOfDaysLabel: page.locator('p', { hasText: 'No of Days :' }),
    selectLead: page.locator('select[name="lead"]'),
    subjectTextField: page.locator('input[name="subject"]'),
    reasonTextField: page.locator('textarea[name="reason"]'),
    leaveButton: page.locator('#leave'),
    workFromHomeButton: page.locator('#workFromHome'),
    submitButton: page.locator('//button[text()="Submit"]'),
    requestButton: page.locator('//button[text()="Requests"]'),
    empId: page.locator('input[aria-label="EMP ID Filter Input"]'),
    successLeaveToast: page.locator('//div[text()="Leave Applied Successfully"]'),
    successWFHToast: page.locator('//div[text()="WFH Applied Successfully"]'),
    rejectLeaveButton: page.locator('button.reject-btn'),
    rejectLeaveHeading: page.locator('//p[text()="Leave Reject"]'),
    rejectReason: page.locator('textarea.sc-jEACwC.brTKNx'),
    rejectLeaveSuccessToast: page.locator('//div[text()="Leave Rejected"]'),
    startDateFilter: page.getByLabel('START DATE Filter Input'),
    endDateFilter: page.getByLabel('END DATE Filter Input'),
    approveButton: page.locator('//button[text()="Approve"]'),
    wfhApprovedToast: page.locator('//div[text()="WFH Approved"]').first(),
    cancelButton:page.locator('//button[text()="Cancel"]'),
    leaveCancelHeading:page.locator('//p[text()="Leave Cancel"]'),
    leaveCancelReason:page.locator('textarea.sc-jEACwC.brTKNx'),
    leaveStatus:page.locator('//div[text()="Cancelled"]'),
    wfhStatus:page.locator('//div[text()="Cancelled"]'),
    initialLeaveCount:page.locator('.widget-card').filter({ hasText: 'Leaves Left' }).locator('.leave-status'),
    notificationIcon:page.locator('.notification-icon'),
    notificationText:page.locator('.notification-item p').first(),
  };
}
                
export async function clickLeaveManagementMenu(page: Page,locators: ReturnType<typeof getLocators>) {
  await locators.leaveManagementMenu.waitFor({ state: 'visible' });
  await clickElement(locators.leaveManagementMenu);
  await expect(page).toHaveURL(/leave_management/);
}

export async function clickApplyLeaveButton(locators: ReturnType<typeof getLocators>) {
  await clickElement(locators.applyLeaveButton);
}

export async function verifyLOPConfirmationPopup(locators: ReturnType<typeof getLocators>): Promise<void> {
  if (await locators.lopPopup.isVisible()) {
    await clickElement(locators.okButton);
  }
}
export async function clickLeaveButton(locators: ReturnType<typeof getLocators>) {
  await clickElement(locators.leaveButton);
}

export async function clickWorkFromHomeButton(locators: ReturnType<typeof getLocators>) {
  await clickElement(locators.workFromHomeButton);
}

export async function enterLeaveDates(locators: ReturnType<typeof getLocators>, from: string, to: string) {
  await fillInput(locators.fromDate,from);
  await fillInput(locators.toDate,to);
}

export async function getCalculatedDaysOnUI(locators: ReturnType<typeof getLocators>): Promise<string> {
  await locators.noOfDaysLabel.waitFor({ state: 'visible' });
  const fullText = await locators.noOfDaysLabel.innerText();
  return fullText.split(':')[1]?.trim() ?? '';
}

export async function selectLeadDropdown(locators: ReturnType<typeof getLocators>) {
  await selectDropdownOption(locators.selectLead, testData.employeeDetails.reportingTo);
}

export async function enterLeaveDetails(locators: ReturnType<typeof getLocators>) {
  await fillInput(locators.subjectTextField,testData.leaveData.subject);
  await fillInput(locators.reasonTextField,testData.leaveData.leaveReason);
}

export async function enterWorkFromHomeDetails(locators: ReturnType<typeof getLocators>) {
  await fillInput(locators.subjectTextField,testData.leaveData.subject);
  await fillInput(locators.reasonTextField,testData.leaveData.leaveReason);
}

export async function clickSubmitButton(locators: ReturnType<typeof getLocators>) {
  await expect(locators.submitButton).toBeEnabled();
  await clickElement(locators.submitButton);
}

export async function clickCancelButton(locators:ReturnType<typeof getLocators>){
  await clickElement(locators.cancelButton);
}

export async function enterCancelReason(locators:ReturnType<typeof getLocators>){
  await expect(locators.leaveCancelHeading).toBeVisible();
  await fillInput(locators.leaveCancelReason,testData.leaveData.cancelLeave);
}

export async function verifyLeaveCancelToast(page:Page){
  await verifyToast(page,testData.toastMessages.cancelAppliedLeave);
}

export async function verifyLeaveCancelInViewList(locators:ReturnType<typeof getLocators>){
  await verifyStatus(locators.leaveStatus,testData.leaveData.status.leave.cancelled);
}

export async function verifyLeaveApprovedInViewList(locators:ReturnType<typeof getLocators>){
  await verifyStatus(locators.leaveStatus,testData.leaveData.status.leave.approved);
}

export async function verifyWFHCancelToast(page:Page){
  await verifyToast(page,testData.toastMessages.cancelAppliedWFH);
}

export async function verifyWFHCancelInViewList(locators:ReturnType<typeof getLocators>){
  await verifyStatus(locators.wfhStatus,testData.workFromHomeData.status.wfh.cancelled);
}

export async function verifyLeaveSuccessToast(page: Page) {
  await verifyToast(page,testData.toastMessages.applyLeaveSuccess);
}

export async function verifyWFHSuccessToast(page: Page) {
  await verifyToast(page,testData.toastMessages.applyWFHSuccess);

}

export async function clickRequestButton(locators: ReturnType<typeof getLocators>) {
  await locators.requestButton.waitFor({state:'visible'});
  await clickElement(locators.requestButton);
}

export async function searchEmployee(locators: ReturnType<typeof getLocators>, sharedData: SharedData) {

  if (!sharedData.empID) {
    throw new Error('empID not found in SharedData');
  }
  await locators.empId.waitFor({state:'visible'});
  await fillInput(locators.empId,sharedData.empID);
}

export async function scrollToRightAndReject(page: Page,locators: ReturnType<typeof getLocators>): Promise<void> {

  const firstRow = page.locator('.ag-center-cols-container .ag-row').first();
  await firstRow.waitFor({ state: 'visible' });
  await page.evaluate(() => {
    const viewport = document.querySelector('.ag-body-horizontal-scroll-viewport') as HTMLElement | null;

    if (viewport) {viewport.scrollLeft = viewport.scrollWidth;}
  });
  const rejectLeaveButton = locators.rejectLeaveButton.first();
  await rejectLeaveButton.waitFor({ state: 'visible' });
  await clickElement(rejectLeaveButton);
}

export async function rejectLeave(page: Page,locators: ReturnType<typeof getLocators>) {
  await locators.rejectLeaveHeading.waitFor({ state: 'visible' });
  await fillInput(locators.rejectReason,testData.leaveData.rejectLeave);
  await clickElement(locators.submitButton);
  await verifyToast(page,testData.toastMessages.rejectLeave);
}

export async function rejectWorkFromHome(page: Page,locators: ReturnType<typeof getLocators>) {
  await locators.rejectLeaveHeading.waitFor({ state: 'visible' });
  await fillInput(locators.rejectReason,testData.leaveData.rejectLeave);
  await clickElement(locators.submitButton);
  await verifyToast(page,testData.toastMessages.rejectWFH);
}

export async function scrollToRightAndApproveWorkFromHome(page: Page,locators: ReturnType<typeof getLocators>): Promise<void> {

  const firstRow = page.locator('.ag-center-cols-container .ag-row').first();
  await firstRow.waitFor({ state: 'visible' });
  await page.evaluate(() => {
    const viewport = document.querySelector('.ag-body-horizontal-scroll-viewport') as HTMLElement | null;

    if (viewport) {viewport.scrollLeft = viewport.scrollWidth;}
  });
  const approveBtn = locators.approveButton.first();
  await approveBtn.waitFor({ state: 'visible' });
  await clickElement(approveBtn);
}

export async function scrollToRightAndCancelLeave(page: Page,locators: ReturnType<typeof getLocators>): Promise<void> {

  const firstRow = page.locator('.ag-center-cols-container .ag-row').first();
  await firstRow.waitFor({ state: 'visible' });
  await page.evaluate(() => {
    const viewport = document.querySelector('.ag-body-horizontal-scroll-viewport') as HTMLElement | null;

    if (viewport) {viewport.scrollLeft = viewport.scrollWidth;}
  });
  const cancelBtn = locators.cancelButton.first();
  await cancelBtn.waitFor({ state: 'visible' });
  await clickElement(cancelBtn);
}

export async function getInitialLeaveCount(locators: ReturnType<typeof getLocators>)
{
  const initialLeaveCount = Number(await locators.initialLeaveCount.innerText());
  console.log("initial leavecount"+initialLeaveCount);
  return initialLeaveCount;
}

export async function verifyApprovedWFHToast(page:Page)
{
  await verifyToast(page,testData.toastMessages.approveWFHSuccess);
}

export async function validateLeaveCount(dateRange:DateRange,initialLeaveCount: number,locators: ReturnType<typeof getLocators>){
  const appliedLeaveCount=Number(calculateExpectedDays(dateRange.start, dateRange.end));
  console.log("applied leavecount:"+appliedLeaveCount);
  await expect(locators.initialLeaveCount).not.toHaveText(initialLeaveCount.toString());
  const updatedLeaveCount = Number(await locators.initialLeaveCount.innerText());
  console.log("updated leavecount:"+updatedLeaveCount);
  const expectedLeaveCount = initialLeaveCount - appliedLeaveCount;
  console.log("expectedleavecounte"+expectedLeaveCount);
  expect(updatedLeaveCount).toBe(expectedLeaveCount);
}

export async function verifyApprovedLeaveToast(page:Page)
{
  await verifyToast(page,testData.toastMessages.approveLeaveSuccess);
}

export async function clickNotificationIcon(locators: ReturnType<typeof getLocators>){
  await clickElement(locators.notificationIcon);
}
 
