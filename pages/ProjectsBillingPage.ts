import { Page,expect } from "@playwright/test";
import { clickElement, fillInput, verifyToast } from "../utils/CommonActions";
import { selectDropdownOption,generateUniqueDates } from "../utils/CommonUtils";
import testData from '../testdata/StaticData.json';
import { scrollToRightAndClick,getCreatedEmployeeDetails,getErrorCount,updateSharedData,getSharedData} from '../utils/CommonActions';
import {faker} from '@faker-js/faker';


export function getProjectBillingLocators(page:Page){
    return{
        billingMenu: page.locator('//p[text()="Billing"]'),
        projects:page.locator('//p[text()="Projects"]').first(),
        addProjectButton:page.locator('//button[text()="Add Project"]'),
        addProjectFrameHeading:page.locator('//p[text()="Add Project"]'),
        selectClientDropdown:page.locator('select[name="client_id"]'),
        projectNameTextfield:page.getByPlaceholder('Enter Project Name'),
        ModuleNameTextfield:page.getByPlaceholder('Enter Module Name'),
        startDateTextfield:page.locator('input[name="start_date"]'),
        selectProjectStatusDropdown:page.locator('select[name="status"]'),
        selectCurrencyDropdown:page.locator('select[name="billing_currency"]'),
        addButton:page.locator('//button[text()="Add"]'),
        kebabIcon:page.locator('div[title="More"]').first(),
        editButton:page.locator('//div[text()=" Edit"]'),
        deleteButton:page.locator('//div[text()=" Delete"]'),
        deletePopupHeading:page.locator('//p[text()="Confirm Delete"]'),
        confirmButton:page.locator('//button[text()="Yes"]'),
        searchProjectName:page.getByLabel('PROJECT NAME Filter Input'), 
        searchClientName:page.getByLabel('CLIENT NAME Filter Input'),
        verifyDeletedRecord:page.locator('[col-id="client_name"]', { hasText: testData.projectData.projectName }), 
        updateButton:page.locator('//button[text()="Update"]'),  
        assignEmployeeIcon:page.locator('div[title="Assign Employee"]').first(),
        assignEmployeePopupHeading:page.locator('//p[text()="Assign Employee to Techtest"]'),
        selectEmployeeName:page.locator('select[name="employee_id"]'),
        experienceTextfield:page.getByPlaceholder('Enter Client Project Experience'),
        onboardingDate:page.locator('input[name="start_date"]'),
        selectServiceType:page.locator('select[name="service_type"]'),
        selectBillingType:page.locator('select[name="billing_type"]'),
        billingAmountTextfield:page.getByPlaceholder('Enter Billing Amount'), 
        viewIcon:page.locator('//div[@class="icon-wrapper"]').first(),
        projectDetailsPageHeading:page.locator('//p[text()=" Project Details"]'), 
        assignEmployeeButton:page.locator('//button[text()="Assign Employee"]'), 
        errorFields:page.locator('[style*="border-left: 10px solid red"]'),
        errorMessage:page.locator('//p[text()="Project with this name already exists"]'),
        editButtonInProjectDetailsPage:page.locator('//button[@title="Edit"]'),
        updateEmployeeHEading:page.locator('//p[@class="modal-heading"]'),
        deleteButtonInProjectDetailsPage:page.locator('button[title="Delete"]'),
        offBoardEmployeeButton:page.locator('button[title="OffBoard Employee"]'),
        confirmOffBordingButton:page.locator('//button[text()="Confirm"]'),
        confirmDeleteButton:page.locator('//button[text()="Delete"]'),
        offBordDateTextField:page.locator('input[type="date"]'),
    };
}

export async function clickOnBillingMenu(locators:ReturnType<typeof getProjectBillingLocators>)
{
    await expect(locators.billingMenu).toBeVisible();
    await clickElement(locators.billingMenu);
}

export async function clickOnProjects(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.projects).toBeVisible();
    await clickElement(locators.projects);
}

export async function clickOnAddProjectButton(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.addProjectButton).toBeVisible();
    await clickElement(locators.addProjectButton);
}

