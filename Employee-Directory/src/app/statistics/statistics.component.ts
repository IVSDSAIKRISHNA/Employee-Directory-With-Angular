import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { employee_details } from '../employee';
import { EmployeedatastorageService } from '../services/employeedatastorage.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public chart: any;
  public piechart: any;

  employeeDetails: employee_details[] = [];
  constructor(private empdata: EmployeedatastorageService) {}

  ngOnInit(): void {
    this.empdata.getEmployeeInfo().subscribe((data) => {
      this.employeeDetails = data;
      console.log(data);
      console.log(this.employeeDetails);
      this.createBarGraph();
      this.createPieChart();
    });
  }

  employeesInIt: number = 0;
  employeesInUx: number = 0;
  employeesInHr: number = 0;
  employeesInSales: number = 2;
  employeesInMd: number = 2;
  employeesInIndia: number = 11;
  employeesInSeattle: number = 2;

  barGraphData = [
    this.employeesInIt,
    this.employeesInUx,
    this.employeesInHr,
    this.employeesInSales,
    this.employeesInMd,
  ];
  pieChartData = [this.employeesInIndia, this.employeesInSeattle];

  createBarGraph() {
    console.log(this.employeeDetails);
    for (let emp of this.employeeDetails) {
      console.log('inside the for loop');
      if (emp.department == 'IT Department') {
        this.employeesInIt += 1;
      } else if (emp.department == 'UX Department') {
        this.employeesInUx += 1;
      } else if (emp.department == 'MD') {
        this.employeesInMd += 1;
      } else if (emp.department == 'Human Resources') {
        this.employeesInHr += 1;
      } else if (emp.department == 'Sales') {
        this.employeesInSales += 1;
      }
    }

    this.barGraphData = [
      this.employeesInIt,
      this.employeesInUx,
      this.employeesInHr,
      this.employeesInSales,
      this.employeesInMd,
    ];

    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          'IT Department',
          'UX department',
          'HR Department',
          'Sales Department',
          'MD',
        ],
        datasets: [
          {
            label: 'personnel',
            data: this.barGraphData,
            backgroundColor: ['blue'],
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  createPieChart() {
    for (let emp of this.employeeDetails) {
      console.log('inside the for loop');
      if (emp.office == 'India') {
        this.employeesInIndia += 1;
      } else if (emp.office == 'Seattle') {
        this.employeesInSeattle += 1;
      }
    }

    this.pieChartData = [this.employeesInIndia, this.employeesInSeattle];

    this.piechart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: ['India', 'Seattle'],
        datasets: [
          {
            label: 'Employees',
            data: this.pieChartData,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
