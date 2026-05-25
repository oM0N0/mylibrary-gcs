import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atrasados } from './atrasados';

describe('Atrasados', () => {
  let component: Atrasados;
  let fixture: ComponentFixture<Atrasados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atrasados],
    }).compileComponents();

    fixture = TestBed.createComponent(Atrasados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
