<?php
    session_start();
    session_unset();
?>
<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<link href="lib/style.css" rel="stylesheet" type="text/css" >
        <title>Kalendarium</title>
    </head>
    <body class="body-login">
        <div class="authorsWindow">
			<button id="x" onClick="hideAuthorsWindow()">X</button>
			<div id="circleA"><p>JAKUB<br>SZAFRYK</p></div>
			<div id="circleB"><p>&</p></div>
			<div id="circleC"><p>KAROL<br>MACIEJSKI</p></div>
		</div>
        <div class="label-top">
            <h1>Kalendarium</h1>
            <button id="authors" onClick="showAuthorsWindow()">Autorzy</button>
        </div>
        <div class="login-form">
            <div class="form-box"></div>
            <div class="img-form-wrap">
                <img src="lib/logo.svg" alt="Kalendarium" onclick="location.href='mainPage.php';"/>
            </div>
            <h1>Logowanie</h1>
            <form action="" method="post" class="form">
                <label for="login">Login</label>
                <input type="text" name="login" id="login" required />
                <label for="password">Hasło</label>
                <input type="password" name="password" id="password" required />
                <input type="submit" value="ZALOGUJ" />
            </form>
            <?php
            error_reporting(0);
            require "lib/CalendarClass.php";

            $login = $_POST["login"];
            $password = sha1($_POST["password"]);

            if ($login != null && $password != null) {
                $calendardb = new CalendarDatabase();
                $sql ="SELECT id, login, haslo FROM uzytkownicy WHERE login = '$login'";
                $result = $calendardb->conn->query($sql);
                $row = $result->fetch_assoc();
                
                if ($row["login"] == $login && $row["haslo"] == $password) {
                    $_SESSION["user"] = $login;
                    $_SESSION["userId"] = $row["id"];
                    header("Location: mainPage.php");
                } else {
                    echo "<p style='color: #FF3535; margin: 0;'>Błędny login lub hasło</p>";
                }
            }
            ?>
            <p>Nie posiadasz konta?<br><a href="registerPage.php">Utwórz nowe</a></p>
        </div>
		<script src="lib/script.js"></script>
    </body>
</html>