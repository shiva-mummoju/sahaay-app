import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingComponent } from './admin-pending.component';

describe('AdminPendingComponent', () => {
  let component: AdminPendingComponent;
  let fixture: ComponentFixture<AdminPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
