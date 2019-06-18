if (!Object.hasOwnProperty("assign")) {
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
        }
    });
}
if (!window.Promise) {
    // Promise polyfill.min.js 8.1.3 https://github.com/taylorhakes/promise-polyfill
    !function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})}function n(e){return!(!e||"undefined"==typeof e.length)}function t(){}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],c(e,this)}function r(e,n){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null!==t){var o;try{o=t(e._value)}catch(r){return void f(n.promise,r)}i(n.promise,o)}else(1===e._state?i:f)(n.promise,e._value)})):e._deferreds.push(n)}function i(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var t=n.then;if(n instanceof o)return e._state=3,e._value=n,void u(e);if("function"==typeof t)return void c(function(e,n){return function(){e.apply(n,arguments)}}(t,n),e)}e._state=1,e._value=n,u(e)}catch(r){f(e,r)}}function f(e,n){e._state=2,e._value=n,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;t>n;n++)r(e,e._deferreds[n]);e._deferreds=null}function c(e,n){var t=!1;try{e(function(e){t||(t=!0,i(n,e))},function(e){t||(t=!0,f(n,e))})}catch(o){if(t)return;t=!0,f(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,n){var o=new this.constructor(t);return r(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(e,n,o)),o},o.prototype["finally"]=e,o.all=function(e){return new o(function(t,o){function r(e,n){try{if(n&&("object"==typeof n||"function"==typeof n)){var u=n.then;if("function"==typeof u)return void u.call(n,function(n){r(e,n)},o)}i[e]=n,0==--f&&t(i)}catch(c){o(c)}}if(!n(e))return o(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);for(var f=i.length,u=0;i.length>u;u++)r(u,i[u])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(t,r){if(!n(e))return r(new TypeError("Promise.race accepts an array"));for(var i=0,f=e.length;f>i;i++)o.resolve(e[i]).then(t,r)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"Promise"in l?l.Promise.prototype["finally"]||(l.Promise.prototype["finally"]=e):l.Promise=o}); // eslint-disable-line
}
if (!window.fetch) {
    // fetch 3.0.0 https://github.com/github/fetch https://cdnjs.cloudflare.com/ajax/libs/fetch/.../fetch.min.js
    // Issue #656 https://cdn.jsdelivr.net/npm/whatwg-fetch@3.0/dist/fetch.umd.min.js
    !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.WHATWGFetch={})}(this,function(a){"use strict";var r="URLSearchParams"in self,o="Symbol"in self&&"iterator"in Symbol,h="FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),n="FormData"in self,i="ArrayBuffer"in self;if(i)var e=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],s=ArrayBuffer.isView||function(t){return t&&-1<e.indexOf(Object.prototype.toString.call(t))};function u(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function f(t){return"string"!=typeof t&&(t=String(t)),t}function t(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return o&&(t[Symbol.iterator]=function(){return t}),t}function d(e){this.map={},e instanceof d?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function c(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function p(r){return new Promise(function(t,e){r.onload=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function y(t){var e=new FileReader,r=p(e);return e.readAsArrayBuffer(t),r}function l(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function b(){return this.bodyUsed=!1,this._initBody=function(t){var e;(this._bodyInit=t)?"string"==typeof t?this._bodyText=t:h&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:n&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:r&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():i&&h&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=l(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):i&&(ArrayBuffer.prototype.isPrototypeOf(t)||s(t))?this._bodyArrayBuffer=l(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},h&&(this.blob=function(){var t=c(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?c(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(y)}),this.text=function(){var t,e,r,o=c(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=p(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},n&&(this.formData=function(){return this.text().then(v)}),this.json=function(){return this.text().then(JSON.parse)},this}d.prototype.append=function(t,e){t=u(t),e=f(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},d.prototype.delete=function(t){delete this.map[u(t)]},d.prototype.get=function(t){return t=u(t),this.has(t)?this.map[t]:null},d.prototype.has=function(t){return this.map.hasOwnProperty(u(t))},d.prototype.set=function(t,e){this.map[u(t)]=f(e)},d.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},d.prototype.keys=function(){var r=[];return this.forEach(function(t,e){r.push(e)}),t(r)},d.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),t(e)},d.prototype.entries=function(){var r=[];return this.forEach(function(t,e){r.push([e,t])}),t(r)},o&&(d.prototype[Symbol.iterator]=d.prototype.entries);var m=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function w(t,e){var r,o,n=(e=e||{}).body;if(t instanceof w){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new d(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new d(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),-1<m.indexOf(o)?o:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function v(t){var n=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),r=e.shift().replace(/\+/g," "),o=e.join("=").replace(/\+/g," ");n.append(decodeURIComponent(r),decodeURIComponent(o))}}),n}function E(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new d(e.headers),this.url=e.url||"",this._initBody(t)}w.prototype.clone=function(){return new w(this,{body:this._bodyInit})},b.call(w.prototype),b.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),url:this.url})},E.error=function(){var t=new E(null,{status:0,statusText:""});return t.type="error",t};var A=[301,302,303,307,308];E.redirect=function(t,e){if(-1===A.indexOf(e))throw new RangeError("Invalid status code");return new E(null,{status:e,headers:{location:t}})},a.DOMException=self.DOMException;try{new a.DOMException}catch(t){a.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},a.DOMException.prototype=Object.create(Error.prototype),a.DOMException.prototype.constructor=a.DOMException}function _(n,s){return new Promise(function(o,t){var e=new w(n,s);if(e.signal&&e.signal.aborted)return t(new a.DOMException("Aborted","AbortError"));var i=new XMLHttpRequest;function r(){i.abort()}i.onload=function(){var t,n,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",n=new d,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var e=t.split(":"),r=e.shift().trim();if(r){var o=e.join(":").trim();n.append(r,o)}}),n)};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var r="response"in i?i.response:i.responseText;o(new E(r,e))},i.onerror=function(){t(new TypeError("Network request failed"))},i.ontimeout=function(){t(new TypeError("Network request failed"))},i.onabort=function(){t(new a.DOMException("Aborted","AbortError"))},i.open(e.method,e.url,!0),"include"===e.credentials?i.withCredentials=!0:"omit"===e.credentials&&(i.withCredentials=!1),"responseType"in i&&h&&(i.responseType="blob"),e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),e.signal&&(e.signal.addEventListener("abort",r),i.onreadystatechange=function(){4===i.readyState&&e.signal.removeEventListener("abort",r)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})}_.polyfill=!0,self.fetch||(self.fetch=_,self.Headers=d,self.Request=w,self.Response=E),a.Headers=d,a.Request=w,a.Response=E,a.fetch=_,Object.defineProperty(a,"__esModule",{value:!0})}); // eslint-disable-line
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
