require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(4);
  
  __webpack_require__(5);
  
  var _path = __webpack_require__(9);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(10);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(11);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _expressRequestLanguage = __webpack_require__(12);
  
  var _expressRequestLanguage2 = _interopRequireDefault(_expressRequestLanguage);
  
  var _bodyParser = __webpack_require__(13);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(14);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(15);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(16);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _server = __webpack_require__(18);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _universalRouter = __webpack_require__(19);
  
  var _prettyError = __webpack_require__(20);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _routes = __webpack_require__(21);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(94);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(7);
  
  var _configureStore = __webpack_require__(95);
  
  var _configureStore2 = _interopRequireDefault(_configureStore);
  
  var _runtime = __webpack_require__(105);
  
  var _Provide = __webpack_require__(106);
  
  var _Provide2 = _interopRequireDefault(_Provide);
  
  var _intl = __webpack_require__(54);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var app = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  // eslint-disable-line import/no-unresolved
  /*
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use('/', _express2.default.static(__dirname + '/public'));
  app.use((0, _cookieParser2.default)());
  app.use((0, _expressRequestLanguage2.default)({
    languages: _config.locales,
    queryName: 'lang',
    cookie: {
      name: 'lang',
      options: {
        path: '/',
        maxAge: 3650 * 24 * 3600 * 1000 },
      url: '/lang/{language}'
    }
  }));
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var css, statusCode, template, locale, data, store;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        css = [];
                        statusCode = 200;
                        template = __webpack_require__(108); // eslint-disable-line global-require
  
                        locale = req.language;
                        data = {
                          lang: locale,
                          title: '',
                          description: '',
                          css: '',
                          body: '',
                          entry: _assets2.default.main.js
                        };
  
  
                        if (false) {
                          data.trackingId = _config.analytics.google.trackingId;
                        }
  
                        store = (0, _configureStore2.default)({});
  
  
                        store.dispatch((0, _runtime.setRuntimeVariable)({
                          name: 'initialNow',
                          value: Date.now()
                        }));
  
                        store.dispatch((0, _runtime.setRuntimeVariable)({
                          name: 'availableLocales',
                          value: _config.locales
                        }));
  
                        _context.next = 11;
                        return store.dispatch((0, _intl.setLocale)({
                          locale: locale
                        }));
  
                      case 11:
                        _context.next = 13;
                        return (0, _universalRouter.match)(_routes2.default, {
                          path: req.path,
                          query: req.query,
                          context: {
                            store: store,
                            insertCss: function insertCss(styles) {
                              return css.push(styles._getCss());
                            }, // eslint-disable-line no-underscore-dangle
                            setTitle: function setTitle(value) {
                              return data.title = value;
                            },
                            setMeta: function setMeta(key, value) {
                              return data[key] = value;
                            }
                          },
                          render: function render(component) {
                            var status = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
  
                            css = [];
                            statusCode = status;
  
                            // Fire all componentWill... hooks
                            data.body = _server2.default.renderToString(_react2.default.createElement(
                              _Provide2.default,
                              { store: store },
                              component
                            ));
  
                            // If you have async actions, wait for store when stabilizes here.
                            // This may be asynchronous loop if you have complicated structure.
                            // Then render again
  
                            // If store has no changes, you do not need render again!
                            // data.body = ReactDOM.renderToString(<Provide store={store}>{component}</Provide>);
  
                            // It is important to have rendered output and state in sync,
                            // otherwise React will write error to console when mounting on client
                            data.state = (0, _stringify2.default)(store.getState());
  
                            data.css = css.join('');
                            return true;
                          }
                        });
  
                      case 13:
  
                        res.status(statusCode);
                        res.send(template(data));
  
                      case 15:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(111); // eslint-disable-line global-require
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  false ? '' : err.stack
    }));
  });
  
  app.listen(_config.port, function () {
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _intlLocalesSupported = __webpack_require__(6);
  
  var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);
  
  var _config = __webpack_require__(7);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!(0, _intlLocalesSupported2.default)(_config.locales)) {
      // `Intl` exists, but it doesn't have the data we need, so load the
      // polyfill and replace the constructors with need with the polyfill's.
      var IntlPolyfill = __webpack_require__(8);
      Intl.NumberFormat = IntlPolyfill.NumberFormat;
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
  } else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = __webpack_require__(8);
  }

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("intl-locales-supported");

/***/ },
/* 7 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  /* jscs:disable maximumLineLength */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  // default locale is the first one
  var locales = exports.locales = ['en', 'cs', 'vi'];
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("intl");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("express-request-language");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 18 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 19 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 20 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(22);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _home = __webpack_require__(68);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _contact = __webpack_require__(72);
  
  var _contact2 = _interopRequireDefault(_contact);
  
  var _login = __webpack_require__(76);
  
  var _login2 = _interopRequireDefault(_login);
  
  var _todo = __webpack_require__(80);
  
  var _todo2 = _interopRequireDefault(_todo);
  
  var _register = __webpack_require__(83);
  
  var _register2 = _interopRequireDefault(_register);
  
  var _content = __webpack_require__(86);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _error = __webpack_require__(90);
  
  var _error2 = _interopRequireDefault(_error);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    children: [_home2.default, _contact2.default, _login2.default, _todo2.default, _register2.default, _content2.default, _error2.default],
  
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next;
      var render = _ref.render;
      var context = _ref.context;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
  
                if (!(component === undefined)) {
                  _context.next = 5;
                  break;
                }
  
                return _context.abrupt('return', component);
  
              case 5:
                return _context.abrupt('return', render(_react2.default.createElement(
                  _App2.default,
                  { context: context },
                  component
                )));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  // import todo from './todo';


  // Child routes
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(23);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(24);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(25);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(26);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(27);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(28);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(29);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(36);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(62);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(65);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          setTitle: context.setTitle || _emptyFunction2.default,
          setMeta: context.setMeta || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        if (this.props.error) {
          return this.props.children;
        }
  
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, null),
          this.props.children,
          _react2.default.createElement(_Feedback2.default, null),
          _react2.default.createElement(_Footer2.default, null)
        );
      }
    }]);
    return App;
  }(_react.Component);
  
  App.propTypes = {
    context: _react.PropTypes.shape({
      insertCss: _react.PropTypes.func,
      setTitle: _react.PropTypes.func,
      setMeta: _react.PropTypes.func
    }).isRequired,
    children: _react.PropTypes.element.isRequired,
    error: _react.PropTypes.object
  };
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    setTitle: _react.PropTypes.func.isRequired,
    setMeta: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 25 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 27 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(30);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./App.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./App.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n/*\n * Base styles\n * ========================================================================== */\n\na {\n  color: #0074c2;\n}\n\n.App_root_3AV {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.App_container_1la {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.App_lead_1sX {\n  font-size: 1.25em;\n}\n\n.App_formGroup_gTp {\n  margin-bottom: 15px;\n}\n\n.App_label_1IF {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.App_input_vXd {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 40px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.App_input_vXd:focus {\n  border: 2px solid #455A64;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.App_button_3a0 {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  /*border: 1px solid #373277;*/\n  border-radius: 0;\n  background: #37474F;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.App_button_3a0:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.App_button_3a0:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n", "", {"version":3,"sources":["/./components/App/App.css","/../node_modules/normalize.css/normalize.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH,4EAA4E;;AAE5E;;;GAGG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;gFACgF;;AAEhF;;;;GAIG;;AAEH;;;;;;;;;;;UAWU,OAAO;EACf,eAAe;CAChB;;AAED;;GAEG;;AAEH;;;;EAIE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,yBAAyB;CAC1B;;AAED;;;GAGG;;AAEH;;EAEE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,sCAAsC,CAAC,OAAO;CAC/C;;AAED;;;GAGG;;AAEH;;EAEE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,oBAAoB,CAAC,OAAO;EAC5B,2BAA2B,CAAC,OAAO;EACnC,kCAAkC,CAAC,OAAO;CAC3C;;AAED;;GAEG;;AAEH;;EAEE,qBAAqB;CACtB;;AAED;;GAEG;;AAEH;;EAEE,oBAAoB;CACrB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,uBAAuB;EACvB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,YAAY;CACb;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;EAIE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;;GAGG;;AAEH;EACE,gCAAwB;UAAxB,wBAAwB,CAAC,OAAO;EAChC,UAAU,CAAC,OAAO;EAClB,kBAAkB,CAAC,OAAO;CAC3B;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;EAIE,cAAc,CAAC,OAAO;EACtB,UAAU,CAAC,OAAO;CACnB;;AAED;;GAEG;;AAEH;EACE,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;QACQ,OAAO;EACb,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;SACS,OAAO;EACd,qBAAqB;CACtB;;AAED;;;;GAIG;;AAEH;;;;EAIE,2BAA2B,CAAC,OAAO;CACpC;;AAED;;GAEG;;AAEH;;;;EAIE,mBAAmB;EACnB,WAAW;CACZ;;AAED;;GAEG;;AAEH;;;;EAIE,+BAA+B;CAChC;;AAED;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,cAAc;EACd,+BAA+B;CAChC;;AAED;;;;;GAKG;;AAEH;EACE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,eAAe,CAAC,OAAO;EACvB,eAAe,CAAC,OAAO;EACvB,gBAAgB,CAAC,OAAO;EACxB,WAAW,CAAC,OAAO;EACnB,oBAAoB,CAAC,OAAO;CAC7B;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,qBAAqB,CAAC,OAAO;CAC9B;;AAED;;GAEG;;AAEH;;EAEE,yBAAyB;CAC1B;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,cAAc;CACf;;AAED;;;GAGG;;AAEH;EACE,2BAA2B,CAAC,OAAO;EACnC,cAAc,CAAC,OAAO;CACvB;;ADvZD,yEAAyE;;AEXzE;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AFfD;;gFAEgF;;AAEhF;EACE,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,0BAA0B;EAC1B,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,8BAA8B;EAC9B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AACD;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;;;;;;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;;;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAA4B;YAA5B,4BAA4B;IAC5B,6BAA6B;GAC9B;;EAED;;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;;IAEE,YAAY;GACb;;EAED;;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;;;IAGE,WAAW;IACX,UAAU;GACX;;EAED;;IAEE,wBAAwB;GACzB;CACF","file":"App.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../../node_modules/normalize.css/normalize.css';\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n@import '../variables.css';\n\n/*\n * Base styles\n * ========================================================================== */\n\na {\n  color: #0074c2;\n}\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 15px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 40px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border: 2px solid #455A64;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  /*border: 1px solid #373277;*/\n  border-radius: 0;\n  background: #37474F;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n:global(.browserupgrade) {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n","/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "App_root_3AV",
  	"container": "App_container_1la",
  	"lead": "App_lead_1sX",
  	"formGroup": "App_formGroup_gTp",
  	"label": "App_label_1IF",
  	"input": "App_input_vXd",
  	"button": "App_button_3a0"
  };

