<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';



$mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
$errors = array();
$response = array();
$message="";




$formData = json_decode(file_get_contents('php://input'), true);

   $firstName = isset($formData['firstName']) ? $formData['firstName'] : '' ;
   $lastName = isset($formData['lastName']) ? $formData['lastName'] : '';
    $email = isset($formData['email']) ? $formData['email'] : '' ;
    $phone =isset($formData['phone']) ? $formData['phone'] : '';
    $comment = isset($formData['comment']) ? $formData['comment'] : '';
    $agreement = isset($formData['agreement']) ? $formData['agreement'] : '';    

  if(empty($firstName) || empty($lastName) || empty($email) || empty($phone) || $agreement == 'нет'){
    $errors['message'] = "Необходимо заполнить все поля ввода";
  }

  


if(empty($errors)){

    $response = array("success" => true);

    $message .= "Имя: $firstName \n";
    $message .= "Фамилия: $lastName \n";
    $message .= "Почта: $email \n";
    $message .= "Телефон: $phone \n";
    $message .= "Комментарий к заказу: $comment \n";
    $message .= "Принял/а соглашение: $agreement \n";                       
    

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; 
    $mail->SMTPAuth = true;
    $mail->Username = 'seev.dev@gmail.com'; 
    $mail->Password = 'egyi pqks gefa aduy'; 
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587; 
    

    $mail->setFrom('seev.dev@gmail.com', 'Your Name');
    $mail->addAddress('seev.dev@gmail.com', 'Archie');
    
  
    $mail->isHTML(false); 
    $mail->Subject = 'New form submission from:'.$firstName.' '.$lastName;
    $mail->Body    = $message;
        
    $mail->send();

    
}else{
    $response = array("success" => false, "message" => $errors['message']);
}

header('Content-Type: application/json');
echo json_encode($response);
}
         
?>

