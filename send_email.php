<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';
    

echo('Hello Natalie');

if($_SERVER['REQUEST_METHOD']=="POST"){
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $comment = $_POST['comment'];
    

  
    $message .= "First Name: $firstName\n";
    $message .= "Last Name: $lastName\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n";
    $message .= "Comment: $comment\n";

    $mail = new PHPMailer(true);

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
  

try{
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; 
    $mail->SMTPAuth = true;
    $mail->Username = 'seev.dev@gmail.com'; 
    $mail->Password = 'egyi pqks gefa aduy'; 
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587; 
    

    $mail->setFrom('seev.dev@gmail.com', 'Your Name');
    $mail->addAddress('seev.dev@gmail.com', 'Archie');
    
  
    $mail->isHTML(false); // Set email format to plain text
    $mail->Subject = 'New form submission from:'.$firstName.' '.$lastName;
    $mail->Body    = $message;
    
   $mail->send();

}catch(Exception $e){echo "Error: Unable to send form data. Please try again later. Error: {$mail->ErrorInfo}<br>";}

    
}


?>

