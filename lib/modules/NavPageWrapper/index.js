'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _velocityAnimate = require('velocity-animate');

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

var _fabLogoWht = require('../../assets/images/fab-logo-wht.png');

var _fabLogoWht2 = _interopRequireDefault(_fabLogoWht);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Images


var NavPageWrapper = function (_React$Component) {
  _inherits(NavPageWrapper, _React$Component);

  function NavPageWrapper() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, NavPageWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(NavPageWrapper)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      onHome: true
    }, _this.handleClick = function () {
      var _this2;

      return (_this2 = _this).__handleClick__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _this.renderLink = function () {
      var _this3;

      return (_this3 = _this).__renderLink__REACT_HOT_LOADER__.apply(_this3, arguments);
    }, _this.dressNavPosition = function () {
      var _this4;

      return (_this4 = _this).__dressNavPosition__REACT_HOT_LOADER__.apply(_this4, arguments);
    }, _this.clickSlideNavtoPageNav = function () {
      var _this5;

      return (_this5 = _this).__clickSlideNavtoPageNav__REACT_HOT_LOADER__.apply(_this5, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NavPageWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //preLoad background images
      var imagePreloadSpans = document.querySelectorAll('.link-item');
      var tempRoot = document.querySelector('#root');
      var imagePreload = void 0;

      imagePreloadSpans.forEach(function (span) {
        var elem = document.createElement('div');
        elem.setAttribute('height', '1');
        elem.setAttribute('width', '1');
        elem.setAttribute('posittion', 'absolute');
        imagePreload = span.classList.value.replace('link-item home--block__', '');
        elem.className = 'home-' + imagePreload;
        tempRoot.appendChild(elem);
      });
    }
  }, {
    key: '__handleClick__REACT_HOT_LOADER__',
    value: function __handleClick__REACT_HOT_LOADER__(e) {
      var whiteSlider = document.getElementsByClassName('home--block__slider')[0];
      var imageBackground = document.getElementsByClassName('home')[0];
      var fullNav = document.getElementsByClassName('home--block--wrapper')[0];
      var pageNav = document.getElementsByClassName('home--block--offHome')[0];

      var linkItems = document.getElementsByClassName('link-item');
      var Fabrice = document.getElementsByClassName('home--block__name')[0];
      var fadeItems = document.querySelectorAll('.home--block--wrapper span');

      var _loop = function _loop(x) {
        fadeItems[x].style.opacity = '0';
        setTimeout(function () {
          fadeItems[x].style.display = 'none';
        }, 2000);
      };

      for (var x = 0; x < fadeItems.length; x++) {
        _loop(x);
      };
      debugger;
      Fabrice.style.display = 'block';
      Fabrice.style.Velocity(Fabrice, {
        translateX: '20px'
      }, [0.82, 0, 0.44, 0.93]);
      // debugger;

      // Velocity(fullNav, {
      //   translateX: '-1500px',
      // }, [0.82, 0, 0.44, 0.93]);
      this.setState({ onHome: false });
      var screenW = window.innerWidth;
      //FIXME: Hack for full slide off screen
      if (screenW < 1200) {
        screenW = 1200;
      }
      // debugger;
      (0, _velocityAnimate2.default)(whiteSlider, { width: '200px' });
      // Once i figure out exact photos i will use, include their dimension on the image itself
      // pull image name, regex for size and follow this
      // http://stackoverflow.com/questions/21127479/getting-the-height-of-a-background-image-resized-using-background-size-contain
      (0, _velocityAnimate2.default)(imageBackground, { backgroundPositionX: -screenW }, [0.82, 0, 0.44, 0.93]);
      // Velocity(fullNav,{
      //   // translateX:'-1500',
      //   translateX:'-20',
      // }, [0.82, 0, 0.44, 0.93]);
      (0, _velocityAnimate2.default)(pageNav, {
        opacity: '1'
      });
    }
  }, {
    key: 'revealBackgroundOnHover',
    value: function revealBackgroundOnHover(e) {
      var class_name = e.target.id;
      var home = document.querySelector('.home');

      // Assign classname to the parent tag based off of what link is hovered
      // class determines which background image to display
      switch (class_name) {
        case 'home--block__dev':
          home.className = 'home home-slide home-dev';
          break;
        case 'home--block__photo':
          home.className = 'home home-slide home-photo';
          break;
        case 'home--block__name':
          home.className = 'home home-slide home-name';
          break;
        case 'home--block__blog':
          home.className = 'home home-slide home-blog';
          break;
        case 'home--block__twitter':
          home.className = 'home home-slide home-twitter';
          break;
        default:
          break;
      };

      //assign sliding action css class to parent wrapper container
      var homePage = document.getElementsByClassName('home--block__slider')[0];
      homePage.className += ' home--block__slider--slide';
    }
  }, {
    key: 'hideBackgroundOnOff',
    value: function hideBackgroundOnOff() {
      var homePage = document.getElementsByClassName('home--block__slider')[0];
      var home = document.getElementsByClassName('home')[0];
      home.classList.remove('home-slide');
      homePage.classList.remove('home--block__slider--slide');
    }

    // render <Link /> or <a /> tags attached with needed event functions

  }, {
    key: '__renderLink__REACT_HOT_LOADER__',
    value: function __renderLink__REACT_HOT_LOADER__(string, dest, id) {
      var linkClass = 'link-item ' + id;
      var renderComponent = /\b(http|https|mailto)/.test(dest) ? _react2.default.createElement(
        'a',
        {
          href: dest,
          target: '_blank',
          id: id,
          className: linkClass,
          onMouseOver: this.revealBackgroundOnHover,
          onMouseLeave: this.hideBackgroundOnOff,
          onClick: this.clickSlideNavtoPageNav },
        ' ',
        string
      ) : _react2.default.createElement(
        _reactRouterDom.Link,
        {
          to: dest,
          id: id,
          className: linkClass,
          onMouseOver: this.revealBackgroundOnHover,
          onMouseLeave: this.hideBackgroundOnOff,
          onClick: this.clickSlideNavtoPageNav },
        ' ',
        string
      );

      return renderComponent;
    }
  }, {
    key: '__dressNavPosition__REACT_HOT_LOADER__',
    value: function __dressNavPosition__REACT_HOT_LOADER__(navLinkItems) {
      // Transform menu itmes
      var navLines = document.querySelectorAll('.home--block__line span');
      var homeBlockLine = document.querySelector('.home--block__line');
      var homeBlockWrapperHeight = document.querySelector('.home--block--wrapper');
      var keepHBWHeight = homeBlockWrapperHeight.offsetHeight + 'px';

      var containerHeight = navLinkItems[0].parentElement.parentElement.offsetHeight + 'px';
      navLinkItems[0].parentElement.parentElement.style.height = containerHeight;

      // convert link text to stand alone in the current posiotion it is in
      for (var index = navLines.length - 1; index >= 0; index--) {
        var top = navLinkItems[index].offsetTop + 2 + 'px'; //
        var left = navLinkItems[index].offsetLeft + 'px';

        // dress new nav text
        navLinkItems[index].style.left = left;
        navLinkItems[index].style.top = top;
        navLinkItems[index].style.position = 'absolute';
        navLinkItems[index].style.color = '#141414';
        navLinkItems[index].style.fontSize = '22px';
        navLinkItems[index].style.textDecoration = 'none';
        homeBlockLine.style.display = 'block';
        homeBlockWrapperHeight.style.height = keepHBWHeight;
      }

      // begin hiding unimporntant text, once it dissapears then we'll remove it from DOM
      navLines.forEach(function (span) {
        span.id = 'dissapear';
        span.style.opacity = '0'; //Hide unimportant text
      });

      var spanHide = document.querySelectorAll('#dissapear');
      spanHide.forEach(function (span) {
        span.style.display = 'none';
      });
    }
  }, {
    key: '__clickSlideNavtoPageNav__REACT_HOT_LOADER__',
    value: function __clickSlideNavtoPageNav__REACT_HOT_LOADER__(e) {
      this.setState({ onHome: false });

      var navLinkItems = document.querySelectorAll('.home--block__line .link-item');
      var homeBlockLine = document.querySelectorAll('.home--block__line');
      homeBlockLine.forEach(function (n) {
        n.style.backgroundColor = 'rgba(0,0,0,0)';
      });
      this.dressNavPosition(navLinkItems);
      navLinkItems.forEach(function (nav, index) {
        var sideTopDist = 35 * (index + 1) + 100 + 'px';
        nav.style.left = '20px';
        nav.style.top = sideTopDist;
      });

      // Transform BG Slider
      var imageBackground = document.querySelector('.home');
      var whiteSlider = document.querySelector('.home--block__slider');
      var screenW = window.innerWidth;

      //FIXME: Hack for full slide off screen
      if (screenW < 1200) {
        screenW = 1200;
      }
      (0, _velocityAnimate2.default)(whiteSlider, { width: '200px' });
      // Once i figure out exact photos i will use, include their dimension on the image itself
      // pull image name, regex for size and follow this
      // http://stackoverflow.com/questions/21127479/getting-the-height-of-a-background-image-resized-using-background-size-contain
      (0, _velocityAnimate2.default)(imageBackground, { backgroundPositionX: -screenW }, [0.82, 0, 0.44, 0.93]);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'home nav-page' },
        _react2.default.createElement(
          'div',
          { className: 'home--left nav-page--left-border' },
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'home--block nav-page__main' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/' },
            _react2.default.createElement('img', { src: _fabLogoWht2.default, className: 'logo' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'home--block--wrapper nav-page__main-wrapper' },
            _react2.default.createElement(
              'h1',
              { className: 'home--block__line' },
              _react2.default.createElement(
                'span',
                null,
                'Hello, I\'m '
              ),
              this.renderLink('Fabrice.', '/About', 'home--block__name')
            ),
            _react2.default.createElement(
              'h1',
              { className: 'home--block__line' },
              _react2.default.createElement(
                'span',
                null,
                'I\'m A '
              ),
              this.renderLink('Developer', '/Work', 'home--block__dev'),
              _react2.default.createElement(
                'span',
                null,
                ' & '
              ),
              this.renderLink('Photographer.', '/Photography', 'home--block__photo')
            ),
            _react2.default.createElement(
              'h1',
              { className: 'home--block__line' },
              _react2.default.createElement(
                'span',
                null,
                'Read my '
              ),
              this.renderLink('Thoughts', '/Blog', 'home--block__blog'),
              _react2.default.createElement(
                'span',
                null,
                ' & '
              ),
              this.renderLink('Tweets.', 'https://twitter.com/fabriceBT', 'home--block__twitter')
            ),
            _react2.default.createElement(
              'h1',
              { className: 'home--block__line' },
              _react2.default.createElement(
                'span',
                null,
                'Lets Create, '
              ),
              this.renderLink('developer@fabricebt.com', 'mailto:developer@fabricebt.com', 'home--block__email')
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'home--block--offHome' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/About' },
              'About'
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/Work' },
              'Developer'
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/Photography' },
              'Photographer'
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/Blog' },
              'Blog'
            ),
            _react2.default.createElement(
              'a',
              { href: 'mailto:developer@fabricebt.com', className: 'link-item home--block--mobile__email' },
              'Email'
            )
          ),
          _react2.default.createElement('div', { className: 'home--block__slider' })
        )
      );
    }
  }]);

  return NavPageWrapper;
}(_react2.default.Component);

var _default = NavPageWrapper;
exports.default = _default;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NavPageWrapper, 'NavPageWrapper', 'src/modules/NavPageWrapper/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/modules/NavPageWrapper/index.js');
}();

;