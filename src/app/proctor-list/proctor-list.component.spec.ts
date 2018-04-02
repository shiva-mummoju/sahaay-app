import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorListComponent } from './proctor-list.component';

describe('ProctorListComponent', () => {
  let component: ProctorListComponent;
  let fixture: ComponentFixture<ProctorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProctorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
