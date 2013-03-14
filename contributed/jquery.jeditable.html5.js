/*
 * HTML5 and accessibility/WAI-ARIA support for Jeditable.
 *
 * Copyright (c) 2013 Nick Freear, The Open University.
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

/*jslint browser: true, indent: 4 */

(function ($) {

    'use strict';

    // Keyboard accessibility/WAI-ARIA - allow users to navigate to an editable element using TAB/Shift+TAB.
    $.fn.editableAriaShim = function () {
        //$.log('WAI-ARIA shim..');

        this.attr({
            role: 'button',
            tabindex: 0
            //, title: 'Editable' -- See 'tooltip' below.
            //, 'aria-label':''
        });
        return this; //<--jquery object - chaining.
    };

    // Keyboard accessibility - use mouse click OR press any key to enable editing.
    $.fn.editable.defaults.event = 'click.editable keydown.editable';

    // Accessibility - there should be a default value for the title/ tooltip.
    $.fn.editable.defaults.tooltip = 'Click to edit'; //$.fn.editable.defaults.placeholder

    // Shim - $(sel).checkValidity()
    if (! $.fn.checkValidity) {
        $.fn.checkValidity = function () {
            var inp = this[0];
            return inp ? inp.checkValidity() : null;
        };
    }

    // Type = text : With HTML5 attributes.
    $.editable.addInputType('html5_text', {
        element: function (settings, original) {
            var input = $('<input />').attr({
                // required: settings.required ? 'required' : '', -- See below.
                // autofocus -- Not relevant for Jeditable.
                // disabled -- Not relevant.
                // readonly -- Not relevant.
                //autocomplete: settings.autocomplete, -- Todo.
                inputmode: settings.inputmode,
                list: settings.list,
                maxlength: settings.maxlength,
                pattern: settings.pattern,
                placeholder: settings.html5_placeholder, // Parameter name conflict - add 'html5_'.
                title: settings.html5_error_text,
                type: 'text'
            });
            if (settings.required) { input.attr('required', ''); } // Is this relevant to Jeditable? Probably.

            $(this).append(input);
            return input;
        }
    });

// Type = number.
$.editable.addInputType('number', {
  element: function (settings, original) {
    var input = $('<input />').attr({
        maxlength: settings.maxlength,
        //pattern: settings.pattern, -- Does not apply to 'number' (but may be useful if 'number' is not supported).
        placeholder: settings.html5_placeholder,
        min : settings.min,
        max : settings.max,
        step: settings.step,
        title: settings.html5_error_text,
        type: 'number'
    });
    $(this).append(input);
    return input;
  }
});

// Deprecated.
$.editable.addInputType('unsigned_integer', {
  element: function (settings, original) {
    var input = $('<input type="number" min="0" max="10" step="1">');
    $(this).append(input);
    return input;
  }
});

// Type = range : Not usable.
/*$.editable.addInputType('range', {
  element: function (settings, original) {
    var input = $('<input />').attr({
        maxlength: settings.maxlength,
        pattern: settings.pattern,
        placeholder: settings.html5_placeholder,
        min : settings.min,
        max : settings.max,
        step: settings.step,
        type: 'range'
    });
    $(this).append(input);
    return input;
  }
});*/

// Type = email
$.editable.addInputType('email', {
  element: function (settings, original) {
    var input = $('<input />').attr({
        // pattern -- Not useful.
        maxlength: settings.maxlength,
        placeholder: settings.html5_placeholder,
        type: 'email'
    });
    $(this).append(input);
    return input;
  }
});

// Type = url
$.editable.addInputType('url', {
  element: function (settings, original) {
    var input = $('<input />').attr({
        maxlength: settings.maxlength,
        pattern: settings.pattern,
        placeholder: settings.html5_placeholder,
        title: settings.html5_error_text,
        type: 'url'
    });
    $(this).append(input);
    return input;
  }
});


})(jQuery);
