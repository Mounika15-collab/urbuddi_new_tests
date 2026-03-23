import {Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import testData from '../testdata/StaticData.json';
import fs from 'fs';
import path from 'path';

let lastGeneratedDate: Date | null = null;

export interface GeneratedEmployee {
  empID: string;
  invalidEmpID:string;
  firstname: string;
  lastname: string;
  email: string;
  invalidEmail:string;
}

function onlyAlphabets(value: string): string {
  return value.replace(/[^A-Za-z]/g, '');
}

export function getGenerateEmployee(): GeneratedEmployee {
  const rawFirstName = faker.person.firstName();
  const rawLastName = faker.person.lastName();
  const letters = faker.string.alpha({ length: 3, casing: 'upper' }).replace(/[^A-Z]/g, '');
  const numbers = faker.string.numeric(2);

  return {
    empID: `A${letters}${numbers}`,
    invalidEmpID:`JKLMNAARE${letters}${numbers}`,
    firstname: onlyAlphabets(rawFirstName),
    lastname: onlyAlphabets(rawLastName),
    email: faker.internet.email(), 
    invalidEmail:faker.internet.email().replace("@","$"),
  };
}

export async function generateUniqueDates(duration: number = 1): Promise<{ start: string; end: string }> {
  const today = new Date();

  if (!lastGeneratedDate) {
    lastGeneratedDate = new Date(today);
    lastGeneratedDate.setDate(today.getDate() + 4);
  } else {
    do {
      lastGeneratedDate.setDate(lastGeneratedDate.getDate() + 1);
    } while (lastGeneratedDate.getDay() === 0 || lastGeneratedDate.getDay() === 6);
  }

  const fromDate = new Date(lastGeneratedDate);
  const toDate = new Date(fromDate);

  let daysAdded = 1;

  while (daysAdded < duration) {
    toDate.setDate(toDate.getDate() + 1);
    if (toDate.getDay() !== 0 && toDate.getDay() !== 6) {
      daysAdded++;
    }
  }

  const formatDate = (date: Date): string => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return {
    start: formatDate(fromDate),
    end: formatDate(toDate)
  };
}

export async function selectDropdownOption(
  dropdownLocator: Locator,
  optionToSelect: string
): Promise<void> {

  await dropdownLocator.waitFor({ state: 'attached' });

  const options = await dropdownLocator.locator('option').all();

  for (const option of options) {
    const value = await option.getAttribute('value');
    const text = (await option.textContent())?.trim();

    if (text === optionToSelect || value === optionToSelect) {
      await dropdownLocator.selectOption({ value: value ?? undefined });
      return;
    }
  }

  throw new Error(`Option "${optionToSelect}" not found in dropdown`);
}

export async function handleCheckboxes(
  page: Page,
  selectedOptions: string | string[]
): Promise<void> {

  if (!selectedOptions) return;

  const optionsArray = Array.isArray(selectedOptions)
    ? selectedOptions
    : [selectedOptions];

  for (const option of optionsArray) {
    const checkbox = page.getByRole('checkbox', { name: option, exact: true });
    await checkbox.waitFor({ state: 'visible' });

    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }
}

export function calculateExpectedDays(
  startDate: string,
  endDate: string
): string {

  let count = 0;
  let curDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (curDate <= lastDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    curDate.setDate(curDate.getDate() + 1);
  }

  return count.toString();
}


const FILE_PATH = path.join(process.cwd(), testData.employeeDetails.sharedEmployeeJsonFile);

function readData() {
  const raw = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeData(data: any) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

export function storeAppliedLeave(startDate: string,endDate: string,) {
  const data = readData();
  data.appliedLeave = {startDate,endDate,};
  writeData(data);
}

export function storeAppliedWFH(startDate: string,endDate: string,) {
  const data = readData();
  data.appliedWFH = {startDate,endDate,};
  writeData(data);
} 