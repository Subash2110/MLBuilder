import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNewComponent } from './dashboard-new.component';

describe('DashboardNewComponent', () => {
  let component: DashboardNewComponent;
  let fixture: ComponentFixture<DashboardNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardNewComponent]
    });
    fixture = TestBed.createComponent(DashboardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