/***/ },
/* 31 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(33);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(34);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(35);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactIntl = __webpack_require__(37);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(39);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(41);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(48);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _LanguageSwitcher = __webpack_require__(52);
  
  var _LanguageSwitcher2 = _interopRequireDefault(_LanguageSwitcher);
  
  var _logoSmall = __webpack_require__(61);
  
  var _logoSmall2 = _interopRequireDefault(_logoSmall);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var messages = (0, _reactIntl.defineMessages)({
    brand: {
      id: 'header.brand',
      defaultMessage: 'Your Company Brand',
      description: 'Brand name displayed in header'
    },
    bannerTitle: {
      id: 'header.banner.title',
      defaultMessage: 'React',
      description: 'Title in page header'
    },
    bannerDesc: {
      id: 'header.banner.desc',
      defaultMessage: 'Complex web apps made easy',
      description: 'Description in header'
    }
  });
  
  function Header() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'navbar navbar-inverse navbar-lg' },
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'div',
            { className: 'navbar-collapse collapse', id: 'navbar-mobile' },
            _react2.default.createElement(
              'a',
              { className: 'navbar-brand', href: 'index.html' },
              _react2.default.createElement('img', { src: '/assets/images/logo_light.png', alt: '' })
            ),
            _react2.default.createElement(
              'ul',
              { className: 'nav navbar-nav pull-right visible-xs-block' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { 'data-toggle': 'collapse', 'data-target': '#navbar-mobile' },
                  _react2.default.createElement('i', { className: 'icon-tree5' })
                )
              )
            ),
            _react2.default.createElement(
              'form',
              { className: 'navbar-form navbar-left' },
              _react2.default.createElement(
                'div',
                { className: 'form-group has-feedback' },
                _react2.default.createElement('input', { type: 'search', size: '70', className: 'form-control', placeholder: 'Tìm kiếm mọi thứ...' }),
                _react2.default.createElement(
                  'div',
                  { className: 'form-control-feedback' },
                  _react2.default.createElement('i', { className: 'icon-search4 text-muted text-size-base' })
                )
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'nav navbar-nav navbar-right' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _Link2.default,
                  { to: '/register' },
                  'Đăng ký'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _Link2.default,
                  { to: '/login' },
                  'Đăng nhập'
                )
              )
            )
          )
        )
      ),
      _react2.default.createElement(_Navigation2.default, null)
    );
  }
  
  exports.default = (0, _reactIntl.injectIntl)((0, _withStyles2.default)(_Header2.default)(Header));

/***/ },
/* 37 */
/***/ function(module, exports) {

  module.exports = require("react-intl");

/***/ },
/* 38 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(40);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Header.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Header.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Header_root_3Gi {\n  background: #373277;\n  color: #fff;\n}\n\n.Header_container_1rG {\n  margin: 0 auto;\n  padding: 20px 0;\n  max-width: 1000px;\n}\n\n.Header_brand_19l {\n  color: rgb(146, 229, 252);\n  text-decoration: none;\n  font-size: 1.75em; /* ~28px */\n}\n\n.Header_brandTxt_2mi {\n  margin-left: 10px;\n}\n\n.Header_nav_1zC {\n  float: right;\n  margin-top: 6px;\n}\n\n.Header_banner_2Lc {\n  text-align: center;\n}\n\n.Header_bannerTitle_2Qz {\n  margin: 0;\n  padding: 10px;\n  font-weight: normal;\n  font-size: 4em;\n  line-height: 1em;\n}\n\n.Header_bannerDesc_3mm {\n  padding: 0;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 1.25em;\n  margin: 0;\n}\n", "", {"version":3,"sources":["/./components/Header/Header.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ADfD;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAoC;CACrC;;AAED;EACE,0BAAiD;EACjD,sBAAsB;EACtB,kBAAkB,CAAC,WAAW;CAC/B;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,aAAa;EACb,gBAAgB;CACjB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,UAAU;EACV,cAAc;EACd,oBAAoB;EACpB,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,WAAW;EACX,gCAAgC;EAChC,kBAAkB;EAClB,UAAU;CACX","file":"Header.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../variables.css';\n\n:root {\n  --brand-color: #61dafb;\n}\n\n.root {\n  background: #373277;\n  color: #fff;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 0;\n  max-width: var(--max-content-width);\n}\n\n.brand {\n  color: color(var(--brand-color) lightness(+10%));\n  text-decoration: none;\n  font-size: 1.75em; /* ~28px */\n}\n\n.brandTxt {\n  margin-left: 10px;\n}\n\n.nav {\n  float: right;\n  margin-top: 6px;\n}\n\n.banner {\n  text-align: center;\n}\n\n.bannerTitle {\n  margin: 0;\n  padding: 10px;\n  font-weight: normal;\n  font-size: 4em;\n  line-height: 1em;\n}\n\n.bannerDesc {\n  padding: 0;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 1.25em;\n  margin: 0;\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_3Gi",
  	"container": "Header_container_1rG",
  	"brand": "Header_brand_19l",
  	"brandTxt": "Header_brandTxt_2mi",
  	"nav": "Header_nav_1zC",
  	"banner": "Header_banner_2Lc",
  	"bannerTitle": "Header_bannerTitle_2Qz",
  	"bannerDesc": "Header_bannerDesc_3mm"
  };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(42);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(43);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(23);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(24);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(25);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(26);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(27);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _history = __webpack_require__(44);
  
  var _history2 = _interopRequireDefault(_history);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _Object$getPrototypeO;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Link)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (event) {
        var allowTransition = true;
  
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          if (_this.props.to) {
            _history2.default.push(_this.props.to);
          } else {
            _history2.default.push({
              pathname: event.currentTarget.pathname,
              search: event.currentTarget.search
            });
          }
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    } // eslint-disable-line react/prefer-stateless-function
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var props = (0, _objectWithoutProperties3.default)(_props, ['to']); // eslint-disable-line no-use-before-define
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: _history2.default.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  Link.propTypes = {
    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
    onClick: _react.PropTypes.func
  };
  exports.default = Link;

/***/ },
/* 42 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 43 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(45);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(46);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(47);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var history = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default)(); /**
                                                                                                                                    * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                    *
                                                                                                                                    * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                    *
                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                    */
  
  exports.default = history;

