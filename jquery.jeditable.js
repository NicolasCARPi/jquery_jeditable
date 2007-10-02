/*
 * Jeditable - jQuery in place edit plugin
 *
 * Copyright (c) 2006-2007 Mika Tuupola, Dylan Verheul
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Revision: $Id$
 *
 */

/**
  * Based on editable by Dylan Verheul <dylan@dyve.net>
  * http://www.dyve.net/jquery/?editable
  *
  * Version 1.5.0
  *
  * @name  Jeditable
  * @type  jQuery
  * @param String  target             POST URL or function name to send edited content
  * @param Hash    options            additional options 
  * @param String  options[name]      POST parameter name of edited content
  * @param String  options[id]        POST parameter name of edited div id
  * @param Hash    options[submitdata] Extra parameters to send when submitting edited content.
  * @param String  options[type]      text, textarea or select
  * @param Integer options[rows]      number of rows if using textarea
  * @param Integer options[cols]      number of columns if using textarea
  * @param Mixed   options[height]    'auto', 'none' or height in pixels
  * @param Mixed   options[width]     'auto', 'none' or width in pixels 
  * @param String  options[loadurl]   URL to fetch external content before editing
  * @param String  options[loadtype]  Request type for load url. Should be GET or POST.
  * @param String  options[loadtext]  Text to display while loading external content.
  * @param Hash    options[loaddata]  Extra parameters to pass when fetching content before editing.
  * @param String  options[data]      Or content given as paramameter.
  * @param String  options[indicator] indicator html to show when saving
  * @param String  options[tooltip]   optional tooltip text via title attribute
  * @param String  options[event]     jQuery event such as 'click' of 'dblclick'
  * @param String  options[onblur]    'cancel', 'submit' or 'ignore'
  * @param String  options[submit]    submit button value, empty means no button
  * @param String  options[cancel]    cancel button value, empty means no button
  * @param String  options[cssclass]  CSS class to apply to input form. 'inherit' to copy from parent.
  * @param String  options[style]     Style to apply to input form 'inherit' to copy from parent.
  * @param String  options[select]    true or false, when true text is highlighted
  *             
  */


