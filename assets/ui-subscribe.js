"use strict";

ui.subscribe = {
    key: "2d8c12be3a09dc2eb907c9be7",
    endpoint: "https://laukstein.us13.list-manage.com/subscribe/post-json",
    success: function (data) {

        data = typeof data === "object" && !(data instanceof Event) ? data : undefined;

        var self = ui.subscribe,
            message = "";

        if (data) {
            if (data.result === "success") {
                self.redirectURL = "/success?utm_source=subscribe";

                if (self.utmCampaign) {
                    self.redirectURL += "&utm_campaign=" + self.utmCampaign;
                }

                message += "<p>טעינה...</p>";
                ui.w.location = self.redirectURL;
            } else if (data.msg && data.msg.indexOf("list-manage.com/subscribe/send-email")) {
                message += "<h1 class=error>שגיאה...</h1><p>את כבר רשומה, תנסי עם <a href=" + location.href + ">אימייל אחר</a></p>";
            } else {
                message += "<h1 class=error>שגיאה...</h1><p>בבקשה <a href=" + location.href + ">תנסי שוב</a> מאוחר יותר</p>";
            }
        } else {
            message += "<h1 class=error>שגיאה בשרת...</h1><p>ניתן להירשם דרך <a href=//www.facebook.com/LeaLaukstein/>LeaLaukstein</a> או <a href=" + location.href + ">תנסי שוב</a></p>";
        }

        self.el.innerHTML = message;
    },
    send: function (e) {
        var self = ui.subscribe,
            script,
            head;

        self.session = ui.form.deserialize(self.el);

        if (e) {
            e.preventDefault();
        }
        if (self.active && ui.form.valid(self.required)) {
            ui.setUser(self.session);

            script = ui.d.createElement("script");
            script.src = self.el.action + "&" + ui.form.serialize(self.el) + "&b_" + self.key + "_" + self.name + "&_=" + ui.generateID() + "&c=ui.subscribe.success";
            script.addEventListener("error", self.success);
            head = ui.d.getElementsByTagName("head")[0];

            ui.form.accessibility();

            if (self.currentScript) {
                head.removeChild(currentScript);
            }

            head.appendChild(script);

            self.currentScript = script;
        }
    },
    init: function (id) {
        if (!this.active) {
            this.el = ui.form.el = id && ui.d.getElementById(id);

            if (this.el) {
                this.name = this.el.getAttribute("name");

                if (this.name) {
                    this.active = true;
                    this.el.action = this.endpoint + "?u=" + this.key + "&id=" + this.name;
                    this.utmCampaign = ui.hash({
                        hash: location.search,
                        param: "utm_campaign"
                    }) || this.el.getAttribute("data-utm_campaign");

                    if (this.utmCampaign) {
                        this.el.action += "&UTM=" + this.utmCampaign;
                    }

                    this.el.addEventListener("submit", this.send);
                    this.required = ui.form.list("[data-required]");
                    var tel = ui.d.getElementById("tel");

                    if (tel) {
                        tel.addEventListener("keypress", ui.form.number);
                        tel.addEventListener("paste", ui.form.paste);
                        tel.addEventListener("drop", ui.form.drop);
                    }
                }
            }
        }
    }
};

ui.subscribe.init("subscribe");
