webpackJsonp([0],{

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var USER_LOGIN = exports.USER_LOGIN = "user_login";

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

module.exports = isArguments;

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(544);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(34);

var _Sidemenu = __webpack_require__(207);

var _Sidemenu2 = _interopRequireDefault(_Sidemenu);

var _Header = __webpack_require__(205);

var _Header2 = _interopRequireDefault(_Header);

var _Albums = __webpack_require__(203);

var _Albums2 = _interopRequireDefault(_Albums);

var _Photos = __webpack_require__(206);

var _Photos2 = _interopRequireDefault(_Photos);

var _albums = __webpack_require__(208);

var _albums2 = _interopRequireDefault(_albums);

var _photos = __webpack_require__(209);

var _photos2 = _interopRequireDefault(_photos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_Component) {
    _inherits(Gallery, _Component);

    function Gallery() {
        _classCallCheck(this, Gallery);

        return _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).apply(this, arguments));
    }

    _createClass(Gallery, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "gallery", className: "container" },
                _react2.default.createElement(_Header2.default, null),
                _react2.default.createElement(_reactRouterDom.Route, { path: "/gallery/albums", render: function render() {
                        return _react2.default.createElement(_Albums2.default, { albums: _albums2.default });
                    } }),
                _react2.default.createElement(_reactRouterDom.Route, { path: "/gallery/photos", render: function render() {
                        return _react2.default.createElement(_Photos2.default, { photos: _photos2.default });
                    } })
            );
        }
    }]);

    return Gallery;
}(_react.Component);

exports.default = Gallery;

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(64);

var _redux = __webpack_require__(20);

var _user_login = __webpack_require__(201);

var _reactRedux = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogIn = function (_Component) {
    _inherits(LogIn, _Component);

    function LogIn(props) {
        _classCallCheck(this, LogIn);

        var _this = _possibleConstructorReturn(this, (LogIn.__proto__ || Object.getPrototypeOf(LogIn)).call(this, props));

        _this.onSubmit = _this.onSubmit.bind(_this);
        return _this;
    }

    _createClass(LogIn, [{
        key: "renderField",
        value: function renderField(field) {
            return _react2.default.createElement("input", _extends({ className: field.className, type: field.type, placeholder: field.placeholder, "aria-label": field.ariaLabel }, field.input));
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(data) {
            var _this2 = this;

            this.props.userLogin(data, function (_) {
                _this2.props.history.push('/gallery/albums');
            });
        }
    }, {
        key: "render",
        value: function render() {
            var handleSubmit = this.props.handleSubmit;


            return _react2.default.createElement(
                "div",
                { id: "sign-wrapper" },
                _react2.default.createElement(
                    "form",
                    { id: "sign", onSubmit: handleSubmit(this.onSubmit) },
                    _react2.default.createElement("img", { src: "img/logo.svg", width: "150", alt: "Logo Periscope" }),
                    _react2.default.createElement(
                        "h1",
                        { className: "margin-md-bottom margin-sm-top darkBlueGrey" },
                        "Periscope"
                    ),
                    _react2.default.createElement(_reduxForm.Field, { className: "margin-md-bottom", name: "username", type: "text", placeholder: "Login", ariaLabel: "username", component: this.renderField }),
                    _react2.default.createElement(_reduxForm.Field, { className: "margin-lg-bottom", name: "password", type: "password", placeholder: "Password", ariaLabel: "password", component: this.renderField }),
                    _react2.default.createElement(
                        "button",
                        { className: "button-anim", type: "submit" },
                        "Sign in"
                    )
                ),
                _react2.default.createElement(
                    "p",
                    { className: "mediumGrey" },
                    "I forgot my password"
                )
            );
        }
    }]);

    return LogIn;
}(_react.Component);

function validate(values) {
    var errors = {};
    if (!values.username) {
        errors.username = "No valid login";
    }
    if (!values.password) {
        errors.password = "No valid password";
    }
    return errors;
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)({ userLogin: _user_login.userLogin }, dispatch);
}

exports.default = (0, _reduxForm.reduxForm)({
    validate: validate,
    form: 'LoginForm'
})((0, _reactRedux.connect)(null, mapDispatchToProps)(LogIn));

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(20);

var _reduxForm = __webpack_require__(64);

var _reducer_user = __webpack_require__(211);

var _reducer_user2 = _interopRequireDefault(_reducer_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    user: _reducer_user2.default,
    form: _reduxForm.reducer
});

exports.default = rootReducer;

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

exports['default'] = promiseMiddleware;

