import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinasPrintComponent } from './minas-print.component';

describe('MinasPrintComponent', () => {
  let component: MinasPrintComponent;
  let fixture: ComponentFixture<MinasPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinasPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinasPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
