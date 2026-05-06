<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/html; charset=UTF-8');

require 'config.php';

$allowedLanguages = [
    'Pascal','C','C++','JavaScript','PHP','Python',
    'Java','Haskel','Clojure','Prolog','Scala','Go'
];

$allowedGenders = ['male', 'female'];

$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $fullname = trim($_POST['fullname'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $birthdate = $_POST['birthdate'] ?? '';
    $gender = $_POST['gender'] ?? '';
    $languages = $_POST['languages'] ?? [];
    $bio = trim($_POST['bio'] ?? '');
    $contract = isset($_POST['contract']) ? 1 : 0;

    if (empty($fullname) || !preg_match("/^[a-zA-Zа-яА-Я ]{1,150}$/u", $fullname)) {
        $errors[] = "Некорректное ФИО";
    }

    if (empty($phone) || !preg_match("/^[0-9+\-() ]{5,20}$/", $phone)) {
        $errors[] = "Некорректный телефон";
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Некорректный email";
    }

    if (empty($birthdate)) {
        $errors[] = "Введите дату рождения";
    }

    if (!in_array($gender, $allowedGenders)) {
        $errors[] = "Выберите пол";
    }

    if (empty($languages)) {
        $errors[] = "Выберите хотя бы один язык";
    } else {
        foreach ($languages as $lang) {
            if (!in_array($lang, $allowedLanguages)) {
                $errors[] = "Ошибка в выборе языков";
                break;
            }
        }
    }

    if (!$contract) {
        $errors[] = "Подтвердите контракт";
    }

    if (empty($errors)) {
        try {

            $pdo->beginTransaction();

            $stmt = $pdo->prepare("
                INSERT INTO users (fullname, phone, email, birthdate, gender, biography, contract)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");

            $stmt->execute([
                $fullname, $phone, $email, $birthdate, $gender, $bio, $contract
            ]);

            $user_id = $pdo->lastInsertId();

            $stmtLang = $pdo->prepare("SELECT id FROM languages WHERE name=?");
            $stmtInsert = $pdo->prepare("INSERT INTO user_languages (user_id, language_id) VALUES (?, ?)");

            foreach ($languages as $lang) {
                $stmtLang->execute([$lang]);
                $lang_id = $stmtLang->fetchColumn();

                if ($lang_id) {
                    $stmtInsert->execute([$user_id, $lang_id]);
                }
            }

            $pdo->commit();
            $success = true;

        } catch (PDOException $e) {
            $pdo->rollBack();
            $errors[] = "Ошибка БД: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Результат</title>

<style>
body {
    font-family: Arial;
    background: linear-gradient(to right, #4facfe, #00f2fe);
    padding: 40px;
}

.container {
    max-width: 500px;
    margin: auto;
    background: white;
    padding: 25px;
    border-radius: 12px;
}

.success {
    background: #d4edda;
    padding: 15px;
    border-radius: 8px;
    color: green;
}

.error {
    background: #f8d7da;
    padding: 15px;
    border-radius: 8px;
    color: red;
}

a {
    display: inline-block;
    margin-top: 20px;
}
</style>

</head>
<body>

<div class="container">

<?php if ($success): ?>
    <div class="success">✅ Данные успешно сохранены!</div>
<?php else: ?>
    <div class="error">
        ❌ Ошибки:
        <ul>
            <?php foreach ($errors as $e): ?>
                <li><?= htmlspecialchars($e) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<a href="index.php">← Назад</a>

</div>

</body>
</html>