var _fluxStandardAction = __webpack_require__(525);

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function promiseMiddleware(_ref) {
  var dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      if (!_fluxStandardAction.isFSA(action)) {
        return isPromise(action) ? action.then(dispatch) : next(action);
      }

      return isPromise(action.payload) ? action.payload.then(function (result) {
        return dispatch(_extends({}, action, { payload: result }));
      }, function (error) {
        return dispatch(_extends({}, action, { payload: error, error: true }));
      }) : next(action);
    };
  };
}

module.exports = exports['default'];

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(545);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(194)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/index.js!./styles.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/index.js!./styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(546);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(194)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../css-loader/index.js!./normalize.css", function() {
			var newContent = require("!!../css-loader/index.js!./normalize.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userLogin = userLogin;

var _actiontypes = __webpack_require__(109);

var _users = __webpack_require__(210);

function userLogin(user, cb) {

    if (user.username === _users.usersMock.login && user.password === _users.usersMock.password) {
        cb();
    }

    return {
        type: _actiontypes.USER_LOGIN,
        payload: _users.usersMock
    };
}

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(65);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(13);

var _redux = __webpack_require__(20);

var _reactRouterDom = __webpack_require__(34);

var _reduxPromise = __webpack_require__(198);

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

__webpack_require__(200);

__webpack_require__(199);

var _reducers = __webpack_require__(197);

var _reducers2 = _interopRequireDefault(_reducers);

var _Login = __webpack_require__(196);

var _Login2 = _interopRequireDefault(_Login);

var _Gallery = __webpack_require__(195);

var _Gallery2 = _interopRequireDefault(_Gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var store = (0, _redux.createStore)(_reducers2.default, composeEnhancers((0, _redux.applyMiddleware)(_reduxPromise2.default)));

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Login2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/gallery/albums', component: _Gallery2.default })
        )
    )
), document.getElementById('root'));

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(34);

var _Cards = __webpack_require__(204);

