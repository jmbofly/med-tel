import { TestBed } from '@angular/core/testing';

import { CovidUpdateService } from './covid-update.service';

describe('CovidUpdateService', () => {
  let service: CovidUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
