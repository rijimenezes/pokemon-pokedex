import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { PokemonService } from 'src/app/core/backend-rest/pokemon.service';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { FormRequestService } from './services/form-request.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon?: Pokemon | null;
  showForm = false;

  constructor(
    private pokemonService: PokemonService,
    private formRequestSrv: FormRequestService
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  private async loadPokemons() {
    try {
      const res = await lastValueFrom(this.pokemonService.findAll());
      if (res.success == false) {
        console.error(res);
        return;
      }
      this.pokemons = res;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Muestra el formulario y limpia valores actuales
   */
  onNewPokemon() {
    this.showForm = false;
    setTimeout(() => {
      this.showForm = true;
    });
    this.selectedPokemon = null;
    this.formRequestSrv.requestNewPokemon.next();
  }

  /**
   * Se oculta el formulario y limpia el pokemon seleccionado
   */
  cancelSavePokemon() {
    this.selectedPokemon = null;
    this.showForm = false;
  }

  /**
   * Seleccionar el pokemon a editar y mostrar formulario
   * @param pokemon pokemon que se va a editar
   */
  onEditPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    this.showForm = true;
  }

  /**
   * Eliminar un pokemon del listado
   * @param pokemon pokemon a eliminar
   */
  async onDeletePokemon(pokemon: Pokemon) {
    // solicitar confirmacion
    const confirmResult = confirm(
      `¿Está seguro de eliminar al pokemon: ${pokemon.name}?`
    );

    if (confirmResult) {
      const pokemonToDeleteIndex = this.pokemons.findIndex(
        (pk) => pk.id == pokemon.id
      );
      if (pokemonToDeleteIndex > -1) {
        this.pokemons.splice(pokemonToDeleteIndex, 1);
        await lastValueFrom(this.pokemonService.delete(pokemon.id as number));        
      }
    }
  }

  /**
   * Guardar/Editar un pokemon
   * @param pokemon Pokemon a guardar/editar desde el formulario
   */
  async onSavePokemon(pokemon: Pokemon) {
    try {
      // guardar un pokemon porque no esta seleccionado uno para editar
      
      if (!this.selectedPokemon) {
        await lastValueFrom(
          this.pokemonService.create(pokemon)
          );
        }else{
        await lastValueFrom(this.pokemonService.update(this.selectedPokemon.id as number,pokemon));        
      }
      this.loadPokemons();
      this.cancelSavePokemon();
      // editar el pokemon seleccionado
    } catch (error) {
      alert(error);
    }
  }
}
