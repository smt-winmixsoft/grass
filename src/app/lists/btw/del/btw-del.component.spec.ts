import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtwDelComponent } from './btw-del.component';

describe('BtwDelComponent', () => {
  let component: BtwDelComponent;
  let fixture: ComponentFixture<BtwDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtwDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtwDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
