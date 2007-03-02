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
<script src="lib/jquery.jeditable.js" type="text/javascript"></script>
<script src="lib/jquery.highlightFade.js" type="text/javascript"></script>
</head>
<html>
<div class="editable_textarea" id="paragraph_3"><?php print file_get_contents($url . 'load.php?id=paragraph_3') ?></div>
<div class="editable_textile" id="paragraph_4"><?php print file_get_contents($url . 'load.php?id=paragraph_4&renderer=textile') ?></div>

<script type="text/javascript">
// <![CDATA[
$(document).ready(function() {
    $(".editable_textarea").mouseover(function() { 
        $(this).css('background-color', '#ffffd3');
    });
    $(".editable_textarea").mouseout(function() { 
        $(this).css('background-color', '#fff');
    });
    $(".editable_textarea").editable("<?php print $url ?>save.php", { 
        indicator : "<img src='img/indicator.gif'>",
        type      : "textarea",
        submit    : "OK",
        tooltip   : "Click to edit..."
    });

    $(".editable_textile").mouseover(function() { 
        $(this).highlightFade({end:'#ffffd3'});
    });
    $(".editable_textile").mouseout(function() { 
        $(this).highlightFade({end:'#fff', speed:200});
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
<?php include '00_footer.php' ?>
</html>

