import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormTextInputComponent } from './form-text-input.component';

describe('FormTextInputComponent', () => {
  let component: FormTextInputComponent;
  let fixture: ComponentFixture<FormTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [  FormsModule, ReactiveFormsModule ],
      declarations: [ FormTextInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize vars textLabel, controlName, placeHolder, focus', () => {
    expect(component.textLabel).toEqual('');
    expect(component.controlName).toEqual('');
    expect(component.placeHolder).toEqual('');
    expect(component.focus).toEqual(false);
  })

  it('should change label to "Nombre"', () => {
    component.textLabel = 'Nombre';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.innerText).toEqual('Nombre');
  })

  it('should change placeHolder to "Nombre"', () => {
    component.placeHolder = 'Nombre';
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    
    expect(input.placeholder).toEqual('Nombre');
  })

  it('should change focus to "true"', () => {
    component.focus = true;
    fixture.detectChanges();
    
    expect(component.focus).toEqual(true);
  })
});
