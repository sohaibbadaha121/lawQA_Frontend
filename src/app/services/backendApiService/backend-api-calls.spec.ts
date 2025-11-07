import { TestBed } from '@angular/core/testing';

import { BackendApiCalls } from '../backendApiService/backend-api-calls';

describe('BackendApiCalls', () => {
  let service: BackendApiCalls;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendApiCalls);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
