import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroVeiculosComponent } from './filtro-veiculos.component';

describe('FiltroVeiculosComponent', () => {
  let component: FiltroVeiculosComponent;
  let fixture: ComponentFixture<FiltroVeiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroVeiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
