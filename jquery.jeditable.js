/**
* jQuery inplace editor plugin.
*
* Based on Dylan Verheul's editable: http://www.dyve.net/jquery/?editable
*
* $Id$
*/

$.fn.editable = function(url, options) {

    var settings = {
        url    : url,
        name   : 'value',
        id     : 'id',
        type   : 'text'
    };

    if(options) {
        $.extend(settings, options);
    };

    this.click(function(e) {

        /* save this to self because this changes when scope changes */
        var self = this;

        /* prevent throwing an exeption if edit field is clicked again */
        if (self.editing) {
            return;
        }

        self.editing    = true;
        self.revert     = $(self).html();
        self.innerHTML  = "";

        /* create the form object */
        var f = document.createElement("form");

        /*  main input element */
        var i = document.createElement("input");
        i.type  = "text";
        i.name  = settings.name;

        if (settings.load) {
            $.get(settings.load , function(str){
                i.value = str;
            });
        } else {
            i.value = self.revert;
        }

        f.appendChild(i);

        /* element containing id of element being edited*/
        var h = document.createElement("input");
        h.type = "hidden";
        h.value = self.id;
        h.name  = settings.id;

        /* add created form to self */
        self.appendChild(f);

        i.focus();
 
        /* discard changes if pressing esc */
        $(i).keydown(function(e) {
	    if (e.keyCode == 27) {
                e.preventDefault();
                reset();
            }
        });

        /* discard changes if clicking outside of editable */
        $(i).blur(function(e) {
            reset();
        });

        $(f).submit(function(e) {
            /* do no submit */
            e.preventDefault(); 

            /* add edited content and id of edited element to POST */           
            var p = {};
            p[i.name] = $(i).val();
            p[h.name] = $(h).val();

            /* show the saving indicator */
            $(self).html(options.indicator);
            $(self).load(settings.url, p, function(str) {
                self.editing = false;
            });
        });

        function reset() {
            self.innerHTML = self.revert;
            self.editing   = false;
        };

    });

}