export async function verifyAddProjectFrameHeading(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.addProjectFrameHeading).toBeVisible();
}

export async function selectClientNameFromDropdown(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.selectClientDropdown).toBeVisible();
    await selectDropdownOption(locators.selectClientDropdown,testData.projectData.clientName);
}

export async function enterProjectName(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.projectNameTextfield).toBeVisible();
    const projectName = faker.company.name();
    await fillInput(locators.projectNameTextfield,projectName);
    updateSharedData('projectName', projectName, testData.employeeDetails.sharedEmployeeJsonFile);
}

export async function enterDuplicateProjectName(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.projectNameTextfield).toBeVisible();
    await fillInput(locators.projectNameTextfield,testData.projectData.projectName);
}

export async function enterStartDate(locators:ReturnType<typeof getProjectBillingLocators>){
    const { start } = await generateUniqueDates();
    await expect(locators.startDateTextfield).toBeVisible();
    await fillInput(locators.startDateTextfield,start);
}

export async function selectProjectStatusFromDropdown(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.selectProjectStatusDropdown).toBeVisible();
    await selectDropdownOption(locators.selectProjectStatusDropdown,testData.projectData.status);
}

export async function selectCurrencyFromDropdown(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.selectCurrencyDropdown).toBeVisible();
    await selectDropdownOption(locators.selectCurrencyDropdown,testData.projectData.currency);
}

export async function clickOnAddButton(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.addButton).toBeVisible();
    await clickElement(locators.addButton);
}

export async function verifyProjectAddedSuucessToast(page:Page){
    await verifyToast(page,testData.toastMessages.projectCreatedSuccess);
}

export async function clickOnKebabdIcon(page:Page,locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.kebabIcon).toBeVisible();
    await scrollToRightAndClick(page,locators.kebabIcon);
}

export async function clickOnDeleteButton(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.deleteButton).toBeVisible();
    await clickElement(locators.deleteButton);
}

export async function verifyDeletePopupHeading(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.deletePopupHeading).toBeVisible();
}

export async function clickOnConfirmButton(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.confirmButton).toBeVisible();
    await clickElement(locators.confirmButton);
}

export async function verifyDeletedProjectToast(page:Page,locators:ReturnType<typeof getProjectBillingLocators>){
    await verifyToast(page,testData.toastMessages.projectDeleteSuccess);
}

export async function searchProject(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.searchProjectName).toBeVisible();
    const data = getSharedData(testData.employeeDetails.sharedEmployeeJsonFile);
    const projectName = data.projectName;
    await fillInput(locators.searchProjectName,projectName);
}

export async function searchClientName(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.searchClientName).toBeVisible();
    await fillInput(locators.searchClientName,testData.projectData.clientName);
}

export async function verifyDeletedRecord(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.verifyDeletedRecord).not.toBeVisible();
}

export async function clickOnEditButton(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.editButton).toBeVisible();
    await clickElement(locators.editButton);
}

export async function updateCurrency(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.selectCurrencyDropdown).toBeVisible();
    await selectDropdownOption(locators.selectCurrencyDropdown,testData.projectData.updateCurrency);
}

export async function clickOnUpdatenButton(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.updateButton).toBeVisible();
    await clickElement(locators.updateButton);
}

export async function verifyProjectUpdatedToast(page:Page){
    await verifyToast(page,testData.toastMessages.ProjectUpdatedSuccess);
}

export async function clickOnAssignEmployeeIcon(page:Page,locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.assignEmployeeIcon).toBeVisible();
    await page.waitForLoadState("networkidle");
    await scrollToRightAndClick(page,locators.assignEmployeeIcon);
}

export async function verifyAssignEmployeeFrameHeading(locators:ReturnType<typeof getProjectBillingLocators>)
{
    await expect(locators.assignEmployeePopupHeading).toBeVisible();
}

export async function selectEmployeeNameFromDropdown(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.selectEmployeeName).toBeVisible();
    const employeeName=getCreatedEmployeeDetails(testData.employeeDetails.sharedEmployeeJsonFile);
    await selectDropdownOption(locators.selectEmployeeName,employeeName);
}

