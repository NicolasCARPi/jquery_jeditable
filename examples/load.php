<?php

require_once 'dbConnection.php';

$token    = $_GET['id'] ?  $_GET['id'] : $_POST['id'];
$renderer = $_GET['renderer'] ?  $_GET['renderer'] : $_POST['renderer'];

$query = sprintf("SELECT value 
                  FROM config 
                  WHERE token='%s' 
                  ORDER BY id DESC
                  LIMIT 1", 
                  $token);

$retval =  $dbh->getOne($query);
if ('textile' == $renderer) {
    require_once 'Textile.php';
    $t = new Textile();
    $retval = $t->TextileThis($retval);
} 

$retval = trim($retval) ?  $retval : 'Edit me!';

print $retval;

?>
