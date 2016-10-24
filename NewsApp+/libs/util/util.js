/***************************************************************************************/
/* Author            :Cognizant Technology Solutions  */
/* FileName          :util.js  */
/***************************************************************************************/
 //Debounced resize() jQuery plugin
(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;
      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
          timeout = setTimeout(delayed, threshold || 100); 
      };
  }
    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');
 //Debounced resize() jQuery plugin
define(['jquery','iScroll','appConfig','vent'], function ($, IScroll, appConfig,vent) {
    var util = {
        htmlEncode: function (value) {
            "use strict";
            return $('<div/>').text(value).html();
        },
        serializeObject: function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },
        zeroAppending: function (i) {
            return i > 9 ? "" + i : "0" + i;
        },
        gridView: function (config, element) {
            var gridObject = $('#' + element).jqGrid(config)
            var $grid = $('#' + element)
            colModel = $(gridObject).jqGrid('getGridParam', 'colModel');
            $('#gbox_' + $.jgrid.jqID($grid[0].id) +
                ' tr.ui-jqgrid-labels th.ui-th-column').each(function (i) {
                var cmi = colModel[i], colName = cmi.name;
                if (cmi.sortable !== false) {
                    /*
                    * show the sorting icons
                    */
                    $(this).find('>div.ui-jqgrid-sortable>span.s-ico').show();
                } else if (!cmi.sortable && colName !== 'rn' && colName !== 'cb' && colName !== 'subgrid') {
                    // change the mouse cursor on the columns which are non-sortable
                    $(this).find('>div.ui-jqgrid-sortable').css({cursor: 'default'});
                }
            });
           return gridObject;
        },
        gridColDisplay: function ($chkBoxEl, jqGridInstance) {
            if (!$chkBoxEl.hasClass('disabled')) {
                $chkBoxEl.toggleClass('checked');
            }
            var hideColumns = [], //hidden column array
                showColumns = [], //visible column array
                colModel = '', //column model of the operational grid
                $columnDropdown = ''; //dropdown DOM
            //get the column model   
            colModel = jqGridInstance.jqGrid('getGridParam', 'colModel');
            //get dropdown DOM
            $columnDropdown = $chkBoxEl.closest('.columnDropdown');
            //set the hideColumns and showColumns array
            $columnDropdown.find('.sub_menu li').each(function (i) {
                if (!$(this).children('span').hasClass("checked")) {
                    hideColumns.push(colModel[i].name);
                } else {
                    showColumns.push(colModel[i].name);
                }
            });
            //update the viewing column length
            $columnDropdown.find('span.dropdownVal').html(showColumns.length);
            //hide the columns in grid 
            jqGridInstance.jqGrid("hideCol", hideColumns);
            //show the columns in grid
            jqGridInstance.jqGrid("showCol", showColumns);
        },
        downloadModule: function (moduleName, postData,queryData) {
          var url;
          var tempData = JSON.parse(sessionStorage.getItem('patientDetails'));
          var pd = "?",qd = "?";
          if(postData) {            
            pd += $.param(postData);
          }
          if(queryData) {            
            qd += queryData;
          }
          switch(moduleName)
          {
            case 'patientcareSummary':
              url = appConfig.setID(appConfig.url.careSummaryPrint, tempData.patientId).replace("_userName",tempData.patientName).replace("_userId",sessionStorage.careTeamID); 
              break;
            case 'allergies':
              url = appConfig.url.allergiesPrint.split(/\?/)[0] + pd + "&acoId=" + appConfig.acoId; 
              break;
            case 'medications':
              url = appConfig.url.medicationPrint.split(/\?/)[0] + pd + "&acoId=" + appConfig.acoId;
              break;
            case 'problems':                  
              url = appConfig.url.problemPrint.split(/\?/)[0] + pd + "&acoId=" + appConfig.acoId;
              break;
            case 'careTeam':
              var careTeamURL = appConfig.setID(appConfig.url.careTeamViewPrint, tempData.patientId);
              url = careTeamURL.split(/\?/)[0] + pd + "&acoId=" + appConfig.acoId;
              break;
            case 'conversationLog':
              url = appConfig.url.conversationLogViewPrint.replace("_patientName",sessionStorage.parsedPatientName)
                                                          .replace("_patientId",sessionStorage.userID)
                                                          .replace("_userName",sessionStorage.parsedCareTeamName)
                                                          .replace("_userId",sessionStorage.careTeamID); 
              break;
            case 'activityLog':
              url = appConfig.url.activityLogViewPrint + qd+ "&acoId=" + appConfig.acoId+ "&patientId=" + sessionStorage.userID+ "&patientName=" + sessionStorage.parsedPatientName+ "&userId=" + sessionStorage.careTeamID+ "&userName=" + sessionStorage.parsedCareTeamName;
            break;
            case 'personalInformation':
              url = appConfig.setID(appConfig.url.personalInfoPrint, tempData.patientId).replace("_patientName",sessionStorage.parsedPatientName).replace("_userName",tempData.patientName).replace("_userId",sessionStorage.careTeamID); 
            break
          }
          if(url){
              window.open(url, "", "width=922,height=600,left=10,top=10,resizable=1,scrollbars=1,directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0"); 
          } 
        },
        /*
        * event to check wheteher data is null
        */
        isNullOrEmpty: function (data) {
            if (data) {
                return data;
            } else {
                return "-";
            }
        },
        /*
        * Events to get the Current Time Stamp
        */
        getCurrentTimeStamp: function (currentDate) {
            var customDate=(currentDate.getFullYear()+""+util.zeroAppending(currentDate.getMonth()+1)+""+util.zeroAppending(currentDate.getDate())+""+util.zeroAppending(currentDate.getHours())+""+util.zeroAppending(currentDate.getMinutes()));
            return customDate;
        },
        /*
        * Event to get the current TimeStamp with minutes
        */        
        getCurrentTimeStampWithMin: function (currentDate) {
            var customDate=(currentDate.getFullYear()+""+util.zeroAppending(currentDate.getMonth()+1)+""+util.zeroAppending(currentDate.getDate())+""+util.zeroAppending(currentDate.getHours())+""+util.zeroAppending(currentDate.getMinutes())+""+util.zeroAppending(currentDate.getSeconds()));
            return customDate;
        },
        /*
        * The current date time in ISO format
        */        
        getCurrentISODateTime: function () {
            return moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        }, 
        /*
        * Evnets to display the columns - show/ Hide
        */            
        columnDisp: function (that, holder, id) {
            //To chack if no prior instances are there 
            if (!that.gridVerticalScroll && !that.gridHorizontalScroll) {
                var hideColumns = [],
                    cm = that.jqGrid.jqGrid('getGridParam', 'colModel');
                /*
                * collecting all the columns values to show/ hide in grid
                */
                $(that.el).find('.sub_menu li').each(function (i,val) {
                    //console.log(val)
                    if (!$(val).children('span').hasClass("checked")) {
                        if(cm[i]){
                        hideColumns.push(cm[i].name); //array consisting of hidden columns
                        }
                    }
                });
                that.jqGrid.jqGrid("hideCol", hideColumns); //input the hidden array to hide the grid columns
                /*
                * vertical iscroll ID appending
                */
                $(that.el).find(".ui-jqgrid-bdiv").attr("id", id);
                /*
                * iScroll horizontal scroll instance
                */
                that.gridHorizontalScroll = new IScroll(holder, {
                    momentum: false,
                    bounce: false,
                    checkDOMChanges: true
                });
                /*
                * iScroll vertical scroll instance
                */
                that.gridVerticalScroll = new IScroll(id, {
                    checkDOMChanges: true
                });
            }
        },
        /*
        * Events to split the value
        */
        split : function ( val ) {
            //Split val on ',' 
            return val.split( /,\s*/ );
        },
        /*
        * Jquery Validate events for validating the forms
        */
        jqueryValidate:function(form,rules,ajax)
        {
            $(form).validate({
                rules: rules,
                  //to prevent displaying error messages for each input control
                   errorPlacement: function(error,element) {
                   return true;
                  },
                  invalidHandler: function(formEvent, validator) {
                        var errors = validator.numberOfInvalids();
                        if (errors) {
                            $(form).find(".warningMsg").removeClass("disNone");  
                        }
                  },
                    /*
                    * submit the form if valid
                    */
                   submitHandler: function() {
                        $.ajax(ajax);
                        return false;
                   }
            });
        },
        extractLast : function  (term) {
            /*
            * Return the last item of an array
            */
            return this.split(term).pop();
        },
        validateModel: function (model, attrs, options) {
            var errors = [];
            var emptyRequiredFields = [];
            _.each(attrs, function (val, attr) {
                if (model.validations[attr] && model.validations[attr].required) {
                    if (!val || val.length === 0) {
                        emptyRequiredFields.push(attr); 
                    }
                } 
                if (model.validations[attr] && model.validations[attr].length) {
                    if(val && val.length > model.validations[attr].length) {
                        errors.push({
                            field: attr,
                            message: model.validations[attr].message
                        });
                    }
                }
            });
            if(emptyRequiredFields.length>0) {
                errors.push({                                                 
                    fields: emptyRequiredFields,
                    message: "Please enter all mandatory fields"
                });
            }
            return (errors.length > 0) ? errors : false;
        },
        showErrorMessages: function(errors, view, dom) {
          /*
          * Events to show the errors in application
          */
            if(errors) {
              vent.trigger("isError", {"errorMsg": errors, "dom": dom});
            }
        },
        clearErrorMessages: function() {
          /*
          * Events to clear the errors in application
          */
            $(".errorMessage").clear().hide();
            $(".borderAlert").removeClass("borderAlert");
        },
        getFilterValuesUrl: function (filterType, concept) {
            return appConfig.url.filterValueDropdownModel.replace("_filterType", filterType).replace("_concept", concept).replace("_patientId", this.getPatientDetail("patientId"));
        },
        validateEmail:function(emailID){
            var emailField = $("#"+emailID).val();
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(emailField) == false) 
            {
                return false;
            }
            return true;            
        },
        allowOnlyNumbers:function(event){
           if(event.shiftKey && ((event.keyCode >=48 && event.keyCode <=57) 
                   || (event.keyCode >=186 &&  event.keyCode <=222)) ){
              // Ensure that it is a number and stop the Special chars
               event.preventDefault();
           }
           else if ((event.shiftKey || event.ctrlKey) && (event.keyCode > 34 && event.keyCode < 40)){     
                // let it happen, don't do anything
           }      
           else{
              // Allow only backspace , delete, numbers               
              if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 39 ||event.keyCode == 37 
                      || (event.keyCode >=48 && event.keyCode <=57) || (event.keyCode >=96 && event.keyCode <=105)) {
                  // let it happen, don't do anything
              }
              else {
                 // Ensure that it is a number and stop the key press
                      event.preventDefault();                   
              }
           }
            /*
            * To move the focus towards the next field, like ssn,phone number
            *Get the current element and the next element
            */
           var el=$(event.currentTarget),
           nextEl=el.next();
             /*
            *  check the following conditions
            *  input value equal to three
            *  key code not equal to delete and backspace
            *  next input has class readonly
            */
            if(el.val().length==3 && event.keyCode!==8 && !window.getSelection().toString() && event.keyCode!==46 && nextEl.hasClass('readonly'))
            {
                  /*
                  *remove the readonly attribute and shift the focus to the next element
                  */             
                        nextEl.removeAttr('readonly');
                        nextEl.focus();
            }
        },
       checkPassword: function (inputtxt) 
        { 
          var inputtxtVal = document.getElementById(inputtxt).value;
          var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*_+-])[a-zA-Z0-9!@#$%^&*_+-]{6,12}$/;
          if(inputtxtVal.match(paswd)) 
          { 
          return true;
          }
          else
          { 
          return false;
          }
        },                 
        // Function to check letters and numbers
       alphaNumeric : function(inputtxt)
       {
          var inputtxtVal = document.getElementById(inputtxt).value;        
          var letterNumber = /^[0-9a-zA-Z]+$/;
          if(inputtxtVal.match(letterNumber)) 
          {
            return true;
          }
          else
          { 
            return false; 
          }
        },
        validateUrl: function(inputtxt) {
              var inputtxtVal = document.getElementById(inputtxt).value;
              var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
              if (pattern.test(inputtxtVal)) {
                  return true;
              }else{ 
                  return false;
              }

          },        
        createUserFormElementsValidation:function(elementId, ErrorMessageHolder, ErrorMessage){
                    $("#"+elementId).css('border','1px solid red');
                    $("#"+elementId).focus();
                    $(ErrorMessageHolder).text(ErrorMessage);
                    $(ErrorMessageHolder).show();
        },
        checkInputTextValue:function(selectorVal){
          var inputVal = $.trim($(selectorVal).val());
          return (inputVal === "" || inputVal === null || inputVal === undefined) ? false : true;
        },
        getPatientDetail: function(fieldName) {
            return JSON.parse(sessionStorage.patientDetails)[fieldName];
        },
        setAuditParams: function(url) {
            return url.replace("_patientId", this.getPatientDetail("patientId"))
                .replace("_patientName", this.getPatientDetail("patientName"))
                .replace("_userId", sessionStorage.careTeamID)
                .replace("_userName", sessionStorage.careTeamName);
        },
        setDefaultValueForNull: function(value) {
       		return (value) ? value : '""';
        },
        setISODateValue: function(value) {
        	if(value){
        		value = moment(value).format(appConfig.ISODateFormat);
        	}else{
        		value = '""';
        	}
       		return value;
        },
        setFormattedDateValue: function(value) {
          if(value){
            value = moment(value).format("MMM DD, YYYY");
          }else{
            value = this.setEmptyValueForDefault(value);
          }
          return value;
        },
        setFormattedDateValueWithTime: function(value) {
          if(value){
            value = moment(value).format("MMM DD, YYYY HH:mm A");
          }else{
            value = this.setEmptyValueForDefault(value);
          }
          return value;
        },        
        setEmptyValueForDefault: function(value) {
            return (value === '""' || value===null)?"":value;
        },
        /** Retrieves the user-preferences for given screen
         *  Accepts a config hash, as explained below:
         *  userPrefsUrl: the URL to fetch user preferences from
         *  defaultUserPrefsUrl: URL to fetch the fallback default user preferences from; typically a local json
         *  gridColumnConfig: The default column configuration for the grid 
         */
        getUserPreferences: function(view, config, callback) {
            var that=this;
            var colModelVal; //Holds the user-prefs merged col models

            //This is a jquery Deferred object that's used to invoke a callback in the caller
            var postCallBack = $.Deferred();
            postCallBack.done(function() {
                //Callback invoked when colModel has merged with user prefs, 
                //passing the view object as function context (the value of 'this')
                //and colModelVal as the param of the callback function
                if(callback) callback.call(view, colModelVal);
            });

            //Fetch the user preferences from the URL specified in config param
            $.ajax({
                url: config.userPrefsUrl,
                id: "userPrefsUrlAjaxId",
                type: "GET",
                dataType: "text",
                "data":{'loginUser':sessionStorage.careTeamID},
                success: function (response) {
                    var response=JSON.parse(response);
                    if (response.length === 0 || response === null || response == 'true' || response == true ) {
                        /*
                        * Ajax call from local if the service returned is empty for first time login user
                        */
                        $.ajax({
                            url: config.defaultUserPrefsUrl,
                            id: "defaultUserPrefsUrlAjaxId",
                            type: "GET",
                            dataType: "json",
                            async: false,
                            success: function (response) {
                                /*
                                * Calling function with the column model and default configurations
                                */
                                colModelVal = that.loadGridConfig(response, config);
                            }
                        });
                    } else {                          
                        /*
                         * Calling function with the column model and default configurations
                         */
                         colModelVal = that.loadGridConfig(response, config);
                    }
                }
            }).done(function(){
                //Resolve the deferred object created above when the ajax is done
                postCallBack.resolve(colModelVal);
            });
        },
        loadGridConfig:function(columModelVal,config) {
            var resultedColModel = new Array();
            var gridColumnConfig = config.gridColumnConfig;
             /*
             * Comparing the default configuration with the json response
             * Using jsonmap attribute which is the root node of default config plucking the details of the records
             * Pushing the results in a new array with the entire set of results 
             */
            for (var i = 0; i < columModelVal.length; i++) {
                //var colmModelFromJSON = _.pluck(gridColumnConfig, columModelVal[i].jsonmap)[i];
                var colmModelFromJSON = _.findWhere(gridColumnConfig, {"fieldName":columModelVal[i].jsonmap});
                if(columModelVal[i].width && (columModelVal[i].width+"").indexOf("px")===-1) { //width may be a number
                   columModelVal[i].width += "px";
                }
                if (columModelVal[i] && colmModelFromJSON) {
                    _.extend(colmModelFromJSON,columModelVal[i]);
                    resultedColModel.push(colmModelFromJSON);
                }
            }
            //that.gridColumnConfig = resultedColModel;
            return resultedColModel;
        },   
        saveUserPreferences: function(config) {
            var columnModel = config.columnModel; //$('#homeWorklistGridHeaderArea_grid').jqGrid('getGridParam', 'colModel');
            var resultArray = _.map(columnModel, function (col) {
                var dropDownVal = _.findWhere(config.dropDownValues, {jsonmap: col.jsonmap});
                var mapVal = {
                    "isChecked": dropDownVal.isChecked,
                    "isDisabled": dropDownVal.isDisabled,
                    "name": col.header,
                    "jsonmap": col.fieldName,
                    "dropDownShow": col.dropDownShow,
                    "width": col.width
                };
                return mapVal;
            });
            $.ajax({
                type: "PUT",
                contentType: "application/text",
                url: config.userPrefSaveUrl,
                id: "userPrefSaveUrlAjaxId",
                dataType: 'text',
               // "data":{'loginUser':sessionStorage.careTeamID},
                data: JSON.stringify(resultArray),
                success: function () {
                },
                error: function () {
                }
            });  
        }
    };
    return util;
});
