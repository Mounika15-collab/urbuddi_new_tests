import {Page,expect} from '@playwright/test';
import {clickElement,fillInput, getErrorCount, scrollToRightAndClick, verifyToast, verifyToastMessage,updateSharedData,getSharedData} from '../utils/CommonActions';
import { GeneratedEmployee,selectDropdownOption,getGenerateEmployee } from '../utils/CommonUtils';
import testData from '../testdata/StaticData.json';
import fs from "fs";
import path from "path";


export const sharedData={
    clientEmail:'clientEmail',
};

export function getClientBillingLocators(page:Page){
    return {
        billingMenu: page.locator('//p[text()="Billing"]'),
        clients: page.locator('//p[text()="Clients"]'),
        addClientButton:page.locator('//button[text()="Add Client"]'),
        addClientHeading:page.locator('//p[text()="Add Client"]'),
        nameTextfield:page.getByPlaceholder('Enter Client Name'),
        addressTextfield:page.getByPlaceholder('Enter Client Address'),
        stateTextfield:page.getByPlaceholder('Enter Client State'),
        countryDropdown:page.locator('select[name="country"]'),
        clientEmailTextfield:page.getByPlaceholder('Enter Client Email'),
        billingEmailCheckBox:page.locator('label').filter({hasText: 'Billing email is same as client email'})
                            .locator('input[type="checkbox"]'),
        billingEmailTextfield:page.getByPlaceholder('Enter Billing Email'),
        gstNumberTextfield:page.getByPlaceholder('Enter GST Number'),
        addButton:page.locator('//button[text()="Add"]'),
        editIcon:page.locator('div[title="Edit"]').first(),
        editClientHeading:page.locator('//p[text()="Edit Client"]'),
        updateButton:page.locator('//button[text()="Update"]'),
        deleteIcon:page.locator('div[title="Delete"]').first(),
        deleteConfirmPopupHeading:page.locator('//p[text()="Confirm Delete"]'),
        confirmButton:page.locator('//button[text()="Yes"]'),
        searchClient:page.getByLabel('CLIENT NAME Filter Input'),
        closeButton:page.locator('svg[class="close-btn"]'),
        errorFields:page.locator('[style*="border-left: 10px solid red"]'),
        errorMessage:page.locator('//p[text()="Client with this name already exists"]'),
    };
}

export function storeClientName(name: string) {
  const filePath = path.join(__dirname, "../testdata/DynamicData.json");
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  data.clientName = name;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getClientName(): string {
  const filePath = path.join(__dirname, "../testdata/DynamicData.json");
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return data.clientName;
}

export async function clickOnBillingMenu(locators: ReturnType<typeof getClientBillingLocators>): Promise<void> {
  await expect(locators.billingMenu).toBeVisible();
  await clickElement(locators.billingMenu);
}

export async function clickOnClients(locators: ReturnType<typeof getClientBillingLocators>): Promise<void> {
  await expect(locators.clients).toBeVisible();
  await clickElement(locators.clients.first());
}

export async function clickOnAddClientButton(locators: ReturnType<typeof getClientBillingLocators>):Promise<void>{
    await expect(locators.addClientButton).toBeVisible();
    await clickElement(locators.addClientButton);
}

export async function verifyAddClientFrameHeading(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.addClientHeading).toBeVisible();
}

export async function enterName(clientName:GeneratedEmployee,locators: ReturnType<typeof getClientBillingLocators>){
    storeClientName(clientName.firstname);
    await expect(locators.nameTextfield).toBeVisible();
    await fillInput(locators.nameTextfield,clientName.firstname);
    
}

export async function enterAddress(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.addressTextfield).toBeVisible();
    await fillInput(locators.addressTextfield,testData.clientData.address);
}

export async function enterState(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.stateTextfield).toBeVisible();
    await fillInput(locators.stateTextfield,testData.clientData.state);
}

export async function selectCountryFromDropdown(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.countryDropdown).toBeVisible();
    await selectDropdownOption(locators.countryDropdown,testData.clientData.Country);
}

export async function enterClientEmail(locators: ReturnType<typeof getClientBillingLocators>){
    const clientEmail=getGenerateEmployee();
    const email=clientEmail.email;
    await expect(locators.clientEmailTextfield).toBeVisible();
    await fillInput(locators.clientEmailTextfield,email);
    updateSharedData(sharedData.clientEmail,email,testData.employeeDetails.sharedEmployeeJsonFile);
}

