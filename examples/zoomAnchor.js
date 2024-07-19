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

class CustomMouseWheelZoom extends MouseWheelZoom {
  constructor() {
    super({anchorCoordinate: [0, 0]});
  }
}

class CustomKeyboardZoom extends KeyboardZoom {
  constructor() {
    super({anchorCoordinate: [0, 0]});
  }
}

class CustomDoubleClickZoom extends DoubleClickZoom {
  constructor() {
    super({anchorCoordinate: [0, 0]});
  }
}

class CustomPinchZoom extends PinchZoom {
  constructor() {
    super({anchorCoordinate: [0, 0]});
  }
}

class CustomPinchRotate extends PinchRotate {
  constructor() {
    super({anchorCoordinate: [0, 0]});
  }
}

const map = new Map({
  interactions: defaults({
    mouseWheelZoom: false,
    keyboardZoom: false,
    doubleClickZoom: false,
    pinchZoom: false,
    pinchRotate: false,
  }).extend([
    new CustomMouseWheelZoom(),
    new CustomKeyboardZoom(),
    new CustomDoubleClickZoom(),
    new CustomPinchZoom(),
    new CustomPinchRotate(),
  ]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
