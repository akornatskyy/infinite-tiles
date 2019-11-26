import Loader from './loader';
import Tiles from '../static/tiles.png';
import Sphere from '../static/sphere.png';

export default class Assets {
  static load(callback) {
    const resources = [{
      name: 'tiles',
      url: Tiles
    }, {
      name: 'sphere',
      url: Sphere
    }];
    const loader = new Loader(resources, this);
    loader.load(callback);
  }
}
