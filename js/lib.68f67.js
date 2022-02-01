"use strict";
(self["webpackChunkinfinite_tiles"] = self["webpackChunkinfinite_tiles"] || []).push([["lib"],{

/***/ "./lib/draggable.js":
/*!**************************!*\
  !*** ./lib/draggable.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ draggable)
/* harmony export */ });
function draggable(component) {
  function onmousedown(e) {
    component.addEventListener('mousemove', onmousemove);
    component.addEventListener('mouseleave', onmouseup);
  }

  function onmousemove(e) {
    if (e.movementX !== 0 || e.movementY !== 0) {
      var event = new Event('mousedrag');
      event.movementX = e.movementX;
      event.movementY = e.movementY;
      component.dispatchEvent(event);
    }
  }

  function onmouseup(e) {
    component.removeEventListener('mousemove', onmousemove);
    component.removeEventListener('mouseleave', onmouseup);
  }

  component.addEventListener('mousedown', onmousedown);
  component.addEventListener('mouseup', onmouseup);
  return component;
}

/***/ }),

/***/ "./lib/math/rectangle.js":
/*!*******************************!*\
  !*** ./lib/math/rectangle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rectangle)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Rectangle = /*#__PURE__*/function () {
  function Rectangle() {
    var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, Rectangle);

    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  _createClass(Rectangle, [{
    key: "right",
    get: function get() {
      return this.left + this.width;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this.top + this.height;
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this.left == other.left && this.top == other.top && this.width == other.width && this.height == other.height;
    }
  }]);

  return Rectangle;
}();



/***/ }),

/***/ "./lib/math/vector.js":
/*!****************************!*\
  !*** ./lib/math/vector.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Vector = /*#__PURE__*/function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "add",
    value: function add(other) {
      this.x += other.x;
      this.y += other.y;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(other) {
      this.x -= other.x;
      this.y -= other.y;
      return this;
    }
  }, {
    key: "scaleAndAdd",
    value: function scaleAndAdd(other, scale) {
      this.x += other.x * scale;
      this.y += other.y * scale;
      return this;
    }
  }, {
    key: "lerp",
    value: function lerp(target, progress) {
      this.x = this.x + (target.x - this.x) * progress;
      this.y = this.y + (target.y - this.y) * progress;
      return this;
    }
  }]);

  return Vector;
}();



/***/ }),

/***/ "./lib/staggered-map/cache.js":
/*!************************************!*\
  !*** ./lib/staggered-map/cache.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cache)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Cache = /*#__PURE__*/function () {
  function Cache(limit) {
    _classCallCheck(this, Cache);

    this.limit = limit;
    this.clear();
  }

  _createClass(Cache, [{
    key: "clear",
    value: function clear() {
      this.items = new Map();
      this.size = 0;
      this.older = null;
      this.newer = null;
    }
  }, {
    key: "get",
    value: function get(key) {
      var entry = this.items.get(key);

      if (!entry) {
        return null;
      }

      this.used(key, entry);
      return entry.value;
    }
  }, {
    key: "peek",
    value: function peek(key) {
      var entry = this.items.get(key);
      return entry ? entry.value : null;
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.items.get(key) !== undefined;
    }
  }, {
    key: "touch",
    value: function touch(key) {
      var entry = this.items.get(key);

      if (!entry) {
        return false;
      }

      this.used(key, entry);
      return true;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var entry = this.items.get(key);

      if (!entry) {
        entry = {};
        this.items.set(key, entry);

        if (this.size < this.limit) {
          this.size++;
        } else {
          this.evict();
        }
      }

      this.used(key, entry);
      entry.value = value;
    }
  }, {
    key: "remove",
    value: function remove(key) {
      var entry = this.items.get(key);

      if (!entry) {
        return null;
      }

      this.size--;
      this.items["delete"](key);
      var o = entry.older;
      var n = entry.newer;

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
    } // internal details

  }, {
    key: "used",
    value: function used(key, entry) {
      if (this.newer === key) {
        return;
      }

      var o = this.items.get(entry.older);
      var n = this.items.get(entry.newer);
      if (o) o.newer = entry.newer;
      if (n) n.older = entry.older;
      var e = this.items.get(this.newer);

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
  }, {
    key: "evict",
    value: function evict() {
      var key = this.older;
      if (!key) return; // console.log('evicting: ' + key);

      var entry = this.items.get(key);
      this.items["delete"](key);
      this.older = entry.newer;
    }
  }, {
    key: "toString",
    value: function toString() {
      var buffer = [];
      var key = this.older;

      while (key) {
        buffer.push(key);
        var entry = this.items.get(key);
        key = entry.newer;
      }

      return buffer.join(' < ');
    }
  }]);

  return Cache;
}();



/***/ }),

