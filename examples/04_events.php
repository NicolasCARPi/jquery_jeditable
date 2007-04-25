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
<title>jEditable - using different events</title>
<script src="lib/jquery.js" type="text/javascript"></script>
<script src="lib/jquery.jeditable.js" type="text/javascript"></script>
<script src="lib/firebug/firebug.js" type="text/javascript"></script>
<script type="text/javascript">
// <![CDATA[
$(document).ready(function() {
    $(".editable1").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        tooltip   : "Click to edit..."
    });
    $(".editable2").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        tooltip   : "Doubleclick to edit...",
        event     : "dblclick"
    });
    $(".editable3").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        tooltip   : "Move mouseover to edit...",
        event     : "mouseover"
    });
});
// ]]>
</script>
</head>
<body>

<div id="center">
<div id="header">
  <h1>jEditable demo</h1>
  <h2>using different events</h2>
</div>

<p>
click: <h1 class="editable1" id="header_4"><?php print file_get_contents($url . 'load.php?id=header_4') ?></span></h1>
doubleclick: <h1 class="editable2" id="header_5"><?php print file_get_contents($url . 'load.php?id=header_5') ?></span></h1>
mouseover: <h1 class="editable3" id="header_6"><?php print file_get_contents($url . 'load.php?id=header_6') ?></h1>
</p>

<div id="footer">
<?php include '00_footer.php' ?>
</div>

</div>

</body>
</html>
