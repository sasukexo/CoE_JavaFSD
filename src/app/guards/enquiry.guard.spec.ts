import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { enquiryGuard } from './enquiry.guard';

describe('enquiryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => enquiryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
