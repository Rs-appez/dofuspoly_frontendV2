import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerToken } from './player-token';

describe('PlayerToken', () => {
  let component: PlayerToken;
  let fixture: ComponentFixture<PlayerToken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerToken]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerToken);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
