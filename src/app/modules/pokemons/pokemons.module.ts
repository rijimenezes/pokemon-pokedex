import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsComponent } from './pokemons.component';
import { SearchComponent } from './components/search/search.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTextInputComponent } from './components/form-text-input/form-text-input.component';
import { FormRangeInputComponent } from './components/form-range-input/form-range-input.component';


@NgModule({
  declarations: [
    PokemonsComponent,
    SearchComponent,
    PokemonFormComponent,
    ButtonComponent,
    FormTextInputComponent,
    FormRangeInputComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PokemonsModule { }
