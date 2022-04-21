import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeAddComponent } from './probe-add.component';

describe('ProbeAddComponent', () => {
  let component: ProbeAddComponent;
  let fixture: ComponentFixture<ProbeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
