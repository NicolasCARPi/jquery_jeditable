$(document).ready(function() {
    // make all examples reachable with Tab key for accessibility
    $(".example").editableAriaShim();

    // hide all source code
    $('.source').hide();
    // to toggle the source
    $('.trigger').click(function() {
        var sourceDiv = $(this).next('.source');

        if (sourceDiv.is(':visible')) {
            $(this).html("<i class='fas fa-eye'></i> Show source code");
        } else {
            $(this).html("<i class='fas fa-eye-slash'></i> Hide source code");
        }

        sourceDiv.toggle();
    });

    // BASIC MINIMAL EXAMPLE
    $(".editable-text").editable("save.php");

    // FULL EXAMPLE WITH PLENTY OF OPTIONS
    // custom submitted data fields
    var submitdata = {};
    submitdata['slow'] = true;
    submitdata['pwet'] = 'youpla';

    $(".editable-text-full").editable("save.php", {
        indicator : "<img src='img/spinner.svg' />",
        type : "text",
        // only limit to three letters example
        //pattern: "[A-Za-z]{3}",
        onedit : function() { console.log('If I return false edition will be canceled'); return true;},
        before : function() { console.log('Triggered before form appears');},
        callback : function(result, settings, submitdata) {
            console.log('Callback function: triggered after submit');
            console.log('Result: ' + result);
            console.log('Settings.width: ' + settings.width);
            console.log('Submitdata: ' + submitdata.pwet);
        },
        cancel : 'Cancel',
        cssclass : 'custom-class',
        cancelcssclass : 'btn btn-danger',
        // select all text
        select : true,
        submitcssclass : 'btn btn-success',
        maxlength : 200,
        onerror: function(settings, self, xhr) {
            console.log("Error with status code: " + xhr.status);
            // reset the form
            self.reset();
        },
        label : 'This is a label',
        onreset : function() { console.log('Triggered before reset') },
        onblur : function() { console.log('Triggered on blur event');return true; },
        onsubmit : function() { console.log('Triggered before submit') },
        showfn : function(elem) { elem.fadeIn('slow') },
        submit : 'Save',
        submitdata : submitdata,
        /* submitdata as a function example
        submitdata : function(revert, settings, submitdata) {
            console.log("Revert text: " + revert);
            console.log(settings);
            console.log("User submitted text: " + submitdata.value);
        },
        */
        tooltip : "Click to edit...",
        width : 160
    });


    // NORMAL TEXTAREA
    $(".editable_textarea").editable("save.php", {
        type   : 'textarea',
        submit : 'OK',
        cancelcssclass : 'btn btn-danger',
        submitcssclass : 'btn btn-success',
        cancel : 'Nope',
        width: 300
    });

    // INLINE SELECT
    $(".editable-select").editable("save.php", {
        type   : "select",
        sortselectoptions: true,
        // custom class for the select element
        inputcssclass: 'some-class',
        // do nothing onBlur
        onblur: 'ignore',
        data   : '{"Wiki":"Wiki","Banana":"Banana","Apple":"Apple", "Pear":"Pear", "selected":"Pear"}',
        submitdata : function() { return {id : 42, something: 'else'};},
        style  : "inherit"
    });
    // INLINE SELECT WITH JSON
    $(".editable-select-json").editable("save.php", {
        type   : "select",
        loadurl : "json.php",
        loadtext : "Fetching JSON…",
        submit : "OK",
        style  : "inherit"
    });
    // MULTIPLE SELECT
    $(".multiple-select").editable("save.php", {
        type : "select",
        data   : '{"Wiki":"Wiki","Banana":"Banana","Apple":"Apple", "Pear":"Pear"}',
        submit: 'OK',
        multiple : true,
        onblur: function() { return true; },
        // use intercept to display the results as we want it
        intercept: function(result, status) {
            return "You selected: " + result + ". ";
        },
        onerror: function(settings, self, xhr) {
            console.log("Error with status code: " + xhr.status);
        },
        submitdata : function(revert, settings, result) {
            console.log("User selected values: " + result.value);
        },
    });

    // DIFFERENT EVENTS
    // click
    $(".click").editable("save.php", {
        tooltip   : "Click to edit...",
        style  : "inherit"
    });

    // double click
    $(".dblclick").editable("save.php", {
        tooltip   : "Doubleclick to edit...",
        event     : "dblclick",
        style  : "inherit"
    });

    // mouseover
    $(".mouseover").editable("save.php", {
        tooltip   : "Move mouseover to edit...",
        event     : "mouseover",
        style  : "inherit"
    });

    // INTERCEPT
    // GET BACK JSON AND PROCESS IT BEFORE DISPLAY
    $(".intercept").editable("json2.php", {
        submit : 'OK',
        intercept : function(jsondata) {
            json = JSON.parse(jsondata);
            console.log(json.status);
            console.log(json.other);
            return json.result;
        },
    });

    // EMAIL
    $(".email").editable("save.php", {
        type: "email",
        tooltip: "Enter a valid email address",
        placeholder: "nico.tesla@example.com",
    });
    // NUMBER
    $(".number").editable("save.php", {
        type: "number",
        tooltip: "Click to edit: number",
        placeholder: "0",
        min: 0,
        max: 10,
        step: 1
    });
    // URL
    $(".url").editable("save.php", {
        type: "url",
        tooltip: "Enter a valid URL",
        placeholder: "https://www.example.com"
    });


    // CSS BUTTONS
    $(".css-buttons").editable("save.php", {
        submit : 'OK',
        cancel : 'Cancel',
        cssclass : 'custom-class',
        cancelcssclass : 'btn btn-danger',
        submitcssclass : 'btn btn-success',
        formid : 'abc-123'
    });

    // CHECKBOX
    $(".checkbox").editable("save.php", {
        type      : "checkbox",
        submit : 'ok'
    });

    // CHAR COUNTER
    $(".charcounter").editable("save.php", {
        type      : "charcounter",
        submit    : 'OK',
        tooltip   : "Click to edit...",
        onblur    : "ignore",
        charcounter : {
            characters : 60
        }
    });

    // MASKED INPUT
    $(".masked").editable("save.php", {
        type      : "masked",
        mask      : "99/99/9999",
        submit    : 'OK',
        tooltip   : "Click to edit..."
    });

    // AUTOGROW
    $(".autogrow").editable("save.php", {
        type      : "autogrow",
        submit    : 'OK',
        cancel    : 'cancel',
        tooltip   : "Click to edit...",
        onblur    : "ignore"
    });
    // DATEPICKER
    $(".datepicker").editable("save.php", {
        type      : 'datepicker',
        datepicker : {
            format: "dd-mm-yy"
        },
        submit : 'OK',
        tooltip   : "Click to edit..."
    });
    // TIME
    $(".timepicker").editable("save.php", {
        type      : 'time',
        submit    : 'OK',
        tooltip   : "Click to edit..."
    });

    // Non existing element should not cause error
    $("#nosuch").editable("save.php", {
        type   : 'textarea',
        submit : 'OK'
    });

});

