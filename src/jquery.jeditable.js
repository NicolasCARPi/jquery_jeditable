/**
 * @file Jeditable - jQuery in place edit plugin
 * @home https://github.com/NicolasCARPi/jquery_jeditable
 * @author Mika Tuupola, Dylan Verheul, Nicolas CARPi
 * @copyright © 2006 Mika Tuupola, Dylan Verheul, Nicolas CARPi
 * @licence MIT (see LICENCE file)
 * @name Jquery-jeditable
 * @type  jQuery
 * @version 1.8.1
 *
 * @param {String|Function} target - URL or Function to send edited content to
 * @param {Object} [options] - Additional options
 * @param {Object} [options.ajaxoptions] - jQuery Ajax options. See https://api.jquery.com/jQuery.ajax/
 * @param {Function} [options.before] - Function to be executed before going into edit mode
 * @param {Function} [options.callback] - Function to run after submitting edited content
 * @param {String} [options.cancel] - Cancel button value, empty means no button
 * @param {Number} [options.cols] - Number of columns if using textarea
 * @param {String} [options.cssclass] - CSS class to apply to input form; use 'inherit' to copy from parent
 * @param {String|Function} [options.data] - Content loaded in the form
 * @param {String} [options.event='click'] - jQuery event such as 'click' of 'dblclick'. See https://api.jquery.com/category/events/
 * @param {String|Number} [options.height='auto'] - Height of the element in pixels or 'auto' or 'none'
 * @param {String} [options.id='id'] - POST parameter name of edited div id
 * @param {String} [options.indicator] - Indicator html to show when saving
 * @param {String} [options.label] - Label for the form
 * @param {String|Function} [options.loaddata] - Extra parameters to pass when fetching content before editing
 * @param {String} [options.loadtext='Loading…'] - Text to display while loading external content
 * @param {String} [options.loadtype='GET'] - Request type for load url (GET or POST)
 * @param {String} [options.loadurl] - URL to fetch input content before editing
 * @param {String} [options.maxlength] - The maximum number of character in the text field
 * @param {String} [options.method] - Method to use to send edited content (POST or PUT)
 * @param {String} [options.name='value'] - POST parameter name of edited content
 * @param {String|Function} [options.onblur='cancel'] - Use 'cancel', 'submit' or function
 * @param {Function} [options.onerror] - function(settings, original, xhr) { ... } called on error
 * @param {Function} [options.onreset] - function(settings, original) { ... } called before reset
 * @param {Function} [options.onsubmit] - function(settings, original) { ... } called before submit
 * @param {String} [options.placeholder='Click to edit'] - Placeholder text or html to insert when element is empty
 * @param {Number} [options.rows] - number of rows if using textarea
 * @param {Boolean} [options.select] - When true text is selected
 * @param {Function} [options.showfn]- Function that can animate the element when switching to edit mode
 * @param {String} [options.size] - The size of the text field
 * @param {String} [options.style] - Style to apply to input form; 'inherit' to copy from parent
 * @param {String} [options.submit] - submit button value, empty means no button
 * @param {Object} [options.submitdata] - Extra parameters to send when submitting edited content
 * @param {String} [options.tooltip] - Tooltip text that appears on hover (via title attribute)
 * @param {String} [options.type='text'] - text, textarea or select (or any 3rd party input type)
 * @param {String|Number} [options.width='auto'] - The width of the element in pixels or 'auto' or 'none'
 *
 * @example <caption>Simple usage example:</caption>
 * $(".editable").editable("save.php", {
 *     cancel : 'Cancel',
 *     submit : 'Save',
 *     tooltip : "Click to edit...",
 * });
 */
