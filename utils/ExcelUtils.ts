import testData from '../testdata/StaticData.json';
import { getGenerateEmployee, GeneratedEmployee, generateUniqueDates } from './CommonUtils';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export interface EmployeeUpdate {
  empID: string;
  firstname: string;
  lastname: string;
  email: string;
}

export function appendFakerEmployeeToExcel(data: EmployeeUpdate): void {

  const FILE_PATH = path.join(process.cwd(),testData.excelData.uploadFile);

  const SHEET_NAME = testData.excelData.sheetName;
  const workbook = XLSX.readFile(FILE_PATH);
  const worksheet = workbook.Sheets[SHEET_NAME];
  const range = XLSX.utils.decode_range(worksheet['!ref']!);
  const headers: string[] = [];

  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    const cell = worksheet[cellAddress];
    headers.push(cell?.v);
  }

  const idCol = headers.indexOf('ID');
  const firstNameCol = headers.indexOf('First Name');
  const lastNameCol = headers.indexOf('Last Name');
  const emailCol = headers.indexOf('Email');

  const targetRow = 1;

  worksheet[XLSX.utils.encode_cell({ r: targetRow, c: idCol })] = { v: data.empID };
  worksheet[XLSX.utils.encode_cell({ r: targetRow, c: firstNameCol })] = { v: data.firstname };
  worksheet[XLSX.utils.encode_cell({ r: targetRow, c: lastNameCol })] = { v: data.lastname };
  worksheet[XLSX.utils.encode_cell({ r: targetRow, c: emailCol })] = { v: data.email };

  XLSX.writeFile(workbook, FILE_PATH);
}

export function getEmployeeIdAndEmails(): { empID: string; email: string } {

  const FILE_PATH = path.join(process.cwd(),testData.excelData.uploadFile);
  const SHEET_NAME = testData.excelData.sheetName;
  const workbook = XLSX.readFile(FILE_PATH);
  const worksheet = workbook.Sheets[SHEET_NAME];
  const range = XLSX.utils.decode_range(worksheet['!ref']!);
  const headers: string[] = [];

  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    const cell = worksheet[cellAddress];
    headers.push(cell?.v);
  }

  const idCol = headers.indexOf('ID');
  const emailCol = headers.indexOf('Email');

  if (idCol === -1 || emailCol === -1) {
    throw new Error("ID or Email column not found.");
  }

  const targetRow = 1;

  const idCellAddress = XLSX.utils.encode_cell({ r: targetRow, c: idCol });
  const emailCellAddress = XLSX.utils.encode_cell({ r: targetRow, c: emailCol });
  const empID = worksheet[idCellAddress]?.v;
  const email = worksheet[emailCellAddress]?.v;

  if (!empID || !email) {
    throw new Error("ID or Email not found in second row.");
  }

  return {
    empID: empID.toString(),
    email: email.toString()
  };
}


export interface EmployeeData extends GeneratedEmployee {
  gender: string;
  mobileNumber: string;
  dob: string;
  joiningDate: string;
  qualification: string;
  designation: string;
  department: string;
  bloodGroup: string;
  location: string;
  role: string;
  password: string;
  salary: string;
  totalLeaves: string;
  utilizedLeaves: string;
  balanceLeaves: string;
  leavesLeft: string;
  extraWork: string;
}

function readJSON(filePath: string) {
  const fullPath = path.resolve(path.join(__dirname, '..', 'testdata', 'StaticData.json'));
  if (!fs.existsSync(fullPath)) throw new Error(`JSON file not found at ${fullPath}`);
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

async function generateEmployeeRow(jsonData: any): Promise<EmployeeData> {
  const basic: GeneratedEmployee = getGenerateEmployee();
  const dates = await generateUniqueDates(1);
  return {
    ...basic,
    gender: jsonData.gender,
    mobileNumber: jsonData.mobileNumber,
    dob: jsonData.dob,
    joiningDate: dates.start,
    qualification: jsonData.qualification,
    designation: jsonData.designation,
    department: jsonData.department,
    bloodGroup: jsonData.bloodgroup,
    location: jsonData.location,
    role: jsonData.role,
    password: jsonData.password,
    salary: jsonData.salary,
    totalLeaves: jsonData["Total Leaves"],
    utilizedLeaves: jsonData["Utilized Leaves"],
    balanceLeaves: jsonData["Balance Leaves"],
    leavesLeft: jsonData["Leaves Left"],
    extraWork: jsonData["Extra Work"],
  };
}

function mapToExcelHeaders(emp: EmployeeData) {
  return {
    ID: emp.empID,
    "First Name": emp.firstname,
    "Last Name": emp.lastname,
    Gender: emp.gender,
    "Mobile Number": emp.mobileNumber,
    Email: emp.email,
    "Date Of Birth": emp.dob,
    "Joining Date": emp.joiningDate,
    Qualifications: emp.qualification,
    Designation: emp.designation,
    Department: emp.department,
    "Blood Group": emp.bloodGroup,
    Address: emp.location,
    Role: emp.role,
    Password: emp.password,
    Salary: emp.salary,
    "Total Leaves": emp.totalLeaves,
    "Utilized Leaves": emp.utilizedLeaves,
    "Balance Leaves": emp.balanceLeaves,
    "Leaves Left": emp.leavesLeft,
    "Extra Work": emp.extraWork,
  };
}

function writeMultipleRows(filePath: string, sheetName: string, data: EmployeeData[]) {
  const fullPath = path.resolve(filePath);
  const folder = path.dirname(fullPath);
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  let workbook: XLSX.WorkBook;
  if (fs.existsSync(fullPath)) {
    workbook = XLSX.readFile(fullPath);
    if (workbook.SheetNames.includes(sheetName)) {
      delete workbook.Sheets[sheetName];
      workbook.SheetNames = workbook.SheetNames.filter((name) => name !== sheetName);
    }
  } else {
    workbook = XLSX.utils.book_new();
  }

  const worksheet = XLSX.utils.json_to_sheet(data.map(mapToExcelHeaders));
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fullPath);
}

export async function generateAndWriteEmployees(
  jsonFilePath: string,
  sheetName: string,
  numberOfEmployees: number
) {
  const fullJSON = readJSON(jsonFilePath);
  const employeeDetails = fullJSON.employeeDetails;
  const excelFilePath = path.resolve(fullJSON.excelData.uploadmultipleDataFile);

  if (!excelFilePath) throw new Error('uploadmultipleDataFile missing in JSON');

  const employees: EmployeeData[] = [];

  for (let i = 0; i < numberOfEmployees; i++) {
    employees.push(await generateEmployeeRow(employeeDetails));
  }

  writeMultipleRows(excelFilePath, sheetName, employees);
}

export function getAllEmployeeIds(): string[] {
  const filePath = path.resolve(testData.excelData.uploadmultipleDataFile);
  if (!fs.existsSync(filePath)) throw new Error(`Excel file not found at ${filePath}`);

  const sheetName = testData.excelData.sheetName;
  const workbook = XLSX.readFile(filePath);

  if (!workbook.Sheets[sheetName]) throw new Error(`Sheet ${sheetName} not found in Excel file`);

  const sheetData: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
  const ids: string[] = sheetData.map((row) => row.ID?.toString().trim()).filter(Boolean);

  return ids;
}