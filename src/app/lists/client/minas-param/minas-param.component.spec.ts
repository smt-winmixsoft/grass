import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinasParamComponent } from './minas-param.component';

describe('MinasParamComponent', () => {
  let component: MinasParamComponent;
  let fixture: ComponentFixture<MinasParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinasParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinasParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
