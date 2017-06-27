'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _NavPageWrapper = require('./modules/NavPageWrapper');

var _NavPageWrapper2 = _interopRequireDefault(_NavPageWrapper);

var _About = require('./pages/About');

var _About2 = _interopRequireDefault(_About);

var _Work = require('./pages/Work');

var _Work2 = _interopRequireDefault(_Work);

var _Photography = require('./pages/Photography');

var _Photography2 = _interopRequireDefault(_Photography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
        'div',
        { className: 'main' },
        _react2.default.createElement(_NavPageWrapper2.default, null),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/About', component: _About2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/Work', component: _Work2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/Photography', component: _Photography2.default })
    )
);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Router.js');
}();

;