export async function enterClientInvalidEmail(locators:ReturnType<typeof getClientBillingLocators>){
    const clientEmail=getGenerateEmployee();
    const email=clientEmail.invalidEmail;
    await expect(locators.clientEmailTextfield).toBeVisible();
    await fillInput(locators.clientEmailTextfield,email);
}

export async function enterDuplicateClientEmail(locators:ReturnType<typeof getClientBillingLocators>){
    const data = getSharedData(testData.employeeDetails.sharedEmployeeJsonFile);
    const duplicateEmail = data.clientEmail;
    await expect(locators.clientEmailTextfield).toBeVisible();
    await fillInput(locators.clientEmailTextfield,duplicateEmail); 
}

export async function clickOnBillingEmailCheckBox(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.billingEmailCheckBox).toBeVisible();
    await clickElement(locators.billingEmailCheckBox);
}

export async function enterGSTNumber(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.gstNumberTextfield).toBeVisible();
    await fillInput(locators.gstNumberTextfield,testData.clientData.GSTNumber);
}
export async function clickOnAddButton(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.addButton).toBeVisible();
    await clickElement(locators.addButton);
}

export async function verifyClientAddedToast(page:Page){
    await verifyToast(page,testData.toastMessages.clientCreatedSuccess);
}

export async function verifyClientCreatedSuccessToast(page:Page){
    await verifyToastMessage(page,testData.toastMessages.clientCreatedSuccess);
}

export async function clickOnDeleteIcon(page: Page,locators: ReturnType<typeof getClientBillingLocators>): Promise<void> {
    await scrollToRightAndClick(page,locators.deleteIcon.first());
}

export async function verifyPopupHeading(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.deleteConfirmPopupHeading).toBeVisible();
    await expect(locators.deleteConfirmPopupHeading).toBeVisible();
}

export async function clickOnConfrimButtom(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.confirmButton).toBeVisible();
    await clickElement(locators.confirmButton);
}

export async function verifyClientDeletedToast(page:Page,locators: ReturnType<typeof getClientBillingLocators>){
     await verifyToast(page,testData.toastMessages.clientDeletedSuccess);
}

export async function verifyClientDeletedOrNot(locators: ReturnType<typeof getClientBillingLocators>){
     const clientName = getClientName();
     await expect(locators.searchClient).toBeVisible();
     await fillInput(locators.searchClient,clientName);
}

export async function clickOnEditIcon(page:Page,locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.editIcon.first()).toBeVisible();
    await scrollToRightAndClick(page,locators.editIcon.first());
}

export async function verifyEditClientHeading(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.editClientHeading).toBeVisible();
    await expect(locators.editClientHeading).toBeVisible();
}

export async function enterBillingEmail(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.billingEmailTextfield).toBeEnabled();
    await locators.billingEmailTextfield.clear();
    await fillInput(locators.billingEmailTextfield,testData.clientData.billingEmail);
}

export async function clickUpdateButton(locators: ReturnType<typeof getClientBillingLocators>){
    await expect(locators.updateButton).toBeVisible();
    await clickElement(locators.updateButton);
}

export async function verifyClientUpdatedToast(page:Page){
    await verifyToast(page,testData.toastMessages.clientUpdateSuccess);
}

export async function updateCountry(locators: ReturnType<typeof getClientBillingLocators>){
     await expect(locators.countryDropdown).toBeVisible();
     await selectDropdownOption(locators.countryDropdown,testData.clientData.UpdateCountry);
}

export async function clickOnCloseButton(locators:ReturnType<typeof getClientBillingLocators>){
    await expect(locators.closeButton).toBeVisible();
    await clickElement(locators.closeButton);
}

export async function verifyEmptyDataClientForm(locators:ReturnType<typeof getClientBillingLocators>){
    const count=await getErrorCount(locators.errorFields);
    await expect(count).toBe(6);
}

export async function verifyEmailFieldErrors(locators:ReturnType<typeof getClientBillingLocators>){
    const count=await getErrorCount(locators.errorFields);
    await expect(count).toBe(2);
}

export async function verifyErrorMessage(locators:ReturnType<typeof getClientBillingLocators>){
    await locators.errorMessage.waitFor({state:'visible'});
    await expect(locators.errorMessage).toBeVisible();
}
