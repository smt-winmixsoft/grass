import { TestBed } from '@angular/core/testing';

import { DataTablesService } from './datatables.service';

describe('DatatablesService', () => {
  let service: DataTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
