import { Injectable } from '@angular/core';
import { debounceTime, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  stopRequest: Subject<void> = new Subject();
  ID_AUTHOR = '1';

  constructor(private api: ApiService) {}

  /**
   * Inicia busqueda con un debunce de 400ms al momento de escribir en el buscador
   * @param searchingText texto a buscar para la peticion del backend
   * @returns Observable respuesta de la funcion findAll
   */
  search(searchingText: Observable<string>) {
    return searchingText.pipe(
      debounceTime(400),
      switchMap((text) => {
        this.stopRequest.next();
        this.ID_AUTHOR = text;
        return this.findAll();
      })
    );
  }

  /**
   * Mandar peticion al backend para buscar los pokemons por id de autor
   * @returns Observable respuesta del backend
   */
  findAll(): Observable<Pokemon[] | any> {
    return this.api
      .get('', { idAuthor: this.ID_AUTHOR })
      .pipe(takeUntil(this.stopRequest));
  }

  /**
   * Mandar peticion al backend para buscar un pokemon por Id
   * @param pokemonId id del pokemon a consultar
   * @returns Observable respuesta del backend
   */
  findOneById(pokemonId: number): Observable<Pokemon> {
    return this.api.get(`${pokemonId}`);
  }

  /**
   * Mandar peticion al backend para crear un pokemon
   * @param pokemon informacion del pokemon a crear
   * @returns Observable respuesta del backend
   */
  create(pokemon: Pokemon) {
    pokemon.idAuthor = +this.ID_AUTHOR;
    return this.api.post('', pokemon, { idAuthor: +this.ID_AUTHOR });
  }

  /**
   * Mandar peticion al backend para actualizar un pokemon
   * @param pokemonId id del pokemon a actualizar
   * @param pokemon informacion del pokemon a actualizar
   * @returns Observable respuesta del backend
   */
  update(pokemonId: number, pokemon: Pokemon) {
    pokemon.idAuthor = +this.ID_AUTHOR;
    return this.api.put(`${pokemonId}`, pokemon);
  }

  /**
   * Mandar peticion al backend para eliminar un pokemon
   * @param pokemonId id del pokemon a eliminar
   * @returns Observable respuesta del backend
   */
  delete(pokemonId: number) {
    return this.api.delete(`${pokemonId}`);
  }
}
