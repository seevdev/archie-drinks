<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';
    



if($_SERVER['REQUEST_METHOD']=="POST"){

$formData = json_decode(file_get_contents('php://input'), true);

    $firstName = $formData['firstName'];
    $lastName = $formData['lastName'];
    $email = $formData['email'];
    $phone =$formData['phone'];
    $comment = $formData['comment'];
    $agreement = $formData['agreement'];    

  
    $message .= "Имя: $firstName\n";
    $message .= "Фамилия: $lastName\n";
    $message .= "Почта: $email\n";
    $message .= "Телефон: $phone\n";
    $message .= "Комментарий к заказу: $comment\n";
    $message .= "Принял/а соглашение: $agreement\n";


    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';

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

