/*eslint
comma-spacing: 2,
dot-notation: [2, {"allowKeywords": true}],
eqeqeq: 2,
indent: ["error", 4, { "SwitchCase": 1 }],
key-spacing: [2, {"beforeColon": false, "afterColon": true}],
no-console: 0,
no-empty-function: 2,
no-empty: ["error", { "allowEmptyCatch": true }],
no-eval: 2,
no-extend-native: 2,
no-inner-declarations: 2,
no-loop-func: 2,
no-mixed-spaces-and-tabs: 2,
no-multi-spaces: 2,
no-new-func: 2,
no-new: 2,
no-shadow: 2,
no-trailing-spaces: "error",
no-undef: 0,
no-underscore-dangle: 2,
no-unused-vars: 2,
no-use-before-define: 2,
quotes: [2, "double"],
semi: 2,
space-before-blocks: 2,
space-before-function-paren: [2, {"anonymous": "always", "named": "never"}],
strict: [2, "function"]*/

ui.form = {
    list: function (selector, container) {
        "use strict";

        if (!container && !this.el || !selector) {
            return [];
        }

        var arr = (container || this.el).querySelectorAll(selector);

        return arr.length ? Array.from && Array.from(arr) || [].slice.call(arr) : [];
    },
    number: function (e, val) {
        "use strict";

        if (e) {
            try {
                val = val || String.fromCharCode(e.keyCode || e.which);
                if (val === " " || isNaN(val)) e.preventDefault();
            } catch (err) {
                e.preventDefault();
            }
        }
    },
    paste: function (e) {
        "use strict";

        if (e) {
            var val;

            if (e.clipboardData) {
                val = e.clipboardData.getData("text/plain");
            } else if (this.w.clipboardData) {
                val = this.w.clipboardData.getData("Text");
            }
            if (val) {
                self.number(e, val);
            } else {
                e.preventDefault();
            }
        }
    },
    drop: function (e) {
        "use strict";

        if (e) {
            e.preventDefault();
        }
    },
    valid: function (arr) {
        "use strict";

        if (Array.isArray(arr) && arr.length) {
            var flag = true,
                error,
                i;

            for (i = 0; i < arr.length; i += 1) {
                if (arr[i].parentNode.classList.contains("error") &&
                    (!arr[i].validity || arr[i].validity.valid)) {
                    arr[i].parentNode.classList.remove("error");
                }
            }
            for (i = 0; i < arr.length; i += 1) {
                if (!arr[i].value ||
                    arr[i].type === "email" && !/^\S+@\S+\.\S+$/.test(arr[i].value) ||
                    arr[i].type === "tel" && !/^(\+972(\-)?|0)([1-468-9](\-)?\d{7}|(5|7)[0-9](\-)?\d{7})$/.test(arr[i].value) ||
                    arr[i].name === "message" && arr[i].value.length < 5 ||
                    !arr[i].validity || !arr[i].validity.valid) {
                    error = arr[i].getAttribute("data-error");
                    flag = false;

                    arr[i].parentNode.classList.add("error");

                    if (error) {
                        arr[i].setAttribute("placeholder", error);
                    }
                }
            }

            return flag;
        } else {
            return true;
        }
    },
    serialize: function (container) {
        "use strict";

        var arr = this.list("input, select, textarea", container),
            result = [],
            boolean,
            value,
            i;

        for (i = 0; i < arr.length; i += 1) {
            boolean = arr[i].type === "checkbox" || arr[i].type === "radio";
            value = boolean ? arr[i].checked : arr[i].value && encodeURIComponent(arr[i].value);

            if (value) {
                result.push(arr[i].name + "=" + value);
            }
        }

        return result.join("&");
    },
    deserialize: function (container) {
        "use strict";

        var data = this.serialize(container),
            pairs = data && data.split("&"),
            result = {},
            pair,
            key,
            val,
            i;

        if (!data || !pairs) {
            return result;
        } else {
            for (i = 0; i < pairs.length; i += 1) {
                pair = pairs[i].split("=");

                if (pair[0]) {
                    key = decodeURIComponent(pair[0]);

                    try {
                        // Fix decodeURIComponent("%") error "URIError: URI malformed"
                        val = decodeURIComponent(pair[1]);
                    } catch (e) {
                        val = pair[1];
                    }

                    if (val === "undefined" || val === "") {
                        val = undefined;
                    } else if (val === "true") {
                        val = true;
                    } else if (val === "false") {
                        val = false;
                    }

                    if (!isNaN(parseFloat(val)) && isFinite(val)) {
                        val = Number(val);
                    }

                    result[key] = val;
                }
            }

            return result;
        }
    },
    accessibility: function (flag, container, toggleSpin, customTag) {
        "use strict";

        var tags = ["input", "select", "textarea", "button"],
            arr,
            i;

        customTag && tags.push(customTag);
        arr = this.list(tags.join(", "), container);

        for (i = 0; i < arr.length; i += 1) {
            if (flag) {
                arr[i].removeAttribute("disabled");
            } else {
                arr[i].setAttribute("disabled", "");
            }
            if (arr[i].tagName === "BUTTON") {
                if (flag) {
                    arr[i].innerHTML = arr[i].getAttribute("data-text");
                    arr[i].removeAttribute("data-text");

                    if (toggleSpin) {
                        arr[i].classList.remove("spin");
                    }
                } else {
                    arr[i].setAttribute("data-text", arr[i].innerHTML);
                    arr[i].innerHTML = "שולח...";

                    if (toggleSpin) {
                        arr[i].classList.add("spin");
                    }
                }
            }
        }
    }
};
