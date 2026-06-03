import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSpiderfierComponent } from './map-spiderfier.component';

describe('MapSpiderfierComponent', () => {
  let component: MapSpiderfierComponent;
  let fixture: ComponentFixture<MapSpiderfierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapSpiderfierComponent]
    });
    fixture = TestBed.createComponent(MapSpiderfierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
