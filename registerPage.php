<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">
		<link href="lib/style.css" rel="stylesheet" type="text/css" >
        <title>Kalendarium</title>
    </head>
    <body class="body-register">
        <div class="label-top">
            <h1>Kalendarium</h1>
        </div>
        <div class="login-form">
            <div class="form-box"></div>
            <img src="lib/logo.svg" alt="Kalendarium" onclick="location.href='mainPage.php';"/>
            <h1>Rejestracja</h1>
            <form action="" method="post" class="form">
                <label for="login">Login</label>
                <input type="text" name="login" id="login" required />
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" required />
                <label for="password">Hasło</label>
                <input type="password" name="password" id="password" required />
                <label for="conf_password">Potwierdź hasło</label>
                <input type="password" name="conf_password" id="password-confirm" required /><br />
                <input type="submit" value="UTWÓRZ" />
            </form>
            <?php
            error_reporting(0);
            require "lib/CalendarClass.php";

            $email = $_POST["email"];
            $login = $_POST["login"];
            $password = sha1($_POST["password"]);
            $conf_password = sha1($_POST["conf_password"]);

            if ($email != null && $login != null && $password != null) {
                if ($conf_password == $password) {
                    $calendardb = new CalendarDatabase();
                    $userArray = $calendardb->displayUser();
                    $used = false;

                    foreach ($userArray as $userTable) {
                        if ($email == $userTable["email"] || $login == $userTable["login"]) {
                            $used = true;
                            echo "<p>Użytkownik o takim emailu lub loginie już istnieje</p>";
                            break;
                        }
                    }
                    if ($used == false) {
                        $calendardb->addUser($email, $login, $password);
                        echo "<p>Pomyślnie utworzono konto</p>";
                    }
                } else {
                    echo "<p>Hasła nie są takie same</p>";
                }
            }
            ?>
            <p>Posiadasz już konto?<br><a href="loginPage.php">Zaloguj się</a></p>
        </div>
        <script src="lib/script.js"></script>
    </body>
</html>