import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtwAddComponent } from './btw-add.component';

describe('BtwAddComponent', () => {
  let component: BtwAddComponent;
  let fixture: ComponentFixture<BtwAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtwAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtwAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
