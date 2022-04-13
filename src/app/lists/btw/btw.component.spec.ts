import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtwComponent } from './btw.component';

describe('BtwComponent', () => {
  let component: BtwComponent;
  let fixture: ComponentFixture<BtwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
