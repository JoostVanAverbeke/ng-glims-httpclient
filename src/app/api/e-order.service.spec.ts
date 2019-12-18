import { TestBed } from '@angular/core/testing';

import { EOrderService } from './e-order.service';

describe('EOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EOrderService = TestBed.get(EOrderService);
    expect(service).toBeTruthy();
  });
});
