import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css'],
})
export class PokemonFormComponent implements OnChanges {
  /**
   * @Input pokemon variable del pokemon que se esta editando
   */
  @Input() pokemon: Pokemon | null;
  /**
   * @Output cancel evento para cancelar la creacion/edicion de un pokemon
   */
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  /**
   * @Output save evento para crear/editar un pokemon
   */
  @Output() save: EventEmitter<Pokemon> = new EventEmitter();

  /**
   * @var name formcontrol para validaciones de inputs
   */
  name: FormControl;
  /**
   * @var image formcontrol para validaciones de inputs
   */
  image: FormControl;
  /**
   * @var attack formcontrol para validaciones de inputs
   */
  attack: FormControl;
  /**
   * @var defense formcontrol para validaciones de inputs
   */
  defense: FormControl;
  /**
   * @var hp formcontrol para validaciones de inputs
   */
  hp: FormControl;
  /**
   * @var type formcontrol para validaciones de inputs
   */
  type: FormControl;
  /**
   * @var focusName bandera para aplicar focus al input del nombre del pokemon
   */
  focusName = true;
  /**
   * @var savingPokemon bandera para deshabilitar boton al crear/editar pokemon y mostrar loading
   */
  savingPokemon = false;
  /**
   * @var saveButtonIcon icono a mostrar en boton de guardar
   */
  saveButtonIcon = 'ri-save-2-fill';

  constructor() {
    this.pokemon = null;
    this.name = new FormControl(null, Validators.required);
    this.image = new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/),
    ]);
    this.attack = new FormControl(0, Validators.required);
    this.defense = new FormControl(0, Validators.required);
    this.hp = new FormControl(0, Validators.required);
    this.type = new FormControl(null, Validators.required);
  }

  ngOnChanges(): void {
    // asignar valores del pokemon a editar
    if (this.pokemon) {
      this.name.setValue(this.pokemon.name);
      this.image.setValue(this.pokemon.image);
      this.attack.setValue(this.pokemon.attack);
      this.defense.setValue(this.pokemon.defense);
      this.type.setValue(this.pokemon.type);
      this.hp.setValue(this.pokemon.hp);
      // activar focus para el input de nombre
      this.focusName = false;
      setTimeout(() => {
        this.focusName = true;
      });
    }
  }

  /**
   * Preparar formato del objeto del pokemon a guardar y emitirlo
   */
  onSave() {
    const pokemon: Pokemon = {
      attack: this.attack.value,
      defense: this.defense.value,
      image: this.image.value,
      hp: this.hp.value,
      name: this.name.value,
      type: this.type.value,
    };
    this.save.emit(pokemon);
    this.savingPokemon = true;
    this.saveButtonIcon = 'ri-loader-4-line';
  }
}
