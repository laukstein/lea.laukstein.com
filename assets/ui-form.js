/*eslint
comma-spacing: 2,
dot-notation: [2, {"allowKeywords": true}],
eqeqeq: 2,
indent: 2,
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
    list: function (selector) {
        "use strict";

        if (!this.el || !selector) {
            return [];
        }

        var arr = this.el.querySelectorAll(selector);

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
    valid: function (list) {
        "use strict";

        if (Array.isArray(list) && list.length) {
            var arr = this.list(".error"),
                flag = true,
                error,
                i;

            for (i = 0; i < arr.length; i += 1) {
                arr[i].classList.remove("error");
            }

            arr = list;

            for (i = 0; i < arr.length; i += 1) {
                if (!arr[i].value ||
                    arr[i].type === "email" && !/^\S+@\S+\.\S+$/.test(arr[i].value) ||
                    arr[i].type === "tel" && !/^(\+972(\-)?|0)([1-468-9](\-)?\d{7}|(5|7)[0-9](\-)?\d{7})$/.test(arr[i].value) ||
                    arr[i].name === "message" && arr[i].value.length < 5) {
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
    serialize: function () {
        "use strict";

        var arr = this.list("input, select, textarea"),
            result = [],
            i;

        for (i = 0; i < arr.length; i += 1) {
            if (!(arr[i].type === "checkbox" || arr[i].type === "radio") && arr[i].value || arr[i].checked) {
                result.push(arr[i].name + "=" + encodeURIComponent(arr[i].value));
            }
        }

        return result.join("&");
    },
    accessibility: function (flag) {
        "use strict";

        var arr = this.list("input, select, textarea, button"),
            i;

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
                } else {
                    arr[i].setAttribute("data-text", arr[i].innerHTML);
                    arr[i].innerHTML = "שולח...";
                }
            }
        }
    }
};
