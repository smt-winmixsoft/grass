import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipPrintComponent } from './ship-print.component';

describe('ShipPrintComponent', () => {
  let component: ShipPrintComponent;
  let fixture: ComponentFixture<ShipPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
