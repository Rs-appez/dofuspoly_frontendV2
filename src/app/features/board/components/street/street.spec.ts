import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Street } from './street';

describe('Street', () => {
  let component: Street;
  let fixture: ComponentFixture<Street>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Street]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Street);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
