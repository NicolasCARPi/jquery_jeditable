<?php
// sleep for a while so we can see the indicator in demo
if ($_POST['slow']) {
    usleep(500000);
}

echo $_POST['value'];
