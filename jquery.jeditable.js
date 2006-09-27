/**
* jQuery inplace editor plugin.
*
* Based on Dylan Verheul's editable: http://www.dyve.net/jquery/?editable
*
* @param String url URL where to POST changes
* @param Hash options additional options (name, id, type, getload, postload, 
                      indicator)
*             
* $Id$
*/

$.fn.editable = function(url, options) {

    var settings = {
        url    : url,
        name   : 'value',
        id     : 'id',
        type   : 'text',
        rows   : 5, 
        cols   : 40
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
        var i;
        if ("textarea" == settings.type) {
            i = document.createElement("textarea");
            i.rows = settings.rows;
            i.cols = settings.cols;
        } else {
            i = document.createElement("input");
            i.type  = settings.type;
            i.setAttribute('autocomplete','off');
        }
        i.name  = settings.name;

        /* fetch input content via POST or GET */
        var l = {};
        l[settings.id] = self.id;

        if (settings.getload) {
            $.get(settings.getload, l, function(str) {
                i.value = str;
            });
        } else if (settings.postload) {
            $.post(settings.postload, l, function(str) {
                i.value = str;
            }); 
        } else { 
            i.value = self.revert;
        }

        f.appendChild(i);

        if ("textarea" == settings.type) {
            var b = document.createElement("input");
            b.type = "submit";
            b.value = "OK";
            f.appendChild(b);
        }

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
        var t;
        $(i).blur(function(e) {
            t = setTimeout(reset, 500)
        });

        $(f).submit(function(e) {
            if (t) { 
                clearTimeout(t);
            }

            /* do no submit */
            e.preventDefault(); 

            /* add edited content and id of edited element to POST */           
            var p = {};
            p[i.name] = $(i).val();
            p[settings.id] = self.id;

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
