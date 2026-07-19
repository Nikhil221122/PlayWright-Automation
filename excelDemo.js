const { test, expect } = require('@playwright/test');
const Exceljs = require('exceljs');
const filePath = "C:\\Users\\Akanksha Jagtap\\OneDrive\\Documents\\download.xlsx";
let  output = { rowNumber: -1, colNumber: -1 };
let value= "Bhosale";
function readExcel(worksheet) {

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === "Kivi") {
                output.rowNumber = rowNumber;
                output.colNumber = colNumber;
            }

        });
    });

    return output;
}

async function writeExcel(filePath, value) {

    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');

    output = readExcel(worksheet);

    if (output.rowNumber === -1) {
        console.log("Kivi not found");
        return;
    }

    const cell = worksheet.getCell(output.rowNumber, output.colNumber);
    cell.value = value;

    await workbook.xlsx.writeFile(filePath);
}

writeExcel(filePath, value);