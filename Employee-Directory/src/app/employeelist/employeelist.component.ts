import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { employee_details } from '../employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeedatastorageService } from '../services/employeedatastorage.service';
import { departments } from '../department';
import { jobtitle } from '../jobtitle';
import { offices } from '../offices';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css'],
})
export class EmployeelistComponent implements OnInit, OnChanges {
  // form group to carry out vaidations
  newEmployeeForm!: FormGroup;
  editDeatilsEmployeeForm!: FormGroup;

  // Details of the employee to be stored in this array
  employeeDetails: employee_details[] = [];
  employeeDetails2:employee_details[] = [];
  employeeDetails3:employee_details[]=[];

  // Constructor fo the component
  constructor(
    private http: HttpClient,
    private empDataaa: EmployeedatastorageService,
    private fb: FormBuilder
  ) {}

  // NG on init
  ngOnInit(): void {
    
    this.empDataaa.getEmployeeInfo().subscribe((data) => {
      (this.employeeDetails = data), (this.employeeDetails2 = data),(this.employeeDetails3=data);
    console.table(this.employeeDetails2) });
    // Validations for the form
      this.newEmployeeForm = this.fb.group({
      prefferedName: ['', Validators.required],
      email: ['', Validators.email],
      phoneNumber: ['', Validators.minLength(10)],
      lastName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      jobTitle: new FormControl(null, [Validators.required]),
      office: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      skypeId: new FormControl(null, [Validators.required]),
    });

    this.editDeatilsEmployeeForm = this.fb.group({
      newFirstName: new FormControl(null, [Validators.required]),
      newLastName: new FormControl(null, [Validators.required]),
      newPrefferedName: new FormControl(null, [Validators.required]),
      newEmail: new FormControl(null, [Validators.required]),
      newJobTitle: new FormControl(null, [Validators.required]),
      newOffice: new FormControl(null, [Validators.required]),
      newDepartment: new FormControl(null, [Validators.required]),
      newPhoneNumber: new FormControl(null, [Validators.required]),
      newSkypeId: new FormControl(null, [Validators.required]),
    });
  }
  // Temporary id which is used to store the id of the empolyee inorder to be used in Modal
  tempid: number = 0;
  // Employee which will store the Selected employee data , when clicked and render it to the Modal
  modalemployee:employee_details = {
    id: 0,
    name: '',
    jobtitle: '',
    department: ' ',
    office: '',
    phonenumber: ' ',
  };
//Deals with Modal data 
  employeePopup(id: number) {
    
    this.tempid=id
    for (let i of this.employeeDetails2) {
      if(Number(i.id)==this.tempid){
          this.modalemployee=i;
      }

    }
    
    console.log(this.tempid);
    console.table(this.employeeDetails2);
  }

  // Function to delete employee
  deleteEmployee() {
    this.removeEmployee(this.tempid);
  }
//sample details in order to be edited and replaced into the database
  newdetails: employee_details = {
    id: 0,
    name: '',
    jobtitle: '',
    department: ' ',
    office: '',
    phonenumber: ' ',
  };

  // method to edit employee details , after getting the data from the from
  editEmployeeDetails2() {
  
    this.newdetails.firstname =
      this.editDeatilsEmployeeForm.get('newFirstName')?.value;
    this.newdetails.lastname =
      this.editDeatilsEmployeeForm.get('newLastName')?.value;
    this.newdetails.name =
      this.editDeatilsEmployeeForm.get('newPrefferedName')?.value;
    this.newdetails.email = this.editDeatilsEmployeeForm.get('newEmail')?.value;
    this.newdetails.jobtitle =
      this.editDeatilsEmployeeForm.get('newJobTitle')?.value;
    this.newdetails.office =
      this.editDeatilsEmployeeForm.get('newOffice')?.value;
    this.newdetails.department =
      this.editDeatilsEmployeeForm.get('newDepartment')?.value;
    this.newdetails.phonenumber =
      this.editDeatilsEmployeeForm.get('newPhoneNumber')?.value;
    this.newdetails.skypeid =
      this.editDeatilsEmployeeForm.get('newSkypeId')?.value;
    this.newdetails.id = this.tempid;
    this.editEmployeeDetails(this.newdetails);
    
  }

  // method to remove the employee based on his id number
  removeEmployee(id: number) {
    this.empDataaa.removeEmployee(`${id}`).subscribe((data) => {
      this.employeeDetails = data;
      this.employeeDetails2 = data;
    });
  }

  //function to edit the employee details, where we pass the new data of the employee
  editEmployeeDetails(newdetails: employee_details) {
    this.empDataaa.editEmployee(newdetails).subscribe((data) => {
      this.employeeDetails = data;
      this.employeeDetails2 = data;
    });
  }

  //Function to Add new Employee details into the Database
  addNewEmployee(newDetails: employee_details) {
    this.empDataaa.addEmployee(newDetails).subscribe((data) => {
      this.employeeDetails = data;
      this.employeeDetails2 = data;
    });
  }

  // function to perform  the search operation upon the user pressing "enter"
  onEnter() {
    this.searchFunction(
      document.getElementsByTagName('input')[0].value +' ' +document.getElementsByTagName('select')[0].value
    );
  }

