<?php      

/* $Id$ */      

/* No hardoced URL's in examples. Just copy the folder to server. */  
$folder = str_replace(basename($_SERVER['PHP_SELF']), '', $_SERVER['PHP_SELF']);
$url    = sprintf('http://%s%s', $_SERVER['SERVER_NAME'], $folder);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />
<title>jEditable - basic usage</title>
<script src="lib/jquery.js" type="text/javascript"></script>
<script src="lib/jquery.jeditable.js" type="text/javascript"></script>
<script src="lib/firebug/firebug.js" type="text/javascript"></script>
<script type="text/javascript">
// <![CDATA[
$(document).ready(function() {
    $(".editable").editable("<?php print $url ?>echo.php", { 
      indicator : "<img src='img/indicator.gif'>"
    });
    $(".editable_textarea").editable("<?php print $url ?>echo.php", { 
        indicator : "<img src='img/indicator.gif'>",
        type   : 'textarea',
        submit : 'OK'
    });
    $(".editable_select").editable("<?php print $url ?>echo.php", { 
        indicator : '<img src="img/indicator.gif">',
        data   : "{'Lorem ipsum':'Lorem ipsum','Ipsum dolor':'Ipsum dolor','Dolor sit':'Dolor sit', 'selected':'Ipsum dolor'}",
        type   : "select",
        submit : "OK",
        style  : "inherit"
    });
    $("#nosuch").editable("<?php print $url ?>echo.php", { 
        indicator : "<img src='img/indicator.gif'>",
        type   : 'textarea',
        submit : 'OK'
    });
});
// ]]>
</script>
</head>
<body>

<div id="center">
<div id="header">
  <h1>jEditable demo</h1>
  <h2>basic usage</h2>
</div>

<h1 class="editable" id="header_1">Normal header</h1>
<h2 class="editable_select" id="header_2">Select header</h2>
<p class="editable_textarea" id="paragraph_1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis</p>
<p><b class="editable_select" style="display: inline">Click me</b> dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutp</p>


<div id="footer">
<?php include '00_footer.php' ?>
</div>

</div>

</body>
</html>



