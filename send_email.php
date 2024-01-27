<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone']
    $comment = $_POST['comment'];

    
    $to = "lab@archiedrinks.com"; 
    $subject = "New Contact Form Submission";
    $message = "First Name: $firstName\nLast Name: $lastName\nEmail: $email";

    if (mail($to, $subject, $message)) {
        echo "Email sent successfully.";
    } else {
        echo "Failed to send email. Please try again later.";
    }
} else {
    echo "Error: Method not allowed.";
}
?>