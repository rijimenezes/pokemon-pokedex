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
  @Input() pokemon: Pokemon | null;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<Pokemon> = new EventEmitter();

  name: FormControl;
  image: FormControl;
  attack: FormControl;
  defense: FormControl;
  hp: FormControl;
  type: FormControl;

  focusName = true;

  savingPokemon = false;

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

  onSave() {
    const pokemon: Pokemon = {
      attack: this.attack.value,
      defense: this.defense.value,
      image: this.image.value,
      hp: this.hp.value,
      name: this.name.value,
      type: this.type.value,
    };
    this.save.emit(pokemon)
    this.savingPokemon = true;
    this.saveButtonIcon = 'ri-loader-4-line';
  }
}
