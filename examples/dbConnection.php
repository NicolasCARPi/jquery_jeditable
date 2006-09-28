<?php

/* $Id$ */

error_reporting(E_ALL ^ E_NOTICE);

require_once 'DB.php';

$dsn = array(
    'phptype'  => 'sqlite',
    'database' => '/tmp/editable.db',
    'mode'     => '0666'
);

$dbh =& DB::connect($dsn);

$dbh->query("
CREATE TABLE config (id INTEGER primary key, 
                     token VARCHAR(255),
                     value TEXT,
                     date DATETIME)
");

?>
