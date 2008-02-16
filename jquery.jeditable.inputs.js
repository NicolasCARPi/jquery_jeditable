/**
* Example custom inputs. 
*
*/

/* $Id $ */

/* Needs http://digitalbush.com/projects/masked-input-plugin */
$.editable.addInputType('masked', {
    /* Create input element. */
    element : function(settings, original) {
        /* Create an input. Mask it using masked input plugin. Settings */
        /* for mask were passed with jEditable settings hash. Remember  */
        /* to return the created input!                                 */
        var input = $('<input>').mask(settings.mask);
        $(this).append(input);
        return(input);
    }
});

/* Needs http://jquery.com/plugins/project/timepicker */
$.editable.addInputType('timepicker', {
    /* This uses default hidden input field. No need for element() function. */    

    /* Call before submit hook. */
    submit: function (settings, original) {
        /* Collect hour, minute and am/pm from pulldowns. Create a string from */
        /* them. Set value of hidden input field to this string.               */
        var value = $("#h_").val() + ":" + $("#m_").val() + "" + $("#p_").val();
        $("input", this).val(value);
    },
    /* Attach Timepicker plugin to the default hidden input element. */
    plugin:  function(settings, original) {        
        $("input", this).filter(":hidden").timepicker();
    }
});


/* Needs http://kelvinluck.com/assets/jquery/datePicker/v2/demo/ */
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
        settings.onblur = 'cancel'
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

$.editable.addInputType('ajaxupload', {
    /* create input element */
    element : function(settings) {
        settings.onblur = 'ignore';
        var input = $('<input type="file" id="upload" name="upload">');
        $(this).append(input);
        return(input);
    },
    content : function(string, settings, original) {
        /* do nothing */
    },
    plugin : function(settings, original) {
        var form = this;
        $("input:submit", this)
        .bind('click', function() {
            //$(".message").show();
            $.ajaxFileUpload({
                url: settings.target,
                secureuri:false,
                fileElementId: 'upload',
                dataType: 'html',
                success: function (data, status) {
                    $(original).html(data);
                    original.editing = false;
                },
                error: function (data, status, e) {
                    alert(e);
                }
            })
            return(false);
        });
    }
});

