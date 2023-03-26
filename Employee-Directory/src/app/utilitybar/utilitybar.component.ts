import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { employee_details } from '../employee';

@Component({
  selector: 'app-utilitybar',
  templateUrl: './utilitybar.component.html',
  styleUrls: ['./utilitybar.component.css']
})
export class UtilitybarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  
  @Output() Searchedstring=new EventEmitter<string>()
  @Output() Clearbutton=new EventEmitter<string>()
  @Output() newemployee= new EventEmitter<employee_details>()
  

  onenter(){
    this.Searchedstring.emit(document.getElementsByTagName("input")[0].value + " "+ document.getElementsByTagName("select")[0].value)
  }

  removefilter(){
    this.Clearbutton.emit("Clear")
  }
  x:number=1009
  newemploye:employee_details={
    id:this.x ,
    name:"",
    jobtitle:"",
    department:" ",
    office:"",
    phonenumber:" "
  }
  modalsubmit(){
    this.newemploye.id=this.x
    this.newemploye.firstname=document.getElementsByTagName("input")[1].value
    this.newemploye.lastname=document.getElementsByTagName("input")[2].value
    this.newemploye.name=document.getElementsByTagName("input")[3].value
    this.newemploye.email=document.getElementsByTagName("input")[4].value
    this.newemploye.jobtitle=document.getElementsByTagName("input")[5].value
    this.newemploye.office=document.getElementsByTagName("select")[1].value
    this.newemploye.department=document.getElementsByTagName("select")[2].value
    this.newemploye.phonenumber=document.getElementsByTagName("input")[6].value
    this.newemploye.skypeid=document.getElementsByTagName("input")[7].value
    this.newemployee.emit(this.newemploye)
    this.x=this.x +1
  }
  
}