(function($) {

    $.fn.editable = function(target, options) {

        if ('disable' == target) {
            $(this).data('disabled.editable', true);
            return;
        }
        if ('enable' == target) {
            $(this).data('disabled.editable', false);
            return;
        }
        if ('destroy' == target) {
            $(this)
                .unbind($(this).data('event.editable'))
                .removeData('disabled.editable')
                .removeData('event.editable');
            return;
        }
        var settings = $.extend({}, $.fn.editable.defaults, {target:target}, options);

        /* setup some functions */
        var plugin   = $.editable.types[settings.type].plugin || function() { };
        var submit   = $.editable.types[settings.type].submit || function() { };
        var buttons  = $.editable.types[settings.type].buttons || $.editable.types.defaults.buttons;
        var content  = $.editable.types[settings.type].content || $.editable.types.defaults.content;
        var element  = $.editable.types[settings.type].element || $.editable.types.defaults.element;
        var reset    = $.editable.types[settings.type].reset || $.editable.types.defaults.reset;
        var callback = settings.callback || function() { };
        var intercept = settings.intercept || function(s) { return s; };
        var onedit   = settings.onedit   || function() { };
        var onsubmit = settings.onsubmit || function() { };
        var onreset  = settings.onreset  || function() { };
        var onerror  = settings.onerror  || reset;
        var before   = settings.before || false;

        // TOOLTIP
        if (settings.tooltip) {
            $(this).attr('title', settings.tooltip);
        }

        return this.each(function() {

            /* Save this to self because this changes when scope changes. */
            var self = this;

            /* Save so it can be later used by $.editable('destroy') */
            $(this).data('event.editable', settings.event);

            /* If element is empty add something clickable (if requested) */
            if (!$.trim($(this).html())) {
                $(this).html(settings.placeholder);
            }

            // EVENT IS FIRED
            $(this).bind(settings.event, function(e) {

                /* Abort if element is disabled. */
                if (true === $(this).data('disabled.editable')) {
                    return;
                }

                /* Prevent throwing an exeption if edit field is clicked again. */
                if (self.editing) {
                    return;
                }

                /* Abort if onedit hook returns false. */
                if (false === onedit.apply(this, [settings, self, e])) {
                   return;
                }

                /* execute the before function if any was specified */
                if (settings.before && jQuery.isFunction(settings.before)) {
                    settings.before();
                } else if (settings.before && !jQuery.isFunction(settings.before)) {
                    throw "The 'before' option needs to be provided as a function!";
                }

                /* Prevent default action and bubbling. */
                e.preventDefault();
                e.stopPropagation();

                /* Remove tooltip. */
                if (settings.tooltip) {
                    $(self).removeAttr('title');
                }

                /* Remove placeholder text, replace is here because of IE. */
                if ($(this).html().toLowerCase().replace(/(;|"|\/)/g, '') ==
                    settings.placeholder.toLowerCase().replace(/(;|"|\/)/g, '')) {
                        $(this).html('');
                }

                self.editing    = true;
                self.revert     = $(self).text();
                $(self).html('');

                /* Create the form object. */
                var form = $('<form />');

                /* Apply css or style or both. */
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
                        /* IE needs the second line or display wont be inherited. */
                        form.css('display', $(self).css('display'));
                    } else {
                        form.attr('style', settings.style);
                    }
                }

                // add a label if it exists
                if (settings.label) {
                    form.append("<label>" + settings.label + "</label>");
                }

                /* Add main input element to form and store it in input. */
                var input = element.apply(form, [settings, self]);

                /* Set input content via POST, GET, given data or existing value. */
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
                       async: false,
                       cache : false,
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

                /* adjust the width of the element to account for the margin/padding/border */
                if (settings.width != 'none') {
                    var adj_width = settings.width - (input.outerWidth(true) - settings.width);
                    input.width(adj_width);
                }

                /* Add buttons to the form. */
                buttons.apply(form, [settings, self]);

                /* Add created form to self. */
                if (settings.showfn && $.isFunction(settings.showfn)) {
                    form.hide();
                }

                $(self).append(form);

                // execute the showfn
                if (settings.showfn && $.isFunction(settings.showfn)) {
                    settings.showfn(form);
                }

                /* Attach 3rd party plugin if requested. */
                plugin.apply(form, [settings, self]);

                /* Focus to first visible form element. */
                $(':input:visible:enabled:first', form).focus();

                /* Highlight input contents when requested. */
                if (settings.select) {
                    input.select();
                }

                /* discard changes if pressing esc */
                input.keydown(function(e) {
                    if (e.keyCode == 27) {
                        e.preventDefault();
                        reset.apply(form, [settings, self]);
                    }
                });

                /* Discard, submit or nothing with changes when clicking outside. */
                /* Do nothing is usable when navigating with tab. */
                var t;
                if ('cancel' == settings.onblur) {
                    input.blur(function(e) {
                        /* Prevent canceling if submit was clicked. */
                        t = setTimeout(function() {
                            reset.apply(form, [settings, self]);
                        }, 500);
                    });
                } else if ('submit' == settings.onblur) {
                    input.blur(function(e) {
                        /* Prevent double submit if submit was clicked. */
                        t = setTimeout(function() {
                            form.submit();
                        }, 200);
                    });
                } else if ($.isFunction(settings.onblur)) {
                    input.blur(function(e) {
                        settings.onblur.apply(self, [input.val(), settings]);
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

                    /* Do no submit. */
                    e.preventDefault();

                    /* Call before submit hook. */
                    /* If it returns false abort submitting. */
                    if (false !== onsubmit.apply(form, [settings, self])) {
                        /* Custom inputs call before submit hook. */
                        /* If it returns false abort submitting. */
                        if (false !== submit.apply(form, [settings, self])) {

                          /* Check if given target is function */
                          if ($.isFunction(settings.target)) {
                              var str = settings.target.apply(self, [input.val(), settings]);
                              $(self).html(str);
                              self.editing = false;
                              callback.apply(self, [self.innerHTML, settings]);
                              /* TODO: this is not dry */
                              if (!$.trim($(self).html())) {
                                  $(self).html(settings.placeholder);
                              }
                          } else {
                              /* Add edited content and id of edited element to POST. */
                              var submitdata = {};
                              submitdata[settings.name] = input.val();
                              submitdata[settings.id] = self.id;
                              /* Add extra data to be POST:ed. */
                              if ($.isFunction(settings.submitdata)) {
                                  $.extend(submitdata, settings.submitdata.apply(self, [self.revert, settings]));
                              } else {
                                  $.extend(submitdata, settings.submitdata);
                              }

                              /* Quick and dirty PUT support. */
                              if ('PUT' == settings.method) {
                                  submitdata._method = 'put';
                              }

                              /* Show the saving indicator. */
                              $(self).html(settings.indicator);

                              /* Defaults for ajaxoptions. */
                              var ajaxoptions = {
                                  type    : 'POST',
                                  data    : submitdata,
                                  dataType: 'html',
                                  url     : settings.target,
                                  success : function(result, status) {

                                      // INTERCEPT
                                      result = intercept.apply(self, [result]);

                                      if (ajaxoptions.dataType == 'html') {
                                        $(self).html(result);
                                      }
                                      self.editing = false;
                                      callback.apply(self, [result, settings, submitdata]);
                                      if (!$.trim($(self).html())) {
                                          $(self).html(settings.placeholder);
                                      }
                                  },
                                  error   : function(xhr, status, error) {
                                      onerror.apply(form, [settings, self, xhr]);
                                  }
                              };

                              /* Override with what is given in settings.ajaxoptions. */
                              $.extend(ajaxoptions, settings.ajaxoptions);
                              $.ajax(ajaxoptions);
                            }
                        }
                    }

                    /* Show tooltip again. */
                    $(self).attr('title', settings.tooltip);
                    return false;
                });
            });
            /* Privileged methods */
            this.reset = function(form) {
                /* Prevent calling reset twice when blurring. */
                if (this.editing) {
                    /* Before reset hook, if it returns false abort reseting. */
                    if (false !== onreset.apply(form, [settings, self])) {
                        $(self).html(self.revert);
                        self.editing   = false;
                        if (!$.trim($(self).html())) {
                            $(self).html(settings.placeholder);
                        }
                        /* Show tooltip again. */
                        if (settings.tooltip) {
                            $(self).attr('title', settings.tooltip);
                        }
                    }
                }
            };
        });

    };


    $.editable = {
        types: {
            defaults: {
                element : function(settings, original) {
                    var input = $('<input type="hidden"></input>');
                    $(this).append(input);
                    return(input);
                },
                content : function(string, settings, original) {
                    $(':input:first', this).val(string);
                },
                reset : function(settings, original) {
                  original.reset(this);
                },
                buttons : function(settings, original) {
                    var form = this;
                    if (settings.submit) {
                        /* If given html string use that. */
                        if (settings.submit.match(/>$/)) {
                            var submit = $(settings.submit).click(function() {
                                if (submit.attr("type") != "submit") {
                                    form.submit();
                                }
                            });
                        /* Otherwise use button with given string as text. */
                        } else {
                            var submit = $('<button type="submit" />');
                            submit.html(settings.submit);
                        }
                        $(this).append(submit);
                    }
                    if (settings.cancel) {
                        /* If given html string use that. */
                        if (settings.cancel.match(/>$/)) {
                            var cancel = $(settings.cancel);
                        /* otherwise use button with given string as text */
                        } else {
                            var cancel = $('<button type="cancel" />');
                            cancel.html(settings.cancel);
                        }
                        $(this).append(cancel);

                        $(cancel).click(function(event) {
                            if ($.isFunction($.editable.types[settings.type].reset)) {
                                var reset = $.editable.types[settings.type].reset;
                            } else {
                                var reset = $.editable.types['defaults'].reset;
                            }
                            reset.apply(form, [settings, original]);
                            return false;
                        });
                    }
                }
            },
            text: {
                element : function(settings, original) {
                    var input = $("<input type='text' />");
                    if (settings.width  != 'none') { input.css('width', settings.width);  }
                    if (settings.height != 'none') { input.css('height', settings.height); }
                    input.attr('autocomplete','off');
                    if (settings.size) {
                        input.attr('size', settings.size);
                    }

                    if (settings.maxlength) {
                        input.attr('maxlength', settings.maxlength);
                    }

                    $(this).append(input);
                    return(input);
                }
            },
            textarea: {
                element : function(settings, original) {
                    var textarea = $('<textarea></textarea>');
                    if (settings.rows) {
                        textarea.attr('rows', settings.rows);
                    } else if (settings.height != "none") {
                        textarea.height(settings.height);
                    }
                    if (settings.cols) {
                        textarea.attr('cols', settings.cols);
                    } else if (settings.width != "none") {
                        textarea.width(settings.width);
                    }
                    $(this).append(textarea);
                    return(textarea);
                }
            },
            select: {
               element : function(settings, original) {
                    var select = $('<select />');
                    $(this).append(select);
                    return(select);
                },
                content : function(data, settings, original) {
                    /* If it is string assume it is json. */
                    if (String == data.constructor) {
                        var json = JSON.parse(data);
                    } else {
                    /* Otherwise assume it is a hash already. */
                        var json = data;
                    }
                    for (var key in json) {
                        if (!json.hasOwnProperty(key)) {
                            continue;
                        }
                        if ('selected' == key) {
                            continue;
                        }
                        var option = $('<option />').val(key).append(json[key]);
                        if (key == json['selected'] || json[key] == $.trim(original.revert)) {
                            $(option).prop('selected', true);
                        }
                        $('select', this).append(option);
                    }

                    /* Submit on change if no submit button defined. */
                    if (!settings.submit) {
                        var form = this;
                        $('select', this).change(function() {
                            form.submit();
                        });
                    }
                }
            }
        },

        /* Add new input type */
        addInputType: function(name, input) {
            $.editable.types[name] = input;
        }
    };

    /* Publicly accessible defaults. */
    $.fn.editable.defaults = {
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
        submitdata : {},
        ajaxoptions: {}
    };

})(jQuery);