(function($) {

    $.fn.editable = function(target, options) {
    
        var settings = {
            target     : target,
            name       : 'value',
            id         : 'id',
            type       : 'text',
            width      : 'auto',
            height     : 'auto',
            event      : 'click',
            onblur     : 'cancel',
            loadtype   : 'GET',
            loadtext   : 'Loading...',
            placeholder: 'Click to edit',
            loaddata   : {},
            submitdata : {}
        };
        
        if(options) {
            $.extend(settings, options);
        }
    
        /* setup some functions */
        var plugin   = $.editable.types[settings.type].plugin || function() { };
        var submit   = $.editable.types[settings.type].submit || function() { };
        var buttons  = $.editable.types[settings.type].buttons 
                    || $.editable.types['defaults'].buttons;
        var content  = $.editable.types[settings.type].content 
                    || $.editable.types['defaults'].content;
        var element  = $.editable.types[settings.type].element 
                    || $.editable.types['defaults'].element;
        var callback = settings.callback || function() { };
          
        $(this).attr('title', settings.tooltip);
        
        settings.autowidth  = 'auto' == settings.width;
        settings.autoheight = 'auto' == settings.height;

        return this.each(function() {
            
            /* if element is empty add something clickable (if requested) */
            if (!$.trim($(this).html())) {
                $(this).html(settings.placeholder);
            }
            
            $(this)[settings.event](function(e) {

                /* remove placeholder text */
                if ($(this).html() == settings.placeholder) {
                    $(this).html('');
                }

                /* save this to self because this changes when scope changes */
                var self = this;

                /* prevent throwing an exeption if edit field is clicked again */
                if (self.editing) {
                    return;
                }

                /* figure out how wide and tall we are */
                if (settings.width != 'none') {
                    settings.width = 
                        settings.autowidth ? $(self).width()  : settings.width;
                }
                if (settings.height != 'none') {
                    settings.height = 
                        settings.autoheight ? $(self).height() : settings.height;
                }
                
                self.editing    = true;
                self.revert     = $(self).html();
                self.innerHTML  = '';

                /* create the form object */
                var form = $('<form/>');

                /* add created form to self */
                $(self).append(form);
                
                /* apply css or style or both */
                if (settings.cssclass) {
                    if ('inherit' == settings.cssclass) {
                        form.attr('class', $(self).attr('class'));
                    } else {
                        form.attr('class', settings.cssclass);
                    }
                }
        
                if (settings.style) {
                    if ('inherit' == settings.style) {
                        form.attr('style', $(self).attr('style'));
                        /* IE needs the second line or display wont be inherited */
                        form.css('display', $(self).css('display'));                
                    } else {
                        form.attr('style', settings.style);
                    }
                }
        
                /* add main input element to form and store it in input */
                var input = element.apply(form, [settings, self]);

                /* set input content via POST, GET, given data or existing value */
                var input_content;
                
                if (settings.loadurl) {
                    var t = setTimeout(function() {
                        input.disabled = true;
                        content.apply(form, [settings.loadtext, settings, self]);
                    }, 100);

                    var loaddata = {};
                    loaddata[settings.id] = self.id;
                    if ($.isFunction(settings.loaddata)) {
                        $.extend(loaddata, settings.loaddata.apply(self, [self.revert, settings]));
                    } else {
                        $.extend(loaddata, settings.loaddata);
                    }
                    $.ajax({
                       type : settings.loadtype,
                       url  : settings.loadurl,
                       data : loaddata,
                       async : false,
                       success: function(result) {
                       	  window.clearTimeout(t);
                       	  input_content = result;
                          input.disabled = false;
                       }
                    });
                } else if (settings.data) {
                    input_content = settings.data;
                    if ($.isFunction(settings.data)) {
                        input_content = settings.data.apply(self, [self.revert, settings]);
                    }
                } else {
                    input_content = self.revert; 
                }
                content.apply(form, [input_content, settings, self]);

                input.attr('name', settings.name);
        
                /* add buttons to the form */
                buttons.apply(form, [settings, self]);

                /* highlight input contents when requested */
                if (settings.select) {
                    input.select();
                }
         
                /* attach 3rd party plugin if requested */
                plugin.apply(form, [settings, self]);

                /* focus to first visible form element */
                $(':input:visible:enabled:first', form).focus();
        
                /* discard changes if pressing esc */
                input.keydown(function(e) {
                    if (e.keyCode == 27) {
                        e.preventDefault();
                        reset();
                    }
                });

                /* discard, submit or nothing with changes when clicking outside */
                /* do nothing is usable when navigating with tab */
                var t;
                if ('cancel' == settings.onblur) {
                    input.blur(function(e) {
                        t = setTimeout(reset, 500);
                    });
                } else if ('submit' == settings.onblur) {
                    input.blur(function(e) {
                        form.submit();
                    });
                } else {
                    input.blur(function(e) {
                      /* TODO: maybe something here */
                    });
                }

                form.submit(function(e) {

                    if (t) { 
                        clearTimeout(t);
                    }

                    /* do no submit */
                    e.preventDefault(); 
            
                    /* if this input type has a call before submit hook, call it */
                    submit.apply(form, [settings, self]);

                    /* check if given target is function */
                    if ($.isFunction(settings.target)) {
                        var str = settings.target.apply(self, [input.val(), settings]);
                        self.innerHTML = str;
                        self.editing = false;
                        callback.apply(self, [self.innerHTML, settings]);
                    } else {
                        /* add edited content and id of edited element to POST */
                        var submitdata = {};
                        submitdata[settings.name] = input.val();
                        submitdata[settings.id] = self.id;
                        /* add extra data to be POST:ed */
                        if ($.isFunction(settings.submitdata)) {
                            $.extend(submitdata, settings.submitdata.apply(self, [self.revert, settings]));
                        } else {
                            $.extend(submitdata, settings.submitdata);
                        }          

                        /* show the saving indicator */
                        $(self).html(settings.indicator);
                        $.post(settings.target, submitdata, function(str) {
                            self.innerHTML = str;
                            self.editing = false;
                            callback.apply(self, [self.innerHTML, settings]);
                            /* TODO: this is not dry */                              
                            if (!$.trim($(self).html())) {
                                $(self).html(settings.placeholder);
                            }
                        });
                    }
                     
                    return false;
                });

                function reset() {
                    self.innerHTML = self.revert;
                    self.editing   = false;
                    if (!$.trim($(self).html())) {
                        $(self).html(settings.placeholder);
                    }
                }

            });
        });

    };


    $.editable = {
        types: {
            defaults: {
                element : function(settings, original) {
                    var input = $('<input type="hidden">');                
                    $(this).append(input);
                    return(input);
                },
                content : function(string, settings, original) {
                    $(':input:first', this).val(string);
                },
                buttons : function(settings, original) {
                    if (settings.submit) {
                        var submit = $('<input type="submit">');
                        submit.val(settings.submit);
                        $(this).append(submit);
                    }
                    if (settings.cancel) {
                        var cancel = $('<input type="button">');
                        cancel.val(settings.cancel);
                        $(this).append(cancel);

                        $(cancel).click(function() {
                            $(original).html(original.revert);
                            original.editing = false;
                        });
                    }
                }
            },
            text: {
                element : function(settings, original) {
                    var input = $('<input>');
                    if (settings.width  != 'none') { input.width(settings.width);  }
                    if (settings.height != 'none') { input.height(settings.height); }
                    /* https://bugzilla.mozilla.org/show_bug.cgi?id=236791 */
                    //input[0].setAttribute('autocomplete','off');
                    input.attr('autocomplete','off');
                    $(this).append(input);
                    return(input);
                }
            },
            textarea: {
                element : function(settings, original) {
                    var textarea = $('<textarea>');
                    if (settings.rows) {
                        textarea.attr('rows', settings.rows);
                    } else {
                        textarea.height(settings.height);
                    }
                    if (settings.cols) {
                        textarea.attr('cols', settings.cols);
                    } else {
                        textarea.width(settings.width);
                    }
                    $(this).append(textarea);
                    return(textarea);
                }
            },
            select: {
                element : function(settings, original) {
                    var select = $('<select>');
                    $(this).append(select);
                    return(select);
                },
                content : function(string, settings, original) {
                    if (String == string.constructor) { 	 
                        eval ('var json = ' + string);
                        for (var key in json) {
                            if ('selected' == key) {
                                continue;
                            } 
                            var option = $('<option>').val(key).append(json[key]);
                            $('select', this).append(option); 	 
                        }
                    }
                    /* Loop option again to set selected. IE needed this... */ 
                    $('select', this).children().each(function() {
                        if ($(this).val() == json['selected']) {
                            $(this).attr('selected', 'selected');
                        };
                    });
                }
            }
        },

        /* Add new input type */
        addInputType: function(name, input) {
            $.editable.types[name] = input;
        }
    };

})(jQuery);
