<?php

$host = '127.0.0.1';
$db   = 'todo';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$pdo = new PDO($dsn, 'root', '');

function getAllTasks($pdo) {
    $sth = $pdo->prepare("SELECT * FROM tasks");
    $sth->execute();

    $result = $sth->fetchAll();
    return $result;
}

switch ($_GET['action']) {
    case 'add':
        $name = $_GET['name'];
        $statement = $pdo->prepare('INSERT INTO tasks (name) VALUES (:name)');

        $statement->execute(['name' => $name]);

        $result = getAllTasks($pdo);
        echo json_encode($result);
        break;

    case 'edit':
        $id = $_GET['id'];
        $name = $_GET['name'];
        $is_completed = $_GET['is_completed'];

        $sql = "UPDATE users SET name=?, is_completed=? WHERE id=?";
        $stmt= $pdo->prepare($sql);
        $stmt->execute([$name, $is_completed, $id]);

        $result = getAllTasks($pdo);
        echo json_encode($result);
        break;

    case 'delete':
        $id = $_GET['id'];

        $q = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $q->execute(array($id));

        $result = getAllTasks($pdo);
        echo json_encode($result);
        break;

    case 'getAll':
        $result = getAllTasks($pdo);
        echo json_encode($result);
        break;
} ?>