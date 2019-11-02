import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelColaboradorComponent } from './painel-colaborador.component';

describe('PainelColaboradorComponent', () => {
  let component: PainelColaboradorComponent;
  let fixture: ComponentFixture<PainelColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
