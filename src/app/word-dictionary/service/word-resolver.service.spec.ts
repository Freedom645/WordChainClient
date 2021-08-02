import { TestBed } from '@angular/core/testing';

import { WordResolverService } from './word-resolver.service';

describe('WordResolverService', () => {
  let service: WordResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
