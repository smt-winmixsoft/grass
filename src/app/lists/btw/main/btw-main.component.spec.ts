import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtwMainComponent } from './btw-main.component';

describe('BtwMainComponent', () => {
  let component: BtwMainComponent;
  let fixture: ComponentFixture<BtwMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtwMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtwMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
