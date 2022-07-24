import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { PokemonService } from 'src/app/core/backend-rest/pokemon.service';
import { Pokemon } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon?: Pokemon | null;
  showForm = false;

  loadingPokemons = true;

  searchText: Subject<string> = new Subject();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
    this.searchText.subscribe({
      next: (text) => this.loadingPokemons = true
    })
    this.pokemonService.search(this.searchText).subscribe({
      next: res =>{
        console.log(res);
        
        this.updatePokemonsList(res);
      }
    })
  }

  /**
   * Carga los pokemons desde el servicio Backend   
   */
  private async loadPokemons() {
    try {
      this.loadingPokemons = true;
      const res = await lastValueFrom(this.pokemonService.findAll());
      this.updatePokemonsList(res);
    } catch (error) {
      console.error(error);
    }
  }
  private updatePokemonsList(requestResult: any){
    this.loadingPokemons = false;
    if (requestResult.success == false) {
      console.error(requestResult);
      return;
    }
    this.pokemons = requestResult;
  }
  /**
   * Muestra el formulario y limpia valores actuales
   */
  onNewPokemon() {
    this.showForm = false;
    setTimeout(() => {
      this.showForm = true;
    }, 0);
    this.selectedPokemon = null;
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
      const isPokemonDuplicated = !this.selectedPokemon
        ? this.validateDuplicatedPokemon(pokemon.name)
        : false;
      if (isPokemonDuplicated) {
        // no guardar el pokemon si se encuentra duplicado
        alert(`El Pokemon: ${pokemon.name} ya ha se encuentra registrado`);
        return;
      }
      // guardar un pokemon porque no esta seleccionado uno para editar
      if (!this.selectedPokemon) {
        await this.createPokemon(pokemon);
      } else {
        await this.updatePokemon(this.selectedPokemon.id as number, pokemon);
      }
      this.loadPokemons();
      this.cancelSavePokemon();
      // editar el pokemon seleccionado
    } catch (error) {
      alert(error);
    }
  }

  /**
   * Validar si un pokemon ya esta registrado
   * @param pokemonName Nombre del pokemon a validar
   * @returns true si el pokemon ya esta en el listado, false si no se encuentra al pokemon
   */
  private validateDuplicatedPokemon(pokemonName: string): boolean {
    return !!this.pokemons.find((pokemon) => pokemon.name === pokemonName);
  }

  /**
   * Crea un pokemon con el servicio de backend
   * @param pokemon Datos del pokemon a crear
   * @returns promesa con la respuesta del Backend
   */
  private createPokemon(pokemon: Pokemon) {
    return lastValueFrom(this.pokemonService.create(pokemon));
  }

  /**
   * Actualiza un pokemon con el servicio de backend
   * @param pokemonId Id del pokemon a acutalizar
   * @param pokemon Datos actualizados del pokemon
   * @returns promesa con la respuesta del Backend
   */
  private updatePokemon(pokemonId: number, pokemon: Pokemon) {
    return lastValueFrom(this.pokemonService.update(pokemonId, pokemon));
  }
}
