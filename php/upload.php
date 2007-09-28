<?php

//check if there are files uploaded
if((isset($_FILES['upload']['error']) && $_FILES['upload'] == 0) ||	
   (!empty($_FILES['upload']['tmp_name']) && $_FILES['upload']['tmp_name'] != 'none')) {			

       if (0 == @filesize($_FILES['upload']['tmp_name'])) {
       	print "Empty or invalid file.";    
       	die();
       }

	print "File Name: " . $_FILES['upload']['name'];
	print " File Size: " . @filesize($_FILES['upload']['tmp_name']);
	//for security reason, we force to remove all uploaded file
	@unlink($_FILES['upload']);
} else {			
	print "No file has been uploaded.";
	die();
}