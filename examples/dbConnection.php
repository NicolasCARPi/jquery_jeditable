<?php

require_once 'DB.php';

$dsn = array(
    'phptype'  => 'sqlite',
    'database' => '/tmp/editable.db',
    'mode'     => '0666'
);

$dbh =& DB::connect($dsn);

?>
