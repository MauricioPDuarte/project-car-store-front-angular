import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFotoVeiculoComponent } from './cadastro-foto-veiculo.component';

describe('CadastroFotoVeiculoComponent', () => {
  let component: CadastroFotoVeiculoComponent;
  let fixture: ComponentFixture<CadastroFotoVeiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroFotoVeiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroFotoVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
