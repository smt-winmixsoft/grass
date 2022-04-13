import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDelComponent } from './party-del.component';

describe('PartyDelComponent', () => {
  let component: PartyDelComponent;
  let fixture: ComponentFixture<PartyDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
