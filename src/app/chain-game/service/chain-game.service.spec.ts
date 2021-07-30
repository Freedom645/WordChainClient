import { TestBed } from '@angular/core/testing';

import { ChainGameService } from './chain-game.service';

describe('ChainGameService', () => {
  let service: ChainGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
