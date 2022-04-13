import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTypeAddComponent } from './analysis-type-add.component';

describe('AnalysisTypeAddComponent', () => {
  let component: AnalysisTypeAddComponent;
  let fixture: ComponentFixture<AnalysisTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
