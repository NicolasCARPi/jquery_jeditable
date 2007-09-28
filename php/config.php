<?php

/* $Id: dbConnection.php 23 2006-09-28 13:31:24Z tuupola $ */

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
