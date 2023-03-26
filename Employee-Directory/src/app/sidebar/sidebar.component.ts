import { Component, EventEmitter, INJECTOR, Input, OnInit, Output } from '@angular/core';
import { departments } from '../department';
import { employee_details } from '../employee';
import { jobtitle } from '../jobtitle';
import { offices } from '../offices';

@Component({

 
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  @Input() nameofdept:departments[] =[];
  @Input() nameofoffices!:offices[];
  @Input() nameoftitles!:jobtitle[];
  @Input() namesofextratitles!:jobtitle[];
  
  @Output() titlesender=new EventEmitter<string>()
  titlefilter( title:string){
    this.titlesender.emit(title)
  }


  @Output() deptsender=new EventEmitter<string>()

  
  deptfilter( dept:string){
    this.deptsender.emit(dept)
  }

  locationfilter(country:string){
    this.titlesender.emit(country)
  }

  ngOnInit(): void {}



  // method to show the extra options
  ViewMoreoptions(){
    const test = document.querySelector<HTMLElement>('.sidebar_viewmore_options');
    test!.style.display="inherit";
    const viewmore_button = document.querySelector<HTMLElement>('.viewmore');
    viewmore_button!.style.display="none";
  }



  // Method to Hide the extra options
  ViewlessOptions(){
    const test = document.querySelector<HTMLElement>('.sidebar_viewmore_options');
    test!.style.display="none";
    const viewmore_button = document.querySelector<HTMLElement>('.viewmore');
    viewmore_button!.style.display="inherit";
  }

  viewstatistics(){
    const elm = document.querySelector<HTMLElement>('app-employeelist')!;
    elm.style.display="none"
  }

}
