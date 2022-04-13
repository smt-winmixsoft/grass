import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackTypeAddComponent } from './pack-type-add.component';

describe('PackTypeAddComponent', () => {
  let component: PackTypeAddComponent;
  let fixture: ComponentFixture<PackTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
