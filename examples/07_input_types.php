<?php      

/* $Id: 03_textile_renderer.php 146 2007-04-25 17:05:58Z tuupola $ */      

/* No hardoced URL's in examples. Just copy the folder to server. */  
$folder = str_replace(basename($_SERVER['PHP_SELF']), '', $_SERVER['PHP_SELF']);
$url    = sprintf('http://%s%s', $_SERVER['SERVER_NAME'], $folder);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" debug="true">
<head>
  <link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />
  <link rel="stylesheet" type="text/css" href="css/datePicker.css" media="screen" />
<title>jEditable - Additional Input Types (Plugins)</title>

<script language="javascript" type="text/javascript" src="lib/firebug/firebug.js"></script>

<script type="text/javascript" src="lib/jquery.js"></script>
<script type="text/javascript" src="lib/jquery.jeditable.js"></script>
<script type="text/javascript" src="lib/jquery.jeditable.inputs.js"></script>

<script type="text/javascript" src="lib/jquery.maskedinput.js"></script>
<script type="text/javascript" src="lib/jquery.timepicker.js"></script>

<script type="text/javascript" src="lib/date.js"></script>
<script type="text/javascript" src="lib/jquery.bgigframe.js"></script>
<script type="text/javascript" src="lib/jquery.dimensions.js"></script>
<script type="text/javascript" src="lib/jquery.datePicker.js"></script>

<script src="lib/firebug/firebug.js" type="text/javascript"></script>
<script type="text/javascript">
// <![CDATA[
$(document).ready(function() {
    $(".masked").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        type      : "masked",
        mask      : "99/99/9999",
        submit    : 'OK',
        tooltip   : "Click to edit..."
    });
    $(".date").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        type      : 'date',
        tooltip   : "Click to edit..."
    });
    $(".time").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        type      : 'time',
        submit    : 'OK',
        tooltip   : "Click to edit..."
    });
});
// ]]>
</script>
</head>
<body>

<div id="center">
<div id="header">
  <h1>jEditable demo</h1>
  <h2>Custom input types (Masked Input, Timepicker, Datepicker).</h2>
</div>

<h2 class="masked" id="header_11"><?php print file_get_contents($url . 'load.php?id=header_11') ?></h2>
<p>Custom input which uses 
<a href="http://digitalbush.com/projects/masked-input-plugin">Masked Input Plugin</a> by Josh Bush.</p>
<h2 class="time" id="header_12"><?php print file_get_contents($url . 'load.php?id=header_12') ?></h2>
<p>Custom input which uses <a href="http://jquery.com/plugins/project/timepicker">Timepicker Plugin</a> by Jason Huck.
<h2 class="date" id="header_13"><?php print file_get_contents($url . 'load.php?id=header_13') ?></h2>
<p>Custom input which uses <a href="http://kelvinluck.com/assets/jquery/datePicker/v2/demo/">Datepicker Plugin</a> by Kelvin Luck.

<div id="footer">
<?php include '00_footer.php' ?>
</div>

</div>

</body>
</html>