/***/ "./lib/staggered-map/index.js":
/*!************************************!*\
  !*** ./lib/staggered-map/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaggeredMap)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./lib/staggered-map/storage.js");
/* harmony import */ var _viewport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewport */ "./lib/staggered-map/viewport.js");
/* harmony import */ var _world__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./world */ "./lib/staggered-map/world.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var StaggeredMap = /*#__PURE__*/function () {
  function StaggeredMap(api, tileSize, bounds) {
    _classCallCheck(this, StaggeredMap);

    this.viewport = new _viewport__WEBPACK_IMPORTED_MODULE_1__["default"](new _world__WEBPACK_IMPORTED_MODULE_2__["default"](tileSize), bounds);
    this.tiles = this.viewport.tiles();
    console.log('staggered map > ctor: tiles: %o', this.tiles);
    var margin = {
      width: Math.ceil(this.tiles.width * 1.2),
      height: Math.ceil(this.tiles.height * 1.2)
    };
    var limit = Math.ceil(margin.width * margin.height * 16);
    this.storage = new _storage__WEBPACK_IMPORTED_MODULE_0__["default"](api, margin, limit);
  }

  _createClass(StaggeredMap, [{
    key: "update",
    value: function update() {
      this.tiles = this.viewport.tiles();
      this.storage.preload(this.tiles);
    }
  }]);

  return StaggeredMap;
}();



/***/ }),

/***/ "./lib/staggered-map/mixins.js":
/*!*************************************!*\
  !*** ./lib/staggered-map/mixins.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "moverMixin": () => (/* binding */ moverMixin)
/* harmony export */ });
/* harmony import */ var _math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/vector */ "./lib/math/vector.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var moverMixin = function moverMixin(superclass) {
  return /*#__PURE__*/function (_superclass) {
    _inherits(_class, _superclass);

    var _super = _createSuper(_class);

    function _class() {
      _classCallCheck(this, _class);

      return _super.apply(this, arguments);
    }

    _createClass(_class, [{
      key: "moveTo",
      value: function moveTo(tile, duration) {
        var elapsed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.0;
        this.target = tile;
        this.duration = duration;
        this.elapsed = elapsed;
        this.moving = true;
        this.targetPosition = new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.bounds.left, this.bounds.top).add(this.viewport.worldToScreen(tile.x, tile.y)).sub(this.viewport.worldToScreen(this.tile.x, this.tile.y));
      }
    }, {
      key: "update",
      value: function update(delta) {
        if (_get(_getPrototypeOf(_class.prototype), "update", this)) {
          _get(_getPrototypeOf(_class.prototype), "update", this).call(this, delta);
        }

        if (!this.moving) {
          return;
        }

        this.elapsed += delta;

        if (this.elapsed <= 0.0) {
          return;
        }

        this.position.x = this.bounds.left;
        this.position.y = this.bounds.top;
        var progress = this.elapsed / this.duration;

        if (progress < 1.0) {
          this.position.lerp(this.targetPosition, progress);
        } else {
          this.tile = this.target;
          this.targetPosition = null;
          this.target = null;
          this.moving = false;
        }
      }
    }]);

    return _class;
  }(superclass);
};

/***/ }),

