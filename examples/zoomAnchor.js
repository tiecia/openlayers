import DoubleClickZoom from '../src/ol/interaction/DoubleClickZoom.js';
import KeyboardZoom from '../src/ol/interaction/KeyboardZoom.js';
import Map from '../src/ol/Map.js';
import MouseWheelZoom from '../src/ol/interaction/MouseWheelZoom.js';
import OSM from '../src/ol/source/OSM.js';
import PinchRotate from '../src/ol/interaction/PinchRotate.js';
import PinchZoom from '../src/ol/interaction/PinchZoom.js';
import TileLayer from '../src/ol/layer/Tile.js';
import View from '../src/ol/View.js';
import {defaults} from '../src/ol/interaction/defaults.js';
import {fromLonLat} from '../src/ol/proj.js';

import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Vector as VectorSource} from 'ol/source.js';

const lat = document.getElementById('lat');
const lon = document.getElementById('lon');
const enabled = document.getElementById('enabled');

lat.value = '0';
lon.value = '0';
enabled.checked = true;

const point = new Feature({
  geometry: new Point(
    fromLonLat([parseFloat(lon.value), parseFloat(lat.value)]),
  ),
});

const initCoordinate = fromLonLat([
  parseFloat(lon.value),
  parseFloat(lat.value),
]);

const mouseWheelZoom = new MouseWheelZoom({anchorCoordinate: initCoordinate});
const keyboardZoom = new KeyboardZoom({anchorCoordinate: initCoordinate});
const doubleClickZoom = new DoubleClickZoom({anchorCoordinate: initCoordinate});
const pinchZoom = new PinchZoom({anchorCoordinate: initCoordinate});
const pinchRotate = new PinchRotate({anchorCoordinate: initCoordinate});

const map = new Map({
  interactions: defaults({
    mouseWheelZoom: false,
    keyboardZoom: false,
    doubleClickZoom: false,
    pinchZoom: false,
    pinchRotate: false,
  }).extend([
    mouseWheelZoom,
    keyboardZoom,
    doubleClickZoom,
    pinchZoom,
    pinchRotate,
  ]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [point],
      }),
    }),
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

function Update() {
  if (enabled.checked) {
    const latNum = parseFloat(lat.value);
    const lonNum = parseFloat(lon.value);

    const geom = point.getGeometry();
    if (geom) {
      geom.setCoordinates(fromLonLat([lonNum, latNum]));
    } else {
      point.setGeometry(new Point(fromLonLat([lonNum, latNum])));
    }

    mouseWheelZoom.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
    keyboardZoom.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
    doubleClickZoom.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
    pinchZoom.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
    pinchRotate.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
  } else {
    point.setGeometry(null);

    mouseWheelZoom.setAnchorCoordinate(null);
    keyboardZoom.setAnchorCoordinate(null);
    doubleClickZoom.setAnchorCoordinate(null);
    pinchZoom.setAnchorCoordinate(null);
    pinchRotate.setAnchorCoordinate(null);
  }
}

enabled.addEventListener('change', Update);
lat.addEventListener('input', Update);
lon.addEventListener('input', Update);
