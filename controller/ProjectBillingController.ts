import { Page } from '@playwright/test';
import * as projectsPage from '../pages/ProjectsBillingPage';
import {addEmployeeDetails,FullEmployee} from '../controller/EmployeeController';
import {getEmployeeLocators} from '../pages/EmployeePage';


export async function navigateToProjectBillingModule(locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
    await projectsPage.clickOnBillingMenu(locators);
    await projectsPage.clickOnProjects(locators)
}

export async function addNewProject(locators:ReturnType<typeof projectsPage.getProjectBillingLocators>){
     await projectsPage.clickOnAddProjectButton(locators);
     await projectsPage.selectClientNameFromDropdown(locators);
     await projectsPage.enterProjectName(locators);
     await projectsPage.enterStartDate(locators);
     await projectsPage.selectProjectStatusFromDropdown(locators);
     await projectsPage.selectCurrencyFromDropdown(locators);
     await projectsPage.clickOnAddButton(locators);
    //  await projectsPage.verifyAddProjectFrameHeading(locators);
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
    await addNewProject(locators);
    await page.reload();
    await projectsPage.searchProject(locators);
    await projectsPage.searchClientName(locators);
    await projectsPage.clickOnAssignEmployeeIcon(page,locators);
    await projectsPage.selectEmployeeNameFromDropdown(locators);
    await projectsPage.enterClientProjectExperience(locators);
    await projectsPage.enterOnbordingDate(locators);
    await projectsPage.selectServiceTypeFromDropdown(locators);
    await projectsPage.selectBillingTypeFromDropdown(locators);
    await projectsPage.enterBillingAmount(locators);
    await projectsPage.clickOnAddButton(locators);
   
}