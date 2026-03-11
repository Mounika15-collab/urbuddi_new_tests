import { Page } from '@playwright/test';
import * as projectsPage from '../pages/ProjectsBillingPage';


export async function navigateToProjectBillingModule(page:Page){
    const locators=projectsPage.getProjectBillingLocators(page);
    await projectsPage.clickOnBillingMenu(locators);
    await projectsPage.clickOnProjects(locators)
}

export async function addNewProject(page:Page){
     const locators=projectsPage.getProjectBillingLocators(page);
     await projectsPage.clickOnAddProjectButton(locators);
     await projectsPage.selectClientNameFromDropdown(locators);
     await projectsPage.enterProjectName(locators);
     await projectsPage.enterStartDate(locators);
     await projectsPage.selectProjectStatusFromDropdown(locators);
     await projectsPage.selectCurrencyFromDropdown(locators);
     await projectsPage.clickOnAddButton(locators);
     await projectsPage.verifyAddProjectFrameHeading(locators);
}



export async function updateProject(page:Page){
    const locators=projectsPage.getProjectBillingLocators(page);
    await projectsPage.clickOnKebabdIcon(page,locators);
    await projectsPage.clickOnEditButton(locators);
    await projectsPage.updateCurrency(locators);
    await projectsPage.clickOnUpdatenButton(locators);
    await projectsPage.verifyProjectUpdatedToast(page);
}

export async function deleteProject(page:Page){
    const locators=projectsPage.getProjectBillingLocators(page);
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