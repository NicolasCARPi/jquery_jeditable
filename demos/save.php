<?php
echo $_POST['value'];
die();

require_once 'config.php';

$query = sprintf(
    "INSERT INTO config (token, value) VALUES ('%s', '%s')",
    $_POST['id'],
    stripslashes($_POST['value'])
);

$dbh->exec($query);

/* sleep for a while so we can see the indicator in demo */
usleep(2000);

print $_POST['value'];
