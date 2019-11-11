import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMenuComponent } from './cadastro-menu.component';

describe('CadastroMenuComponent', () => {
  let component: CadastroMenuComponent;
  let fixture: ComponentFixture<CadastroMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
