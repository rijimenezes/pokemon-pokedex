import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.css'],
})
export class FormTextInputComponent implements OnChanges {
  /**
   * @Input control Form control para el input
   */
  @Input() control: FormControl;
  /**
   * @Input textLabel Texto del input a mostrar
   */
  @Input() textLabel: string;
  /**
   * @Input controlName nombre del formcontrol para asignar un id al input
   */
  @Input() controlName: string;
  /**
   * @Input placeHolder texto que se monstrara en el placeholder del input
   */
  @Input() placeHolder: string;
  /**
   * @Input focus bandera para indicar si se va a aplicar focus al input
   */
  @Input() focus: boolean;

  constructor() {
    this.control = new FormControl();
    this.textLabel = '';
    this.controlName = '';
    this.placeHolder = '';
    this.focus = false;
  }

  ngOnChanges(): void {
    // aplicar focus a un input
    if (this.focus && this.controlName) {
      setTimeout(() => {
        document.getElementById(this.controlName)?.focus();
      }, 200);
    }
  }
}
