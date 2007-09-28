<?php

/* $Id: save.php 101 2007-01-17 15:51:52Z tuupola $ */

require_once 'config.php';

$id = $dbh->nextId('config');

$query = sprintf("INSERT INTO config (id, token, value)
                  VALUES (%d, '%s', '%s')",
                  $id, $_POST['id'], stripslashes($_POST['value']));

$status = $dbh->query($query);

/* sleep for a while so we can see the indicator in demo */
usleep(2000);

$renderer = $_GET['renderer'] ?  $_GET['renderer'] : $_POST['renderer'];
if ('textile' == $renderer) {
    require_once './Textile.php';
    $t = new Textile();
    print $t->TextileThis(stripslashes($_POST['value']));
} else {
    print $_POST['value'];
}

?>
