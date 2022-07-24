import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormRangeInputComponent } from './form-range-input.component';

describe('FormRangeInputComponent', () => {
  let component: FormRangeInputComponent;
  let fixture: ComponentFixture<FormRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [  FormsModule, ReactiveFormsModule ],
      declarations: [ FormRangeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize vars textLabel, controlName, min, max', () => {
    expect(component.textLabel).toEqual('');
    expect(component.controlName).toEqual('');
    expect(component.min).toEqual(0);
    expect(component.max).toEqual(100);
  })

  it('should change label to "Ataque"', () => {
    component.textLabel = 'Ataque';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.innerText).toEqual('Ataque');
  })

  it('should change min to "-100"', () => {
    component.min = -100;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(+input.min).toEqual(-100);
  })

  it('should change max to "1000"', () => {
    component.max = 1000;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(+input.max).toEqual(1000);
  })

});
