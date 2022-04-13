import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTypeDelComponent } from './analysis-type-del.component';

describe('AnalysisTypeDelComponent', () => {
  let component: AnalysisTypeDelComponent;
  let fixture: ComponentFixture<AnalysisTypeDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisTypeDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTypeDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
