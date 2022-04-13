import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackTypeEditComponent } from './pack-type-edit.component';

describe('PackTypeEditComponent', () => {
  let component: PackTypeEditComponent;
  let fixture: ComponentFixture<PackTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackTypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