  // Method to carry out the search function
  searchFunction(searchinput: string) {
    let temp = searchinput.split(' ');
    let searchedstring = temp[0];
    let choice = temp[1];
    let searchstring = searchedstring.toLowerCase();
    this.employeeDetails2 = [];
    console.log(choice);
    if (choice == '0') {
      for (let temp of this.employeeDetails) {
        let name: string = temp.name.toLowerCase();
        let dept: string = temp.department.toLowerCase();
        let title: string = temp.jobtitle.toLowerCase();
        if (
          name.search(searchstring) !== -1 ||
          dept.search(searchedstring) !== -1 ||
          title.search(searchedstring) !== -1
        ) {
          this.employeeDetails2.push(temp);
        }
      }
    } else if (choice == '1') {
      for (let temp of this.employeeDetails) {
        let name: string = temp.name.toLowerCase();
        if (name.search(searchstring) !== -1) {
          this.employeeDetails2.push(temp);
        }
      }
    } else if (choice == '3') {
      for (let temp of this.employeeDetails) {
        let dept: string = temp.department.toLowerCase();
        if (dept.search(searchedstring) !== -1) {
          this.employeeDetails2.push(temp);
        }
      }
    } else if (choice == '2') {
      for (let temp of this.employeeDetails) {
        let name: string = temp.jobtitle.toLowerCase();
        if (name.search(searchstring) !== -1) {
          this.employeeDetails2.push(temp);
        }
      }
    }
  }

  // method to remove the filters and show the original data
  removeFilter() {
    this.clearFilter();
  }

  //method for clear  button
  clearFilter() {
    this.employeeDetails2 = this.employeeDetails.filter((item) => item);
  }
//Sample Data to be Edited and added into the Json FIle 
  x: number = 1011;
  newemploye: employee_details = {
    id: this.x,
    name: '',
    jobtitle: '',
    department: ' ',
    office: '',
    phonenumber: ' ',
  };

  // method to add the new employee data to the database
  newEmployeedetails() {
    for (let i of this.employeeDetails) {
      this.x = Number(i.id);
    }
    this.x = this.x + 1;
    this.newemploye.id = this.x;
    this.newemploye.firstname = this.newEmployeeForm.get('firstName')?.value;
    this.newemploye.lastname = this.newEmployeeForm.get('lastName')?.value;
    this.newemploye.name = this.newEmployeeForm.get('prefferedName')?.value;
    this.newemploye.email = this.newEmployeeForm.get('email')?.value;
    this.newemploye.jobtitle = this.newEmployeeForm.get('jobTitle')?.value;
    this.newemploye.office = this.newEmployeeForm.get('office')?.value;
    this.newemploye.department = this.newEmployeeForm.get('department')?.value;
    this.newemploye.phonenumber =
      this.newEmployeeForm.get('phoneNumber')?.value;
    this.newemploye.skypeid = this.newEmployeeForm.get('skypeId')?.value;
    this.addNewEmployee(this.newemploye);
  }

  EditEmployee(){
    this.editDeatilsEmployeeForm.reset();
  }

  Addemployee(){
    this.newEmployeeForm.reset();
  }
  // code for the Button Group

  alpha = Array.from(Array(26)).map((e, i) => i + 65);
  alphabet = this.alpha.map((x) => String.fromCharCode(x));
  empty: string = '1';

  @Output() filtervalue = new EventEmitter<string>();

  // method used to implement the functionality of the buttons present on thop
  buttonFilter(alpha: string) {
    if (alpha == '1') {
      this.employeeDetails2 = this.employeeDetails;
    } else {
      this.employeeDetails2 = this.employeeDetails.filter((item) =>
        item.name.startsWith(alpha)
      );
    }
  }

  //Data
  nameofdepartments: departments[] = [
    { department: 'IT' },
    { department: 'Human Resources' },
    { department: 'MD' },
    { department: 'Sales' },
  ];
  nameofoffices: offices[] = [{ location: 'India' }, { location: 'Seattle' }];
  nameoftitles: jobtitle[] = [
    { designation: 'SharePoint Practice Head' },
    { designation: '.Net Development Lead' },
    { designation: 'Recruting Expert' },
    { designation: 'BI Developer' },
    { designation: 'Business Analyst' },
  ];
  namesofextratitles: jobtitle[] = [
    { designation: 'Network Engineer' },
    { designation: 'UI Designer' },
    { designation: 'Operations Manager' },
  ];

  @Input() TitleReceiver!: string;

  //method gets implemented when ever change is done and before the ngOnInit
  ngOnChanges(changes: SimpleChanges): void {
    if (this.TitleReceiver != '0') {
      this.titleFilter(this.TitleReceiver);
    }

  }

  // method used to carry out the filter operation based on the input received (title)
  titleFilter(title: string) {
    this.TitleReceiver = '0';
    for (let temp of this.nameofdepartments) {
      if (temp.department.startsWith(title)) {
        this.employeeDetails2 = this.employeeDetails.filter((item) =>
          item.department.startsWith(title)
        );
        // this.display()
        this.TitleReceiver = '0';
        return;
      }
    }
    for (let temp of this.nameofoffices) {
      if (temp.location == title) {
        this.employeeDetails2 = this.employeeDetails.filter((item) =>
          item.office.startsWith(title)
        );
        this.TitleReceiver = '0';
        return;
      }
    }
    this.employeeDetails2 = this.employeeDetails.filter((item) =>
      item.jobtitle.startsWith(title)
    );
    this.TitleReceiver = '0';
  }
}
