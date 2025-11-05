import { TestBed } from '@angular/core/testing';

import { Dice } from './dice';

describe('Dice', () => {
  let service: Dice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
