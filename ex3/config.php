<?php
$pdo = new PDO("mysql:host=localhost;dbname=form_db;charset=utf8mb4", "YOUR_LOGIN", "YOUR_PASSWORD");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>