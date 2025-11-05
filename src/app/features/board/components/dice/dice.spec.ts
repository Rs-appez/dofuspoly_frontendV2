import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dice } from './dice';

describe('Dice', () => {
  let component: Dice;
  let fixture: ComponentFixture<Dice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
