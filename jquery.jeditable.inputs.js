/**
* Example custom inputs. There are four methods for a plugin. Two first are 
* mandatory. Methods explained in order of their appearance:
*
* 1. Create input element. Receives jEditable settings as parameter. Inside 
*    function variable *this* refers to original (clicked) element.
*
* 2. Set input element content. Receives two parameters. Input content (value)
*    as string. Second parameter is jEditabl settings. Inside function variable
*    *this* refers to input element.
*
* 3. Call before submit. This method should prepare value returned by 3rd party
*    plugin ready for submitting. Receives jEditable settings as parameter.
*    Inside function variable *this* refers to input element.
*
* 4. Attach 3rd party plugin to input field. Receives jEditable settings as 
*    parameter. Inside function variable *this* refers to input element.
*
*/

/* $Id $ */

/* Needs http://digitalbush.com/projects/masked-input-plugin */
$.editable.addInputType('masked',
    /* create input element */
    function(settings) {
        var i = document.createElement('input');
        $(i).mask(settings.mask);
        return(i);
    },
    /* set input element value */
    function(string, settings) {
        this.value = string;        
    }
);

/* Needs http://jquery.com/plugins/project/timepicker */
$.editable.addInputType('time',
    /* create input element */
    function(settings) {
        settings.onblur = 'ignore';
        var i = document.createElement('input');
        return(i);
    },
    /* set input element value */
    function(string, settings) {
        this.value = string;        
    },
    /* call before submit hook */
    function (settings) {
        var value = $("#h_").val() + ":" + $("#m_").val() + "" + $("#p_").val();
        this.value = value;
    },
    /* attach 3rd party plugin to input element */
    function(settings) {
        $(this).timepicker();
    }
);

/* Needs http://kelvinluck.com/assets/jquery/datePicker/v2/demo/ */
$.editable.addInputType('date',
    /* create input element */
    function(settings) {
        var i = document.createElement('input');    
        return(i);
    },
    /* set input element value */
    function(string, settings) {
        this.value = string;
    },
    /* call before submit hook */
    function(settings) {
    },
    /* attach 3rd party plugin to input element */
    function(settings) {
        $(this)
        .datePicker({createButton:false})
        .bind('click', function() {
            $(this).dpDisplay();
            this.blur();
            return false;
        })
        .bind('dateSelected',
            function(e, selectedDate, $td) {
                $(this).parent().submit();
            }
        );
        $(this).click();
    }
);


