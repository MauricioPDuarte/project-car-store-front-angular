import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSucessoComponent } from './cadastro-sucesso.component';

describe('CadastroSucessoComponent', () => {
  let component: CadastroSucessoComponent;
  let fixture: ComponentFixture<CadastroSucessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroSucessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
