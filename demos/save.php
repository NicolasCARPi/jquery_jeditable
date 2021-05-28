<?php
// sleep for a while so we can see the indicator in demo
if (isset($_POST['slow'])) {
    usleep(500000);
}

if (is_array($_POST['value'])) {
    echo implode(', ', $_POST['value']);
} else {
    echo $_POST['value'];
}
