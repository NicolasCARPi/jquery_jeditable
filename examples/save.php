<?php

/* $Id */

require_once 'dbConnection.php';

$status = $dbh->query('
CREATE TABLE config (id INTEGER PRIMARY KEY, 
                     token VARCHAR(64),
                     value TEXT)
');

$id = $dbh->nextId('config');

$query = sprintf('INSERT INTO config (id, token, value)
                  VALUES (%d, "%s", "%s")',
                  $id, $_POST['id'], $_POST['value']);

$status = $dbh->query($query);

/* sleep for a while so we can see the indicator in demo */
usleep(2000);

$renderer = $_GET['renderer'] ?  $_GET['renderer'] : $_POST['renderer'];
if ('textile' == $renderer) {
    require_once './lib/Textile.php';
    $t = new Textile();
    print $t->TextileThis(stripslashes($_POST['value']));
} else {
    print $_POST['value'];
}

?>
