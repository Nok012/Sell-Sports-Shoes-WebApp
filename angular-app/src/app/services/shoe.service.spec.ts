import { TestBed } from '@angular/core/testing';

import { ShoeService } from './shoe.service';

describe('CategoryService', () => {
  let service: ShoeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
