import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRangeInputComponent } from './form-range-input.component';

describe('FormRangeInputComponent', () => {
  let component: FormRangeInputComponent;
  let fixture: ComponentFixture<FormRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
});
