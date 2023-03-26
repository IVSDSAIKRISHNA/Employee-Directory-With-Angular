import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employee_details } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeedatastorageService {
  constructor(private http: HttpClient) {}

  getEmployeeInfo() {
    return this.http.get<employee_details[]>(
      'http://localhost:5000/employeedata'
    );
  }

  addEmployee(newEmployee: employee_details) {
    return this.http.post<employee_details[]>(
      'http://localhost:5000/employeedata',
      newEmployee
    );
  }

  editEmployee(newEmployee: employee_details) {
    return this.http.put<employee_details[]>(
      `http://localhost:5000/employeedata/${newEmployee.id}`,
      newEmployee
    );
  }

  removeEmployee(id: string) {
    return this.http.delete<employee_details[]>(
      `http://localhost:5000/employeedata/${id}`
    );
  }
}
