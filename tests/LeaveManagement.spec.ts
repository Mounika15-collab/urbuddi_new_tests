import { test} from '@playwright/test';
import * as EmployeeController from '../controller/EmployeeController';
import { getEmployeeDataFromJSON, FullEmployee } from '../controller/EmployeeController';
import * as EmployeePage from '../pages/EmployeePage';
import {generateUniqueDates} from '../utils/CommonUtils';
import { SharedData } from '../controller/LeaveManagementController';
import * as LeaveManagementController from '../controller/LeaveManagementController';
import testData from '../testdata/StaticData.json';
import * as leavePage from '../pages/LeaveManagementPage';
import fs from 'fs';
import path from 'path';


interface DateRange {
  start: string;
  end: string;
}

function getSharedEmployee(): SharedData {
  const relativePath=testData.employeeDetails.sharedEmployeeJsonFile;
  const filePath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test.describe('Leave Management Tests - @Regression', () => 
{
  let employeeData: FullEmployee;
  let dateRange:DateRange;
  let sharedData: SharedData; 

  test.beforeEach(async ({ page }) => {
    employeeData = getEmployeeDataFromJSON();
    const locators = EmployeePage.getEmployeeLocators(page);
    await page.goto('/');
    await EmployeeController.addEmployeeDetails(page, locators, employeeData);
    sharedData = getSharedEmployee();
    await LeaveManagementController.loginWithNewUser(page, sharedData);
    dateRange = await generateUniqueDates(1);
  });

  test('User is able to apply leave',async({ page })=>{
   await LeaveManagementController.applyLeave(page, dateRange);
   await LeaveManagementController.deleteEmployeeAfterApplyLeaveOrWorkFromHome(page);
  });

  test('Lead is able to reject applied leave',async({ page })=>{
    const expectedDays=await LeaveManagementController.applyLeave(page,dateRange);
    await LeaveManagementController.rejectAppliedLeave(page,expectedDays);
    await LeaveManagementController.deleteEmployeeAfterRejectingLeaveOrWorkFromHome(page);
  })

  test.only('Lead is able to approve applied leave',async({page})=>{
    const locators=leavePage.getLocators(page);
    const expectedDays=await LeaveManagementController.applyLeave(page,dateRange);
    const initialLeaveCount = await leavePage.getInitialLeaveCount(locators);
    await LeaveManagementController.approveAppliedLeave(page,expectedDays);
    await LeaveManagementController.verifyLeaveCountAfterApprovingLeave(page,sharedData,initialLeaveCount,dateRange);
    await LeaveManagementController.deleteEmployeeAfterApplyLeaveOrWorkFromHome(page);
  })

  test('User is able to apply work from home',async({ page })=>{
    await LeaveManagementController.applyWorkFromHome(page,dateRange);
    await LeaveManagementController.deleteEmployeeAfterApplyLeaveOrWorkFromHome(page);
  });

  test('Lead is able to approve applied Work from home',async({ page })=>{
    await LeaveManagementController.applyWorkFromHome(page,dateRange);
    await LeaveManagementController.approveAppliedWorkFromHome(page);
    await LeaveManagementController.deleteEmployeeAfterApprovingWorkFromHomeOrLeave(page);
  })

  test('Leadd is able to reject applied Work from home',async({page})=>{
    await LeaveManagementController.applyWorkFromHome(page,dateRange);
    await LeaveManagementController.rejectAppliedWorkFromHome(page);
    await LeaveManagementController.deleteEmployeeAfterApprovingWorkFromHomeOrLeave(page);
  })

  test("User is to cancel applied Leave",async({page})=>{
    await LeaveManagementController.applyLeave(page,dateRange);
    await LeaveManagementController.cancelAppliedLeave(page);
    await LeaveManagementController.deleteEmployeeAfterApplyLeaveOrWorkFromHome(page);
  })

  test("User is able to cancel applied work from home",async({page})=>{
    await LeaveManagementController.applyWorkFromHome(page,dateRange);
    await LeaveManagementController.cancelAppliedWorkFromHome(page);
     await LeaveManagementController.deleteEmployeeAfterApplyLeaveOrWorkFromHome(page);
  })
});