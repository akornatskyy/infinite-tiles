export default class Loader {
  constructor(resources, owner=null) {
    this.resources = resources;
    this.owner = owner || {};
  }

  load(callback) {
    let n = this.resources.length;
    for (let r of this.resources) {
      const img = new Image();
      this.owner[r.name] = img;
      img.onload = () => {
        if (--n == 0) {
          callback(this, this.owner);
        }
      };

      img.src = r.url;
    }
  }
}
