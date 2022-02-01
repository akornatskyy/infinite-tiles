/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/api/mock.js":
/*!*************************!*\
  !*** ./app/api/mock.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MockAPI)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var toxic = function toxic(f) {
  return setTimeout(f, 750 + Math.random() * 500);
};

var newid = function newid() {
  return Math.random().toString(36).substring(2);
};

var MockAPI = /*#__PURE__*/function () {
  function MockAPI() {
    _classCallCheck(this, MockAPI);

    this.eventEmitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
    this.ready = false;
    this.controller = new Controller(this.eventEmitter);
  }

  _createClass(MockAPI, [{
    key: "connect",
    value: function connect() {
      this.ready = true;
      this.eventEmitter.emit('open');
    }
  }, {
    key: "isReady",
    value: function isReady() {
      return this.ready;
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }
  }, {
    key: "send",
    value: function send(p) {
      var _this = this;

      console.log('api > send: %o', p);

      switch (p.t) {
        case 'ping':
          this.controller.ping(p);
          break;

        case 'tiles':
          toxic(function () {
            return _this.controller.tiles(p);
          });
          break;

        case 'place':
          this.controller.place(p);
          break;

        case 'move':
          this.controller.move(p);
          break;

        default:
          console.warn('api > send: unknown packet [' + p.t + ']');
      }
    }
  }]);

  return MockAPI;
}();



var Controller = /*#__PURE__*/function () {
  function Controller(eventEmitter) {
    var _this2 = this;

    _classCallCheck(this, Controller);

    this.eventEmitter = eventEmitter;
    this.objects = [];
    setTimeout(function () {
      return setInterval(_this2.recycle.bind(_this2), 1000);
    }, 5000);
  }

  _createClass(Controller, [{
    key: "ping",
    value: function ping(p) {
      this.eventEmitter.emit('pong', {
        tc: p.time,
        ts: Date.now() / 1000.0
      });
    }
  }, {
    key: "tiles",
    value: function tiles(p) {
      var coords = p.coords;

      if (!coords) {
        return;
      }

      var _p$area = _slicedToArray(p.area, 2),
          ymin = _p$area[1];

      var data = [];

      for (var i = 1; i < coords.length; i += 2) {
        var y = ymin + coords[i];
        data.push(Math.abs(y) % 2);
      }

      this.eventEmitter.emit('tiles', {
        ref: p.ref,
        data: data
      });
    }
  }, {
    key: "place",
    value: function place(p) {
      var id = newid();
      this.objects.push(id);
      this.eventEmitter.emit('place', {
        objects: [{
          id: id,
          x: p.x,
          y: p.y
        }]
      });
    }
  }, {
    key: "move",
    value: function move(p) {
      var _this3 = this;

      var id = p.id;
      var index = this.objects.indexOf(id);

      if (index >= 0) {
        this.objects.splice(index, 1);
      }

      var ts = Date.now();
      var t = Math.floor(ts / 1000.0);
      var duration = 1 + Math.floor(Math.random() * 5);
      this.eventEmitter.emit('move', {
        objects: [{
          id: id,
          x: p.x,
          y: p.y,
          time: t + 1,
          duration: duration
        }]
      });
      setTimeout(function () {
        _this3.objects.push(id);

        _this3.eventEmitter.emit('moved', {
          id: id
        });
      }, duration * 1000 + (ts - t * 1000));
    }
  }, {
    key: "recycle",
    value: function recycle() {
      if (this.objects.length === 0) {
        return;
      }

      var n = Math.floor(Math.random() * 3);

      if (n === 0) {
        return;
      }

      this.eventEmitter.emit('remove', {
        objects: this.objects.splice(0, n)
      });
    }
  }]);

  return Controller;
}();

/***/ }),

/***/ "./app/assets.js":
/*!***********************!*\
  !*** ./app/assets.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Assets)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ "./app/loader.js");
/* harmony import */ var _static_tiles_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/tiles.png */ "./static/tiles.png");
/* harmony import */ var _static_sphere_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/sphere.png */ "./static/sphere.png");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var Assets = /*#__PURE__*/function () {
  function Assets() {
    _classCallCheck(this, Assets);
  }

  _createClass(Assets, null, [{
    key: "load",
    value: function load(callback) {
      var resources = [{
        name: 'tiles',
        url: _static_tiles_png__WEBPACK_IMPORTED_MODULE_1__["default"]
      }, {
        name: 'sphere',
        url: _static_sphere_png__WEBPACK_IMPORTED_MODULE_2__["default"]
      }];
      var loader = new _loader__WEBPACK_IMPORTED_MODULE_0__["default"](resources, this);
      loader.load(callback);
    }
  }]);

  return Assets;
}();



