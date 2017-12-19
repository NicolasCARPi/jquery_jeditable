/**********************************************************************
 *	Custom input types for the jquery.jeditable plugin
 *  First version by Richard Davies <Richard__at__richarddavies.us>
 *
 * FIXES by Sardorbek Pulatov : BFM (http://bluefountainmedia.com)
 *********************************************************************/

// Create a custom input type for checkboxes
$.editable.addInputType("checkbox", {
	element : function(settings, original) {
		var input = $('<input type="checkbox">');
		$(this).append(input);

		$(input).bind('click', function() {
			if ($(input).val() == 'on') {
			    $(input).val('off');
			    $(input).removeAttr("checked");
			} else {
			    $(input).val('on');
			    $(input).attr("checked", 'checked');
			}
		});

		return(input);
	},

	content : function(string, settings, original) {

		var checked = (string == 'yes') ? 'on' : 'off';
		var input = $(':input:first', this);

		if (checked == 'on') {
		    $(input).attr("checked", checked);
		} else {
		    $(input).removeAttr("checked");
		}

		var value = $(input).attr("checked") ? 'on' : 'off';
		$(input).val(value);
	},

    submit: function (settings, original) {
        var value;
        var input = $(':input:first', this);
        if (input.attr('checked')) {
            value = '1';
        } else {
            value = '0';
        }
        $("input", this).val(value);
    }
});
