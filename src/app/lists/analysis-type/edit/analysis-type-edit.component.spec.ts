import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTypeEditComponent } from './analysis-type-edit.component';

describe('AnalysisTypeEditComponent', () => {
  let component: AnalysisTypeEditComponent;
  let fixture: ComponentFixture<AnalysisTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisTypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
