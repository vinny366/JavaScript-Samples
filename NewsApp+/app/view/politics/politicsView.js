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
     var politicsModel = require('model/politicsModel');
     var politicsTmpl = require('text!view/politics/politicsTmpl.html');
     var appConfig = require('appConfig');
     /**
      * creating a sub view - Cricket
      */
     var politicsView = Backbone.Marionette.ItemView.extend({
         template: Handlebars.compile(politicsTmpl),
         model: new politicsModel(),
         className: 'demoViewClass',
         initialize: function () {
             var template = this.template;
             this.model.url = appConfig.url.queryModel
             /**
              * fetching the data from the model
              */
             this.model.fetch({
                 data:{
                    q : 'select * from rss where url ="http://in.news.yahoo.com/rss/politics"',
                    format : 'json'
                 },
                 success: function (data) {
                     $('#politics').html(template({
                         "data": data.toJSON()
                     }));
                      $('.newDescription').dotdotdot();
                 }
             });
         }
     });
     return politicsView;
 });
