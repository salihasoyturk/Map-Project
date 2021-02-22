import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Control, defaults as defaultControls } from 'ol/control';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import RotateNorthControl from 'ol/control/ZoomToExtent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'Map-Project';
  map?: Map;
  ngAfterViewInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: [813079.7791264898, 5929220.284081122],
        zoom: 7,
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898,
            5929220.284081122,
            848966.9639063801,
            5936863.986909639,
          ],
        }),
      ]),
    });
    this.map = new Map({
      controls: defaultControls().extend([new RotateNorthControl()]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 3,
        rotation: 1,
      }),
    });
  }
  getCoord(event: any) {
    var coordinate = this.map?.getEventCoordinate(event);
    console.log(event);
  }
}
