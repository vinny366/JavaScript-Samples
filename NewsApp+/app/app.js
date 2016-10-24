define(function (require) {
    "use strict";
    /*
     * CommonJS syntax rather than RequireJS syntax for dependency injection
     */
    var $ = require('jquery');
    var jqueryUI = require('jqueryUI');
    var Handlebars = require('handlebars');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var appConfig = require('appConfig');
    var TabItemView = require('view/common/tabItemView');
    var homeView = require('view/home/homeView'); 
    var cricketView = require('view/cricket/cricketView');
    var featuresView = require('view/features/featuresView');
    var politicsView = require('view/politics/politicsView');
    var crimeView = require('view/crime/crimeView');
    var internationalView = require('view/international/internationalView');
    var appViewTmpl = require('text!view/common/appViewTmpl.html');

    var app = new Backbone.Marionette.Application();
    app.view = {
        home: homeView,
        cricket: cricketView,
        features: featuresView,
        politics: politicsView,
        crime: crimeView,
        international : internationalView
    };
    /*
     * Define the place holderregion for the app
     */
    app.addRegions({
        main: '#main'
    });
    /*
     * Function to assign views dynamically
     */
    app.assignViews = function (name) {
        /*
         * string maniplation to set the DOM name
         */
        var view = "#" + name;
        /*
         * assign the DOM to view
         */
        var obj = {};
        obj[name] = view;
        /*
         * create the region view for tabs
         */
        this.addRegions(obj);
    };
    app.addInitializer(function () {
        /*
         * callbacks function which will be executed when the application starts
         */
        this.initappLayout();
    });
    app.initappLayout = function () {
        //create the base layout
        var AppLayout = Backbone.Marionette.Layout.extend({
            tagName: 'div',
            className: 'container',
            template: appViewTmpl,
            regions: {
                tabs: "#tabsContainer"
            }
        });
        app.main.show(new AppLayout());
        
        /*
         * create a collection with the tabJSON
         */
        var navCollection = JSON.parse(sessionStorage.tabJson);
        /*
         * Show the tab header view
         */
        app.main.currentView.tabs.show(new TabItemView());
        /*
         * Call jquery UI Tabs
         */
        $('#tabs').tabs();
        /*
         * For each tab content assign appropriate views
         */
        for (var i = 0; i < navCollection.tab.length; i++) {
            app.assignViews(navCollection.tab[i].id);
        }
        /*
         * Click event for 'a' tags to trigger the router and to manage the history state
         */
        $(document).delegate("a.navMainTab", "click", function (e) {
            app.Router.navigate($(this).attr('href'), {
                trigger: true
            });
            e.preventDefault();
        });
    };
    /*
     * fires just after the initializers have finished
     */
    app.on("initialize:after", function () {
       $.ajaxSetup({
            /*
             * cache buster mechanism
             */
            cache: false,
            /*
             * error handling mechanism
             */
            complete: function (jqXHR, exception) {
                var status = jqXHR.status;
                if (status === 0 || status === 404 || status === 500 || status === 502 || status === 'timeout' || status === 'parsererror' || status === 'abort') {
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errorCode === "LOCK_ERR") {
                        return;
                    }
                    alert(jqXHR.statusText + " : " + this.url);
                }
            }
        });
        /*
         * Initialize the history management
         */
        if (!Backbone.History.started) {
            Backbone.history.start();
        }
    });
    return app;
});