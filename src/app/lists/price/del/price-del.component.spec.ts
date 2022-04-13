import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDelComponent } from './price-del.component';

describe('PriceDelComponent', () => {
  let component: PriceDelComponent;
  let fixture: ComponentFixture<PriceDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
