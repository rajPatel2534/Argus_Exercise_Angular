import { TestBed } from '@angular/core/testing';

import { PinCodeService } from './pin-code.service';

describe('PinCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PinCodeService = TestBed.get(PinCodeService);
    expect(service).toBeTruthy();
  });
});
