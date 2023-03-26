import { TestBed } from '@angular/core/testing';

import { EmployeedatastorageService } from './employeedatastorage.service';

describe('EmployeedatastorageService', () => {
  let service: EmployeedatastorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeedatastorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
