/*
 * Tagsinput for Jeditable
 *
 * Copyright (c) 2012 David 'Dsyko' Sykora
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Depends on jQuery, jEditable, and Tagsinput
 *
 * Project home:
 *   http://github.com/Dsyko/Jeditable-Tags-Input
 *
 */

 
(function($) {
$.editable.addInputType( 'tagsinput', {

    element : function(settings, original) {
	
		//Create an input
		var input = jQuery('<input >');
		
		//Our input needs an id in order for the tagsinput plugin to work properly
		input.attr('id', 'tagsss');
		
		//Append the input to our form that has been created			
		jQuery(this).append(input);
		return(input);
    },
	content : function(string, settings, original) {
		
		//Place the string contained in the original div as the value of our input field
		$('input', this).attr('value', string);
	},
	plugin : function(settings, original) {
		var form = this,
          input = form.find( "input" );
		// Don't cancel inline editing onblur to allow clicking tags
		settings.onblur = 'ignore';
			
		//Pass on settings from our editable into the tagsinput
		if (settings.tagsinput) {
			input.tagsInput(settings.tagsinput);
		}
		else
			input.tagsInput();
	}
});
})(jQuery);