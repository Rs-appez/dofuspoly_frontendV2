import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTurnBtn } from './end-turn-btn';

describe('EndTurnBtn', () => {
  let component: EndTurnBtn;
  let fixture: ComponentFixture<EndTurnBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndTurnBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndTurnBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
