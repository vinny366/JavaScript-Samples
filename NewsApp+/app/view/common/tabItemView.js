define(function (require) {
    "use strict";
    /*
    * CommonJS syntax rather than RequireJS syntax for dependency injection
    */
    var $ = require('jquery');
    var bootstrap = require('bootstrap');
    var Handlebars = require('handlebars');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var appConfig = require('appConfig');
    var navBarTmpl = require('text!view/common/tabItemTmpl.html');
    var vent = require('vent');
    var TabItem = Backbone.Marionette.ItemView.extend({
        template: Handlebars.compile(navBarTmpl),
        initialize: function () {

        },
        render: function () {
            var tempData = JSON.parse(sessionStorage.tabJson);
            var template = this.template;
            this.$el.html(template(tempData));
            return this;
        }
    });
    return TabItem;
});