export async function enterClientProjectExperience(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.experienceTextfield).toBeVisible();
    await fillInput(locators.experienceTextfield,testData.projectData.clientProjectExperience);
}

export async function enterOnbordingDate(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.onboardingDate).toBeVisible();
    const { start } = await generateUniqueDates();
    await fillInput(locators.onboardingDate,start);
}

export async function selectServiceTypeFromDropdown(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.selectServiceType).toBeVisible();
    await selectDropdownOption(locators.selectServiceType,testData.projectData.serviceType);
}

export async function selectBillingTypeFromDropdown(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.selectBillingType).toBeVisible();
    await selectDropdownOption(locators.selectBillingType,testData.projectData.BillingType);
}

export async function enterBillingAmount(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.billingAmountTextfield).toBeVisible();
    await fillInput(locators.billingAmountTextfield,testData.projectData.BillingAmount);
}   

export async function clickOnViewIcon(page:Page,locators:ReturnType<typeof getProjectBillingLocators>){
        await scrollToRightAndClick(page,locators.viewIcon);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
}

export async function clickOnEditIconInProjectDetailsPage(locators:ReturnType<typeof getProjectBillingLocators>){
    await clickElement(locators.editButtonInProjectDetailsPage);
}

export async function updatedExperience(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.experienceTextfield).toBeVisible();
    await fillInput(locators.experienceTextfield,testData.projectData.updatedExperience);
}

export async function updateBillingAmount(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.billingAmountTextfield).toBeVisible();
    await fillInput(locators.billingAmountTextfield,testData.projectData.updatedBillingAmount);
}

export async function updateBillingType(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.selectBillingType).toBeVisible();
    await selectDropdownOption(locators.selectBillingType,testData.projectData.updatedBillingType);
}

export async function updateServiceType(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.selectServiceType).toBeVisible();
    await selectDropdownOption(locators.selectServiceType,testData.projectData.updatedServiceType);
}

export async function verifyProjectDetailsPageHeading(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.projectDetailsPageHeading).toBeVisible();  
}

export async function clickOnAssignEmployeeButton(locators:ReturnType<typeof getProjectBillingLocators>){
    await clickElement(locators.assignEmployeeButton);
}

export async function verifyAssignedEmployeeToastInProjectDetailsPage(page:Page){
    await verifyToast(page,testData.toastMessages.assignEmployeeToast);
}

export async function verifyEmptyProjectData(locators: ReturnType<typeof getProjectBillingLocators>){
  const count = await getErrorCount(locators.errorFields);
  await expect(count).toBe(5);
}

export async function verifyErrorMessage(locators:ReturnType<typeof  getProjectBillingLocators>){
    await expect(locators.errorMessage).toBeVisible();
}

export async function verifyUpdatedEmployeeFrameHeading(locators:ReturnType<typeof  getProjectBillingLocators>){
    await expect(locators.updateEmployeeHEading).toBeVisible();
}

export async function clickonDeleteButtonInProjectDetailsPage(locators:ReturnType<typeof  getProjectBillingLocators>){
    await expect(locators.deleteButtonInProjectDetailsPage).toBeVisible();
    await clickElement(locators.deleteButtonInProjectDetailsPage);
}

export async function clickOnOffBoardingButton(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.offBoardEmployeeButton).toBeVisible();
    await clickElement(locators.offBoardEmployeeButton);
}

export async function enterOffBordingDate(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.offBordDateTextField).toBeVisible();
    const { end } = await generateUniqueDates();
    await fillInput(locators.offBordDateTextField,end);
}

export async function ConfirmOffboradingEmployee(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.confirmOffBordingButton).toBeVisible();
    await clickElement(locators.confirmOffBordingButton);
}

export async function clickOnConfirmDeleteButton(locators:ReturnType<typeof getProjectBillingLocators>){
    await expect(locators.confirmDeleteButton).toBeVisible();
    await clickElement(locators.confirmDeleteButton);
}