/***/ "./lib/staggered-map/renderer.js":
/*!***************************************!*\
  !*** ./lib/staggered-map/renderer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StaggeredTileRenderer": () => (/* binding */ StaggeredTileRenderer),
/* harmony export */   "StaggeredMapRenderer": () => (/* binding */ StaggeredMapRenderer)
/* harmony export */ });
/* harmony import */ var _math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/vector */ "./lib/math/vector.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var StaggeredTileRenderer = /*#__PURE__*/function () {
  function StaggeredTileRenderer(viewport, tile, bounds) {
    _classCallCheck(this, StaggeredTileRenderer);

    this.viewport = viewport;
    this.tile = tile;
    this.bounds = bounds;
    this.position = new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.bounds.left, this.bounds.top);
  }

  _createClass(StaggeredTileRenderer, [{
    key: "draw",
    value: function draw() {
      var s = this.viewport.worldToScreen(this.tile.x, this.tile.y);
      this.drawTile(s.x + this.position.x, s.y + this.position.y);
    }
  }]);

  return StaggeredTileRenderer;
}();
var StaggeredMapRenderer = /*#__PURE__*/function () {
  function StaggeredMapRenderer(map, renderer) {
    _classCallCheck(this, StaggeredMapRenderer);

    this.map = map;
    this.tileSize = map.viewport.world.tileSize;
    this.bounds = map.viewport.bounds;
    this.renderer = renderer;
  }

  _createClass(StaggeredMapRenderer, [{
    key: "draw",
    value: function draw() {
      this.renderer.begin();
      var position = this.map.viewport.position;
      var tiles = this.map.tiles;

      for (var ty = tiles.top; ty <= tiles.bottom; ty++) {
        var shift = ty % 2 ? this.tileSize.halfWidth : 0;

        for (var tx = tiles.left; tx <= tiles.right; tx++) {
          var x = tx * this.tileSize.width + shift - position.x;

          if (x + this.tileSize.width <= 0 || x >= this.bounds.width) {
            continue;
          }

          var y = ty * this.tileSize.halfHeight - position.y;
          x += this.bounds.left;
          y += this.bounds.top;
          this.renderer.drawTile(tx, ty, x, y);
        }
      }

      var t = this.map.selected;

      if (t) {
        var s = this.map.viewport.worldToScreen(t.x, t.y);
        this.renderer.drawSelected(t.x, t.y, s.x, s.y);
      }

      this.renderer.end();
    }
  }]);

  return StaggeredMapRenderer;
}();

/***/ }),

/***/ "./lib/staggered-map/storage.js":
/*!**************************************!*\
  !*** ./lib/staggered-map/storage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var _math_rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/rectangle */ "./lib/math/rectangle.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cache */ "./lib/staggered-map/cache.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var makeKey = function makeKey(x, y) {
  return (y >= 0 ? 'S' + y : 'N' + -y) + (x >= 0 ? 'E' + x : 'W' + -x);
};

var RECT_EMPTY = new _math_rectangle__WEBPACK_IMPORTED_MODULE_0__["default"]();

