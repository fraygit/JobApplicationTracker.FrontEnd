import { TestBed } from '@angular/core/testing';

import { JobAppApiService } from './job-app-api.service';

describe('JobAppApiService', () => {
  let service: JobAppApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobAppApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
