import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMainComponent } from './party-main.component';

describe('PartyMainComponent', () => {
  let component: PartyMainComponent;
  let fixture: ComponentFixture<PartyMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
