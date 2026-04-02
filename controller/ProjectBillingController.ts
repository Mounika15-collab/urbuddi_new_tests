import { Page,expect } from '@playwright/test';
import * as projectsPage from '../pages/ProjectsBillingPage';
import {addEmployeeDetails,FullEmployee} from '../controller/EmployeeController';
import {getEmployeeLocators} from '../pages/EmployeePage';
import testdata from '../testdata/StaticData.json';



export async function navigateToProjectBillingModule(locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
    await projectsPage.clickOnBillingMenu(locators);
    await projectsPage.clickOnProjects(locators)
}

export async function addNewProject(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
     await page.waitForLoadState("domcontentloaded");
     await page.waitForLoadState("networkidle");
     await projectsPage.clickOnAddProjectButton(locators);
     await page.waitForLoadState("networkidle");
     await projectsPage.selectClientNameFromDropdown(locators);
     await projectsPage.enterProjectName(locators);
     await projectsPage.enterStartDate(locators);
     await projectsPage.selectProjectStatusFromDropdown(locators);
     await projectsPage.selectCurrencyFromDropdown(locators);
     await projectsPage.clickOnAddButton(locators);
     await projectsPage.verifyProjectAddedSuucessToast(page);
}

export async function updateProject(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
    await projectsPage.clickOnKebabdIcon(page,locators);
    await projectsPage.clickOnEditButton(locators);
    await projectsPage.updateCurrency(locators);
    await projectsPage.clickOnUpdatenButton(locators);
    await projectsPage.verifyProjectUpdatedToast(page);
}

export async function deleteProject(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
    await projectsPage.clickOnKebabdIcon(page,locators);
    await projectsPage.clickOnDeleteButton(locators);
    await projectsPage.verifyDeletePopupHeading(locators);
    await projectsPage.clickOnConfirmButton(locators);
    await projectsPage.verifyDeletedProjectToast(page,locators);
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    await projectsPage.searchProject(locators);
    await projectsPage.searchClientName(locators);
    await projectsPage.verifyDeletedRecord(locators);
}

export async function assignEmployeeToProject(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>,data:FullEmployee){
    const employeelocators=getEmployeeLocators(page);
    await addEmployeeDetails(page,employeelocators,data)
    await navigateToProjectBillingModule(locators);
    await addNewProject(page,locators);
    await page.reload();
    await page.waitForLoadState("networkidle");
    await projectsPage.searchProject(locators);
    await projectsPage.searchClientName(locators);
    await projectsPage.clickOnAssignEmployeeIcon(page,locators);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("networkidle");
    await projectsPage.selectEmployeeNameFromDropdown(locators);
    await projectsPage.enterClientProjectExperience(locators);
    await projectsPage.enterOnbordingDate(locators);
    await projectsPage.selectServiceTypeFromDropdown(locators);
    await projectsPage.selectBillingTypeFromDropdown(locators);
    await projectsPage.enterBillingAmount(locators);
    await projectsPage.clickOnAddButton(locators);   
}

export async function assignEmployeeWithEmptyDataToProject(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>,data:FullEmployee){
    const employeelocators=getEmployeeLocators(page);
    await addEmployeeDetails(page,employeelocators,data)
    await navigateToProjectBillingModule(locators);
    await addNewProject(page,locators);
    await page.reload();
    await page.waitForLoadState("networkidle");
    await projectsPage.searchProject(locators);
    await projectsPage.searchClientName(locators);
    await projectsPage.clickOnAssignEmployeeIcon(page,locators);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("networkidle");
    await projectsPage.clickOnAddButton(locators);
    await projectsPage.verifyEmptyEmployeeDataInProject(locators);
}

export async function assignEmployeeWithDuplicateDataToProject(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
    await navigateToProjectBillingModule(locators);
    await projectsPage.searchProject(locators);
    await projectsPage.searchClientName(locators);
    await projectsPage.clickOnAssignEmployeeIcon(page,locators);
    await page.waitForLoadState("domcontentloaded");
    await projectsPage.selectEmployeeNameFromDropdown(locators);
    await projectsPage.enterClientProjectExperience(locators);
    await projectsPage.enterOnbordingDate(locators);
    await projectsPage.selectServiceTypeFromDropdown(locators);
    await projectsPage.selectBillingTypeFromDropdown(locators);
    await projectsPage.enterBillingAmount(locators);
    await projectsPage.clickOnAddButton(locators);
    await projectsPage.verifyErrorMessageForDuplicateEmployee(locators);
}

export async function assignEmployeeInProjectDetailsPage(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>,data:FullEmployee){
    const employeelocators=getEmployeeLocators(page);
    await addEmployeeDetails(page,employeelocators,data)
    await navigateToProjectBillingModule(locators);
    await addNewProject(page,locators);
    await page.reload();
    await projectsPage.searchProject(locators);
    await projectsPage.searchClientName(locators);
    await projectsPage.clickOnViewIcon(page,locators);
    await projectsPage.clickOnAssignEmployeeButton(locators);
    // await page.waitForLoadState("domcontentloaded");
    await projectsPage.selectEmployeeNameFromDropdown(locators);
    await projectsPage.enterClientProjectExperience(locators);
    await projectsPage.enterOnbordingDate(locators);
    await projectsPage.selectServiceTypeFromDropdown(locators);
    await projectsPage.selectBillingTypeFromDropdown(locators);
    await projectsPage.enterBillingAmount(locators);
    await projectsPage.clickOnAddButton(locators);
    await projectsPage.verifyAssignedEmployeeToastInProjectDetailsPage(page);
}

