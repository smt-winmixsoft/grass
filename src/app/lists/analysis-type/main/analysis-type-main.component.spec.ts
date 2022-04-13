import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTypeMainComponent } from './analysis-type-main.component';

describe('AnalysisTypeMainComponent', () => {
  let component: AnalysisTypeMainComponent;
  let fixture: ComponentFixture<AnalysisTypeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisTypeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTypeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});