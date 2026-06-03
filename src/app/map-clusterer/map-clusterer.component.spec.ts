import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapClustererComponent } from './map-clusterer.component';

describe('MapClustererComponent', () => {
  let component: MapClustererComponent;
  let fixture: ComponentFixture<MapClustererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapClustererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapClustererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
