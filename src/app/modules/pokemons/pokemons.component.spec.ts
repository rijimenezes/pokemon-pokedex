import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { lastValueFrom, of, Subject } from 'rxjs';
import { PokemonService } from 'src/app/core/backend-rest/pokemon.service';
import { ButtonComponent } from './components/button/button.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { SearchComponent } from './components/search/search.component';

import { PokemonsComponent } from './pokemons.component';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;

  let pokemonsHttpSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    pokemonsHttpSpy = jasmine.createSpyObj<PokemonService>('PokemonService', [
      'findAll',
      'search',
      'create',
      'update',
      'delete',
    ]);
    await TestBed.configureTestingModule({
      declarations: [
        PokemonsComponent,
        SearchComponent,
        ButtonComponent,
        PokemonFormComponent,
      ],
      providers: [{ provide: PokemonService, useValue: pokemonsHttpSpy }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    pokemonsHttpSpy.findAll.and.returnValue(of([]));
    pokemonsHttpSpy.search.and.returnValue(of([]));
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize vars pokemons, showForm, loadingPokemons, searchText', () => {
    expect(component.pokemons.length).toEqual(0);
    expect(component.showForm).toEqual(false);
    expect(component.loadingPokemons).toEqual(false);
    expect(component.searchText).toBeTruthy();
  });

  it('should load pokemons by function "loadPokemons()"', async () => {
    const pokemon = {
      attack: 50,
      defense: 50,
      hp: 100,
      image: 'url',
      name: 'pokemon',
      type: 'normal',
    };
    pokemonsHttpSpy.findAll.and.returnValue(of([pokemon, pokemon, pokemon]));
    await component.loadPokemons();
    fixture.detectChanges();
    expect(component.pokemons.length).toEqual(3);
  });

  it('should asign pokemons by function "updatePokemonsList(requestResult: any)"', () => {
    const pokemons = [
      {
        attack: 50,
        defense: 50,
        hp: 100,
        image: 'url',
        name: 'pokemon',
        type: 'normal',
      },
    ];
    component.updatePokemonsList(pokemons);

    fixture.detectChanges();
    expect(component.pokemons.length).toEqual(1);
  });

  it('should not asign pokemons by function "updatePokemonsList(requestResult: any)"', () => {
    const pokemons = { success: false };
    component.updatePokemonsList(pokemons);
    fixture.detectChanges();
    expect().nothing();
    expect(component.pokemons.length).toEqual(0);
  });

  it('should request new pokemon by function "onNewPokemon()"', () => {
    component.onNewPokemon();
    fixture.detectChanges();
    expect(component.showForm).toEqual(false);
    expect(component.selectedPokemon).toEqual(null);
  });

  it('should cancel pokemon register by function "cancelSavePokemon()"', () => {
    component.cancelSavePokemon();
    fixture.detectChanges();
    expect(component.showForm).toEqual(false);
    expect(component.selectedPokemon).toEqual(null);
  });

  it('should update selected pokemon by function "onEditPokemon(pokemon: Pokemon)"', () => {
    const pokemon = {
      attack: 50,
      defense: 50,
      hp: 100,
      image: 'url',
      name: 'pokemon',
      type: 'normal',
    };
    component.onEditPokemon(pokemon);
    fixture.detectChanges();
    expect(component.showForm).toEqual(true);
    expect(component.selectedPokemon).toEqual(pokemon);
  });

  it('should delete selected pokemon by function "onDeletePokemon(pokemon: Pokemon)"', async () => {
    const pokemon = {
      attack: 50,
      defense: 50,
      hp: 100,
      image: 'url',
      name: 'pokemon',
      type: 'normal',
      id: 40,
    };
    pokemonsHttpSpy.findAll.and.returnValue(of([pokemon]));
    pokemonsHttpSpy.delete.and.returnValue(of([]));

    await component.loadPokemons();
    fixture.detectChanges();

    await component.onDeletePokemon(pokemon, false);
    fixture.detectChanges();
    expect(component.pokemons.length).toEqual(0);
  });

  it('should create pokemon by function "onSavePokemon(pokemon: Pokemon)"', async () => {
    const pokemon = {
      attack: 50,
      defense: 50,
      hp: 100,
      image: 'url',
      name: 'pokemon',
      type: 'normal',
    };

    pokemonsHttpSpy.findAll.and.returnValue(of([pokemon]));
    pokemonsHttpSpy.create.and.returnValue(of([]));

    await component.onSavePokemon(pokemon);
    fixture.detectChanges();
    expect(component.pokemons.length).toEqual(1);
  });

  it('should validate dupplicated pokemon by function "validateDuplicatedPokemon(pokemon: Pokemon)"', async () => {
    const pokemon = {
      attack: 50,
      defense: 50,
      hp: 100,
      image: 'url',
      name: 'pokemon',
      type: 'normal',
    };
    pokemonsHttpSpy.findAll.and.returnValue(of([pokemon]));
    await component.loadPokemons();
    fixture.detectChanges();
    const resultDuplicated = component.validateDuplicatedPokemon(pokemon.name);
    const resultNotDuplicated = component.validateDuplicatedPokemon('juan');
    expect(resultDuplicated).toEqual(true);
    expect(resultNotDuplicated).toEqual(false);
  });

  it('should call api to create pokemon by function "createPokemon(pokemon: Pokemon)"', async () => {
    const pokemon = {
      attack: 50,
      defense: 50,
      hp: 100,
      image: 'url',
      name: 'pokemon',
      type: 'normal',
    };
    pokemonsHttpSpy.create.and.returnValue(of([]));
    component.createPokemon(pokemon);
    await component.loadPokemons();
    fixture.detectChanges();
    expect().nothing();
  });

  it('should call api to update pokemon by function "updatePokemon(pokemonId: number, pokemon: Pokemon)"', async () => {
    const pokemon = {
      attack: 50,
      defense: 50,
      hp: 100,
      image: 'url',
      name: 'pokemon',
      type: 'normal',
    };
    pokemonsHttpSpy.update.and.returnValue(of([]));

    await component.updatePokemon(40, pokemon);
    fixture.detectChanges();
    expect().nothing();
  });
});
