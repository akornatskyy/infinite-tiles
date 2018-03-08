
export default class Cache {
  constructor(limit) {
    this.limit = limit;
    this.clear();
  }

  clear() {
    this.items = new Map();
    this.size = 0;
    this.older = null;
    this.newer = null;
  }

  get(key) {
    const entry = this.items.get(key);
    if (!entry) {
      return null;
    }

    this.used(key, entry);
    return entry.value;
  }

  peek(key) {
    const entry = this.items.get(key);
    return entry ? entry.value : null;
  }

  has(key) {
    return this.items.get(key) !== undefined;
  }

  touch(key) {
    let entry = this.items.get(key);
    if (!entry) {
      return false;
    }

    this.used(key, entry);
    return true;
  }

  set(key, value) {
    let entry = this.items.get(key);
    if (!entry) {
      entry = {};
      this.items.set(key, entry);
      if (this.size < this.limit) {
        this.size++;
      }
      else {
        this.evict();
      }
    }

    this.used(key, entry);
    entry.value = value;
  }

  remove(key) {
    let entry = this.items.get(key);
    if (!entry) {
      return null;
    }

    this.size--;
    this.items.delete(key);
    const o = entry.older;
    const n = entry.newer;

    if (this.older === key) {
      this.older = n;
    } else {
      this.items.get(o).newer = n;
    }

    if (this.newer === key) {
      this.newer = o;
    } else {
      this.items.get(n).older = o;
    }

    return entry.value;
  }

  // internal details

  used(key, entry) {
    if (this.newer === key) {
      return;
    }

    const o = this.items.get(entry.older);
    const n = this.items.get(entry.newer);
    if (o) o.newer = entry.newer;
    if (n) n.older = entry.older;

    const e = this.items.get(this.newer);
    if (e) {
      e.newer = key;
      entry.older = this.newer;
    }

    if (!this.older) {
      this.older = key;
    } else if (this.older === key) {
      this.older = entry.newer;
    }

    this.newer = key;
    entry.newer = null;
  }

  evict() {
    const key = this.older;
    if (!key) return
    //console.log('evicting: ' + key);
    const entry = this.items.get(key);
    this.items.delete(key);
    this.older = entry.newer;
  }

  toString() {
    const buffer = [];
    let key = this.older;
    while (key) {
      buffer.push(key);
      const entry = this.items.get(key);
      key = entry.newer;
    }

    return buffer.join(' < ');
  }
}