/***/ },
/* 45 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 46 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactIntl = __webpack_require__(37);
  
  var _classnames = __webpack_require__(49);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(50);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(41);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var messages = (0, _reactIntl.defineMessages)({
      about: {
          id: 'navigation.about',
          defaultMessage: 'About',
          description: 'About link in header'
      },
      contact: {
          id: 'navigation.contact',
          defaultMessage: 'Contact',
          description: 'Contact link in header'
      },
      login: {
          id: 'navigation.login',
          defaultMessage: 'Log in',
          description: 'Log in link in header'
      },
      or: {
          id: 'navigation.separator.or',
          defaultMessage: 'or',
          description: 'Last separator in list, lowercase "or"'
      },
      signup: {
          id: 'navigation.signup',
          defaultMessage: 'Sign up',
          description: 'Sign up link in header'
      }
  });
  
  function Navigation(_ref) {
      var className = _ref.className;
  
      return _react2.default.createElement(
          'div',
          { className: 'navbar navbar-default', id: 'navbar-second' },
          _react2.default.createElement(
              'ul',
              { className: 'nav navbar-nav no-border visible-xs-block' },
              _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                      'a',
                      { className: 'text-center collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar-second-toggle' },
                      _react2.default.createElement('i', { className: 'icon-menu7' })
                  )
              )
          ),
          _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement(
                  'div',
                  { className: 'navbar-collapse collapse', id: 'navbar-second-toggle' },
                  _react2.default.createElement(
                      'ul',
                      { className: 'nav navbar-nav' },
                      _react2.default.createElement(
                          'li',
                          { className: 'active' },
                          _react2.default.createElement(
                              'a',
                              null,
                              _react2.default.createElement('i', { className: 'icon-display4 position-left' }),
                              ' Dashboard'
                          )
                      ),
                      _react2.default.createElement(
                          'li',
                          { className: 'dropdown mega-menu mega-menu-wide' },
                          _react2.default.createElement(
                              'a',
                              { className: 'dropdown-toggle', 'data-toggle': 'dropdown' },
                              _react2.default.createElement('i', { className: 'icon-puzzle4 position-left' }),
                              ' Components ',
                              _react2.default.createElement('span', { className: 'caret' })
                          ),
                          _react2.default.createElement(
                              'div',
                              { className: 'dropdown-menu dropdown-content' },
                              _react2.default.createElement(
                                  'div',
                                  { className: 'dropdown-content-body' },
                                  _react2.default.createElement(
                                      'div',
                                      { className: 'row' },
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'col-md-3' },
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'menu-heading underlined' },
                                              'Store'
                                          ),
                                          _react2.default.createElement(
                                              'ul',
                                              { className: 'menu-list' },
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-pencil3' }),
                                                      ' Form components'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'form_inputs_basic.html' },
                                                              'Basic inputs'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'form_checkboxes_radios.html' },
                                                              'Checkboxes & radios'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'index.htm#' },
                                                              'Selects'
                                                          ),
                                                          _react2.default.createElement(
                                                              'ul',
                                                              null,
                                                              _react2.default.createElement(
                                                                  'li',
                                                                  null,
                                                                  _react2.default.createElement(
                                                                      'a',
                                                                      { href: 'form_select2.html' },
                                                                      'Select2 selects'
                                                                  )
                                                              ),
                                                              _react2.default.createElement(
                                                                  'li',
                                                                  null,
                                                                  _react2.default.createElement(
                                                                      'a',
                                                                      { href: 'form_multiselect.html' },
                                                                      'Bootstrap multiselect'
                                                                  )
                                                              ),
                                                              _react2.default.createElement(
                                                                  'li',
                                                                  null,
                                                                  _react2.default.createElement(
                                                                      'a',
                                                                      { href: 'form_select_box_it.html' },
                                                                      'SelectBoxIt selects'
                                                                  )
                                                              ),
                                                              _react2.default.createElement(
                                                                  'li',
                                                                  null,
                                                                  _react2.default.createElement(
                                                                      'a',
                                                                      { href: 'form_bootstrap_select.html' },
                                                                      'Bootstrap selects'
                                                                  )
                                                              )
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-footprint' }),
                                                      ' Wizards'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'wizard_steps.html' },
                                                              'Steps wizard'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'wizard_form.html' },
                                                              'Form wizard'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-spell-check' }),
                                                      ' Editors'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'editor_summernote.html' },
                                                              'Summernote editor'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'editor_ckeditor.html' },
                                                              'CKEditor'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-select2' }),
                                                      ' Pickers'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'picker_date.html' },
                                                              'Date & time pickers'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'picker_color.html' },
                                                              'Color pickers'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-insert-template' }),
                                                      ' Form layouts'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'form_layout_vertical.html' },
                                                              'Vertical form'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'form_layout_horizontal.html' },
                                                              'Horizontal form'
                                                          )
                                                      )
                                                  )
                                              )
                                          )
                                      ),
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'col-md-3' },
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'menu-heading underlined' },
                                              'Appearance'
                                          ),
                                          _react2.default.createElement(
                                              'ul',
                                              { className: 'menu-list' },
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-grid' }),
                                                      ' Components'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'components_modals.html' },
                                                              'Modals'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'components_dropdowns.html' },
                                                              'Dropdown menus'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-browser' }),
                                                      ' Content panels'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'panels.html' },
                                                              'Panels'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'panels_heading.html' },
                                                              'Heading elements'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-droplets' }),
                                                      ' Content styling'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'appearance_text_styling.html' },
                                                              'Text styling'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'appearance_syntax_highlighter.html' },
                                                              'Syntax highlighter'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-gift' }),
                                                      ' Extra components'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'extra_sliders_noui.html' },
                                                              'NoUI sliders'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'extra_sliders_ion.html' },
                                                              'Ion range sliders'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-wrench3' }),
                                                      ' Tools'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'tools_session_timeout.html' },
                                                              'Session timeout'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'tools_idle_timeout.html' },
                                                              'Idle timeout'
                                                          )
                                                      )
                                                  )
                                              )
                                          )
                                      ),
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'col-md-3' },
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'menu-heading underlined' },
                                              'Extensions'
                                          ),
                                          _react2.default.createElement(
                                              'ul',
                                              { className: 'menu-list' },
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-puzzle4' }),
                                                      ' Extensions'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'extension_image_cropper.html' },
                                                              'Image cropper'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'extension_dnd.html' },
                                                              'Drag and drop'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-popout' }),
                                                      ' JQuery UI'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'jqueryui_interactions.html' },
                                                              'Interactions'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'jqueryui_navigation.html' },
                                                              'Navigation'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-upload' }),
                                                      ' File uploaders'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'uploader_plupload.html' },
                                                              'Plupload'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'uploader_dropzone.html' },
                                                              'Dropzone'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-calendar3' }),
                                                      ' Event calendars'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'fullcalendar_views.html' },
                                                              'Basic views'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'fullcalendar_advanced.html' },
                                                              'Advanced usage'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-sphere' }),
                                                      ' Internationalization'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'internationalization_switch_direct.html' },
                                                              'Direct translation'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'internationalization_callbacks.html' },
                                                              'Callbacks'
                                                          )
                                                      )
                                                  )
                                              )
                                          )
                                      ),
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'col-md-3' },
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'menu-heading underlined' },
                                              'Tables'
                                          ),
                                          _react2.default.createElement(
                                              'ul',
                                              { className: 'menu-list' },
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-table2' }),
                                                      ' Basic tables'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'table_basic.html' },
                                                              'Basic examples'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'table_elements.html' },
                                                              'Table elements'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-grid7' }),
                                                      ' Data tables'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'datatable_basic.html' },
                                                              'Basic initialization'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'datatable_data_sources.html' },
                                                              'Data sources'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-alignment-unalign' }),
                                                      ' Data tables extensions'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'datatable_extension_reorder.html' },
                                                              'Columns reorder'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'datatable_extension_row_reorder.html' },
                                                              'Row reorder'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'index.htm#' },
                                                              'Buttons'
                                                          ),
                                                          _react2.default.createElement(
                                                              'ul',
                                                              null,
                                                              _react2.default.createElement(
                                                                  'li',
                                                                  null,
                                                                  _react2.default.createElement(
                                                                      'a',
                                                                      { href: 'datatable_extension_buttons_init.html' },
                                                                      'Initialization'
                                                                  )
                                                              ),
                                                              _react2.default.createElement(
                                                                  'li',
                                                                  null,
                                                                  _react2.default.createElement(
                                                                      'a',
                                                                      { href: 'datatable_extension_buttons_html5.html' },
                                                                      'HTML5 buttons'
                                                                  )
                                                              )
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'datatable_extension_colvis.html' },
                                                              'Columns visibility'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-file-spreadsheet' }),
                                                      ' Handsontable'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'handsontable_basic.html' },
                                                              'Basic configuration'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'handsontable_advanced.html' },
                                                              'Advanced setup'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'handsontable_cols.html' },
                                                              'Column features'
                                                          )
                                                      )
                                                  )
                                              ),
                                              _react2.default.createElement(
                                                  'li',
                                                  null,
                                                  _react2.default.createElement(
                                                      'a',
                                                      { href: 'index.htm#' },
                                                      _react2.default.createElement('i', { className: 'icon-versions' }),
                                                      ' Responsive options'
                                                  ),
                                                  _react2.default.createElement(
                                                      'ul',
                                                      null,
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'table_responsive.html' },
                                                              'Responsive basic tables'
                                                          )
                                                      ),
                                                      _react2.default.createElement(
                                                          'li',
                                                          null,
                                                          _react2.default.createElement(
                                                              'a',
                                                              { href: 'datatable_responsive.html' },
                                                              'Responsive data tables'
                                                          )
                                                      )
                                                  )
                                              )
                                          )
                                      )
                                  )
                              )
                          )
                      )
                  ),
                  _react2.default.createElement(
                      'ul',
                      { className: 'nav navbar-nav navbar-right' },
                      _react2.default.createElement(
                          'li',
                          { className: 'dropdown' },
                          _react2.default.createElement(
                              'a',
                              { href: 'index.htm#', className: 'dropdown-toggle notification', 'data-toggle': 'dropdown' },
                              _react2.default.createElement('i', { className: 'icon-cart4' }),
                              _react2.default.createElement(
                                  'span',
                                  { className: 'visible-xs-inline-block position-right' },
                                  'Cart'
                              ),
                              _react2.default.createElement(
                                  'span',
                                  { className: 'badge bg-warning-400' },
                                  '10'
                              )
                          ),
                          _react2.default.createElement(
                              'div',
                              { className: 'dropdown-menu dropdown-content width-350' },
                              _react2.default.createElement(
                                  'div',
                                  { className: 'dropdown-content-heading' },
                                  'Cart'
                              ),
                              _react2.default.createElement(
                                  'ul',
                                  { className: 'media-list dropdown-content-body' },
                                  _react2.default.createElement(
                                      'li',
                                      { className: 'media' },
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'media-left' },
                                          _react2.default.createElement('img', { src: 'assets/images/demo/users/face10.jpg', className: 'img-circle img-sm', alt: '' }),
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'badge bg-danger-400 media-badge' },
                                              '5'
                                          )
                                      ),
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'media-body' },
                                          _react2.default.createElement(
                                              'a',
                                              { href: 'index.htm#', className: 'media-heading' },
                                              _react2.default.createElement(
                                                  'span',
                                                  { className: 'text-semibold' },
                                                  'James Alexander'
                                              ),
                                              _react2.default.createElement(
                                                  'span',
                                                  { className: 'media-annotation pull-right' },
                                                  '04:58'
                                              )
                                          ),
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'text-muted' },
                                              'who knows, maybe that would be the best thing for me...'
                                          )
                                      )
                                  )
                              ),
                              _react2.default.createElement(
                                  'div',
                                  { className: 'dropdown-content-footer' },
                                  _react2.default.createElement(
                                      'a',
                                      { href: 'index.htm#', 'data-popup': 'tooltip', title: 'All messages' },
                                      _react2.default.createElement('i', { className: 'icon-menu display-block' })
                                  )
                              )
                          )
                      ),
                      _react2.default.createElement(
                          'li',
                          { className: 'dropdown' },
                          _react2.default.createElement(
                              'a',
                              { href: 'index.htm#', className: 'dropdown-toggle notification', 'data-toggle': 'dropdown' },
                              _react2.default.createElement('i', { className: 'icon-bubble6' }),
                              _react2.default.createElement(
                                  'span',
                                  { className: 'visible-xs-inline-block position-right' },
                                  'Message'
                              ),
                              _react2.default.createElement(
                                  'span',
                                  { className: 'badge bg-warning-400' },
                                  '10'
                              )
                          ),
                          _react2.default.createElement(
                              'div',
                              { className: 'dropdown-menu dropdown-content width-350' },
                              _react2.default.createElement(
                                  'div',
                                  { className: 'dropdown-content-heading' },
                                  'Messages'
                              ),
                              _react2.default.createElement(
                                  'ul',
                                  { className: 'media-list dropdown-content-body' },
                                  _react2.default.createElement(
                                      'li',
                                      { className: 'media' },
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'media-left' },
                                          _react2.default.createElement('img', { src: 'assets/images/demo/users/face10.jpg', className: 'img-circle img-sm', alt: '' }),
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'badge bg-danger-400 media-badge' },
                                              '5'
                                          )
                                      ),
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'media-body' },
                                          _react2.default.createElement(
                                              'a',
                                              { href: 'index.htm#', className: 'media-heading' },
                                              _react2.default.createElement(
                                                  'span',
                                                  { className: 'text-semibold' },
                                                  'James Alexander'
                                              ),
                                              _react2.default.createElement(
                                                  'span',
                                                  { className: 'media-annotation pull-right' },
                                                  '04:58'
                                              )
                                          ),
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'text-muted' },
                                              'who knows, maybe that would be the best thing for me...'
                                          )
                                      )
                                  )
                              ),
                              _react2.default.createElement(
                                  'div',
                                  { className: 'dropdown-content-footer' },
                                  _react2.default.createElement(
                                      'a',
                                      { href: 'index.htm#', 'data-popup': 'tooltip', title: 'All messages' },
                                      _react2.default.createElement('i', { className: 'icon-menu display-block' })
                                  )
                              )
                          )
                      ),
                      _react2.default.createElement(
                          'li',
                          { className: 'dropdown' },
                          _react2.default.createElement(
                              'a',
                              { className: 'dropdown-toggle notification', 'data-toggle': 'dropdown' },
                              _react2.default.createElement('i', { className: 'icon-bell3' }),
                              _react2.default.createElement(
                                  'span',
                                  { className: 'visible-xs-inline-block position-right' },
                                  'Messages'
                              ),
                              _react2.default.createElement(
                                  'span',
                                  { className: 'badge bg-warning-400' },
                                  '2'
                              )
                          ),
                          _react2.default.createElement(
                              'div',
                              { className: 'dropdown-menu dropdown-content width-350' },
                              _react2.default.createElement(
                                  'div',
                                  { className: 'dropdown-content-heading' },
                                  'Notification'
                              ),
                              _react2.default.createElement(
                                  'ul',
                                  { className: 'media-list dropdown-content-body' },
                                  _react2.default.createElement(
                                      'li',
                                      { className: 'media' },
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'media-left' },
                                          _react2.default.createElement('img', { src: 'assets/images/demo/users/face10.jpg', className: 'img-circle img-sm', alt: '' }),
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'badge bg-danger-400 media-badge' },
                                              '5'
                                          )
                                      ),
                                      _react2.default.createElement(
                                          'div',
                                          { className: 'media-body' },
                                          _react2.default.createElement(
                                              'a',
                                              { href: 'index.htm#', className: 'media-heading' },
                                              _react2.default.createElement(
                                                  'span',
                                                  { className: 'text-semibold' },
                                                  'James Alexander'
                                              ),
                                              _react2.default.createElement(
                                                  'span',
                                                  { className: 'media-annotation pull-right' },
                                                  '04:58'
                                              )
                                          ),
                                          _react2.default.createElement(
                                              'span',
                                              { className: 'text-muted' },
                                              'who knows, maybe that would be the best thing for me...'
                                          )
                                      )
                                  )
                              ),
                              _react2.default.createElement(
                                  'div',
                                  { className: 'dropdown-content-footer' },
                                  _react2.default.createElement(
                                      'a',
                                      { href: 'index.htm#', 'data-popup': 'tooltip', title: 'All messages' },
                                      _react2.default.createElement('i', { className: 'icon-menu display-block' })
                                  )
                              )
                          )
                      )
                  )
              )
          )
      );
  }
  
  Navigation.propTypes = {
      className: _react.PropTypes.string
  };
  
  exports.default = (0, _withStyles2.default)(_Navigation2.default)(Navigation);

/***/ },
/* 49 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(51);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n.Navigation_root_Kev {\n  margin: 0;\n}\n\n.Navigation_link_1-r {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em; /* ~18px */\n}\n\n.Navigation_link_1-r,\n.Navigation_link_1-r:active,\n.Navigation_link_1-r:visited {\n  color: rgba(255, 255, 255, 0.6);\n}\n\n.Navigation_link_1-r:hover {\n  color: rgba(255, 255, 255, 1);\n}\n\n.Navigation_highlight_g6k {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n\n.Navigation_highlight_g6k:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n\n.Navigation_spacer_2KA {\n  color: rgba(255, 255, 255, 0.3);\n}\n", "", {"version":3,"sources":["/./components/Navigation/Navigation.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;CACX;;AAED;EACE,sBAAsB;EACtB,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;EAGE,gCAAgC;CACjC;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,gCAAgC;EAChC,YAAY;CACb;;AAED;EACE,+BAA+B;CAChC;;AAED;EACE,gCAAgC;CACjC","file":"Navigation.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n.root {\n  margin: 0;\n}\n\n.link {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em; /* ~18px */\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(255, 255, 255, 0.6);\n}\n\n.link:hover {\n  color: rgba(255, 255, 255, 1);\n}\n\n.highlight {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n\n.highlight:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n\n.spacer {\n  color: rgba(255, 255, 255, 0.3);\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_Kev",
  	"link": "Navigation_link_1-r",
  	"highlight": "Navigation_highlight_g6k",
  	"spacer": "Navigation_spacer_2KA"
  };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRedux = __webpack_require__(53);
  
  var _intl = __webpack_require__(54);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function LanguageSwitcher(_ref) {
    var currentLocale = _ref.currentLocale;
    var availableLocales = _ref.availableLocales;
    var setLocale = _ref.setLocale;
  
    var isSelected = function isSelected(locale) {
      return locale === currentLocale;
    };
    return _react2.default.createElement(
      'div',
      null,
      availableLocales.map(function (locale) {
        return _react2.default.createElement(
          'span',
          { key: locale },
          isSelected(locale) ? _react2.default.createElement(
            'span',
            null,
            locale
          ) : _react2.default.createElement(
            'a',
            {
              href: '?lang=' + locale,
              onClick: function onClick(e) {
                setLocale({ locale: locale });
                e.preventDefault();
              }
            },
            locale
          ),
          ' '
        );
      })
    );
  } /* eslint-disable no-shadow */
  
  LanguageSwitcher.propTypes = {
    currentLocale: _react.PropTypes.string.isRequired,
    availableLocales: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
    setLocale: _react.PropTypes.func.isRequired
  };
  
  exports.default = (0, _reactRedux.connect)(function (state) {
    return {
      availableLocales: state.runtime.availableLocales,
      currentLocale: state.intl.locale
    };
  }, {
    setLocale: _intl.setLocale
  })(LanguageSwitcher);

/***/ },
/* 53 */
/***/ function(module, exports) {

  module.exports = require("react-redux");

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  exports.setLocale = setLocale;
  
  var _fetch = __webpack_require__(55);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _en = __webpack_require__(58);
  
  var _en2 = _interopRequireDefault(_en);
  
  var _vi = __webpack_require__(59);
  
  var _vi2 = _interopRequireDefault(_vi);
  
  var _constants = __webpack_require__(60);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function setLocale(_ref) {
      var _this = this;
  
      var locale = _ref.locale;
  
      return function () {
          var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dispatch) {
              var messages, maxAge;
              return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                      switch (_context.prev = _context.next) {
                          case 0:
                              dispatch({
                                  type: _constants.SET_LOCALE_START,
                                  payload: {
                                      locale: locale
                                  }
                              });
  
                              _context.prev = 1;
                              messages = _vi2.default.reduce(function (msgs, msg) {
                                  msgs[msg.id] = msg.message; // eslint-disable-line no-param-reassign
                                  return msgs;
                              }, {});
  
                              dispatch({
                                  type: _constants.SET_LOCALE_SUCCESS,
                                  payload: {
                                      locale: locale,
                                      messages: messages
                                  }
                              });
  
                              // remember locale for every new request
                              if (false) {
                                  maxAge = 3650 * 24 * 3600; // 10 years in seconds
  
                                  document.cookie = 'lang=' + locale + ';path=/;max-age=' + maxAge;
                              }
                              _context.next = 11;
                              break;
  
                          case 7:
                              _context.prev = 7;
                              _context.t0 = _context['catch'](1);
  
                              dispatch({
                                  type: _constants.SET_LOCALE_ERROR,
                                  payload: {
                                      locale: locale,
                                      error: _context.t0
                                  }
                              });
                              return _context.abrupt('return', false);
  
                          case 11:
                              return _context.abrupt('return', true);
  
                          case 12:
                          case 'end':
                              return _context.stop();
                      }
                  }
              }, _callee, _this, [[1, 7]]);
          }));
  
          return function (_x) {
              return _ref2.apply(this, arguments);
          };
      }();
  }

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(56);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(57);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(7);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 56 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 57 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 58 */
/***/ function(module, exports) {

  module.exports = [
  	{
  		"id": "header.banner.desc",
  		"description": "Description in header",
  		"defaultMessage": "Complex web apps made easy",
  		"message": "Hello World",
  		"files": [
  			"src/components/Header/Header.js"
  		]
  	},
  	{
  		"id": "navigation.about",
  		"description": "About link in header",
  		"defaultMessage": "About",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "navigation.contact",
  		"description": "Contact link in header",
  		"defaultMessage": "Contact",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "navigation.login",
  		"description": "Log in link in header",
  		"defaultMessage": "Log in",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "navigation.separator.or",
  		"description": "Last separator in list, lowercase \"or\"",
  		"defaultMessage": "or",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "navigation.signup",
  		"description": "Sign up link in header",
  		"defaultMessage": "Sign up",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "header.banner.title",
  		"description": "Title in page header",
  		"defaultMessage": "React",
  		"message": "",
  		"files": [
  			"src/components/Header/Header.js"
  		]
  	},
  	{
  		"id": "header.brand",
  		"description": "Brand name displayed in header",
  		"defaultMessage": "Your Company Brand",
  		"message": "",
  		"files": [
  			"src/components/Header/Header.js"
  		]
  	}
  ];

/***/ },
/* 59 */
/***/ function(module, exports) {

  module.exports = [
  	{
  		"id": "header.banner.desc",
  		"description": "Description in header",
  		"defaultMessage": "Complex web apps made easy",
  		"message": "Chào thế giới",
  		"files": [
  			"src/components/Header/Header.js"
  		]
  	},
  	{
  		"id": "navigation.about",
  		"description": "About link in header",
  		"defaultMessage": "About",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "navigation.contact",
  		"description": "Contact link in header",
  		"defaultMessage": "Contact",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "navigation.login",
  		"description": "Log in link in header",
  		"defaultMessage": "Log in",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "navigation.separator.or",
  		"description": "Last separator in list, lowercase \"or\"",
  		"defaultMessage": "or",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "navigation.signup",
  		"description": "Sign up link in header",
  		"defaultMessage": "Sign up",
  		"message": "",
  		"files": [
  			"src/components/Navigation/Navigation.js"
  		]
  	},
  	{
  		"id": "header.banner.title",
  		"description": "Title in page header",
  		"defaultMessage": "React",
  		"message": "",
  		"files": [
  			"src/components/Header/Header.js"
  		]
  	},
  	{
  		"id": "header.brand",
  		"description": "Brand name displayed in header",
  		"defaultMessage": "Your Company Brand",
  		"message": "",
  		"files": [
  			"src/components/Header/Header.js"
  		]
  	}
  ];

/***/ },
/* 60 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var SET_RUNTIME_VARIABLE = exports.SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
  var SET_LOCALE_START = exports.SET_LOCALE_START = 'SET_LOCALE_START';
  var SET_LOCALE_SUCCESS = exports.SET_LOCALE_SUCCESS = 'SET_LOCALE_SUCCESS';
  var SET_LOCALE_ERROR = exports.SET_LOCALE_ERROR = 'SET_LOCALE_ERROR';
  var REGISTER = exports.REGISTER = 'REGISTER';

/***/ },
/* 61 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACrRJREFUeNqcWAlQlFcSnosBhmFmBAaVG0RAEBQVUUh2jRKjiKJGEfFE8YisGkw066rrmd2o5bWaaIyaQuMRo/EAiRG8SojxwAMFEQWEkUMYkBlmmHtmu//9f+rtXzhFQlXXPN7r192vX/fX/X4+x/4fF4gHxAcSADnQvwJ6jksThxhz6TU+zU/u4RH8dv/43TCKMUhIkyP9y2cZx+Z3ZPGTh/nThpFKGOFOBAlp5Xyaj+1Vht+Z4O/KMNu7DBPYMZoxDJU4i739xe/96+BIB1epXFtf+7p4x9p7quoKLayZgUxAFuKw1PVJA0NcBn+2JcbFy8/H1K5qLvzHwmuauhoNbRwaZaWpS8+8y5NC+rSiPhPSfOM2f3NY4OwSzjBYLea3bRWlh36dl3hc39JkJBTwnNw9hR8dyZshC4nI4PEFPZg9Zp227Pb6pRkvzx+rhX87gPRARuJQdq+SuUZHmkSjD+duAk9Flh/fn1mweNJ2LpdbiB6UBvSdEzZ94QhQ+Kz58V30mnP47L/1HbX/7D5xb9/xHU0N1yt+PPTV1cwp2/lCx0J59LCpntGx3qVHdl+ljbHSHrd1x2Nc2lsYHyJZnzC3iZce33n7/En2heQhh0nXx67dNThk6ryNPAcHSVn23i04Fz5n6VqryaSu+OnI+jtbsorJ0JiY82C+rG/EnPPjBsS2VZa30l7T0V6zsePILkyEpMwP4PJ4opbShw/p0xlpMoHikivzxy0ztLUqIuYu34iEY5zDNTr2GH4zePUhygpJyQgkEof7rgB/l2GUcc4ePakY0b6pa6dPxQQtrgve3C/Uvzjz/UUun++I9PzHQxdwjk4cLs1L7etobkQZHGcPTxlhFPePZGUnSJp1HdSEk8xdyuKnsi8wMcU/Iv3TJR3NDdU4GZnxWWbbizJFdd5pDWEcpctR5ib53yHr9SwctOsxNspT+NV4v7ANFx1lPXrDjwtJrj4BkrhNX6+2mk3G/PlJ+5BwjHO4xuIXOcncUAZHWXJPQwC2oKtr5XWB2gw4Ur/VOafUoKxd7BOIUOEKJIPrlQeNnx764eFLWUKJzKfl6YPf+89fEYWEY5zDNeRBXtwDJBF7B/RDWbX5Fzro5HJkVYZOe9i1jTmFC22EBLBLOqWgfJfAWSTVKZsUzp69Ah1EYo/ulhaMLVOHRqlraqyG2PKF0FCdSQjLAohRwZoaCONOSyQJwoiFSxRYIVFyRKGpC/qGz14629UvKAEwCE/M6XhT97JdUV1lUL1V+Y1Mmqypr31y64t5Bw1tLUZNvQKFc8Revi6OMnfh+1uPLBR7+UXWXsv92VHaQ+rqGxgk6ukdjDwWo6GtvbaqoOzo3qPPT333ggBbBnDNfFZtE/mOTPIceyx/U9C4aeuEUpl/e01lUX1RQUGP0MiYF2ezT9/4NC0/In35MGd5T+9bK9O3wVqzvqXZaDUarEgwNkHZ0amrKyoCk1ISTJr2lkupfzkFRurlA2OHVOWc3A8HbZcEBI/0Gzl+Zmhqhr/61csHwG8is55PFFrR8PV7Bw/+/MtsBxfXUOWT4oNXP5m85eGeDYU1V87VAKK/J5L3loC3GsJnZabX3bpy9uHeTQ/wSoOSUv1j1+xIDJ40K8pqNmveVjxVq2tedsijYmy9Y0ckqaqe3wtJmTcSMMycOyV+D1SQm4pruWfcw6PbwMBJAWM+ngSyH72++UszAUdUYHoHjJ0ydM4znXLmo7fPgifOGgtz0UCDEOCBRo0+fCl7brnBlHKzqhR4Wpzc5HNhPjV62fptc5/pTekVJhsSjqOXb9iOa3Clc4C3GffgXpSBsmiZKDsadaFO1I02oC1oUyc8DMxcm8Ll8lxv/zNzJRTZRhq19XTJ0BXvWJPDsdksLr19wxVXc87oW5sxLmxhMxanArB24huOw9IWTcM1iD0d8P6Me2CvtXjXulxGHi3bhLpQJ+pGGxj46ExPoavE12LQ11VePNFM9EpWJktayh6pda1NL9C4h3s3/8bUNiG0Qew0JOZsFC/swb0AJSpGHlEROKgTdYMNPky28xgDdMo3pQAJ/tA/hbDQn8pav4RkL5FHr36AMPyhq7ePZjBH19xYzTZM19TAzPEoXtgDe8NQRhetOQd1om6woYyJLx7T6EHanwVsqQSQ3Dl8w76BdLZSHQb+Ri74PBnA0QCB/ZtXfEKyrG84lihO8c51P9CYxPRcquLd64+hUuQB3gm4B/o3Q9SiVcmkTNSBulAn6kYb6BBCmygmdyC/kKnp8TOKlXcgiC0pNypz+s1ckobBCnGTjEE84dzdm5DyWRCohqSfin7FAEeC8jMfWqDdSDhm5pEHeXEP7gUZSpSFMlE26kBdoPMu6kYbaFtEXKIkUJABqC5KPHkjHU67gCdwkEJ3Wgqg+gqEJwF07Hz09ZdlCQfOjfX9YNzE2xuXris/8W0l09SS9RcayCDwxhYA2HMAO5cHZq4Jh2xd0fzoTi6AbQB0uRFwAyoo+N/lTR/xPVSHDrKr5RL3TT46RNKgUI+Yv2+b4B4RPQbioz/GCQjSQxzUAIi+cQ8fGG9QtdaVnzx4wmY2WyFLNVQX4iYXcwUCHhiW5ih184GkKXRyl/eEmukPB3XCROhQNj6F/u7yva9WXQCMayEMMjBlqat3oJC+XglNrqlFit0AjkLoOp9AS+0PWecpcBF7QD/vZK9IQlzpzVqN0tiuaoJqUAPdcKTNajWcivfNIuqkmjbMSDxqLAI6Ky2sVwuPKejQKTiBF/q8KS46/cvMUSfIKxtzND+t97ARsxQ38k7XFlwsx0m/hAlhviMSUxp+v3Hs8uwP/49/7PFr03sOipsGMk1GdZueqI962ihGv43HwiymdTYwG+CFJMPOFAp4BX06FU3qgkUTj2sbX5d4xyeMh67BZtJqbDjGufyMpB/Y/PDse46yoB6LCB3M9ZlJbOOxHp82AgApIz0iB1NdJ7Q8DTRiM0GqgxTXQWBvA3BUx23clxm/+ZtMHFNzRoOOza9vVaIMjnzAUAn76gj9dnv+TgO5PD715oOs0RKIbaGFmiCIW0sObj/gIJZ4IOEY51gPYWoPyNBRlUEs4bPRv7s9P7PBqm1QoBKOxC/Ig04Q8jFigRbIa8Anq5dY9DqKD8fQ/rx+emRXC6s75tEyOLRMK9lJdPeV1FknS77dVg3Z1SYfEBtHwgqkvhCCeVLMqq3/sVnM2qK1i1cUrlmUBWPNkJX/3oNryEO2zh5RQ4ejLJBZxbrCbnmMTASzSdtu0NYrzgMozgBlNVCIK9z6DQj2iBryMYBxCAR63lV4nQNeUc8pVeWz9FEHzq3sFfP+F2n3myYrS+6faX32+KV7/0Eh4LGp7a9fHQeZTLC/8zrtfbtwYL7YyIL7uY3JvrLVWd4rkfkgYlS9vVt/+9qh68tSi4iM6vwY88Gek3FecaMyhNIescweKPh5+YuSV8PhlGTr09W3C66ddyX5SYnqcqEI+8mCwz0V1/Nq4d3YQgS4mfW1h+kg8N3p7vPXj/wA4ZvgCmuJHs9A7LX9EcPYb0zyicUhIMXUlceIL4l8IqHITwx2r5LfnecXK+7I7xFGAo/MREBbWIaTfORB3gkX3THMShhFKjN1cWobq7SZCTLZA9Q/YxjbaxbWr81OZlu74LV2R+F/BRgA2E9xgXp3xzgAAAAASUVORK5CYII="

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(63);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Feedback() {
    return _react2.default.createElement(
      'div',
      { className: _Feedback2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Feedback2.default.container },
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://gitter.im/kriasoft/react-starter-kit'
          },
          'Ask a question'
        ),
        _react2.default.createElement(
          'span',
          { className: _Feedback2.default.spacer },
          '|'
        ),
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://github.com/kriasoft/react-starter-kit/issues/new'
          },
          'Report an issue'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(_Feedback2.default)(Feedback);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(64);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Feedback.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Feedback.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Feedback_root_2NP {\n  background: #f5f5f5;\n  color: #333;\n}\n\n.Feedback_container_2Ay {\n  margin: 0 auto;\n  padding: 20px 8px;\n  max-width: 1000px;\n  text-align: center;\n  font-size: 1.5em; /* ~24px */\n}\n\n.Feedback_link_17M,\n.Feedback_link_17M:active,\n.Feedback_link_17M:hover,\n.Feedback_link_17M:visited {\n  color: #333;\n  text-decoration: none;\n}\n\n.Feedback_link_17M:hover {\n  text-decoration: underline;\n}\n\n.Feedback_spacer_2n9 {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n", "", {"version":3,"sources":["/./components/Feedback/Feedback.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ADnBD;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;EACpC,mBAAmB;EACnB,iBAAiB,CAAC,WAAW;CAC9B;;AAED;;;;EAIE,YAAY;EACZ,sBAAsB;CACvB;;AAED;EACE,2BAA2B;CAC5B;;AAED;EACE,oBAAoB;EACpB,mBAAmB;CACpB","file":"Feedback.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../variables.css';\n\n.root {\n  background: #f5f5f5;\n  color: #333;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 8px;\n  max-width: var(--max-content-width);\n  text-align: center;\n  font-size: 1.5em; /* ~24px */\n}\n\n.link,\n.link:active,\n.link:hover,\n.link:visited {\n  color: #333;\n  text-decoration: none;\n}\n\n.link:hover {\n  text-decoration: underline;\n}\n\n.spacer {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Feedback_root_2NP",
  	"container": "Feedback_container_2Ay",
  	"link": "Feedback_link_17M",
  	"spacer": "Feedback_spacer_2n9"
  };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(66);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Link = __webpack_require__(41);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Footer() {
    return _react2.default.createElement(
      'div',
      { className: _Footer2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Footer2.default.container },
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.text },
          '© Your Company'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '·'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/' },
          'Home'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '·'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/privacy' },
          'Privacy'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '·'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/not-found' },
          'Not Found'
        )
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Footer2.default)(Footer);

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(67);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Footer.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Footer.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Footer_root_3Ji {\n  background: #333;\n  color: #fff;\n}\n\n.Footer_container_n1b {\n  margin: 0 auto;\n  padding: 20px 15px;\n  max-width: 1000px;\n  text-align: center;\n}\n\n.Footer_text_2mr {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.Footer_textMuted_9iT {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.Footer_spacer_3HO {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.Footer_text_2mr,\n.Footer_link_1sU {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n\n.Footer_link_1sU,\n.Footer_link_1sU:active,\n.Footer_link_1sU:visited {\n  color: rgba(255, 255, 255, 0.6);\n  text-decoration: none;\n}\n\n.Footer_link_1sU:hover {\n  color: rgba(255, 255, 255, 1);\n}\n", "", {"version":3,"sources":["/./components/Footer/Footer.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ADnBD;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,mBAAmB;EACnB,kBAAoC;EACpC,mBAAmB;CACpB;;AAED;EACE,gCAAgC;CACjC;;AAED;EAEE,gCAAgC;CACjC;;AAED;EACE,gCAAgC;CACjC;;AAED;;EAEE,iBAAiB;EACjB,eAAe;CAChB;;AAED;;;EAGE,gCAAgC;EAChC,sBAAsB;CACvB;;AAED;EACE,8BAA8B;CAC/B","file":"Footer.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../variables.css';\n\n.root {\n  background: #333;\n  color: #fff;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 15px;\n  max-width: var(--max-content-width);\n  text-align: center;\n}\n\n.text {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.textMuted {\n  composes: text;\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.spacer {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.text,\n.link {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(255, 255, 255, 0.6);\n  text-decoration: none;\n}\n\n.link:hover {\n  color: rgba(255, 255, 255, 1);\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Footer_root_3Ji",
  	"container": "Footer_container_n1b",
  	"text": "Footer_text_2mr",
  	"textMuted": "Footer_textMuted_9iT Footer_text_2mr",
  	"spacer": "Footer_spacer_3HO",
  	"link": "Footer_link_1sU"
  };

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(69);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _fetch = __webpack_require__(55);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_Home2.default, null));
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(70);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _reactIntl = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = 'React Starter Kit';
  
  function Home(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Home2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Home2.default.container },
        _react2.default.createElement(
          'h1',
          { className: _Home2.default.title },
          'React.js News'
        )
      )
    );
  }
  
  Home.propTypes = {};
  Home.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Home2.default)(Home);

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(71);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Home_root_2IM {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Home_container_2Ye {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n\n.Home_news_oTy {\n  padding: 0;\n}\n\n.Home_newsItem_3Ob {\n  list-style-type: none;\n  padding-bottom: 6px;\n}\n\n.Home_newsTitle_1yW {\n  font-size: 1.125em;\n}\n\n.Home_newsTitle_1yW,\n.Home_newsDesc_21L {\n  display: block;\n}\n\n.Home_publishedDate_2Mw {\n  font-size: 0.8em;\n  color: #777;\n}\n", "", {"version":3,"sources":["/./routes/home/Home.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ADnBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC;;AAED;EACE,WAAW;CACZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CACrB;;AAED;EACE,mBAAmB;CACpB;;AAED;;EAEE,eAAe;CAChB;;AAED;EACE,iBAAiB;EACjB,YAAY;CACb","file":"Home.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n\n.news {\n  padding: 0;\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n}\n\n.newsTitle {\n  font-size: 1.125em;\n}\n\n.newsTitle,\n.newsDesc {\n  display: block;\n}\n\n.publishedDate {\n  font-size: 0.8em;\n  color: #777;\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Home_root_2IM",
  	"container": "Home_container_2Ye",
  	"news": "Home_news_oTy",
  	"newsItem": "Home_newsItem_3Ob",
  	"newsTitle": "Home_newsTitle_1yW",
  	"newsDesc": "Home_newsDesc_21L",
  	"publishedDate": "Home_publishedDate_2Mw"
  };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(73);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/contact',
  
    action: function action() {
      return _react2.default.createElement(_Contact2.default, null);
    }
  };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(74);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Contact Us'; /**
                             * React Starter Kit (https://www.reactstarterkit.com/)
                             *
                             * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                             *
                             * This source code is licensed under the MIT license found in the
                             * LICENSE.txt file in the root directory of this source tree.
                             */
  
  function Contact(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Contact2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Contact2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          '...'
        )
      )
    );
  }
  
  Contact.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Contact2.default)(Contact);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(75);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Contact.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Contact.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Contact_root_1G9 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Contact_container_2Tn {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./routes/contact/Contact.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ADnBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC","file":"Contact.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Contact_root_1G9",
  	"container": "Contact_container_2Tn"
  };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(77);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/login',
  
    action: function action() {
      return _react2.default.createElement(_Login2.default, null);
    }
  };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(78);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Log In'; /**
                         * React Starter Kit (https://www.reactstarterkit.com/)
                         *
                         * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                         *
                         * This source code is licensed under the MIT license found in the
                         * LICENSE.txt file in the root directory of this source tree.
                         */
  
  function Login(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Login2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Login2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Login2.default.lead },
          'Log in with your username or company email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.facebook, href: '/login/facebook' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Facebook'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.google, href: '/login/google' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Google'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.twitter, href: '/login/twitter' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Twitter'
            )
          )
        ),
        _react2.default.createElement(
          'strong',
          { className: _Login2.default.lineThrough },
          'OR'
        ),
        _react2.default.createElement(
          'form',
          { method: 'post' },
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'usernameOrEmail' },
              'Username or email address:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'usernameOrEmail',
              type: 'text',
              name: 'usernameOrEmail',
              autoFocus: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'password' },
              'Password:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'password',
              type: 'password',
              name: 'password'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Login2.default.button, type: 'submit' },
              'Log in'
            )
          )
        )
      )
    );
  }
  
  Login.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Login2.default)(Login);

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(79);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n.Login_root_rQN {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.Login_container_2BV {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n.Login_lead_1mJ {\n  font-size: 1.25em;\n}\n.Login_formGroup_25T {\n  margin-bottom: 15px;\n}\n.Login_label_2G0 {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n.Login_input_1bT {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n.Login_input_1bT:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Login_button_11e {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.Login_button_11e:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n.Login_button_11e:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Login_facebook_2nZ {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n.Login_facebook_2nZ:hover {\n  background: #2d4373;\n}\n.Login_google_23H {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n.Login_google_23H:hover {\n  background: #c23321;\n}\n.Login_twitter_AJd {\n  border-color: #55acee;\n  background: #55acee;\n}\n.Login_twitter_AJd:hover {\n  background: #2795e9;\n}\n.Login_icon_34k {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n.Login_lineThrough_Upb {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n.Login_lineThrough_Upb::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n.Login_lineThrough_Upb::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./routes/login/Login.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACPH;;;;;;;GAOG;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Login.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 15px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Login_root_rQN",
  	"container": "Login_container_2BV",
  	"lead": "Login_lead_1mJ",
  	"formGroup": "Login_formGroup_25T",
  	"label": "Login_label_2G0",
  	"input": "Login_input_1bT",
  	"button": "Login_button_11e",
  	"facebook": "Login_facebook_2nZ Login_button_11e",
  	"google": "Login_google_23H Login_button_11e",
  	"twitter": "Login_twitter_AJd Login_button_11e",
  	"icon": "Login_icon_34k",
  	"lineThrough": "Login_lineThrough_Upb"
  };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Todo = __webpack_require__(81);
  
  var _Todo2 = _interopRequireDefault(_Todo);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/todo',
  
    action: function action() {
      return _react2.default.createElement(_Todo2.default, null);
    }
  };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _App = __webpack_require__(29);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _reactRedux = __webpack_require__(53);
  
  var _todo = __webpack_require__(82);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Todo List'; /**
                            * React Starter Kit (https://www.reactstarterkit.com/)
                            *
                            * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                            *
                            * This source code is licensed under the MIT license found in the
                            * LICENSE.txt file in the root directory of this source tree.
                            */
  
  var mapStateToProps = function mapStateToProps(state) {
      return {
          todos: state.todos
      };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
      return {
          addTodo: function addTodo() {
              dispatch((0, _todo.addTodo)());
          }
      };
  };
  
  var TodoContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Todo);
  
  function Todo(props, context) {
      context.setTitle(title);
      return _react2.default.createElement(
          'div',
          { className: _App2.default.root },
          _react2.default.createElement(
              'div',
              { className: _App2.default.container },
              _react2.default.createElement(
                  'h1',
                  null,
                  title
              ),
              _react2.default.createElement('p', { className: _App2.default.lead }),
              _react2.default.createElement(
                  'button',
                  { className: 'btn bg-slate-700 btn-block', onClick: function onClick() {
                          return props.addTodo();
                      } },
                  'Add todo'
              ),
              _react2.default.createElement(
                  'ul',
                  null,
                  props.todos.map(function (todo) {
                      return _react2.default.createElement(
                          'li',
                          { key: todo.id },
                          ' ',
                          todo.content,
                          ' '
                      );
                  })
              )
          )
      );
  }
  
  Todo.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_App2.default)(TodoContainer);

/***/ },
/* 82 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
  	value: true
  });
  var addTodo = exports.addTodo = function addTodo() {
  	return {
  		type: 'ADD_TODO'
  	};
  };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(84);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/register',
  
    action: function action() {
      return _react2.default.createElement(_Register2.default, null);
    }
  };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _App = __webpack_require__(29);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _reactRedux = __webpack_require__(53);
  
  var _register = __webpack_require__(85);
  
  var _Register = __webpack_require__(113);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = 'New User Registration';
  var mapStateToProps = function mapStateToProps(state) {
    return {
      register: state.register
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      postRegister: function postRegister(registrationData) {
        dispatch((0, _register.postRegister)(registrationData));
      }
    };
  };
  
  var RegisterContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Register);
  
  function Register(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _App2.default.root },
      _react2.default.createElement(
        'div',
        { className: _App2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _App2.default.lead },
          'Register with your username or company email address.'
        ),
        _react2.default.createElement(_Register2.default, { registerHandle: props.postRegister, customProps: 'a' })
      )
    );
  }
  
  Register.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_App2.default)(RegisterContainer);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
  	value: true
  });
  exports.postRegister = undefined;
  
  var _constants = __webpack_require__(60);
  
  var postRegister = exports.postRegister = function postRegister(registrationData) {
  	return {
  		type: _constants.REGISTER,
  		payload: {
  			registrationData: registrationData
  		}
  	};
  };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Content = __webpack_require__(87);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  var _fetch = __webpack_require__(55);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '*',
  
    action: function action(_ref) {
      var _this = this;
  
      var path = _ref.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var resp, _ref2, data;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _fetch2.default)('/graphql', {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({
                    query: '{content(path:"' + path + '"){path,title,content,component}}'
                  }),
                  credentials: 'include'
                });
  
              case 2:
                resp = _context.sent;
  
                if (!(resp.status !== 200)) {
                  _context.next = 5;
                  break;
                }
  
                throw new Error(resp.statusText);
  
              case 5:
                _context.next = 7;
                return resp.json();
  
              case 7:
                _ref2 = _context.sent;
                data = _ref2.data;
  
                if (!(!data || !data.content)) {
                  _context.next = 11;
                  break;
                }
  
                return _context.abrupt('return', undefined);
  
              case 11:
                return _context.abrupt('return', _react2.default.createElement(_Content2.default, data.content));
  
              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(23);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(24);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(25);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(26);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(27);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Content = __webpack_require__(88);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Content = function (_Component) {
    (0, _inherits3.default)(Content, _Component);
  
    function Content() {
      (0, _classCallCheck3.default)(this, Content);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Content).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Content, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.setTitle(this.props.title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _Content2.default.root },
          _react2.default.createElement(
            'div',
            { className: _Content2.default.container },
            this.props.path === '/' ? null : _react2.default.createElement(
              'h1',
              null,
              this.props.title
            ),
            _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
          )
        );
      }
    }]);
    return Content;
  }(_react.Component); /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  Content.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  Content.propTypes = {
    path: _react.PropTypes.string.isRequired,
    content: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.string
  };
  exports.default = (0, _withStyles2.default)(_Content2.default)(Content);

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(89);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Content.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Content.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Content_root_aWU {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Content_container_2OJ {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./routes/content/Content.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ADnBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC","file":"Content.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Content_root_aWU",
  	"container": "Content_container_2OJ"
  };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(22);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(91);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
  
    action: function action(_ref) {
      var render = _ref.render;
      var context = _ref.context;
      var error = _ref.error;
  
      return render(_react2.default.createElement(
        _App2.default,
        { context: context, error: error },
        _react2.default.createElement(_ErrorPage2.default, { error: error })
      ), error.status || 500);
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(38);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(92);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function ErrorPage(_ref, context) {
    var error = _ref.error;
  
    var title = 'Error';
    var content = 'Sorry, a critical error occurred on this page.';
    var errorMessage = null;
  
    if (error.status === 404) {
      title = 'Page Not Found';
      content = 'Sorry, the page you were trying to view does not exist.';
    } else if (true) {
      errorMessage = _react2.default.createElement(
        'pre',
        null,
        error.stack
      );
    }
  
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        title
      ),
      _react2.default.createElement(
        'p',
        null,
        content
      ),
      errorMessage
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  ErrorPage.propTypes = { error: _react.PropTypes.object.isRequired };
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(93);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  /* stylelint-disable */\n  margin: 2em auto;\n  /* stylelint-enable */\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n", "", {"version":3,"sources":["/./routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,uBAAuB;EACvB,iBAAiB;EACjB,sBAAsB;CACvB;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EAAjB,iBAAiB;CAClB;;AAED;;EAEE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;;CAEF","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  /* stylelint-disable */\n  margin: 2em auto;\n  /* stylelint-enable */\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 94 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = configureStore;
  
  var _redux = __webpack_require__(96);
  
  var _reduxThunk = __webpack_require__(97);
  
  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
  
  var _reducers = __webpack_require__(98);
  
  var _reducers2 = _interopRequireDefault(_reducers);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var middleware = [_reduxThunk2.default];
  
  var enhancer = void 0;
  
  if (false) {
    var createLogger = require('redux-logger');
    var logger = createLogger({
      collapsed: true
    });
    middleware.push(logger);
  
    enhancer = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware),
  
    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    window.devToolsExtension ? window.devToolsExtension() : function (f) {
      return f;
    });
  } else {
    enhancer = _redux.applyMiddleware.apply(undefined, middleware);
  }
  
  function configureStore(initialState) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    var store = (0, _redux.createStore)(_reducers2.default, initialState, enhancer);
  
    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (false) {
      module.hot.accept('../reducers', function () {
        return store.replaceReducer(require('../reducers').default);
      });
    }
  
    return store;
  }