var _Cards2 = _interopRequireDefault(_Cards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Albums = function Albums(props) {
  return _react2.default.createElement(
    'div',
    { id: 'albums' },
    props.albums.map(function (album, index) {
      return _react2.default.createElement(
        _reactRouterDom.NavLink,
        { to: '/gallery/photos', key: index },
        _react2.default.createElement(_Cards2.default, { album: album })
      );
    })
  );
};

exports.default = Albums;

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Card = function Card(props) {

  var cardStyle = {
    backgroundImage: 'url(' + props.album.thumbImg + ')'
  };

  // 86400000ms = 1 day;
  var newBadge = Date.now() - props.album.creationDate < 86400000 ? _react2.default.createElement(
    'div',
    { className: 'card-img-infos red' },
    'NEW'
  ) : "";

  return _react2.default.createElement(
    'div',
    { className: 'card' },
    _react2.default.createElement(
      'div',
      { className: 'card-img-wrapper' },
      _react2.default.createElement(
        'div',
        { className: 'card-img', style: cardStyle },
        newBadge,
        _react2.default.createElement(
          'div',
          { className: 'card-img-infos' },
          props.album.photos.length,
          ' Photos'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'card-body' },
      _react2.default.createElement(
        'div',
        { className: 'card-body-title' },
        props.album.title
      ),
      _react2.default.createElement(
        'div',
        { className: 'card-body-text' },
        props.album.description
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'card-buttons' },
      _react2.default.createElement('i', { className: 'fa fa-heart' }),
      _react2.default.createElement('i', { className: 'fa fa-arrow-down' }),
      _react2.default.createElement('i', { className: 'fa fa-share-alt' })
    )
  );
};

exports.default = Card;

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(props) {
  return _react2.default.createElement(
    "div",
    { id: "header" },
    _react2.default.createElement("i", { className: "fa fa-bars", "aria-hidden": "true" }),
    _react2.default.createElement(
      "span",
      { className: "title" },
      "Periscope"
    ),
    _react2.default.createElement(
      "div",
      { id: "header-search" },
      _react2.default.createElement("i", { className: "fa fa-search" }),
      _react2.default.createElement("input", { type: "text" })
    )
  );
};

exports.default = Header;

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Photos = function Photos(props) {
  return _react2.default.createElement(
    "div",
    { id: "photos" },
    props.photos.map(function (photo, index) {
      return _react2.default.createElement("img", { src: photo.medium, key: index });
    })
  );
};

exports.default = Photos;

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sidemenu = function Sidemenu(props) {
  return _react2.default.createElement(
    "div",
    { id: "sidemenu" },
    _react2.default.createElement("i", { className: "fa fa-bars", "aria-hidden": "true" }),
    _react2.default.createElement(
      "h2",
      null,
      "Periscope"
    )
  );
};

exports.default = Sidemenu;

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var albumsMock = [{
  title: "Accompagnement à domicile",
  description: "Umami skateboard readymade, vaporware ramps irony YOLO slow-carb sustainable photo.",
  thumbImg: "http://www.croix-rouge.be/fr/cache/file/D8F80249-4119-4212-8A0BFABFF2925D1C_W717_H275.jpg",
  creationDate: 1495801725833,
  photos: [{ photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }]
}, {
  title: "Don de sang",
  description: "Thundercats echo park bespoke, edison bulb try-hard messenger bag ennui.",
  thumbImg: "http://www.croix-rouge.be/fr/cache/file/F8E8B6AE-A1FA-4615-B7F57690577003BE_W474_H300.jpg",
  creationDate: 1495801725839,
  photos: [{ photo: 1 }, { photo: 1 }, { photo: 1 }]
}, {
  title: "Formation premiers secours",
  description: "Lumbersexual XOXO before they sold out 3 wolf moon VHS actually coloring book cloud bread, poutine direct trade pok pok. Waistcoat crucifix pickled.",
  thumbImg: "http://www.croix-rouge.be/fr/cache/file/159C0286-C481-437C-AB4646B569ABBEC9_W474_H300.jpg",
  creationDate: 1495801725833,
  photos: [{ photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }, { photo: 1 }]
}, {
  title: "Don de sang",
  description: "Thundercats echo park bespoke, edison bulb try-hard messenger bag ennui.",
  thumbImg: "http://www.croix-rouge.be/fr/cache/file/F8E8B6AE-A1FA-4615-B7F57690577003BE_W474_H300.jpg",
  creationDate: 1497810497884,
  photos: [{ photo: 1 }, { photo: 1 }, { photo: 1 }]
}];

module.exports = albumsMock;

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var photosMock = [{
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.amay.be/ma-commune/vie-pratique/sante/maison-croix-rouge/br-ve-9-fit2.jpg/@@images/c911735c-c282-486f-8903-726fe8d045fd.jpeg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/je-m-engage/benevolat/pourquoi-devenir-benevole-a-la-croix-rouge/19625457-30-fre-FR/Pourquoi-devenir-benevole-a-la-Croix-Rouge_articleimagelargeur.jpg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "https://www.icrc.org/sites/default/files/styles/rss/public/document/image_thumbnail/health-care-in-danger_0.jpg?itok=_BL2JlNu",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://neuillylevallois.croix-rouge.fr/images/diaporamas/accueil/1_m.jpg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/je-m-engage/benevolat/1909-16-fre-FR/Benevolat_reference.jpg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.amay.be/ma-commune/vie-pratique/sante/maison-croix-rouge/br-ve-9-fit2.jpg/@@images/c911735c-c282-486f-8903-726fe8d045fd.jpeg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.amay.be/ma-commune/vie-pratique/sante/maison-croix-rouge/br-ve-9-fit2.jpg/@@images/c911735c-c282-486f-8903-726fe8d045fd.jpeg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.amay.be/ma-commune/vie-pratique/sante/maison-croix-rouge/br-ve-9-fit2.jpg/@@images/c911735c-c282-486f-8903-726fe8d045fd.jpeg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.amay.be/ma-commune/vie-pratique/sante/maison-croix-rouge/br-ve-9-fit2.jpg/@@images/c911735c-c282-486f-8903-726fe8d045fd.jpeg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.amay.be/ma-commune/vie-pratique/sante/maison-croix-rouge/br-ve-9-fit2.jpg/@@images/c911735c-c282-486f-8903-726fe8d045fd.jpeg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.croixrouge.ca/crc/img/spring-flood-650x400.jpg?ext=.jpg",
    fullsize: "url"
}, {
    name: "Nom de l'image",
    description: "Description de l'image",
    photographe: "Nom du photographe",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    thumb: "url",
    medium: "http://www.amay.be/ma-commune/vie-pratique/sante/maison-croix-rouge/br-ve-9-fit2.jpg/@@images/c911735c-c282-486f-8903-726fe8d045fd.jpeg",
    fullsize: "url"
}];

module.exports = photosMock;

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var usersMock = exports.usersMock = {
  name: "Julien",
  admin: true,
  login: "mock",
  password: "mock"
};

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];


    switch (action.type) {
        case _index.USER_LOGIN:
            return action.payload;
        default:
            return state;
    }
};

