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
onblur : 'cancel'<br />
Clicking outside editable area cancels changes.<br />
Clicking OK button submits changes.
<h1 class="editable1" id="header_7"><?php print file_get_contents($url . 'load.php?id=header_7') ?></span></h1>
onblur : submit'<br />
Clicking outside editable area submits changes.
<h2 class="editable2" id="header_8"><?php print file_get_contents($url . 'load.php?id=header_8') ?></span></h2>
onblur : 'ignore'<br />
Click outside editable area is ignored. <br />
Pressing ESC cancels changes. <br />
Clicking OK button submits changes.
<h3 class="editable3" id="header_9"><?php print file_get_contents($url . 'load.php?id=header_9') ?></h3>

<script type="text/javascript">
// <![CDATA[
$(document).ready(function() {
    $(".editable1").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        type      : 'textarea',
        onblur    : 'cancel',
        tooltip   : 'Click to edit...',
        submit    : 'OK'
    });
    $(".editable2").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        type      : 'textarea',
        onblur    : 'submit',
        tooltip   : "Click to edit..."
    });
    $(".editable3").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        type      : 'textarea',
        onblur    : 'ignore',
        tooltip   : "Click to edit...",
        submit    : 'OK'
    });
});
// ]]>
</script>
<?php include '00_footer.php' ?>
</html>
