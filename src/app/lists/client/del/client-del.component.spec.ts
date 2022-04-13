import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDelComponent } from './client-del.component';

describe('ClientDelComponent', () => {
  let component: ClientDelComponent;
  let fixture: ComponentFixture<ClientDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