var _index = __webpack_require__(109);

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isFSA = isFSA;
exports.isError = isError;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _lodashIsplainobject = __webpack_require__(526);

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var validKeys = ['type', 'payload', 'error', 'meta'];

function isValidKey(key) {
  return validKeys.indexOf(key) > -1;
}

function isFSA(action) {
  return _lodashIsplainobject2['default'](action) && typeof action.type !== 'undefined' && Object.keys(action).every(isValidKey);
}

function isError(action) {
  return action.error === true;
}

/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFor = __webpack_require__(527),
    isArguments = __webpack_require__(188),
    keysIn = __webpack_require__(528);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) || !hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function (subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;

/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = baseFor;

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = __webpack_require__(188),
    isArray = __webpack_require__(529);

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = index + '';
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

/***/ }),

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function (value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(110)(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato:400,700);", ""]);

// module
exports.push([module.i, "button {\n  display: inline-block;\n  outline: none;\n  padding: 10px 15px 7px 15px;\n  border: 1px solid #777777;\n  border-radius: 3px;\n  background-color: #FFFFFF;\n  text-transform: uppercase;\n  text-align: center;\n  color: #777777;\n  font-size: 16px;\n  font-weight: 300;\n  cursor: pointer;\n}\n.button-anim:hover {\n  animation-name: buttonAnim;\n  animation-duration: .15s;\n  animation-fill-mode: forwards;\n  animation-timing-function: ease-in;\n}\n@keyframes buttonAnim {\n  from {\n    box-shadow: inset 0px 0px 0px 0px #DADADA;\n    border: 1px solid #777777;\n  }\n  to {\n    box-shadow: inset 100px 0px 0px 0px #4EE898;\n    background-color: #4EE898;\n    border: 1px solid #4EE898;\n    color: #FFFFFF;\n  }\n}\ninput {\n  width: 100%;\n  padding: 10px 5px 10px 10px;\n  border-radius: 3px;\n  border: 0;\n  background-color: #efefef;\n  color: #777777;\n  font-size: 16px;\n}\ninput:focus {\n  outline: none;\n  background-color: #e2e2e2;\n}\n.margin-sm-bottom {\n  margin-bottom: 10px;\n}\n.margin-md-bottom {\n  margin-bottom: 20px;\n}\n.margin-lg-bottom {\n  margin-bottom: 30px;\n}\n.margin-sm-top {\n  margin-top: 10px;\n}\n.margin-md-top {\n  margin-top: 20px;\n}\n.margin-lg-top {\n  margin-top: 30px;\n}\n.margin-sm-left {\n  margin-left: 10px;\n}\n.margin-md-left {\n  margin-left: 20px;\n}\n.margin-lg-left {\n  margin-left: 30px;\n}\n.margin-sm-right {\n  margin-right: 10px;\n}\n.margin-md-right {\n  margin-right: 20px;\n}\n.margin-lg-right {\n  margin-right: 30px;\n}\n.darkBlueGrey {\n  color: #5A646E;\n}\n.mediumGrey {\n  color: #cccccc;\n}\n#sign-wrapper {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n#sign {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n#sign button {\n  margin-bottom: 15px;\n}\n@media (min-width: 992px) {\n  #sign {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    padding: 30px 60px;\n    width: 220px;\n    height: 400px;\n    border-radius: 7px;\n    text-align: center;\n    box-shadow: 1px 1px 4px 3px #efefef;\n  }\n  #sign button {\n    margin-bottom: 0px;\n  }\n}\n#header {\n  position: fixed;\n  left: 0px;\n  right: 0px;\n  height: 40px;\n  bottom: 0px;\n  z-index: 999;\n  display: flex;\n  align-items: center;\n  background-color: #FFFFFF;\n  box-shadow: -1px -1px 3px 2px rgba(100, 100, 100, 0.1);\n  padding: 10px 20px 10px 20px;\n  flex: 0 0 50px;\n}\n#header .title {\n  display: none;\n}\n#header .fa-bars {\n  font-size: 20px;\n  margin-right: 5px;\n  color: #5A646E;\n  cursor: pointer;\n}\n#header .fa-bars:hover {\n  transform: rotate(90deg);\n  transition: .25s;\n}\n#header #header-search {\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  width: 100%;\n}\n#header input {\n  width: 100%;\n  padding: 5px 5px 5px 25px;\n}\n#header .fa-search {\n  position: relative;\n  left: 20px;\n  color: #777777;\n  font-size: .9em;\n}\n@media (min-width: 768px) {\n  #header {\n    position: fixed;\n    left: 0px;\n    right: 0px;\n    height: 40px;\n    top: 0px;\n    box-shadow: 1px 1px 3px 2px rgba(100, 100, 100, 0.1);\n  }\n  #header .title {\n    display: inline-block;\n    font-size: 1.5em;\n    margin-right: 10px;\n    padding-bottom: 4px;\n    color: #5A646E;\n  }\n  #header .fa-bars {\n    margin-right: 20px;\n  }\n  #header input {\n    min-width: 200px;\n    width: 20%;\n  }\n  #header .fa-search {\n    left: 20px;\n  }\n}\n#photos {\n  overflow-x: hidden;\n  padding: 20px 20px 70px 20px;\n  column-count: 2;\n  column-gap: 5px;\n}\n#photos img {\n  margin-bottom: 2px;\n  width: 100%;\n  height: auto;\n}\n@media (min-width: 768px) {\n  #photos {\n    column-count: 3;\n    padding: 80px 20px 10px 20px;\n  }\n}\n@media (min-width: 992px) {\n  #photos {\n    column-count: 5;\n  }\n}\n@media (min-width: 1200px) {\n  #photos {\n    column-count: 6;\n  }\n}\n#albums {\n  display: flex;\n  overflow-x: hidden;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  padding: 20px 20px 70px 20px;\n}\n@media (min-width: 768px) {\n  #albums {\n    flex-direction: row;\n    flex-wrap: wrap;\n    padding: 85px 10px 10px 25px;\n  }\n}\n.card {\n  display: block;\n  width: 100%;\n  height: 150px;\n  margin-bottom: 15px;\n  border-radius: 4px;\n  background-color: red;\n  background-color: #FFFFFF;\n  box-shadow: 1px 1px 7px #cccccc;\n  cursor: pointer;\n}\n.card .card-img-wrapper {\n  position: relative;\n  float: left;\n  overflow: hidden;\n  height: 150px;\n  width: 40%;\n  border-radius: 4px 0px 0px 4px;\n  background-color: #efefef;\n}\n.card .card-img-wrapper .card-img {\n  display: flex;\n  align-items: flex-end;\n  flex-direction: row-reverse;\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n  background-position: center center;\n}\n.card .card-img-wrapper .card-img-infos {\n  padding: 6px;\n  margin-right: 7px;\n  margin-bottom: 7px;\n  border-radius: 3px;\n  background-color: #1A1A1A;\n  font-size: .7em;\n  font-weight: bold;\n  color: #EEE;\n  opacity: .9;\n}\n.card .card-img-wrapper .card-img-infos.red {\n  background-color: #FF3F00;\n}\n.card .card-body {\n  overflow: hidden;\n  padding: 15px;\n  height: 100px;\n}\n.card .card-body-title {\n  margin-bottom: 5px;\n  font-size: 1em;\n  font-weight: 800;\n  color: #1A1A1A;\n}\n.card .card-buttons {\n  display: none;\n}\n.card .card-body-text {\n  color: #777777;\n}\n.card:hover {\n  box-shadow: 0px 0px 5px #cccccc;\n}\n.card:hover .card-img {\n  transform: scale(1.1);\n  transition: .5s transform;\n}\n@media (min-width: 768px) {\n  .card {\n    display: block;\n    width: 225px;\n    height: 350px;\n    margin-right: 15px;\n  }\n  .card .card-img-wrapper {\n    position: relative;\n    overflow: hidden;\n    height: 150px;\n    width: 100%;\n    border-radius: 4px 4px 0px 0px;\n  }\n  .card .card-body {\n    height: 108px;\n    padding: 20px;\n  }\n  .card .card-body-title {\n    margin-bottom: 10px;\n    font-size: 1.2em;\n  }\n  .card .card-buttons {\n    display: block;\n    position: relative;\n    height: 50px;\n    padding-top: 15px;\n    padding-left: 20px;\n  }\n  .card .card-buttons i {\n    display: inline-block;\n    margin-right: 15px;\n    font-size: .9em;\n    color: #cccccc;\n    cursor: pointer;\n  }\n  .card .card-buttons i:hover {\n    color: #1A1A1A;\n  }\n}\nhtml,\nbody,\n#root,\n.container {\n  height: 100%;\n  font-family: 'Lato', sans-serif;\n}\n@media (min-width: 768px) {\n  overflow: hidden;\n}\na {\n  text-decoration: none;\n}\nh1 {\n  font-size: 3.125em;\n}\nh2 {\n  font-size: 2.125em;\n}\nh3 {\n  font-size: 1.5em;\n}\n", ""]);

// exports


/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(110)(undefined);
// imports


// module
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n", ""]);

// exports


/***/ })

},[202]);