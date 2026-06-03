import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDealerNoticeComponent } from './map-dealer-notice.component';

describe('MapDealerNoticeComponent', () => {
  let component: MapDealerNoticeComponent;
  let fixture: ComponentFixture<MapDealerNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDealerNoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapDealerNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
