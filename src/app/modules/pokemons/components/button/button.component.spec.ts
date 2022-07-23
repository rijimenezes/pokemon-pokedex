import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize vars text, iconName, textColorClass, backgroundColorClass, isDisabled', () => {
    expect(component.text).toEqual('');
    expect(component.iconName).toEqual('');
    expect(component.textColorClass).toEqual('p-text-white');
    expect(component.backgroundColorClass).toEqual('p-bg-purple');
    expect(component.isDisabled).toEqual(false);
  })

  it('should change text to "Nuevo"', () => {
    component.text = 'Nuevo';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('span');
    expect(button.innerText).toEqual('Nuevo');
  })

  it('should change iconName to "add"', () => {
    component.iconName = 'add';
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('i');
    expect(icon.classList).toContain('add');    
  })

  it('should make disabled', () => {
    component.isDisabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toEqual(true)   
  })

  it('should emit a click', () => {
    component.handleClick.emit()
    expect().nothing()
  })
});
