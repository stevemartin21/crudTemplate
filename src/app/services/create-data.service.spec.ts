import { TestBed, inject } from '@angular/core/testing';

import { CreateDataService } from './create-data.service';

describe('CreateDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateDataService]
    });
  });

  it('should be created', inject([CreateDataService], (service: CreateDataService) => {
    expect(service).toBeTruthy();
  }));
});