/***/ }),

/***/ "./app/assets/sphere.js":
/*!******************************!*\
  !*** ./app/assets/sphere.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sphere)
/* harmony export */ });
/* harmony import */ var _lib_math_rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/math/rectangle */ "./lib/math/rectangle.js");
/* harmony import */ var _lib_staggered_map_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/staggered-map/renderer */ "./lib/staggered-map/renderer.js");
/* harmony import */ var _lib_staggered_map_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/staggered-map/mixins */ "./lib/staggered-map/mixins.js");
/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets */ "./app/assets.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var Sphere = /*#__PURE__*/function (_moverMixin) {
  _inherits(Sphere, _moverMixin);

  var _super = _createSuper(Sphere);

  function Sphere(ctx, viewport, tile) {
    var _this;

    _classCallCheck(this, Sphere);

    _this = _super.call(this, viewport, tile, new _lib_math_rectangle__WEBPACK_IMPORTED_MODULE_0__["default"]((viewport.world.tileSize.width - _assets__WEBPACK_IMPORTED_MODULE_3__["default"].sphere.width) / 2, (viewport.world.tileSize.height - _assets__WEBPACK_IMPORTED_MODULE_3__["default"].sphere.height) / 2, _assets__WEBPACK_IMPORTED_MODULE_3__["default"].sphere.width, _assets__WEBPACK_IMPORTED_MODULE_3__["default"].sphere.height));
    _this.ctx = ctx;
    return _this;
  }

  _createClass(Sphere, [{
    key: "drawTile",
    value: function drawTile(x, y) {
      if (this.moving) {
        this.ctx.drawImage(_assets__WEBPACK_IMPORTED_MODULE_3__["default"].sphere, x, y);
      } else {
        var alpha = this.ctx.globalAlpha;
        this.ctx.globalAlpha = 0.9;
        this.ctx.drawImage(_assets__WEBPACK_IMPORTED_MODULE_3__["default"].sphere, x, y);
        this.ctx.globalAlpha = alpha;
      }
    }
  }]);

  return Sphere;
}((0,_lib_staggered_map_mixins__WEBPACK_IMPORTED_MODULE_2__.moverMixin)(_lib_staggered_map_renderer__WEBPACK_IMPORTED_MODULE_1__.StaggeredTileRenderer));



/***/ }),

/***/ "./app/game.js":
/*!*********************!*\
  !*** ./app/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! api */ "./app/api/mock.js");
/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets */ "./app/assets.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var now = function now() {
  return Date.now() / 1000.0;
};

var Game = /*#__PURE__*/function () {
  function Game(canvas) {
    _classCallCheck(this, Game);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ts = 0;
    this.delta = 0;
    this.render = this.render.bind(this);
    this.ping = this.ping.bind(this);
    this.api = new api__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.api.on('open', this.onopen.bind(this));
    this.api.on('close', this.onclose.bind(this));
    this.api.on('pong', this.onpong.bind(this));
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      var _this = this;

      if (!this.screen) {
        throw new Error('screen is not set');
      }

      _assets__WEBPACK_IMPORTED_MODULE_1__["default"].load(function () {
        return _this.api.connect();
      });
    }
  }, {
    key: "render",
    value: function render(ts) {
      var delta = (ts - this.ts) / 1000.0;
      this.ts = ts;

      if (delta > 0.06) {
        console.warn('game > render : delta = %s', delta);
      }

      this.screen.render(delta);
      this.requestId = window.requestAnimationFrame(this.render);
    }
  }, {
    key: "onopen",
    value: function onopen() {
      var _this2 = this;

      this.ping();
      this.timer = setInterval(this.ping, 10000);
      window.requestAnimationFrame(function (ts) {
        _this2.ts = ts;

        _this2.render(ts);
      });
    }
  }, {
    key: "onclose",
    value: function onclose() {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;
      clearInterval(this.timer);
      this.timer = null;
    }
  }, {
    key: "ping",
    value: function ping() {
      this.api.send({
        t: 'ping',
        time: now()
      });
    }
  }, {
    key: "onpong",
    value: function onpong(p) {
      console.log('game > onpong: %o', p);
      var t = now();
      var roundtrip = t - p.tc;
      var latency = roundtrip / 2;
      var delta = p.ts - t;
      this.delta = delta + latency;
      console.log('game > latency: %sms; delta: %ss', (latency * 1000).toFixed(1), this.delta.toFixed(6));
    }
  }]);

  return Game;
}();



