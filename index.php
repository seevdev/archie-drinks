<?php

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';
    
ini_set('extension', 'openssl');

// Create a new PHPMailer instance
$mail = new PHPMailer\PHPMailer\PHPMailer();

// SMTP configuration
$mail->isSMTP();
$mail->Host = 'mail.archiedrinks.com'; // Your SMTP server address
$mail->SMTPAuth = true;
$mail->Username = 'lab@archiedrinks.com'; // Your SMTP username
// $mail->Password = ''; // Your SMTP password
$mail->SMTPSecure = 'tls'; // Enable TLS encryption
$mail->Port = 465; // TCP port to connect to

// Sender and recipient settings
$mail->setFrom('lab@archiedrinks.com', 'Your Name');
$mail->addAddress('lab@archiedrinks.com', 'Recipient Name');

// Email content
$mail->isHTML(false); // Set email format to plain text
$mail->Subject = 'Subject of your email';
$mail->Body    = 'Body of your email';

// Send email
if(!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent successfully!';
}
    
?>