var Storage = /*#__PURE__*/function () {
  function Storage(api, margin, limit) {
    _classCallCheck(this, Storage);

    console.log('storage > ctor: margin: %o, limit: %d', margin, limit);
    this.api = api;
    this.margin = margin;
    this.cache = new _cache__WEBPACK_IMPORTED_MODULE_1__["default"](limit);
    this.tiles = RECT_EMPTY;
    this.fetching = new Map();
    this.ref = 0;
    this.refs = new Map();
    api.on('open', this.onopen.bind(this));
    api.on('tiles', this.ontiles.bind(this));
  }

  _createClass(Storage, [{
    key: "get",
    value: function get(x, y) {
      var key = makeKey(x, y);
      return this.cache.peek(key);
    }
  }, {
    key: "preload",
    value: function preload(tiles) {
      if (tiles.equals(this.tiles)) {
        return;
      }

      this.tiles = tiles;

      if (!this.api.isReady()) {
        return;
      }

      var keys = [];
      var coords = [];
      var xmin = tiles.left - this.margin.width;
      var xmax = tiles.right + this.margin.width;
      var ymin = tiles.top - this.margin.height;
      var ymax = tiles.bottom + this.margin.height;

      for (var y = ymin; y <= ymax; y++) {
        for (var x = xmin; x <= xmax; x++) {
          var key = makeKey(x, y);

          if (!this.cache.touch(key) && !this.fetching.has(key)) {
            this.fetching.set(key);
            keys.push(key);
            coords.push(x - xmin);
            coords.push(y - ymin);
          }
        }
      }

      var p = {
        t: 'tiles',
        area: [xmin, ymin, xmax - xmin, ymax - ymin]
      };

      if (keys.length > 0) {
        this.refs.set(this.ref, keys);
        p.ref = this.ref;
        p.coords = coords;

        if (this.ref < 127) {
          this.ref++;
        } else {
          this.ref = 0;
        }
      }

      this.api.send(p);
    }
  }, {
    key: "onopen",
    value: function onopen() {
      this.cache.clear();
      this.tiles = RECT_EMPTY;
      this.fetching.clear();
      this.ref = 0;
      this.refs.clear();
    }
  }, {
    key: "ontiles",
    value: function ontiles(p) {
      var _this = this;

      console.log('storage > ontiles: %o', p);
      var keys = this.refs.get(p.ref);

      if (!keys) {
        return;
      }

      this.refs["delete"](p.ref);
      var data = p.data;

      if (keys.length !== data.length) {
        console.log('WARN: #keys <> #data');
        return;
      }

      keys.forEach(function (key, i) {
        _this.cache.set(key, data[i]);

        _this.fetching["delete"](key);
      });
    }
  }]);

  return Storage;
}();



/***/ }),

/***/ "./lib/staggered-map/viewport.js":
/*!***************************************!*\
  !*** ./lib/staggered-map/viewport.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaggeredMapViewport)
/* harmony export */ });
/* harmony import */ var _math_rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/rectangle */ "./lib/math/rectangle.js");
/* harmony import */ var _math_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/vector */ "./lib/math/vector.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var StaggeredMapViewport = /*#__PURE__*/function () {
  function StaggeredMapViewport(world, bounds) {
    _classCallCheck(this, StaggeredMapViewport);

    this.world = world;
    this.bounds = bounds;
    this.position = new _math_vector__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  _createClass(StaggeredMapViewport, [{
    key: "screenToWorld",
    value: function screenToWorld(x, y) {
      return this.world.screenToWorld(x - this.bounds.left + this.position.x, y - this.bounds.top + this.position.y);
    }
  }, {
    key: "worldToScreen",
    value: function worldToScreen(x, y) {
      var p = this.world.worldToScreen(x, y);
      return {
        x: p.x + this.bounds.left - this.position.x,
        y: p.y + this.bounds.top - this.position.y
      };
    }
  }, {
    key: "tiles",
    value: function tiles() {
      var screen = new _math_rectangle__WEBPACK_IMPORTED_MODULE_0__["default"](this.position.x, this.position.y, this.bounds.width, this.bounds.height);
      return this.world.screenToWorldRectangle(screen);
    }
  }]);

  return StaggeredMapViewport;
}();



/***/ }),