/***/ }),

/***/ "./app/loader.js":
/*!***********************!*\
  !*** ./app/loader.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Loader)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Loader = /*#__PURE__*/function () {
  function Loader(resources) {
    var owner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Loader);

    this.resources = resources;
    this.owner = owner || {};
  }

  _createClass(Loader, [{
    key: "load",
    value: function load(callback) {
      var _this = this;

      var n = this.resources.length;

      var _iterator = _createForOfIteratorHelper(this.resources),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var r = _step.value;
          var img = new Image();
          this.owner[r.name] = img;

          img.onload = function () {
            if (--n == 0) {
              callback(_this, _this.owner);
            }
          };

          img.src = r.url;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Loader;
}();



/***/ }),

/***/ "./app/screens/demo-controller.js":
/*!****************************************!*\
  !*** ./app/screens/demo-controller.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DemoController)
/* harmony export */ });
/* harmony import */ var _lib_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/math/vector */ "./lib/math/vector.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Spring = /*#__PURE__*/function () {
  function Spring(options) {
    _classCallCheck(this, Spring);

    this.pos = options.pos;
    this.k = options.k; // spring constant

    this.b = options.b; // viscous damping coefficient

    this.l = options.l; // spring length at rest

    this.velocity = new _lib_math_vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  _createClass(Spring, [{
    key: "update",
    value: function update(delta) {
      if (delta > 0.06) {
        delta = 0.06;
      }

      var x = this.pos.x;
      var y = this.pos.y;
      var l = Math.sqrt(x * x + y * y);
      var s = l - this.l;
      var kx = 0;
      var ky = 0;

      if (s > 0) {
        var k = this.k * s / l;
        kx = k * x;
        ky = k * y;
      }

      this.velocity.x += delta * (kx + this.b * this.velocity.x);
      this.velocity.y += delta * (ky + this.b * this.velocity.y);
      this.pos.scaleAndAdd(this.velocity, delta);
    }
  }]);

  return Spring;
}();

var DemoController = /*#__PURE__*/function () {
  function DemoController(screen) {
    _classCallCheck(this, DemoController);

    this.screen = screen;
    this.viewport = screen.map.viewport;
    this.placeOrMove = this.placeOrMove.bind(this);
    this.applyForce = this.applyForce.bind(this);
    this.api = screen.api;
    this.api.on('open', this.onopen.bind(this));
    this.api.on('close', this.onclose.bind(this));
    this.spring = new Spring({
      pos: this.viewport.position,
      k: -0.25,
      b: -0.05,
      l: 128 * 4
    });
  }

  _createClass(DemoController, [{
    key: "onopen",
    value: function onopen() {
      var _this = this;

      this.forceTimer = setInterval(this.applyForce, 3000);
      setTimeout(function () {
        _this.timer = setInterval(_this.placeOrMove, 150);
      }, 2000);
    }
  }, {
    key: "onclose",
    value: function onclose() {
      clearInterval(this.timer);
      clearInterval(this.forceTimer);
      this.timer = null;
    }
  }, {
    key: "update",
    value: function update(delta) {
      this.spring.update(delta);
    }
  }, {
    key: "applyForce",
    value: function applyForce() {
      var v = this.spring.velocity;
      v.x += Math.random() * 101 - 50;
      v.y += Math.random() * 101 - 50;
    }
  }, {
    key: "placeOrMove",
    value: function placeOrMove() {
      var tiles = this.screen.map.tiles;
      var objects = this.screen.objects;
      var x = Math.floor(Math.random() * tiles.width + 1) + tiles.left;
      var y = Math.floor(Math.random() * tiles.height + 1) + tiles.top;

      if (objects.find(function (o) {
        return !o.moving && o.tile.x === x && o.tile.y === y || o.moving && o.target.x === x && o.target.y === y;
      })) {
        return;
      }

      if (objects.length < tiles.width * tiles.height / 2) {
        this.api.send({
          t: 'place',
          x: x,
          y: y
        });
      } else {
        var o = objects[Math.floor(Math.random() * objects.length)];

        if (!o.moving) {
          this.api.send({
            t: 'move',
            id: o.id,
            x: x,
            y: y
          });
        }
      }
    }
  }]);

  return DemoController;
}();



