/**
 * Depends on datepicker widget from jQuery-ui
 * https://jqueryui.com/datepicker/
 *
 * @file datepicker plugin for jquery-jeditable
 * @author Nicolas CARPi
 * @copyright © 2008 Mika Tuupola, Nicolas CARPi
 * @home https://github.com/NicolasCARPi/jquery_jeditable
 * @licence MIT (see LICENCE file)
 * @name PluginDatepicker
 * @example <caption>Datepicker example:</caption>
 * $(".date").editable("save.php", {
 *     type      : "datepicker",
 *     submit    : 'OK',
 *     datepicker : {
 *         format: "dd-mm-yy"
 *     },
 *     cancel    : 'cancel',
 * });
 */
$.editable.addInputType('datepicker', {

    element : function(settings, original) {
        var input = $('<input>');
        var picker = $('<span id="datepicker_">');

        $(this).append(input);
        $(this).append(picker);
        return(input);
    },

    submit: function (settings, original) {
        var dateRaw = $("#datepicker_", this).datepicker('getDate');
        if (settings.datepicker.format) {
            dateFormatted = $.datepicker.formatDate(settings.datepicker.format, new Date(dateRaw));
        } else {
            dateFormatted = dateRaw;
        }
        $("input", this).val(dateFormatted);
    },

    plugin : function(settings, original) {
        // prevent disappearing of calendar
        settings.onblur = null;

        // load the settings if any
        if (settings.datepicker) {
            $("#datepicker_", this).datepicker(settings.datepicker);
        } else {
            $("#datepicker_", this).datepicker();
        }
    }
});
