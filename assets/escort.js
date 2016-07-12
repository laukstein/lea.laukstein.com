var escort = {
    schema: {
        duration: 7,
        reminder: 1,
        less: {
            title: "ליווי אישי 1+2",
            id: "1207e20b7b"
        },
        more: {
            title: "ליווי אישי",
            id: "5a1dd0b0bd"
        }
    },
    hash: function (param) {
        "use strict";

        var arr = location.hash.slice(1).split("&"),
            obj = {},
            pair,
            i;

        if (arr.length) {
            for (i = 0; i < arr.length; i += 1) {
                pair = arr[i].split("=");

                if (pair[0]) {
                    obj[pair[0]] = !isNaN(pair[1]) ? Number(pair[1]) : pair[1] && decodeURIComponent(pair[1]);
                }
            }
        }

        return param ? obj[param] : obj;
    },
    diff: function() {
        "use strict";

        try {
            this.schema.u = this.hash("u");

            return this.schema.u ? Math.abs(Math.floor((new Date(this.schema.u * 1000).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 8.64e+7)) : Infinity;
        } catch (e) {
            return Infinity;
        }
    },
    data: function () {
        "use strict";

        this.schema.r = !!this.hash("r");

        return this.diff() > this.schema[this.schema.r ? "reminder" : "duration"] ? this.schema.more : this.schema.less;
    },
    run: function () {
        "use strict";

        if (!this.schema.u || this.schema.u !== this.hash("u") || this.schema.r !== this.hash("r")) {
            var el = {
                    title: document.getElementById("title"),
                    form: document.getElementById("form")
                },
                data = this.data();

            if (el.title) {
                el.title.innerHTML = data.title;
            }
            if (el.form) {
                el.form.innerHTML = "<iframe src=\"//laukstein.us13.list-manage.com/subscribe?u=2d8c12be3a09dc2eb907c9be7&id=" + data.id + "\"></iframe>";
            }
        }
    }
};
window.onhashchange = function () {
    "use strict";

    escort.run();
};

escort.run();
