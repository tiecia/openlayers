import KeyboardZoom from '../src/ol/interaction/KeyboardZoom.js';
import Map from '../src/ol/Map.js';
import MouseWheelZoom from '../src/ol/interaction/MouseWheelZoom.js';
import OSM from '../src/ol/source/OSM.js';
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

const map = new Map({
  interactions: defaults({
    mouseWheelZoom: false,
    keyboardZoom: false,
  }).extend([new CustomMouseWheelZoom(), new CustomKeyboardZoom()]),
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
