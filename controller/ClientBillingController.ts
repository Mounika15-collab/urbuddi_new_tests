import { Page } from '@playwright/test';
import * as clientPage from '../pages/ClientBillingPage';
import {getClientBillingLocators} from '../pages/ClientBillingPage';
import { GeneratedEmployee } from '../utils/CommonUtils';


export interface SharedData {
  email: string;
}

export async function navigateToClientBillingModule(page:Page,locators: ReturnType<typeof getClientBillingLocators>){
    await clientPage.clickOnBillingMenu(locators);
    await clientPage.clickOnClients(locators);
}

export async function AddClientWithValidData(page:Page,clientName: GeneratedEmployee,locators: ReturnType<typeof getClientBillingLocators>){
    await navigateToClientBillingModule(page,locators);
    await clientPage.clickOnAddClientButton(locators);
    await clientPage.verifyAddClientFrameHeading(locators);
    await clientPage.enterName(clientName,locators);
    await clientPage.enterAddress(locators);
    await clientPage.enterState(locators);
    await clientPage.selectCountryFromDropdown(locators);
    await clientPage.enterClientEmail(locators);
    await clientPage.clickOnBillingEmailCheckBox(locators);
    await clientPage.enterGSTNumber(locators);
    await clientPage.clickOnAddButton(locators);
    await clientPage.verifyClientAddedToast(page);


}

export async function addClientWithoutEnteringData(page:Page,locators: ReturnType<typeof getClientBillingLocators>){
    await navigateToClientBillingModule(page,locators);
    await clientPage.clickOnAddClientButton(locators);
    await clientPage.verifyAddClientFrameHeading(locators);
    await clientPage.clickOnAddButton(locators);
    await clientPage.verifyEmptyDataClientForm(locators);
    await clientPage.verifyClientCreatedSuccessToast(page);
}

export async function addClientWithInvalidData(page:Page,locators:ReturnType<typeof getClientBillingLocators>,clientName: GeneratedEmployee){
    await navigateToClientBillingModule(page,locators);
    await clientPage.clickOnAddClientButton(locators);
    await clientPage.verifyAddClientFrameHeading(locators);
    await clientPage.enterName(clientName,locators);
    await clientPage.enterAddress(locators);
    await clientPage.enterState(locators);
    await clientPage.selectCountryFromDropdown(locators);
    await clientPage.enterClientInvalidEmail(locators);
    await clientPage.clickOnBillingEmailCheckBox(locators);
    await clientPage.enterGSTNumber(locators);
    await clientPage.clickOnAddButton(locators);
    await clientPage.verifyEmailFieldErrors(locators);
    await clientPage.verifyClientCreatedSuccessToast(page);
}

export async function addclientWithDuplicateData(page:Page,clientName:GeneratedEmployee,locators:ReturnType<typeof getClientBillingLocators>){
    await navigateToClientBillingModule(page,locators);
    await AddClientWithValidData(page,clientName,locators);
    await clientPage.clickOnAddClientButton(locators);
    await clientPage.verifyAddClientFrameHeading(locators);
    await clientPage.enterName(clientName,locators);
    await clientPage.enterAddress(locators);
    await clientPage.enterState(locators);
    await clientPage.selectCountryFromDropdown(locators);
    await clientPage.enterDuplicateClientEmail(locators);
    await clientPage.clickOnBillingEmailCheckBox(locators);
    await clientPage.enterGSTNumber(locators);
    await clientPage.clickOnAddButton(locators);
    await clientPage.verifyErrorMessage(locators);
    await clientPage.verifyClientCreatedSuccessToast(page);
}
export async function updateClient(page:Page,locators: ReturnType<typeof getClientBillingLocators>){
    await clientPage.clickOnEditIcon(page,locators);
    await clientPage.verifyEditClientHeading(locators);
    await clientPage.updateCountry(locators);
    await clientPage.clickOnBillingEmailCheckBox(locators);
    await clientPage.enterBillingEmail(locators);   
    await clientPage.clickUpdateButton(locators);
    await clientPage.verifyClientUpdatedToast(page); 
}

export async function deleteClient(page:Page,locators: ReturnType<typeof getClientBillingLocators>){
    await clientPage.clickOnDeleteIcon(page,locators);
    await clientPage.verifyPopupHeading(locators);
    await clientPage.clickOnConfrimButtom(locators);
    await clientPage.verifyClientDeletedToast(page,locators);
    await clientPage.verifyClientDeletedOrNot(locators);
}

