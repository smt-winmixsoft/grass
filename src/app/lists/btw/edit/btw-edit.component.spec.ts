import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtwEditComponent } from './btw-edit.component';

describe('BtwEditComponent', () => {
  let component: BtwEditComponent;
  let fixture: ComponentFixture<BtwEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtwEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtwEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
