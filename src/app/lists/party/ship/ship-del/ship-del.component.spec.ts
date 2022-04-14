import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipDelComponent } from './ship-del.component';

describe('ShipDelComponent', () => {
  let component: ShipDelComponent;
  let fixture: ComponentFixture<ShipDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