/***/ },
/* 96 */
/***/ function(module, exports) {

  module.exports = require("redux");

/***/ },
/* 97 */
/***/ function(module, exports) {

  module.exports = require("redux-thunk");

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _redux = __webpack_require__(96);
  
  var _reduxForm = __webpack_require__(112);
  
  var _runtime = __webpack_require__(99);
  
  var _runtime2 = _interopRequireDefault(_runtime);
  
  var _intl = __webpack_require__(101);
  
  var _intl2 = _interopRequireDefault(_intl);
  
  var _register = __webpack_require__(102);
  
  var _register2 = _interopRequireDefault(_register);
  
  var _todos = __webpack_require__(103);
  
  var _todos2 = _interopRequireDefault(_todos);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = (0, _redux.combineReducers)({
    runtime: _runtime2.default,
    intl: _intl2.default,
    register: _register2.default,
    todos: _todos2.default,
    form: _reduxForm.reducer
  });

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _defineProperty2 = __webpack_require__(100);
  
  var _defineProperty3 = _interopRequireDefault(_defineProperty2);
  
  var _extends3 = __webpack_require__(42);
  
  var _extends4 = _interopRequireDefault(_extends3);
  
  exports.default = runtime;
  
  var _constants = __webpack_require__(60);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function runtime() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.SET_RUNTIME_VARIABLE:
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, action.payload.name, action.payload.value));
      default:
        return state;
    }
  }

