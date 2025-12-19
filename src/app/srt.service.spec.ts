import { TestBed } from '@angular/core/testing';

import { SrtService } from './srt.service';

describe('SrtService', () => {
  let service: SrtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
