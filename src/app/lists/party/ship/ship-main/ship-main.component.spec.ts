import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipMainComponent } from './ship-main.component';

describe('ShipMainComponent', () => {
  let component: ShipMainComponent;
  let fixture: ComponentFixture<ShipMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
