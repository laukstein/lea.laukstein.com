"use strict";

ui.has.valid = function (fn) {
    try {
        return fn();
    } catch (e) {
        if (!this.error) {
            this.error = {
                e: null
            };
        }

        this.error.e = e;

        return this.error;
    }
};
ui.form = {
    list: function (selector, container) {
        if (!container && !this.el || !selector) {
            return [];
        }

        var arr = (container || this.el).querySelectorAll(selector);

        return arr.length ? Array.from && Array.from(arr) || [].slice.call(arr) : [];
    },
    number: function (e, val) {
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
        if (e) {
            var val;

            if (e.clipboardData) {
                val = e.clipboardData.getData("text/plain");
            } else if (window.clipboardData) {
                val = clipboardData.getData("Text");
            }
            if (val) {
                ui.form.number(e, val);
            } else {
                e.preventDefault();
            }
        }
    },
    drop: function (e) {
        if (e) {
            e.preventDefault();
        }
    },
    valid: function (arr) {
        var flag = true,
            invalid,
            error,
            value,
            i;

        if (Array.isArray(arr) && arr.length) {
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i].parentNode.classList.contains("error") &&
                    (!arr[i].validity || arr[i].validity.valid)) {
                    arr[i].parentNode.classList.remove("error");
                }
            }
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i].tagName === "SELECT") {
                    value = arr[i].options[arr[i].selectedIndex].getAttribute("value");
                } else {
                    value = arr[i].value.trim();
                }
                if (!value ||
                    arr[i].type === "email" && !/^\S+@\S+\.\S+$/.test(value) ||
                    arr[i].type === "tel" && !/^(\+972(-)?|0)([1-468-9](-)?\d{7}|(5|7)[0-9](-)?\d{7})$/.test(value) ||
                    arr[i].name === "message" && value.length < 5 ||
                    !arr[i].validity || !arr[i].validity.valid) {
                    error = arr[i].getAttribute("data-error");
                    flag = false;

                    arr[i].parentNode.classList.add("error");

                    if (!invalid && (!ui.d.activeElement || ui.d.activeElement.tagName !== "INPUT")) {
                        invalid = arr[i];
                    }
                    if (error) {
                        arr[i].setAttribute("placeholder", error);
                    }
                }
            }

            if (invalid) {
                // Focus first error field
                invalid.focus();
            }

            return flag;
        }

        return true;
    },
    serialize: function (container) {
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
        var data = this.serialize(container),
            pairs = data && data.split("&"),
            result = {},
            pair,
            key,
            val,
            i;

        if (!data || !pairs) {
            return result;
        }

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
                if (!isNaN(parseFloat(val)) && isFinite(val) && val === String(Number(val))) {
                    val = Number(val);
                }

                result[key] = val;
            }
        }

        return result;
    },
    accessibility: function (flag, container, toggleSpin, customTag) {
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
