import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackTypeDelComponent } from './pack-type-del.component';

describe('PackTypeDelComponent', () => {
  let component: PackTypeDelComponent;
  let fixture: ComponentFixture<PackTypeDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackTypeDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackTypeDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
