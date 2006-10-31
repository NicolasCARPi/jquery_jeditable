<?php      

/* $Id$ */      

/* No hardoced URL's in examples. Just copy the folder to server. */  
$folder = str_replace(basename($_SERVER['PHP_SELF']), '', $_SERVER['PHP_SELF']);
$url    = sprintf('http://%s%s', $_SERVER['SERVER_NAME'], $folder);

?>
<html>
<head>
<title>jEditable - Textile callback and tooltips demo</title>
<script src="lib/jquery.js" type="text/javascript"></script>
<!--
<script type="text/javascript" src="http://jquery.com/src/latest/"></script>
-->
<script src="lib/jquery.jeditable.js" type="text/javascript"></script>
</head>
<html>
click: <h1 class="editable1" id="header_4"><?php print file_get_contents($url . 'load.php?id=header_4') ?></span></h1>
doubleclick: <h2 class="editable2" id="header_5"><?php print file_get_contents($url . 'load.php?id=header_5') ?></span></h2>
mouseover: <h3 class="editable3" id="header_6"><?php print file_get_contents($url . 'load.php?id=header_6') ?></h3>

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
    $(".editable4").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        tooltip   : "Doublelick to edit...",
        event     : "dblclick"
    });
});
// ]]>
</script>
</html>

