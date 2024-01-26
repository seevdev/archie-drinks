<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['firstName'];
  $name = $_POST['lastName'];
  $email = $_POST['email'];

  $to = [$email];
  $subject = "New submission from $name";
  $message = "Name: $name\nEmail: $email";

  // Send email
  mail($to, $subject, $message);

  // Redirect or display a confirmation message
 
  exit();
}
?>