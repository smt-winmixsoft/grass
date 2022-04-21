import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeMainComponent } from './probe-main.component';

describe('ProbeMainComponent', () => {
  let component: ProbeMainComponent;
  let fixture: ComponentFixture<ProbeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
