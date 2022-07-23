import { Injectable } from '@angular/core';
import { debounceTime, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { ApiService } from './api.service';
const ID_AUTHOR = 1;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  stopRequest: Subject<void> = new Subject();

  constructor(private api: ApiService) {}

  search(searchingText: Observable<string>) {
    return searchingText.pipe(
      debounceTime(400),
      switchMap((text) => {
        this.stopRequest.next();
        return this.findAll(text);
      })
    );
  }

  findAll(searchingText?: string): Observable<Pokemon[] | any> {
    return this.api
      .get('', { name: searchingText, idAuthor: ID_AUTHOR })
      .pipe(takeUntil(this.stopRequest));
  }

  findOneById(pokemonId: number): Observable<Pokemon> {
    return this.api.get(`${pokemonId}`);
  }

  create(pokemon: Pokemon) {
    pokemon.idAuthor = ID_AUTHOR;
    return this.api.post('', pokemon, { idAuthor: ID_AUTHOR });
  }

  update(pokemonId: number, pokemon: Pokemon) {
    pokemon.idAuthor = ID_AUTHOR;
    return this.api.put(`${pokemonId}`, pokemon);
  }

  delete(pokemonId: number) {
    return this.api.delete(`${pokemonId}`);
  }
}
