<?php
require_once 'config.php';
require_once 'defaults.php';

$token    = $_GET['id'] ?  $_GET['id'] : $_POST['id'];

$query = sprintf(
    "SELECT value FROM config
    WHERE token='%s'
    ORDER BY id DESC
    LIMIT 1",
    $token
);

$retval =  $dbh->query($query)->fetchColumn(0);

$retval = trim($retval) ?  $retval : $default[$token];
$retval = trim($retval) ?  $retval : 'Edit me!';

print $retval;