/***/ }),

/***/ "./app/screens/demo.js":
/*!*****************************!*\
  !*** ./app/screens/demo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DemoScreen)
/* harmony export */ });
/* harmony import */ var _lib_math_rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/math/rectangle */ "./lib/math/rectangle.js");
/* harmony import */ var _lib_staggered_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/staggered-map */ "./lib/staggered-map/index.js");
/* harmony import */ var _lib_staggered_map_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/staggered-map/renderer */ "./lib/staggered-map/renderer.js");
/* harmony import */ var _lib_draggable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/draggable */ "./lib/draggable.js");
/* harmony import */ var _assets_sphere__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/sphere */ "./app/assets/sphere.js");
/* harmony import */ var _demo_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./demo-controller */ "./app/screens/demo-controller.js");
/* harmony import */ var _map_renderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./map-renderer */ "./app/screens/map-renderer.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }








var TILE_SIZE = {
  width: 128,
  halfWidth: 64,
  height: 64,
  halfHeight: 32
};
var BOUNDS = new _lib_math_rectangle__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0, TILE_SIZE.width * 3, TILE_SIZE.height * 3);

var DemoScreen = /*#__PURE__*/function () {
  function DemoScreen(game) {
    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, DemoScreen);

    this.game = game;
    game.canvas.width = BOUNDS.width;
    game.canvas.height = BOUNDS.height;

    if (debug) {
      BOUNDS.left = TILE_SIZE.width + 10;
      BOUNDS.top = TILE_SIZE.height;
      game.canvas.width += BOUNDS.left * 2;
      game.canvas.height += BOUNDS.top * 2;
    }

    this.objects = [];
    this.sphere = null;
    this.api = game.api;
    this.api.on('open', this.onopen.bind(this));
    this.api.on('place', this.onplace.bind(this));
    this.api.on('remove', this.onremove.bind(this));
    this.api.on('move', this.onmove.bind(this));
    this.api.on('moved', this.onmoved.bind(this));
    this.api.on('errors', this.onerrors.bind(this));
    this.map = new _lib_staggered_map__WEBPACK_IMPORTED_MODULE_1__["default"](game.api, TILE_SIZE, BOUNDS);
    this.mapRenderer = new _lib_staggered_map_renderer__WEBPACK_IMPORTED_MODULE_2__.StaggeredMapRenderer(this.map, new _map_renderer__WEBPACK_IMPORTED_MODULE_6__["default"](game.ctx, this.map.storage, TILE_SIZE, BOUNDS, debug));
    (0,_lib_draggable__WEBPACK_IMPORTED_MODULE_3__["default"])(this.game.canvas).addEventListener('mousedrag', this.onmousedrag.bind(this));
    this.controller = new _demo_controller__WEBPACK_IMPORTED_MODULE_5__["default"](this);
  }

  _createClass(DemoScreen, [{
    key: "render",
    value: function render(delta) {
      this.update(delta);
      this.draw();
    }
  }, {
    key: "update",
    value: function update(delta) {
      this.controller.update(delta);
      this.map.update();
      this.objects.forEach(function (o) {
        return o.update(delta);
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
      this.mapRenderer.draw();
      this.objects.forEach(function (o) {
        return o.draw();
      });
    }
  }, {
    key: "onmousedrag",
    value: function onmousedrag(e) {
      this.map.viewport.position.x -= e.movementX;
      this.map.viewport.position.y -= e.movementY;
    }
    /* API callbacks */

  }, {
    key: "onopen",
    value: function onopen() {
      this.objects = [];
    }
  }, {
    key: "onerrors",
    value: function onerrors(p) {
      console.warn('demo > onerrors: %o', p.errors);
    }
  }, {
    key: "onplace",
    value: function onplace(p) {
      var _this = this;

      console.log('demo > onplace: %o', p);
      p.objects.forEach(function (o) {
        var id = o.id;

        var index = _this.objects.findIndex(function (o) {
          return o.id === id;
        });

        if (index >= 0) {
          var sphere = _this.objects[index];
          sphere.tile.x = o.x;
          sphere.tile.y = o.y;
        } else {
          var _sphere = new _assets_sphere__WEBPACK_IMPORTED_MODULE_4__["default"](_this.game.ctx, _this.map.viewport, {
            x: o.x,
            y: o.y
          });

          _sphere.id = o.id;

          _this.objects.unshift(_sphere);
        }
      });
    }
  }, {
    key: "onremove",
    value: function onremove(p) {
      var _this2 = this;

      console.log('demo > onremove: %o', p);
      p.objects.forEach(function (id) {
        var index = _this2.objects.findIndex(function (o) {
          return o.id === id;
        });

        if (index >= 0) {
          var sphere = _this2.objects.splice(index, 1)[0];

          if (_this2.sphere === sphere) {
            _this2.sphere = null;
          }
        }
      });
    }
  }, {
    key: "onmove",
    value: function onmove(p) {
      var _this3 = this;

      console.log('demo > onmove: %o', p);
      var ts = Date.now() / 1000.0 + this.game.delta;
      p.objects.forEach(function (o) {
        var id = o.id;

        var index = _this3.objects.findIndex(function (o) {
          return o.id === id;
        });

        if (index >= 0) {
          var sphere = _this3.objects.splice(index, 1)[0];

          _this3.objects.push(sphere);

          var elapsed = ts - o.time;
          sphere.moveTo({
            x: o.x,
            y: o.y
          }, o.duration, elapsed);
        }
      });
    }
  }, {
    key: "onmoved",
    value: function onmoved(p) {
      console.log('demo > onmoved: %o', p);
      var id = p.id;
      var index = this.objects.findIndex(function (o) {
        return o.id === id;
      });

      if (index >= 0) {
        var sphere = this.objects.splice(index, 1)[0];
        this.objects.unshift(sphere);

        if (this.sphere === sphere) {
          this.sphere = null;
        }
      }
    }
  }]);

  return DemoScreen;
}();



/***/ }),

