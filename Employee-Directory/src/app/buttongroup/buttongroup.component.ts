import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EmployeelistComponent } from '../employeelist/employeelist.component';

@Component({
  selector: 'app-buttongroup',
  templateUrl: './buttongroup.component.html',
  styleUrls: ['./buttongroup.component.css'],
})
export class ButtongroupComponent implements OnInit {
  alpha = Array.from(Array(26)).map((e, i) => i + 65);
  alphabet = this.alpha.map((x) => String.fromCharCode(x));
  empty: string = '1';

  @Output() filtervalue = new EventEmitter<string>();

  buttonfilter(alpha: string) {
    this.filtervalue.emit(alpha);
  }

  constructor() {}
  ngOnInit(): void {}
}
