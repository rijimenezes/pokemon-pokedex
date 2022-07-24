import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-range-input',
  templateUrl: './form-range-input.component.html',
  styleUrls: ['./form-range-input.component.css'],
})
export class FormRangeInputComponent {
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
   * @Input min valor minimo del input
   */
  @Input() min: number;
  /**
   * @Input max valor maximo del input
   */
  @Input() max: number;

  constructor() {
    this.controlName = '';
    this.textLabel = '';
    this.min = 0;
    this.max = 100;
    this.control = new FormControl();
  }
}
