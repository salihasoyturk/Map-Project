import { AfterViewInit, Component } from '@angular/core';
import {
  defaults as defaultControls,
  FullScreen,
  ScaleLine,
  ZoomSlider,
} from 'ol/control';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import { transform } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
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
          source: new OSM(),
        }),
        new TileLayer({
          source: new TileWMS({
            url:
              'https://dev-gis.ankageo.com/geoserver/videogps/wms?service=WMS&version=1.1.0&request=GetMap&layers=videogps%3Afiltered_by_time_videogps&bbox=28.9239781825%2C41.0050802675%2C28.960758145%2C41.0361669175&width=768&height=649&srs=EPSG%3A4326&format=application/openlayers',
            crossOrigin: 'anonymous',
            params: {},
            serverType: 'geoserver',
          }),
        }),
        new TileLayer({
          source: new TileWMS({
            url:
              'https://dev-gis.ankageo.com/geoserver/videogps/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=videogps%3Afiltered_by_time_videogps&maxFeatures=50&outputFormat=application%2Fjson',
            crossOrigin: 'anonymous',
            params: {},
            serverType: 'geoserver',
          }),
        }),
      ],
      view: new View({
        center: transform([28.95, 41.0159], 'EPSG:4326', 'EPSG:3857'),
        zoom: 14,
      }),
      controls: defaultControls().extend([
        new ZoomSlider(),
        new FullScreen(),
        new ScaleLine(),
      ]),
    });
    console.log(URL, 'wfs geliyor mu acep');
  }
}
