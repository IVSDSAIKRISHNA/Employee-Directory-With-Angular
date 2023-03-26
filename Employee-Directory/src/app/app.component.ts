import {
  Component,
  ComponentFactoryResolver,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { employee_details } from '../app/employee';
import { departments } from './department';
import { offices } from './offices';
import { jobtitle } from './jobtitle';
import { HttpClient } from '@angular/common/http';
import { EmployeedatastorageService } from './services/employeedatastorage.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  title = 'Task3';

  employeeDetails: employee_details[] = [];
  emppdata2: employee_details[] = this.employeeDetails.filter((item) => item);
  nameOfDepartments: departments[] = [
    { department: 'IT' },
    { department: 'Human Resources' },
    { department: 'MD' },
    { department: 'Sales' },
  ];
  nameOfOffices: offices[] = [{ location: 'India' }, { location: 'Seattle' }];
  nameOfTitles: jobtitle[] = [
    { designation: 'SharePoint Practice Head' },
    { designation: '.Net Development Lead' },
    { designation: 'Recruting Expert' },
    { designation: 'BI Developer' },
    { designation: 'Business Analyst' },
  ];
  namesOfExtraTitles: jobtitle[] = [
    { designation: 'Network Engineer' },
    { designation: 'UI Designer' },
    { designation: 'Operations Manager' },
  ];

  // Function to filter the employee data based on the titles selected from the side bar

  titletosend!: string;
  titleFilter(title: string) {
    this.titletosend = title;
  }

  // function to filter the employees based on the department
  depepartmentFilter(dept: string) {
    this.titletosend = dept;
  }
}
