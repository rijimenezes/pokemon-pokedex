import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  /**
   * @Input text Texto a mostrar en el boton
   */
  @Input() text: string;
  /**
   * @Input iconName - Nombre del icono a mostrar de la libreria de ionicicons
   */
  @Input() iconName: string;
  /**
   * @Input textColorClass - Clase para el color del texto
   */
  @Input() textColorClass: string;
  /**
   * @Input backgroundColorClass - Clase para el fondo del boton
   */
  @Input() backgroundColorClass: string;
  /**
   * @Input isDisabled - Deshabilita el boton
   */
  @Input() isDisabled: boolean;
  /**
   * @Output handleClick - Evento click
   */
  @Output() handleClick = new EventEmitter<void>();

  constructor() {
    this.text = '';
    this.iconName = '';
    this.textColorClass = 'p-text-white';
    this.backgroundColorClass = 'p-bg-purple';
    this.isDisabled = false;
  }

  onClick(){
    this.handleClick.emit();
  }
}
