import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let apiHttpSpy: jasmine.SpyObj<ApiService>;
  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [{ provide: ApiService, useValue: apiHttpSpy }],
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
