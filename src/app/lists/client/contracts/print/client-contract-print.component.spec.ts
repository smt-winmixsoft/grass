import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContractPrintComponent } from './client-contract-print.component';

describe('ClientContractPrintComponent', () => {
  let component: ClientContractPrintComponent;
  let fixture: ComponentFixture<ClientContractPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientContractPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientContractPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
