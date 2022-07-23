import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-range-input',
  templateUrl: './form-range-input.component.html',
  styleUrls: ['./form-range-input.component.css']
})
export class FormRangeInputComponent implements OnInit {

  @Input() control?: FormControl;
  @Input() textLabel?: string;
  @Input() controlName?: string;
  @Input() min?: number;
  @Input() max?: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
