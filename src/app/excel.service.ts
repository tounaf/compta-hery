import { Injectable } from '@angular/core';
import * as XLSX from "xlsx";

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportFromArray(data: Array<any>) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FACTURE');
    XLSX.writeFile(workbook, "facture.xlsx");
  }
}
