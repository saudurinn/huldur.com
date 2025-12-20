<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $message = trim($_POST["message"]);

  if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
    http_response_code(400);
    echo "Vinsamlegast fylltu út alla reiti rétt.";
    exit;
  }

  $recipient = "kammerkorinnhuldur@gmail.com";
  $subject = "Ný skilaboð frá $name";
  $email_content = "Nafn: $name\n";
  $email_content .= "Netfang: $email\n\n";
  $email_content .= "Skilaboð:\n$message\n";

  $email_headers = "From: $name <$email>";

  if (mail($recipient, $subject, $email_content, $email_headers)) {
    http_response_code(200);
    echo "Takk fyrir skilaboðin! Við munum hafa samband fljótlega.";
  } else {
    http_response_code(500);
    echo "Villa við að senda skilaboð.";
  }
} else {
  http_response_code(403);
  echo "Villa: röng beiðni.";
}
?>