/***/ "./lib/staggered-map/world.js":
/*!************************************!*\
  !*** ./lib/staggered-map/world.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaggeredWorld)
/* harmony export */ });
/* harmony import */ var _math_rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/rectangle */ "./lib/math/rectangle.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var StaggeredWorld = /*#__PURE__*/function () {
  function StaggeredWorld(tileSize) {
    _classCallCheck(this, StaggeredWorld);

    this.tileSize = tileSize;
  }

  _createClass(StaggeredWorld, [{
    key: "worldToScreen",
    value: function worldToScreen(x, y) {
      return {
        x: x * this.tileSize.width + (y % 2 ? this.tileSize.halfWidth : 0),
        y: y * this.tileSize.halfHeight
      };
    }
    /*
      Translates from screen coordinates to
      cortesian coordinates.
                               ^ y
                             |
                             |
      +---+---+---->     +---+---+
      |oa/|\ob|   x      |oc/|\od|
      | / | \ |          | / | \ |
      |/ia|ib\|          |/ic|id\|
      +---+---+          +---+---+---->
      |\ic|id/|          |\ia|ib/|   x
      | \ | / |          | \ | / |
      |oc\|/od|          |oa\|/ob|
      +---+---+          +---+---+
      |
      | y
      v
      */

  }, {
    key: "screenToWorld",
    value: function screenToWorld(x, y) {
      x = Math.round(x);
      y = Math.round(y) + 1; // adjust for rendering overlap.

      var tx = Math.floor(x / this.tileSize.width);
      var ty = Math.floor(y / this.tileSize.height) * 2;
      x = Math.floor(x % this.tileSize.width);
      x += x < 0 ? this.tileSize.halfWidth : -this.tileSize.halfWidth;
      y = Math.floor(y % this.tileSize.height);
      y += y < 0 ? this.tileSize.halfHeight : -this.tileSize.halfHeight; // console.log(tx, ty, x, y);

      if (x < 0) {
        if (y < 0) {
          // case `oa`
          if (-2 * (y + this.tileSize.halfHeight) > x) {
            tx--;
            ty--;
          }
        } else {
          // case `oc`
          if (2 * (y - this.tileSize.halfHeight) > x) {
            tx--;
            ty++;
          }
        }
      } else {
        if (y < 0) {
          // case `ob`
          if (2 * (y + this.tileSize.halfHeight) <= x) {
            ty--;
          }
        } else {
          // case `od`
          if (-2 * (y - this.tileSize.halfHeight) <= x) {
            ty++;
          }
        }
      }

      return {
        x: tx,
        y: ty
      };
    }
  }, {
    key: "screenToWorldRectangle",
    value: function screenToWorldRectangle(screen) {
      var lt = this.screenToWorldLeftTop(screen.left, screen.top);
      var rb = this.screenToWorldRightBottom(screen.right, screen.bottom);
      return new _math_rectangle__WEBPACK_IMPORTED_MODULE_0__["default"](lt.x, lt.y, rb.x - lt.x, rb.y - lt.y);
    }
  }, {
    key: "screenToWorldLeftTop",
    value: function screenToWorldLeftTop(x, y) {
      // console.log(x, y);
      var tx = Math.floor(x / this.tileSize.width);
      var ty = Math.floor(y / this.tileSize.height) * 2;
      x %= this.tileSize.width;
      x += x < 0 ? this.tileSize.halfWidth : -this.tileSize.halfWidth;
      y %= this.tileSize.height;
      y += y < 0 ? this.tileSize.halfHeight : -this.tileSize.halfHeight; // console.log(tx, ty, x, y);

      if (x < 0) {
        if (y < 0) {
          // case `a`
          tx--;
          ty--;
        } else {
          // case `c`
          tx--;
        }
      } else {
        if (y < 0) {
          // case `b`
          ty--;
        }
      }

      return {
        x: tx,
        y: ty
      };
    }
  }, {
    key: "screenToWorldRightBottom",
    value: function screenToWorldRightBottom(x, y) {
      var tx = Math.floor(x / this.tileSize.width);
      var ty = Math.floor(y / this.tileSize.height) * 2;
      x %= this.tileSize.width;

      if (x == 0) {
        tx--;
      }

      y %= this.tileSize.height;

      if (y == 0) {
        ty--;
      } else {
        y += y < 0 ? this.tileSize.halfHeight : -this.tileSize.halfHeight;

        if (y > 0) {
          // case `d`
          ty++;
        }
      }

      return {
        x: tx,
        y: ty
      };
    }
  }]);

  return StaggeredWorld;
}();



/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ })

}]);
//# sourceMappingURL=lib.68f67.js.map