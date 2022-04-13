import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackTypeMainComponent } from './pack-type-main.component';

describe('PackTypeMainComponent', () => {
  let component: PackTypeMainComponent;
  let fixture: ComponentFixture<PackTypeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackTypeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackTypeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
