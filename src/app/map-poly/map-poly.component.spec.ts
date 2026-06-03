import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPolyComponent } from './map-poly.component';

describe('MapPolyComponent', () => {
  let component: MapPolyComponent;
  let fixture: ComponentFixture<MapPolyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapPolyComponent]
    });
    fixture = TestBed.createComponent(MapPolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
