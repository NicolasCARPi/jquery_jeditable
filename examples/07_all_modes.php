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
<div class="editable_select" id="select_1"><?php print file_get_contents($url . 'load.php?id=select_1') ?></div>

<script type="text/javascript">
// <![CDATA[
$(document).ready(function() {
    $(".editable").editable("<?php print $url ?>save.php", { 
        indicator : '<img src="img/indicator.gif">'
    });
    $(".editable_select").editable('<?php print $url ?>save.php', { 
        indicator : '<img src="img/indicator.gif">',
        type      : 'select',
        submit    : 'OK'
    });
});
// ]]>
</script>
<?php include '00_footer.php' ?>
</html>

