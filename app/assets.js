import Loader from './loader';

export default class Assets {
  static load(callback) {
    const resources = [{
      name: 'tiles',
      url: require('../static/tiles.png')
    }, {
      name: 'sphere',
      url: require('../static/sphere.png')
    }];
    const loader = new Loader(resources, this);
    loader.load(callback);
  }
}
