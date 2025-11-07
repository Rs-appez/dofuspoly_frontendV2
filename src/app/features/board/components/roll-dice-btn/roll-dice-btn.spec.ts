import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDiceBtn } from './roll-dice-btn';

describe('RollDiceBtn', () => {
  let component: RollDiceBtn;
  let fixture: ComponentFixture<RollDiceBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollDiceBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollDiceBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
