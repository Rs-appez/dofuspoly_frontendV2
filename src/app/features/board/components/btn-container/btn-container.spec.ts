import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnContainer } from './btn-container';

describe('BtnContainer', () => {
  let component: BtnContainer;
  let fixture: ComponentFixture<BtnContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
