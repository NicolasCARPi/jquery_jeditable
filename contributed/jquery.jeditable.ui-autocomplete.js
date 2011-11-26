/* Autocomplete using jQueryUI1.8.16 [from rezeusor with love] */

//Normal Autocomplete
$.editable.addInputType('autocomplete', {
        element : $.editable.types.text.element,
        plugin : function(settings, original) {
            $('input', this).autocomplete(settings.autocomplete);		
        }
});

//Multiple Results Autocomplete
$.editable.addInputType('multicomplete', {
        element : $.editable.types.text.element,
        plugin : function(settings, original) {
            	$('input', this).bind( "keydown", function( event ) {
			if ( event.keyCode === $.ui.keyCode.TAB && $( this ).data( "autocomplete" ).menu.active ) {
				event.preventDefault();
			}
		}).autocomplete(settings.autocomplete);			
        }
});
