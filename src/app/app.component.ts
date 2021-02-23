import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Control, defaults as defaultControls, FullScreen, MousePosition, ScaleLine, ZoomSlider } from 'ol/control';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import RotateNorthControl from 'ol/control/ZoomToExtent';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import ImageWMS from 'ol/source/ImageWMS';
import { Tile as TileLayer, Vector as VectorLayer, Image as ImageLayer } from 'ol/layer';
import { Stroke, Style } from 'ol/style';
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
          source: new OSM()
        }),
        new TileLayer({
          source: new TileWMS({
            url: 'https://dev-gis.ankageo.com/geoserver/videogps/wms?service=WMS&version=1.1.0&request=GetMap&layers=videogps%3Afiltered_by_time_videogps&bbox=28.9239781825%2C41.0050802675%2C28.960758145%2C41.0361669175&width=768&height=649&srs=EPSG%3A4326&format=application/openlayers',
            crossOrigin: 'anonymous',
            params: {},
            serverType: 'geoserver',
          }),
        })
      ],
      view: new View({
        center: transform([28.950, 41.0159], 'EPSG:4326', 'EPSG:3857',),
        zoom: 14
      }),
      controls: defaultControls().extend([
        new ZoomSlider(), new FullScreen(), new ScaleLine()
      ]),
    });
  }
}
