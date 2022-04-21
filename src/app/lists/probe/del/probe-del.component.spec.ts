import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeDelComponent } from './probe-del.component';

describe('ProbeDelComponent', () => {
  let component: ProbeDelComponent;
  let fixture: ComponentFixture<ProbeDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbeDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
