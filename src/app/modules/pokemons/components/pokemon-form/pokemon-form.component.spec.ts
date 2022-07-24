import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { FormRangeInputComponent } from '../form-range-input/form-range-input.component';
import { FormTextInputComponent } from '../form-text-input/form-text-input.component';

import { PokemonFormComponent } from './pokemon-form.component';

describe('PokemonFormComponent', () => {
  let component: PokemonFormComponent;
  let fixture: ComponentFixture<PokemonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [  FormsModule, ReactiveFormsModule ],
      declarations: [ PokemonFormComponent, ButtonComponent, FormTextInputComponent, FormRangeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize vars pokemon, name, image, attack, defense,hp,type,focusName,savingPokemon,saveButtonIcon', () => {
    expect(component.pokemon).toEqual(null);
    expect(component.name).toBeTruthy();
    expect(component.image).toBeTruthy();
    expect(component.attack).toBeTruthy();
    expect(component.defense).toBeTruthy();
    expect(component.hp).toBeTruthy();
    expect(component.type).toBeTruthy();
    expect(component.focusName).toEqual(true);
    expect(component.savingPokemon).toEqual(false);
    expect(component.saveButtonIcon).toEqual('ri-save-2-fill');
  })

  it('should change savingPokemon to "true"', () => {
    component.savingPokemon = true;
    fixture.detectChanges();
    expect(component.savingPokemon).toEqual(true);
  })

  it('should change saveButtonIcon to "icono2"', () => {
    component.saveButtonIcon = 'icono2';
    fixture.detectChanges();
    expect(component.saveButtonIcon).toEqual('icono2');
  })

  it('should load pokemon data "ngOnchanges"', () => {
    component.pokemon = {
      attack: 50,
      defense: 50,
      hp: 100,
      image: 'url',
      name: 'pokemon',
      type: 'normal'
    };
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.attack.value).toEqual(50);
    expect(component.defense.value).toEqual(50);
    expect(component.hp.value).toEqual(100);
    expect(component.image.value).toEqual('url');
    expect(component.name.value).toEqual('pokemon');
    expect(component.type.value).toEqual('normal');
    expect(component.focusName).toEqual(false);
    setTimeout(() => {
      expect(component.focusName).toEqual(true);
    }, 200);
  })

  it('should emit pokemon on function "onSave"', () => {
    component.pokemon = {
      attack: 50,
      defense: 50,
      hp: 100,
      image: 'url',
      name: 'pokemon',
      type: 'normal'
    };
    component.ngOnChanges();
    component.onSave();
    fixture.detectChanges();
    expect(component.saveButtonIcon).toEqual('ri-loader-4-line');
    expect(component.savingPokemon).toEqual(true);
  })

});
