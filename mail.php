<?php
//  Получение данных с формы

$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$tel = htmlspecialchars($_POST['tel']);

// Параметры для функции email

$sourse = getenv('HTTP_REFERER');
$subject = 'Заявка на обратный звонок';
$message = "Сообщение:
	<br><br>
	Имя: $name<br>
	Почта: $email<br>
	Номер телефона: $tel<br>
	Источник: $sourse
";

$headers = "From: $email\r\nReply-To: $email\r\nContent-type: text/html; charset=utf-8\r\n";



// Отправка данных на почту:

$success = mail("prudnikovamaria53@gmail.com", $subject, $message, $headers);

?>