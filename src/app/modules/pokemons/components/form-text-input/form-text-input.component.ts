import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.css']
})
export class FormTextInputComponent implements OnChanges {

  @Input() control?: FormControl;
  @Input() textLabel: string;
  @Input() controlName: string;
  @Input() placeHolder: string;
  @Input() focus: boolean;

  constructor() { 
    this.textLabel = '';
    this.controlName = '';
    this.placeHolder = '';
    this.focus = false;
  }
  ngOnChanges( changes: SimpleChanges ): void {
    // aplicar focus a un input
    if(this.focus && this.controlName){
      setTimeout(() => {        
        document.getElementById(this.controlName)?.focus();
      }, 200);
    }
  }


}
