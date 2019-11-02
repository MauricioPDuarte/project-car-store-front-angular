import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAnuncioComponent } from './menu-anuncio.component';

describe('MenuAnuncioComponent', () => {
  let component: MenuAnuncioComponent;
  let fixture: ComponentFixture<MenuAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
