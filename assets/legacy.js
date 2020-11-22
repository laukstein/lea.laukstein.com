if (!Object.values) {
    Object.values = function (target) {
        "use strict";

        return Object.keys(target).map(function (key) {
            return target[key];
        });
    };
}
if (!Object.assign) {
    // IE legacy, resource https://github.com/rubennorte/es6-object-assign/blob/master/index.js
    Object.defineProperty(Object, "assign", {
        configurable: true,
        value: function (target) {
            "use strict";

            if (target === undefined || target === null) {
                throw new TypeError("Cannot convert first argument to object");
            }

            var to = Object(target),
                nextSource,
                keysArray,
                nextIndex,
                nextKey,
                desc,
                i;

            for (i = 0; i < arguments.length; i += 1) {
                nextSource = arguments[i];

                if (nextSource !== undefined && nextSource !== null) {
                    keysArray = Object.keys(Object(nextSource));

                    for (nextIndex = 0; nextIndex < keysArray.length; nextIndex += 1) {
                        nextKey = keysArray[nextIndex];
                        desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }

            return to;
        }
    });
}
if (!Array.from) {
    Array.from = function (object) {
        "use strict";

        return [].slice.call(object);
    };
}
if (!Array.prototype.includes) {
    // Resource https://cdn.polyfill.io/v2/polyfill.js?features=Array.prototype.includes
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill
    Object.defineProperty(Array.prototype, "includes", {
        configurable: true,
        value: function (searchElement /* , fromIndex */) {
            "use strict";

            var O = Object(this),
                len = parseInt(O.length, 10) || 0,
                n,
                k;

            if (len === 0) {
                return false;
            }

            n = parseInt(arguments[1], 10) || 0;

            if (n >= 0) {
                k = n;
            } else {
                k = len + n;

                if (k < 0) {
                    k = 0;
                }
            }

            function sameValueZero(x, y) {
                return x === y || (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y));
            }

            while (k < len) {
                if (sameValueZero(O[k], searchElement)) {
                    return true;
                }

                k += 1;
            }

            return false;
        }
    });
}
if (!String.prototype.startsWith) {
    // IE legacy https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    Object.defineProperty(String.prototype, "startsWith", {
        configurable: true,
        value: function (searchString, position) {
            "use strict";

            position = position || 0;

            return this.indexOf(searchString, position) === position;
        }
    });
}
if (!Element.prototype.remove) {
    Object.defineProperty(Element.prototype, "remove", {
        value: function () {
            "use strict";

            if (this.parentElement) {
                this.parentElement.removeChild(this);
            }
        }
    });
}
if (!document.addEventListener) {
    // EventListener polyfill https://gist.github.com/jonathantneal/3748027
    (function (wPrototype, dPrototype, ePrototype, on, off, event, registry) { // eslint-disable-line
        wPrototype[on] = dPrototype[on] = ePrototype[on] = function (type, listener) {
            var self = this;

            registry.unshift([self, type, listener, function (e) {
                e.currentTarget = self;
                e.preventDefault = function () {
                    e.returnValue = false;
                };
                e.stopPropagation = function () {
                    e.cancelBubble = true;
                };
                e.target = e.srcElement || self;

                listener.call(self, e);
            }]);

            this.attachEvent("on" + type, registry[0][3]);
        };
        wPrototype[off] = dPrototype[off] = ePrototype[off] = function (type, listener) {
            var register,
                i;

            for (i = 0; register = registry[i]; i += 1) { // eslint-disable-line
                if (register[0] === this && register[1] === type && register[2] === listener) {
                    return this.detachEvent("on" + type, registry.splice(i, 1)[0][3]);
                }
            }
        };
        wPrototype[event] = dPrototype[event] = ePrototype[event] = function (eventObject) {
            return this.fireEvent("on" + eventObject.type, eventObject);
        };
    }(this.w.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener",
        "dispatchEvent", []));
}
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector;

    if (!Element.prototype.matches) {
        Object.defineProperty(Element.prototype, "closest", {
            value: function (selector) {
                "use strict";

                var nodes = (this.parentNode || this.document).querySelectorAll(selector),
                    i = -1;

                while (nodes[i += 1] && nodes[i] !== this);

                return !!nodes[i];
            }
        });
    }
}
if (!Element.prototype.closest) {
    Object.defineProperty(Element.prototype, "closest", {
        value: function (selector) {
            "use strict";

            var node = this;

            while (node) {
                if (node.matches(selector)) {
                    return node;
                }

                node = node.parentElement;
            }

            return null;
        }
    });
}
if (!("classList" in document.documentElement) && Element.prototype) {
    Object.defineProperty(Element.prototype, "classList", {
        get: function () {
            "use strict";

            var self = this;

            function classlist() {
                return self.className.split(/\s+/);
            }
            function update(fn) {
                return function (value) {
                    var classes = classlist(),
                        index = classes.indexOf(value);

                    fn(classes, index, value);

                    self.className = classes.join(" ");
                };
            }

            return {
                add: update(function (classes, index, value) {
                    ~index || classes.push(value);
                }),
                contains: function (value) {
                    return !!~classlist().indexOf(value);
                },
                item: function (index) {
                    return classlist()[index] || null;
                },
                remove: update(function (classes, index) {
                    ~index && classes.splice(index, 1);
                }),
                toggle: update(function (classes, index, value) {
                    ~index ? classes.splice(index, 1) : classes.push(value);
                })
            };
        },
        set: function () {
            "use strict";
        }
    });
}
if (!window.Promise) {
    // Promise polyfill.min.js 8.2.0 https://github.com/taylorhakes/promise-polyfill
    !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";function e(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}function t(e){return new this(function(t,n){function o(e,n){if(n&&("object"==typeof n||"function"==typeof n)){var f=n.then;if("function"==typeof f)return void f.call(n,function(t){o(e,t)},function(n){r[e]={status:"rejected",reason:n},0==--i&&t(r)})}r[e]={status:"fulfilled",value:n},0==--i&&t(r)}if(!e||"undefined"==typeof e.length)return n(new TypeError(typeof e+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})}function n(e){return!(!e||"undefined"==typeof e.length)}function o(){}function r(e){if(!(this instanceof r))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],l(e,this)}function i(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,r._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var o;try{o=n(e._value)}catch(r){return void u(t.promise,r)}f(t.promise,o)}else(1===e._state?f:u)(t.promise,e._value)})):e._deferreds.push(t)}function f(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof r)return e._state=3,e._value=t,void c(e);if("function"==typeof n)return void l(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,c(e)}catch(o){u(e,o)}}function u(e,t){e._state=2,e._value=t,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&r._immediateFn(function(){e._handled||r._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;n>t;t++)i(e,e._deferreds[t]);e._deferreds=null}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,f(t,e))},function(e){n||(n=!0,u(t,e))})}catch(o){if(n)return;n=!0,u(t,o)}}var a=setTimeout;r.prototype["catch"]=function(e){return this.then(null,e)},r.prototype.then=function(e,t){var n=new this.constructor(o);return i(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},r.prototype["finally"]=e,r.all=function(e){return new r(function(t,o){function r(e,n){try{if(n&&("object"==typeof n||"function"==typeof n)){var u=n.then;if("function"==typeof u)return void u.call(n,function(t){r(e,t)},o)}i[e]=n,0==--f&&t(i)}catch(c){o(c)}}if(!n(e))return o(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);for(var f=i.length,u=0;i.length>u;u++)r(u,i[u])})},r.allSettled=t,r.resolve=function(e){return e&&"object"==typeof e&&e.constructor===r?e:new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r.race=function(e){return new r(function(t,o){if(!n(e))return o(new TypeError("Promise.race accepts an array"));for(var i=0,f=e.length;f>i;i++)r.resolve(e[i]).then(t,o)})},r._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},r._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var s=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"function"!=typeof s.Promise?s.Promise=r:s.Promise.prototype["finally"]?s.Promise.allSettled||(s.Promise.allSettled=t):s.Promise.prototype["finally"]=e}); // eslint-disable-line
}
if (!window.fetch) {
    // fetch polyfill 3.5.0 https://github.com/github/fetch https://cdnjs.cloudflare.com/ajax/libs/fetch/.../fetch.min.js
    // https://cdn.jsdelivr.net/npm/whatwg-fetch/dist/fetch.umd.min.js
    !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.WHATWGFetch={})}(this,(function(t){"use strict";var e="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==e&&e,r="URLSearchParams"in e,o="Symbol"in e&&"iterator"in Symbol,n="FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(t){return!1}}(),i="FormData"in e,s="ArrayBuffer"in e;if(s)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],h=ArrayBuffer.isView||function(t){return t&&a.indexOf(Object.prototype.toString.call(t))>-1};function u(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t)||""===t)throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function f(t){return"string"!=typeof t&&(t=String(t)),t}function c(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return o&&(e[Symbol.iterator]=function(){return e}),e}function d(t){this.map={},t instanceof d?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function y(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function p(t){return new Promise((function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}}))}function l(t){var e=new FileReader,r=p(e);return e.readAsArrayBuffer(t),r}function b(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function m(){return this.bodyUsed=!1,this._initBody=function(t){var e;this.bodyUsed=this.bodyUsed,this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:n&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:i&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:r&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():s&&n&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=b(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s&&(ArrayBuffer.prototype.isPrototypeOf(t)||h(t))?this._bodyArrayBuffer=b(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},n&&(this.blob=function(){var t=y(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var t=y(this);return t||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}return this.blob().then(l)}),this.text=function(){var t,e,r,o=y(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=p(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i&&(this.formData=function(){return this.text().then(E)}),this.json=function(){return this.text().then(JSON.parse)},this}d.prototype.append=function(t,e){t=u(t),e=f(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},d.prototype.delete=function(t){delete this.map[u(t)]},d.prototype.get=function(t){return t=u(t),this.has(t)?this.map[t]:null},d.prototype.has=function(t){return this.map.hasOwnProperty(u(t))},d.prototype.set=function(t,e){this.map[u(t)]=f(e)},d.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},d.prototype.keys=function(){var t=[];return this.forEach((function(e,r){t.push(r)})),c(t)},d.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),c(t)},d.prototype.entries=function(){var t=[];return this.forEach((function(e,r){t.push([r,e])})),c(t)},o&&(d.prototype[Symbol.iterator]=d.prototype.entries);var w=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function v(t,e){if(!(this instanceof v))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,o,n=(e=e||{}).body;if(t instanceof v){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new d(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new d(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),w.indexOf(o)>-1?o:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(n),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==e.cache&&"no-cache"!==e.cache)){var i=/([?&])_=[^&]*/;if(i.test(this.url))this.url=this.url.replace(i,"$1_="+(new Date).getTime());else{this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}}function E(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}})),e}function T(t,e){if(!(this instanceof T))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"",this.headers=new d(e.headers),this.url=e.url||"",this._initBody(t)}v.prototype.clone=function(){return new v(this,{body:this._bodyInit})},m.call(v.prototype),m.call(T.prototype),T.prototype.clone=function(){return new T(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),url:this.url})},T.error=function(){var t=new T(null,{status:0,statusText:""});return t.type="error",t};var A=[301,302,303,307,308];T.redirect=function(t,e){if(-1===A.indexOf(e))throw new RangeError("Invalid status code");return new T(null,{status:e,headers:{location:t}})},t.DOMException=e.DOMException;try{new t.DOMException}catch(e){t.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},t.DOMException.prototype=Object.create(Error.prototype),t.DOMException.prototype.constructor=t.DOMException}function _(r,o){return new Promise((function(i,a){var h=new v(r,o);if(h.signal&&h.signal.aborted)return a(new t.DOMException("Aborted","AbortError"));var u=new XMLHttpRequest;function c(){u.abort()}u.onload=function(){var t,e,r={status:u.status,statusText:u.statusText,headers:(t=u.getAllResponseHeaders()||"",e=new d,t.replace(/\r?\n[\t ]+/g," ").split("\r").map((function(t){return 0===t.indexOf("\n")?t.substr(1,t.length):t})).forEach((function(t){var r=t.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}})),e)};r.url="responseURL"in u?u.responseURL:r.headers.get("X-Request-URL");var o="response"in u?u.response:u.responseText;setTimeout((function(){i(new T(o,r))}),0)},u.onerror=function(){setTimeout((function(){a(new TypeError("Network request failed"))}),0)},u.ontimeout=function(){setTimeout((function(){a(new TypeError("Network request failed"))}),0)},u.onabort=function(){setTimeout((function(){a(new t.DOMException("Aborted","AbortError"))}),0)},u.open(h.method,function(t){try{return""===t&&e.location.href?e.location.href:t}catch(e){return t}}(h.url),!0),"include"===h.credentials?u.withCredentials=!0:"omit"===h.credentials&&(u.withCredentials=!1),"responseType"in u&&(n?u.responseType="blob":s&&h.headers.get("Content-Type")&&-1!==h.headers.get("Content-Type").indexOf("application/octet-stream")&&(u.responseType="arraybuffer")),!o||"object"!=typeof o.headers||o.headers instanceof d?h.headers.forEach((function(t,e){u.setRequestHeader(e,t)})):Object.getOwnPropertyNames(o.headers).forEach((function(t){u.setRequestHeader(t,f(o.headers[t]))})),h.signal&&(h.signal.addEventListener("abort",c),u.onreadystatechange=function(){4===u.readyState&&h.signal.removeEventListener("abort",c)}),u.send(void 0===h._bodyInit?null:h._bodyInit)}))}_.polyfill=!0,e.fetch||(e.fetch=_,e.Headers=d,e.Request=v,e.Response=T),t.Headers=d,t.Request=v,t.Response=T,t.fetch=_,Object.defineProperty(t,"__esModule",{value:!0})})); // eslint-disable-line
}
if (!navigator.sendBeacon) {
    navigator.sendBeacon = function (url, data) {
        "use strict";

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        });

        return true;
    };
}