export async function updateAssignedEmployeeInProjectDetails(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>,data:FullEmployee){
    await assignEmployeeInProjectDetailsPage(page,locators,data);
    await projectsPage.clickOnEditIconInProjectDetailsPage(locators);
    await projectsPage.verifyUpdatedEmployeeFrameHeading(locators);
    await projectsPage.updatedExperience(locators);
    await projectsPage.updateServiceType(locators);
    await projectsPage.updateBillingType(locators);
    await projectsPage.updateBillingAmount(locators);
    await projectsPage.clickOnUpdatenButton(locators);
}


export async function deleteAssignedEmployeeInProjectDetails(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>,data:FullEmployee){
    await assignEmployeeInProjectDetailsPage(page,locators,data);
    await projectsPage.clickonDeleteButtonInProjectDetailsPage(locators);
    await projectsPage.verifyDeletePopupHeading(locators);
    await projectsPage.clickOnConfirmDeleteButton(locators);
}


export async function offBoardingEmployeeInProjectDetailsPage(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>,data:FullEmployee){
    await assignEmployeeInProjectDetailsPage(page,locators,data);
    await projectsPage.clickOnOffBoardingButton(locators);
    await projectsPage.enterOffBordingDate(locators);
    await projectsPage.ConfirmOffboradingEmployee(locators);
}


export async function addProjectWithEmptyData(locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
    await navigateToProjectBillingModule(locators);
    await projectsPage.clickOnAddProjectButton(locators);
    await projectsPage.clickOnAddButton(locators);
    await projectsPage.verifyEmptyProjectData(locators);
}

export async function addDuplicateProjects(locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
    await navigateToProjectBillingModule(locators);
    await projectsPage.clickOnAddProjectButton(locators);
    await projectsPage.selectClientNameFromDropdown(locators);
    await projectsPage.enterDuplicateProjectName(locators);
    await projectsPage.enterStartDate(locators);
    await projectsPage.selectProjectStatusFromDropdown(locators);
    await projectsPage.selectCurrencyFromDropdown(locators);
    await projectsPage.clickOnAddButton(locators);
    await projectsPage.verifyErrorMessage(locators);
}

export async function assignEmployeeWithEmptyDataInProjectDetailsPage(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>,data:FullEmployee){
    const employeelocators=getEmployeeLocators(page);
    await addEmployeeDetails(page,employeelocators,data)
    await navigateToProjectBillingModule(locators);
    await addNewProject(page,locators);
    await page.reload();
    await projectsPage.searchProject(locators);
    await projectsPage.searchClientName(locators);
    await projectsPage.clickOnViewIcon(page,locators);
    await projectsPage.clickOnAssignEmployeeButton(locators);
    await page.waitForLoadState("domcontentloaded");
    await projectsPage.clickOnAddButton(locators);
    await projectsPage.verifyEmptyEmployeeDataInProject(locators);
}

export async function viewWorkLogsOfMultipleEmployeesInProjectDetailsPage(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
    await navigateToProjectBillingModule(locators);
    await addNewProject(page,locators);
    await page.reload();
    await projectsPage.searchProject(locators);
    await projectsPage.searchClientName(locators);
    await page.waitForLoadState('networkidle')
    await projectsPage.clickOnViewIcon(page,locators);  
    await page.waitForLoadState('networkidle')  
    const employees = Object.values(testdata.projectData.employees);
     for (const emp of employees) {
        await page.waitForLoadState('networkidle')
        await projectsPage.clickOnAssignEmployeeButton(locators);
        await page.waitForLoadState('domcontentloaded')
        await page.waitForLoadState('networkidle')
        await projectsPage.selectEmployee(locators,emp);
        await projectsPage.enterClientProjectExperience(locators);
        await projectsPage.enterOnbordingDate(locators);
        await projectsPage.selectServiceTypeFromDropdown(locators);
        await projectsPage.selectBillingTypeFromDropdown(locators);
        await projectsPage.enterBillingAmount(locators);
        await projectsPage.clickOnAddButton(locators);
        await projectsPage.verifyAssignedEmployeeToastInProjectDetailsPage(page);
    }
    await projectsPage.clickOnViewWorkLogsButton(locators);
    // await page.waitForTimeout(2000);
}

export async function viewWorkLogsForTheSingleEmployee(page:Page,locators:ReturnType<typeof projectsPage.getProjectBillingLocators>,data:FullEmployee){
    await assignEmployeeInProjectDetailsPage(page,locators,data);
    await projectsPage.clickOnViewWorkLogsButton(locators);
}