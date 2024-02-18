<?php
    
    // if ($_SERVER["REQUEST_METHOD"] == "POST") {
     // Retrieve form data
     if (isset($_POST['firstName'])) {
        $firstName = $_POST['firstName'];
        // Process the first name
    }else {
        // Handle the case when 'firstName' key is not set
        $firstName = "Undefined"; // Default value or appropriate error handling
    }
    if (isset($_POST['firstName'])) {
        $lastName = $_POST['lastName'];
        // Process the first name
    }else {
        // Handle the case when 'firstName' key is not set
        $lastName = "Undefined"; // Default value or appropriate error handling
    }

  if(isset($_POST['email'])){
    $email = $_POST['email'];
  }else{
    $email = 'Undefined';
  };

  if(isset($_POST['phone'])){
    $phone = $_POST['phone'];
  }else{
    $phone = 'Undefined';
  };


  if(isset($_POST['comment'])){
    $comment = $_POST['comment'];
  }else{
    $comment = 'Undefined';
  };


        // Process the data (for demonstration, just printing here)
        echo "Fitst Name: $firstName <br>";
        echo "Last Name: $lastName <br>";
        echo "Email: $email <br>";
        echo "Phone: $phone <br>";
        echo "Comment: $comment <br>";
        

    // }
    
    // $to = "seev.dev@gmail.com"; 
    // $subject = "New Contact Form Submission";
    // $message = "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nPhone: $phone\n Comment: $comment";

    // if (mail($to, $subject, $message)) {
    //     echo "Email sent successfully.";
    // } else {
    //     echo "Failed to send email. Please try again later.";
    // }

    

?>

