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

const dot = new Feature({
  geometry: new Point(
    fromLonLat([parseFloat(lon.value), parseFloat(lat.value)]),
  ),
});

class CustomMouseWheelZoom extends MouseWheelZoom {
  constructor() {
    super({
      anchorCoordinate: fromLonLat([
        parseFloat(lon.value),
        parseFloat(lat.value),
      ]),
    });
  }
}

class CustomKeyboardZoom extends KeyboardZoom {
  constructor() {
    super({
      anchorCoordinate: fromLonLat([
        parseFloat(lon.value),
        parseFloat(lat.value),
      ]),
    });
  }
}

class CustomDoubleClickZoom extends DoubleClickZoom {
  constructor() {
    super({
      anchorCoordinate: fromLonLat([
        parseFloat(lon.value),
        parseFloat(lat.value),
      ]),
    });
  }
}

class CustomPinchZoom extends PinchZoom {
  constructor() {
    super({
      anchorCoordinate: fromLonLat([
        parseFloat(lon.value),
        parseFloat(lat.value),
      ]),
    });
  }
}

class CustomPinchRotate extends PinchRotate {
  constructor() {
    super({
      anchorCoordinate: fromLonLat([
        parseFloat(lon.value),
        parseFloat(lat.value),
      ]),
    });
  }
}

const customMouseWheelZoom = new CustomMouseWheelZoom();
const customKeyboardZoom = new CustomKeyboardZoom();
const customDoubleClickZoom = new CustomDoubleClickZoom();
const customPinchZoom = new CustomPinchZoom();
const customPinchRotate = new CustomPinchRotate();

const map = new Map({
  interactions: defaults({
    mouseWheelZoom: false,
    keyboardZoom: false,
    doubleClickZoom: false,
    pinchZoom: false,
    pinchRotate: false,
  }).extend([
    customMouseWheelZoom,
    customKeyboardZoom,
    customDoubleClickZoom,
    customPinchZoom,
    customPinchRotate,
  ]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [dot],
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

    const geom = dot.getGeometry();
    if (geom) {
      geom.setCoordinates(fromLonLat([lonNum, latNum]));
    } else {
      dot.setGeometry(new Point(fromLonLat([lonNum, latNum])));
    }

    customMouseWheelZoom.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
    customKeyboardZoom.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
    customDoubleClickZoom.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
    customPinchZoom.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
    customPinchRotate.setAnchorCoordinate(fromLonLat([lonNum, latNum]));
  } else {
    dot.setGeometry(null);

    customMouseWheelZoom.setAnchorCoordinate(null);
    customKeyboardZoom.setAnchorCoordinate(null);
    customDoubleClickZoom.setAnchorCoordinate(null);
    customPinchZoom.setAnchorCoordinate(null);
    customPinchRotate.setAnchorCoordinate(null);
  }
}

enabled.addEventListener('change', Update);
lat.addEventListener('input', Update);
lon.addEventListener('input', Update);
