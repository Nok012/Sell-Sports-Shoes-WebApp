import { TestBed } from '@angular/core/testing';

import { OderService } from './oder.service';

describe('OderService', () => {
  let service: OderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
