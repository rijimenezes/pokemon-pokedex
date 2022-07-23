import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsComponent } from './pokemons.component';
import { SearchComponent } from './components/search/search.component';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';


@NgModule({
  declarations: [
    PokemonsComponent,
    SearchComponent,
    PokemonItemComponent,
    PokemonFormComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule
  ]
})
export class PokemonsModule { }