/***/ "./app/screens/map-renderer.js":
/*!*************************************!*\
  !*** ./app/screens/map-renderer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MapRenderer)
/* harmony export */ });
/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets */ "./app/assets.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var MapRenderer = /*#__PURE__*/function () {
  function MapRenderer(ctx, storage, tileSize, bounds, debug) {
    _classCallCheck(this, MapRenderer);

    this.ctx = ctx;
    this.storage = storage;
    this.tileSize = tileSize;
    this.bounds = bounds;
    this.debug = debug;

    if (debug) {
      this.ctx.font = '12px monospace';
      this.ctx.fillStyle = 'white';
      this.ctx.textAlign = 'center';
    }
  }

  _createClass(MapRenderer, [{
    key: "begin",
    value: function begin() {}
  }, {
    key: "drawTile",
    value: function drawTile(tx, ty, x, y) {
      var index = this.storage.get(tx, ty);

      if (index === null) {
        console.log('map renderer > draw tile: (%s:%s) is missing', tx, ty);
        return;
      }

      this.ctx.drawImage(_assets__WEBPACK_IMPORTED_MODULE_0__["default"].tiles, this.tileSize.width * index, 0, this.tileSize.width, this.tileSize.height, x, y, this.tileSize.width, this.tileSize.height);

      if (this.debug) {
        this.ctx.fillText(tx + ':' + ty, x + this.tileSize.halfWidth, y + this.tileSize.halfHeight + 3);
      }
    }
  }, {
    key: "drawSelected",
    value: function drawSelected(tx, ty, x, y) {}
  }, {
    key: "end",
    value: function end() {
      if (this.debug) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(this.bounds.left, this.bounds.top, this.bounds.width, this.bounds.height);
        this.ctx.stroke();
      }
    }
  }]);

  return MapRenderer;
}();



/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/game */ "./app/game.js");
/* harmony import */ var _app_screens_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/screens/demo */ "./app/screens/demo.js");


var canvas = document.body.appendChild(document.createElement('canvas'));
var game = new _app_game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas);
game.screen = new _app_screens_demo__WEBPACK_IMPORTED_MODULE_1__["default"](game);
game.start();

/***/ }),

/***/ "./static/sphere.png":
/*!***************************!*\
  !*** ./static/sphere.png ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/sphere.96guy.png");

/***/ }),

/***/ "./static/tiles.png":
/*!**************************!*\
  !*** ./static/tiles.png ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/tiles.7mDej.png");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkinfinite_tiles"] = self["webpackChunkinfinite_tiles"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["lib"], () => (__webpack_require__("./index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.8ad02.js.map