import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStartStopComponent } from './admin-start-stop.component';

describe('AdminStartStopComponent', () => {
  let component: AdminStartStopComponent;
  let fixture: ComponentFixture<AdminStartStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStartStopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStartStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
