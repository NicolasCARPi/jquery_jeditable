/**
 * Depends on Datepicker jQuery plugin by Kelvin Luck:
 *   http://kelvinluck.com/assets/jquery/datePicker/v2/demo/
 *
 * @file datepicker plugin for jquery-jeditable
 * @author Mika Tuupola, Nicolas CARPi
 * @home https://github.com/NicolasCARPi/jquery_jeditable
 * @licence MIT (see LICENCE file)
 * @copyright © 2007 Mika Tuupola, Nicolas CARPi
 * @name PluginDatepicker
 */
$.editable.addInputType('datepicker', {
    /* create input element */
    element : function(settings, original) {
        var input = $('<input>');
        $(this).append(input);
        //$(input).css('opacity', 0.01);
        return(input);
    },
    /* attach 3rd party plugin to input element */
    plugin : function(settings, original) {
        /* Workaround for missing parentNode in IE */
        var form = this;
        settings.onblur = 'cancel';
        $("input", this)
        .datePicker({createButton:false})
        .bind('click', function() {
            //$(this).blur();
            $(this).dpDisplay();
            return false;
        })
        .bind('dateSelected', function(e, selectedDate, $td) {
            $(form).submit();
        })
        .bind('dpClosed', function(e, selected) {
            /* TODO: unneseccary calls reset() */
            //$(this).blur();
        })
        .trigger('change')
        .click();
    }
});
