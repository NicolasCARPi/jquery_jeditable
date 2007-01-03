<?php

/* $Id$ */

/* No hardoced URL's in examples. Just copy the folder to server. */
$folder = str_replace(basename($_SERVER['PHP_SELF']), '', $_SERVER['PHP_SELF']);
$url    = sprintf('http://%s%s', $_SERVER['SERVER_NAME'], $folder);

?>
<html>
<head>
<title>jEditable - saving data demo</title>
<script src="lib/jquery.js" type="text/javascript"></script>
<script src="lib/jquery.jeditable.js" type="text/javascript"></script>
</head>
<html>
<h1 class="editable" id="header_1"><?php print file_get_contents($url . 'load.php?id=header_1') ?></h1>
<h2 class="editable" id="header_2"><?php print file_get_contents($url . 'load.php?id=header_2') ?></h2>
<h3 class="editable" id="header_3"><?php print file_get_contents($url . 'load.php?id=header_3') ?></h3>
<h3 class="editable_select" id="header_10"><?php print file_get_contents($url . 'load.php?id=header_10') ?></h3>

<div class="editable_textarea" id="paragraph_1"><?php print file_get_contents($url . 'load.php?id=paragraph_1') ?></div>

<script type="text/javascript">
// <![CDATA[
$(document).ready(function() {
    $(".editable").editable("<?php print $url ?>save.php", { 
        indicator : '<img src="img/indicator.gif">'
    });
    $(".editable_select").editable("<?php print $url ?>echo.php", { 
        indicator : '<img src="img/indicator.gif">',
        data   : '{"Lorem":"Lorem","Ipsum":"Ipsum","Dolor":"Dolor"}',
        type   : 'select',
        submit : 'OK'
    });
    $(".editable_textarea").editable('<?php print $url ?>save.php', { 
        indicator : '<img src="img/indicator.gif">',
        type      : 'textarea',
        submit    : 'OK'
    });
});
// ]]>
</script>
<?php include '00_footer.php' ?>
</html>

