import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-range-input',
  templateUrl: './form-range-input.component.html',
  styleUrls: ['./form-range-input.component.css']
})
export class FormRangeInputComponent {

  @Input() control: FormControl;
  @Input() textLabel: string;
  @Input() controlName: string;
  @Input() min: number;
  @Input() max: number;
  
  constructor() { 
    this.controlName = '';
    this.textLabel = '';
    this.min = 0;
    this.max = 100;
    this.control = new FormControl();
  }

}
