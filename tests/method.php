<?php

if (count($_POST)) {
    if ("put" == $_POST["_method"]) {
        print "PUT";
    } else {
        print "POST";
    }
} else {
    print "GET";
}