/***/ },
/* 100 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _defineProperty2 = __webpack_require__(100);
  
  var _defineProperty3 = _interopRequireDefault(_defineProperty2);
  
  var _extends3 = __webpack_require__(42);
  
  var _extends4 = _interopRequireDefault(_extends3);
  
  exports.default = intl;
  
  var _constants = __webpack_require__(60);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function intl() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var action = arguments[1];
  
    if (state === null) {
      return {
        initialNow: Date.now()
      };
    }
  
    switch (action.type) {
      case _constants.SET_LOCALE_START:
        {
          var locale = state[action.payload.locale] ? action.payload.locale : state.locale;
          return (0, _extends4.default)({}, state, {
            locale: locale,
            newLocale: action.payload.locale
          });
        }
  
      case _constants.SET_LOCALE_SUCCESS:
        {
          return (0, _extends4.default)({}, state, {
            locale: action.payload.locale,
            newLocale: null,
            messages: (0, _extends4.default)({}, state.messages, (0, _defineProperty3.default)({}, action.payload.locale, action.payload.messages))
          });
        }
  
      case _constants.SET_LOCALE_ERROR:
        {
          return (0, _extends4.default)({}, state, {
            newLocale: null
          });
        }
  
      default:
        {
          return state;
        }
    }
  }

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
  	value: true
  });
  exports.default = register;
  
  var _constants = __webpack_require__(60);
  
  function register() {
  	var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  	var action = arguments[1];
  
  	switch (action.type) {
  		case _constants.REGISTER:
  			state = action.payload.registrationData;
  			return state;
  		default:
  			return state;
  	}
  }

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
  	value: true
  });
  
  var _toConsumableArray2 = __webpack_require__(104);
  
  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var todos = function todos() {
  	var state = arguments.length <= 0 || arguments[0] === undefined ? [{ id: 1, content: 'Todo 1' }, { id: 2, content: 'Todo 2' }] : arguments[0];
  	var action = arguments[1];
  
  	switch (action.type) {
  		case 'ADD_TODO':
  			return [{ id: 3, content: 'Todo 3' }].concat((0, _toConsumableArray3.default)(state));
  		default:
  			return state;
  	}
  };
  exports.default = todos;

/***/ },
/* 104 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setRuntimeVariable = setRuntimeVariable;
  
  var _constants = __webpack_require__(60);
  
  function setRuntimeVariable(_ref) {
    var name = _ref.name;
    var value = _ref.value;
  
    return {
      type: _constants.SET_RUNTIME_VARIABLE,
      payload: {
        name: name,
        value: value
      }
    };
  }

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRedux = __webpack_require__(53);
  
  var _IntlProvider = __webpack_require__(107);
  
  var _IntlProvider2 = _interopRequireDefault(_IntlProvider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Provide(_ref) {
    var store = _ref.store;
    var children = _ref.children;
  
    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _IntlProvider2.default,
        null,
        children
      )
    );
  }
  
  Provide.propTypes = {
    store: _react.PropTypes.shape({
      subscribe: _react.PropTypes.func.isRequired,
      dispatch: _react.PropTypes.func.isRequired,
      getState: _react.PropTypes.func.isRequired
    }).isRequired,
    children: _react.PropTypes.element.isRequired
  };
  
  exports.default = Provide;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(42);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRedux = __webpack_require__(53);
  
  var _reactIntl = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function ProvideIntl(_ref) {
    var intl = _ref.intl;
    var children = _ref.children;
  
    return _react2.default.createElement(
      _reactIntl.IntlProvider,
      (0, _extends3.default)({}, intl, {
        messages: intl.messages[intl.locale]
      }),
      children
    );
  }
  
  ProvideIntl.propTypes = (0, _extends3.default)({}, _reactIntl.IntlProvider.propTypes, {
    children: _react.PropTypes.element.isRequired
  });
  
  exports.default = (0, _reactRedux.connect)(function (state) {
    return {
      intl: state.intl
    };
  })(ProvideIntl);

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(109);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, css, description, entry, lang, state, title, trackingId) {
  jade_debug.unshift(new jade.DebugItem( 0, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<html" + (jade.attr("lang", lang, true, true)) + " class=\"no-js\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<meta name=\"description\"" + (jade.attr("description", description, true, true)) + ">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 8, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 9, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 10, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 11, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 12, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<link rel=\"stylesheet\" href=\"/assets/css/icons/icomoon/styles.css\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 13, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<link rel=\"stylesheet\" href=\"/assets/css/bootstrap.css\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 14, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<link rel=\"stylesheet\" href=\"/assets/css/core.css\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 15, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<link rel=\"stylesheet\" href=\"/assets/css/colors.css\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 16, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<link rel=\"stylesheet\" href=\"/assets/css/components.css\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 17, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 18, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 19, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</div>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 20, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<script id=\"source\"" + (jade.attr("src", entry, true, true)) + (jade.attr("data-initial-state", state, true, true)) + ">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 21, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<script src=\"/assets/js/core/libraries/jquery.min.js\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 22, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<script src=\"/assets/js/core/libraries/bootstrap.min.js\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 23, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<script src=\"/assets/js/core/app.js\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 24, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<script>");
  jade_debug.unshift(new jade.DebugItem( 26, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 26, jade_debug[0].filename ));
  buf.push("window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 26, jade_debug[0].filename ));
  buf.push("ga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 27, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  if ( trackingId)
  {
  jade_debug.unshift(new jade.DebugItem( 28, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 28, "/Users/lynn/Work/BigBoom/client/src/views/index.jade" ));
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.shift();
  }
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"lang" in locals_for_with?locals_for_with.lang:typeof lang!=="undefined"?lang:undefined,"state" in locals_for_with?locals_for_with.state:typeof state!=="undefined"?state:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(class=\"no-js\", lang=lang)\n  head\n    meta(charset=\"utf-8\")\n    meta(http-equiv=\"x-ua-compatible\", content=\"ie=edge\")\n    title= title\n    meta(name=\"description\", description=description)\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    link(rel=\"apple-touch-icon\", href=\"apple-touch-icon.png\")\n    link(rel=\"apple-touch-icon\", href=\"apple-touch-icon.png\")\n    link(rel='stylesheet', href='https://fonts.googleapis.com/css?family=Roboto')\n    link(rel='stylesheet', href='/assets/css/icons/icomoon/styles.css')\n    link(rel='stylesheet', href='/assets/css/bootstrap.css')\n    link(rel='stylesheet', href='/assets/css/core.css')\n    link(rel='stylesheet', href='/assets/css/colors.css')\n    link(rel='stylesheet', href='/assets/css/components.css')\n    style#css!= css\n  body\n    #app!= body\n    script#source(src=entry, data-initial-state=state)\n    script(src='/assets/js/core/libraries/jquery.min.js')\n    script(src='/assets/js/core/libraries/bootstrap.min.js')\n    script(src='/assets/js/core/app.js')\n    script.\n      window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\n      ga('create','#{trackingId}','auto');ga('send','pageview')\n    if trackingId\n      script(src=\"https://www.google-analytics.com/analytics.js\", async=true, defer=true)\n");
  }
  }

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */
  
  exports.merge = function merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = merge(attrs, a[i]);
      }
      return attrs;
    }
    var ac = a['class'];
    var bc = b['class'];
  
    if (ac || bc) {
      ac = ac || [];
      bc = bc || [];
      if (!Array.isArray(ac)) ac = [ac];
      if (!Array.isArray(bc)) bc = [bc];
      a['class'] = ac.concat(bc).filter(nulls);
    }
  
    for (var key in b) {
      if (key != 'class') {
        a[key] = b[key];
      }
    }
  
    return a;
  };
  
  /**
   * Filter null `val`s.
   *
   * @param {*} val
   * @return {Boolean}
   * @api private
   */
  
  function nulls(val) {
    return val != null && val !== '';
  }
  
  /**
   * join array as classes.
   *
   * @param {*} val
   * @return {String}
   */
  exports.joinClasses = joinClasses;
  function joinClasses(val) {
    return (Array.isArray(val) ? val.map(joinClasses) :
      (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
      [val]).filter(nulls).join(' ');
  }
  
  /**
   * Render the given classes.
   *
   * @param {Array} classes
   * @param {Array.<Boolean>} escaped
   * @return {String}
   */
  exports.cls = function cls(classes, escaped) {
    var buf = [];
    for (var i = 0; i < classes.length; i++) {
      if (escaped && escaped[i]) {
        buf.push(exports.escape(joinClasses([classes[i]])));
      } else {
        buf.push(joinClasses(classes[i]));
      }
    }
    var text = joinClasses(buf);
    if (text.length) {
      return ' class="' + text + '"';
    } else {
      return '';
    }
  };
  
  
  exports.style = function (val) {
    if (val && typeof val === 'object') {
      return Object.keys(val).map(function (style) {
        return style + ':' + val[style];
      }).join(';');
    } else {
      return val;
    }
  };
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = function attr(key, val, escaped, terse) {
    if (key === 'style') {
      val = exports.style(val);
    }
    if ('boolean' == typeof val || null == val) {
      if (val) {
        return ' ' + (terse ? key : key + '="' + key + '"');
      } else {
        return '';
      }
    } else if (0 == key.indexOf('data') && 'string' != typeof val) {
      if (JSON.stringify(val).indexOf('&') !== -1) {
        console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                     'will be escaped to `&amp;`');
      };
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will eliminate the double quotes around dates in ' +
                     'ISO form after 2.0.0');
      }
      return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
    } else if (escaped) {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + exports.escape(val) + '"';
    } else {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + val + '"';
    }
  };
  
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} escaped
   * @return {String}
   */
  exports.attrs = function attrs(obj, terse){
    var buf = [];
  
    var keys = Object.keys(obj);
  
    if (keys.length) {
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
          , val = obj[key];
  
        if ('class' == key) {
          if (val = joinClasses(val)) {
            buf.push(' ' + key + '="' + val + '"');
          }
        } else {
          buf.push(exports.attr(key, val, false, terse));
        }
      }
    }
  
    return buf.join('');
  };
  
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */
  
  var jade_encode_html_rules = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };
  var jade_match_html = /[&<>"]/g;
  
  function jade_encode_char(c) {
    return jade_encode_html_rules[c] || c;
  }
  
  exports.escape = jade_escape;
  function jade_escape(html){
    var result = String(html).replace(jade_match_html, jade_encode_char);
    if (result === '' + html) return html;
    else return result;
  };
  
  /**
   * Re-throw the given `err` in context to the
   * the jade in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */
  
  exports.rethrow = function rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(110).readFileSync(filename, 'utf8')
    } catch (ex) {
      rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Jade') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  };
  
  exports.DebugItem = function DebugItem(lineno, filename) {
    this.lineno = lineno;
    this.filename = filename;
  }


/***/ },
/* 110 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(109);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  jade_debug.unshift(new jade.DebugItem( 0, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<html lang=\"en\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<title>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<style>");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("* {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  line-height: 1.2;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin: 0;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("html {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  color: #888;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  display: table;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  font-family: sans-serif;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  height: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  text-align: center;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  width: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("body {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  display: table-cell;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  vertical-align: middle;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin: 2em auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  color: #555;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  font-size: 2em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  font-weight: 400;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin: 0 auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  width: 280px;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("pre {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  text-align: left;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin-top: 2rem;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("@media only screen and (max-width: 280px) {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  body, p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("    width: 95%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("    font-size: 1.5em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("    margin: 0 0 0.3em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 57, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 58, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<h1>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</h1>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 59, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<p>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 59, jade_debug[0].filename ));
  buf.push("Sorry, something went wrong.");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</p>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 60, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</pre>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 61, "/Users/lynn/Work/BigBoom/client/src/views/error.jade" ));
  buf.push("<!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(lang=\"en\")\n  head\n    meta(charset=\"utf-8\")\n    title Internal Server Error\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    style.\n      * {\n        line-height: 1.2;\n        margin: 0;\n      }\n\n      html {\n        color: #888;\n        display: table;\n        font-family: sans-serif;\n        height: 100%;\n        text-align: center;\n        width: 100%;\n      }\n\n      body {\n        display: table-cell;\n        vertical-align: middle;\n        margin: 2em auto;\n      }\n\n      h1 {\n        color: #555;\n        font-size: 2em;\n        font-weight: 400;\n      }\n\n      p {\n        margin: 0 auto;\n        width: 280px;\n      }\n\n      pre {\n        text-align: left;\n        margin-top: 2rem;\n      }\n\n      @media only screen and (max-width: 280px) {\n\n        body, p {\n          width: 95%;\n        }\n\n        h1 {\n          font-size: 1.5em;\n          margin: 0 0 0.3em;\n        }\n\n      }\n\n  body\n    h1 Internal Server Error\n    p Sorry, something went wrong.\n    pre= stack\n// IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx\n");
  }
  }

/***/ },
/* 112 */
/***/ function(module, exports) {

  module.exports = require("redux-form");

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(42);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(23);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(24);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(25);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(26);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(27);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(17);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reduxForm = __webpack_require__(112);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var RegisterFormComponent = function (_React$Component) {
    (0, _inherits3.default)(RegisterFormComponent, _React$Component);
  
    function RegisterFormComponent() {
      (0, _classCallCheck3.default)(this, RegisterFormComponent);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RegisterFormComponent).apply(this, arguments));
    }
  
    (0, _createClass3.default)(RegisterFormComponent, [{
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        var _props = this.props;
        var _props$fields = _props.fields;
        var firstname = _props$fields.firstname;
        var lastname = _props$fields.lastname;
        var email = _props$fields.email;
        var password = _props$fields.password;
        var handleSubmit = _props.handleSubmit;
        var registerHandle = _props.registerHandle;
        var submitting = _props.submitting;
  
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'form',
            { onSubmit: handleSubmit(function (data) {
                _this2.props.registerHandle(data);
              }) },
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'usernameOrEmail' },
                'First name:'
              ),
              _react2.default.createElement('input', (0, _extends3.default)({
                className: 'form-control',
                id: 'fistname',
                type: 'text',
                name: 'fistname',
                autoFocus: true
              }, firstname))
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'usernameOrEmail' },
                'Last name:'
              ),
              _react2.default.createElement('input', (0, _extends3.default)({
                className: 'form-control',
                id: 'lastname',
                type: 'text',
                name: 'lastname'
              }, lastname))
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'usernameOrEmail' },
                'Username or email address:'
              ),
              _react2.default.createElement('input', (0, _extends3.default)({
                className: 'form-control',
                id: 'email',
                type: 'text',
                name: 'email'
              }, email))
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'password' },
                'Password:'
              ),
              _react2.default.createElement('input', (0, _extends3.default)({
                className: 'form-control',
                id: 'password',
                type: 'password',
                name: 'password'
              }, password))
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'button',
                { className: 'btn bg-slate-700 btn-block', type: 'submit', disabled: submitting },
                'Register'
              )
            )
          )
        );
      }
    }]);
    return RegisterFormComponent;
  }(_react2.default.Component);
  
  RegisterFormComponent = (0, _reduxForm.reduxForm)({ // <----- THIS IS THE IMPORTANT PART!
    form: 'registerForm', // a unique name for this form
    fields: ['firstname', 'lastname', 'email', 'password'] // all the fields in your form
  })(RegisterFormComponent);
  exports.default = RegisterFormComponent;

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map