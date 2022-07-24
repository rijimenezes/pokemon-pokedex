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
   * 
   * @param searchingText Busqueda
   * @returns 
   */
  findAll(): Observable<Pokemon[] | any> {
    return this.api
      .get('', { idAuthor: this.ID_AUTHOR })
      .pipe(takeUntil(this.stopRequest));
  }

  findOneById(pokemonId: number): Observable<Pokemon> {
    return this.api.get(`${pokemonId}`);
  }

  create(pokemon: Pokemon) {
    pokemon.idAuthor = +this.ID_AUTHOR;
    return this.api.post('', pokemon, { idAuthor: +this.ID_AUTHOR });
  }

  update(pokemonId: number, pokemon: Pokemon) {
    pokemon.idAuthor = +this.ID_AUTHOR;
    return this.api.put(`${pokemonId}`, pokemon);
  }

  delete(pokemonId: number) {
    return this.api.delete(`${pokemonId}`);
  }
}
