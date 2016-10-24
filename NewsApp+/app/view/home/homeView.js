define(function (require) {
     "use strict";
     /*
      * CommonJS syntax rather than RequireJS syntax for dependency injection
      */
     var $ = require('jquery');
     var Handlebars = require('handlebars');
     var dotdot = require('dotdot');
     var Backbone = require('backbone');
     var Marionette = require('marionette');
     var homeModel = require('model/homeModel');
     var homeViewTmpl = require('text!view/home/homeViewTmpl.html');
     var appConfig = require('appConfig');
     /**
      * creating a sub view - India
      */
     var homeView = Backbone.Marionette.ItemView.extend({
         template: Handlebars.compile(homeViewTmpl),
         model: new homeModel(),
         className: 'demoViewClass',
         initialize: function () {
             var template = this.template;
             this.model.url = appConfig.url.queryModel
             /**
              * fetching the data from the model
              */
             this.model.fetch({
                 data:{
                    q : 'select * from rss where url ="http://in.news.yahoo.com/rss/india"',
                    format : 'json'
                 },
                 success: function (data) {
                    $('#home').html(template({
                        "data": data.toJSON()
                    }));
                    $('.newDescription').dotdotdot();
                 }
             });
             
         }
     });
     return homeView;
 });
