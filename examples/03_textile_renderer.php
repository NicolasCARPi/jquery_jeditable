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
<title>jEditable - Textile callback, JSON and tooltips demo</title>
<script src="lib/jquery.js" type="text/javascript"></script>
<script src="lib/jquery.jeditable.js" type="text/javascript"></script>
<script src="lib/firebug/firebug.js" type="text/javascript"></script>
<script type="text/javascript">
// <![CDATA[
$(document).ready(function() {
    $(".editable").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        tooltip   : "Click to edit..."
    });
    $(".editable_select").editable("<?php print $url ?>save.php", { 
        indicator : '<img src="img/indicator.gif">',
        loadurl   : '<?php print $url . 'json.php' ?>',
        type      : 'select',
        submit    : 'OK',
        tooltip   : "Click to edit..."
    });
    $(".editable_textile").editable("<?php print $url ?>save.php?renderer=textile", { 
        indicator : "<img src='img/indicator.gif'>",
        loadurl   : "<?php print $url ?>load.php",
        type      : "textarea",
        submit    : "OK",
        cancel    : "Cancel",
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
  <h2>Textile renderer and tooltips, external JSON data to create select.</h2>
</div>

<h1 class="editable" id="header_1"><?php print file_get_contents($url . 'load.php?id=header_1') ?></h1>
<h2 class="editable" id="header_2"><?php print file_get_contents($url . 'load.php?id=header_2') ?></h2>
<h3 class="editable_select" id="header_10"><?php print file_get_contents($url . 'load.php?id=header_10') ?></h3>
<div class="editable_textile" id="paragraph_2"><?php print file_get_contents($url . 'load.php?id=paragraph_2&renderer=textile') ?></div>

<div id="footer">
<?php include '00_footer.php' ?>
</div>

</div>

</body>
</html>
