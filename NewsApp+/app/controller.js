define(function (require) {
    "use strict";
    /*
     * CommonJS syntax rather than RequireJS syntax for dependency injection
     */
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var App = require('app');
    var vent = require('vent');
    vent.on('setActiveTab', function (index) {
       
       
        var currentTabIndex = index;
        $("#tabs ul.nav li").removeClass("active");
        $("#tabs ul.nav li").eq(currentTabIndex+1).addClass("active");
    });
    return {
        /*
         * state handler for home tab
         */
        home: function () {
            if (App.home) {
                App.home.show(new App.view.home());
                var index = $('#tabs a[href="#home"]').parent().index();
                vent.trigger('setActiveTab', --index);
            } 
        },
        /*
        * state handler for default tab
        */
        default: function(){
            if (App.home) {
                App.home.show(new App.view.home());
                var index = $('#tabs a[href="#home"]').parent().index();
                vent.trigger('setActiveTab', --index);
            } 
        },
        /*
         * state handler for cricket tab
         */
        cricket: function () {
            App.cricket.show(new App.view.cricket());
            var index = $('#tabs a[href="#cricket"]').parent().index();
            vent.trigger('setActiveTab', --index);
        },
        /*
         * state handler for Features tab
         */
        features: function () {
            App.features.show(new App.view.features());
            var index = $('#tabs a[href="#features"]').parent().index();
            vent.trigger('setActiveTab', --index);
        },
        /*
         * state handler for politics tab
         */
        politics: function () {
            App.politics.show(new App.view.politics());
            var index = $('#tabs a[href="#politics"]').parent().index();
            vent.trigger('setActiveTab', --index);
        },
        /*
         * state handler for crime tab
         */
        crime: function () {
            App.crime.show(new App.view.crime());
            var index = $('#tabs a[href="#crime"]').parent().index();
            vent.trigger('setActiveTab', --index);
        },
        /*
         * state handler for international tab
         */
        international: function () {
            App.international.show(new App.view.international());
            var index = $('#tabs a[href="#international"]').parent().index();
            vent.trigger('setActiveTab', --index);
        }
        
        
        
    };
});