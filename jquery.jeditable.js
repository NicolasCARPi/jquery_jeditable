/*
+-----------------------------------------------------------------------+
| Copyright (c) 2006-2007 Mika Tuupola, Dylan Verheul                   |
| All rights reserved.                                                  |
|                                                                       |
| Redistribution and use in source and binary forms, with or without    |
| modification, are permitted provided that the following conditions    |
| are met:                                                              |
|                                                                       |
| o Redistributions of source code must retain the above copyright      |
|   notice, this list of conditions and the following disclaimer.       |
| o Redistributions in binary form must reproduce the above copyright   |
|   notice, this list of conditions and the following disclaimer in the |
|   documentation and/or other materials provided with the distribution.|
|                                                                       |
| THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS   |
| "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT     |
| LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR |
| A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT  |
| OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, |
| SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT      |
| LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, |
| DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY |
| THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT   |
| (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE |
| OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  |
|                                                                       |
+-----------------------------------------------------------------------+
*/

/* $Id$ */

/**
  * jQuery inplace editor plugin.  
  *
  * Based on editable by Dylan Verheul <dylan@dyve.net>
  * http://www.dyve.net/jquery/?editable
  *
  * @name  jEditable
  * @type  jQuery
  * @param String  url                POST URL to send edited content
  * @param Hash    options            additional options 
  * @param String  options[name]      POST parameter name of edited content
  * @param String  options[id]        POST parameter name of edited div id
  * @param String  options[type]      text or textarea
  * @param Integer options[rows]      number of rows if using textarea
  * @param Integer options[cols]      number of columns if using textarea
  * @param Mixed   options[height]    'auto' or height in pixels
  * @param Mixed   options[width]     'auto' or width in pixels 
  * @param String  options[postload]  POST URL to fetch content before editing
  * @param String  options[getload]   GET URL to fetch content before editing
  * @param String  options[data]      Or content given as paramameter.
  * @param String  options[indicator] indicator html to show when saving
  * @param String  options[tooltip]   optional tooltip text via title attribute
  * @param String  options[event]     jQuery event such as 'click' of 'dblclick'
  * @param String  options[onblur]    'cancel', 'submit' or 'ignore'
  * @param String  options[submit]    submit button value, empty means no button
  * @param String  options[cancel]    cancel button value, empty means no button
  *             
  */

jQuery.fn.editable = function(url, options) {

    /* prevent elem has no properties error */
    if (jQuery(this).attr('id') == null) { 
        return false; 
    };

    var settings = {
        url    : url,
        name   : 'value',
        id     : 'id',
        type   : 'text',
        width  : 'auto',
        height : 'auto',
        event  : 'click',
        onblur : 'cancel'
    };

    if(options) {
        jQuery.extend(settings, options);
    };
      
    jQuery(this).attr('title', settings.tooltip);

    jQuery(this)[settings.event](function(e) {

        /* save this to self because this changes when scope changes */
        var self = this;

        /* prevent throwing an exeption if edit field is clicked again */
        if (self.editing) {
            return;
        }

        /* figure out how wide and tall we are */
        var width = 
            ('auto' == settings.width)  ? jQuery(self).css('width')  : settings.width;
        var height = 
            ('auto' == settings.height) ? jQuery(self).css('height') : settings.height;

        self.editing    = true;
        self.revert     = jQuery(self).html();
        self.innerHTML  = '';

        /* create the form object */
        var f = document.createElement('form');

        /*  main input element */
        var i;
        switch (settings.type) {
            case 'textarea':
                i = document.createElement('textarea');
                if (settings.rows) {
                    i.rows = settings.rows;
                } else {
                    jQuery(i).css('height', height);
                }
                if (settings.cols) {
                    i.cols = settings.cols;
                } else {
                    jQuery(i).css('width', width);
                }   
                break;
            case 'select':
                i = document.createElement('select');
                break;
            default:
                i = document.createElement('input');
                i.type  = settings.type;
                jQuery(i).css('width', width);
                jQuery(i).css('height', height);
                /* https://bugzilla.mozilla.org/show_bug.cgi?id=236791 */
                i.setAttribute('autocomplete','off');
        }
        
        /* set input content via POST, GET, given data or existing value */
        /* this looks weird because it is for maintaining bc */
        var url;
        var type;
                
        if (settings.getload) {
            url = settings.getload;
            type = 'GET';
        } else if (settings.postload) {
            url = settings.postload;
            type = 'POST';      
        }

        if (url) {
            var data = {};
            data[settings.id] = self.id;
            jQuery.ajax({
               type : type,
               url  : url,
               data : data,
               success: function(str) {
                  i.value = str;
               }
            });
        } else if (settings.data) {
            i.value = settings.data;
        } else { 
            i.value = self.revert;
        }

        i.name  = settings.name;
        f.appendChild(i);

        if (settings.submit) {
            var b = document.createElement('input');
            b.type = 'submit';
            b.value = settings.submit;
            f.appendChild(b);
        }

        if (settings.cancel) {
            var b = document.createElement('input');
            b.type = 'button';
            b.value = settings.cancel;
            f.appendChild(b);
        }

        /* add created form to self */
        self.appendChild(f);

        i.focus();
 
        /* discard changes if pressing esc */
        jQuery(i).keydown(function(e) {
            if (e.keyCode == 27) {
                e.preventDefault();
                reset();
            }
        });

        /* discard, submit or nothing with changes when clicking outside */
        /* do nothing is usable when navigating with tab */
        var t;
        if ('cancel' == settings.onblur) {
            jQuery(i).blur(function(e) {
                t = setTimeout(reset, 500)
            });
        /* TODO: does not currently work */
        } else if ('submit' == settings.onblur) {
            jQuery(i).blur(function(e) {
                jQuery(f).submit();
            });
        } else {
            jQuery(i).blur(function(e) {
              /* TODO: maybe something here */
            });
        }

        jQuery(f).submit(function(e) {

            if (t) { 
                clearTimeout(t);
            }

            /* do no submit */
            e.preventDefault(); 

            /* add edited content and id of edited element to POST */           
            var p = {};
            p[i.name] = jQuery(i).val();
            p[settings.id] = self.id;

            /* show the saving indicator */
            jQuery(self).html(options.indicator);
            // jQuery(self).load(settings.url, p, function(str) {
            jQuery.post(settings.url, p, function(str) {
                self.innerHTML = str;
                self.editing = false;
            });
            return false;
        });

        function reset() {
            self.innerHTML = self.revert;
            self.editing   = false;
        };

    });

    return(this);
}
