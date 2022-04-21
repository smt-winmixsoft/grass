import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeEditComponent } from './probe-edit.component';

describe('ProbeEditComponent', () => {
  let component: ProbeEditComponent;
  let fixture: ComponentFixture<ProbeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
