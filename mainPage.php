<?php
session_start();
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
		<link href="lib/style.css" rel="stylesheet" type="text/css" >
        <title>Kalendarium</title>
    </head>
    <body class="body-main">
        <div id="EventWindow">
            <div class="EventPanel">
            <button onclick="hideEventWindow()">X</button>
				<h1><span id="event-label-first">NOWE WYDARZENIE</span> / <span id="event-label-second" onClick="displayOtherForm()">ZADANIE</span></h1>
				<form method="post" action="" id="wydarzenie-form">
					<label for="start_time">Godzina rozpoczęcia: </label>
					<span class="input-wrap"><input type="time" name="start_time" id="godz-roz" required /></span><br>
					<label for="date">Data: </label>
					<span class="input-wrap"><input type="date" name="date" id="data" required /></span><br>
					<label for="end_time">Godzina zakończenia: </label>
					<span class="input-wrap"><input type="time" name="end_time" id="godz-zak"required /></span><br>
					<label for="eventTitle">Tytuł: </label>
					<span class="input-wrap"><input type="text" name="eventTitle" id="tytul" placeholder="Przykładowy tytuł" required /></span><br>
					<label for="description" id="opis-label">Opis: </label>
					<span class="input-wrap"><textarea name="description" rows="4" id="opis" placeholder="Przykładowy opis" required></textarea></span><br>
					<div class="color-buttons">
						<input type="radio" name="kolor-wyd" value="#7A4BFF" id="kolor" checked>
						<input type="radio" name="kolor-wyd" value="#4BD4FF" id="kolor">
						<input type="radio" name="kolor-wyd" value="#FFB74B" id="kolor">
						<input type="radio" name="kolor-wyd" value="#FF4B4B" id="kolor">
						<input type="radio" name="kolor-wyd" value="#4FFF4B" id="kolor">
						<input type="radio" name="kolor-wyd" value="#FF4BCD" id="kolor">
						<input type="radio" name="kolor-wyd" value="#FFF72C" id="kolor">
					</div>
					<div class="cycle-buttons">
						<h1>Cykliczność: </h1>
						<input type="radio" id="tak" checked="checked" name="cyklicznosc" onClick="enableCycle()" value="0"/>
						<label for="tak">TAK</label>
						<input type="radio" id="nie" name="cyklicznosc" onClick="disableCycle()" value="1"/>
						<label for="nie">NIE</label>
					</div>
					<div class="czestotliwosc">
						<input type="radio" id="tydzien" name="czestotliwosc" value="2"/>
						<label for="tydzien" id="tydzien-label">CO TYDZIEŃ</label>
						<input type="radio" id="miesiac" checked="checked"  name="czestotliwosc" value="3"/>
						<label for="miesiac" id="miesiac-label">CO MIESIĄC</label>
						<input type="radio" id="rok" name="czestotliwosc" value="4"/>
						<label for="rok" id="rok-label">CO ROKU</label>
					</div>
					<div class="submit-wrap">
						<input type="submit" value="DODAJ">
					</div>
				</form>
				<form method="post" action="" id="zadanie-form">
					<label for="time">Godzina: </label>
					<span class="input-wrap"><input type="time" name="time" id="godz" required /></span><br>
					<label for="start_date">Data rozpoczęcia: </label>
					<span class="input-wrap"><input type="date" name="start_date" id="data-roz" required /></span><br>
                    <label for="end_date">Data zakończenia: </label>
					<span class="input-wrap"><input type="date" name="end_date" id="data-zak"required /></span><br>
					<label for="taskTitle">Tytuł: </label>
					<span class="input-wrap"><input type="text" name="taskTitle" id="tytul" placeholder="Przykładowy tytuł" required /></span><br>
					<div class="color-buttons">
						<input type="radio" checked="checked" name="kolor-zad">
						<input type="radio" name="kolor-zad">
						<input type="radio" name="kolor-zad">
						<input type="radio" name="kolor-zad">
						<input type="radio" name="kolor-zad">
						<input type="radio" name="kolor-zad">
						<input type="radio" name="kolor-zad">
					</div>
					<div class="submit-wrap">
						<input type="submit" value="DODAJ">
					</div>
				</form>
			</div>
		</div>
		<div class="label-top">
			<h1>Kalendarium</h1>
		</div>
		<div class="navbar">
			<div class="button-wrap">
				<?php
				//sprawdzenie zalogowanego użytkownika
				if (isset($_SESSION["user"])) {
					echo '<button><a href="userPanelPage.php">'.$_SESSION["user"].'</a></button>';
				} else {
					echo '<button><a href="loginPage.php">ZALOGUJ SIĘ</a></button>';
				}
				?>
			</div>
			<img src="lib/logo.svg" alt="Kalendarium" onclick="location.href='mainPage.php';"/>
			<div class="button-wrap">
				<?php
				//sprawdzenie zalogowanego użytkownika
				if (isset($_SESSION["user"])) {
					echo '<button><a href="loginPage.php">WYLOGUJ SIĘ</a></button>';
				} else {
					echo '<button><a href="registerPage.php">UTWÓRZ KONTO</a></button>';
				}
				?>
			</div>
		</div>
		<div class="label-middle">
			<h2>Wybierz co chcesz wyświetlić</h2>
		</div>
		<div class="main">
			<div class="main-header">
				<ul id="layout-list">
					<li id="selected" class="rok" >ROK</li>
					<li class="miesiac">MIESIĄC</li>
					<li class="tydzien">TYDZIEŃ</li>
					<li class="dzien">DZIEŃ</li>
				</ul>
			</div>
			<div class="color-box"><p id="curDate">FFGGF</p></div>
			<div class="calendar">
				<div class="calendar-label">
					<h1 id="labelA">Rok 2022</h1>
					<h1 id="labelB">XXI Wiek</h1>
				</div>
				<div class="grid">
				</div>
			</div>
		</div>
		<div class="events">
			<h2>WYDARZENIA</h2>
			<div id="event-list"></div>
			<div class="buttons">
				<div class="btn-wrap"><button onClick='showEventWindow()'>DODAJ NOWE</button></div>
				<button>WYŚWIETL WSZYSTKIE</button>
			</div>		
		</div>
		<script src="lib/script.js"></script>
        <?php
		error_reporting(0);

		require "lib/CalendarClass.php";
		
		if (isset($_SESSION["user"])) {
			$createdBy = $_SESSION["userId"];
        	$calendardb = new CalendarDatabase();

			//utworzenie tablic z rekordami potrzebnymi do wyśwtielenia aktualnych wydarzeń, zadań oraz użytkowników w kalendarzu
        	$eventArray = $calendardb->displayEvent($createdBy);
			$shareEventArray = $calendardb->displayShareEvent($createdBy);
        	$taskArray = $calendardb->displayTask($createdBy);
			$shareTaskArray = $calendardb->displayShareTask($createdBy);
			$userArray = $calendardb->displayUser();
        
        	//dodawanie nowego wydarzenia
        	$eventTitle = $_POST["eventTitle"];
        	$date = $_POST["date"];
    	    $start_time = $_POST["start_time"];
   		    $end_time = $_POST["end_time"];
        	$description = $_POST["description"];
			$eventColor = $_POST["kolor-wyd"];
			if ($_POST["cyklicznosc"] == 1) {
				$cyklicznosc_id = 1;
			} else {
				$cyklicznosc_id = $_POST["czestotliwosc"];
			}

        	if ($eventTitle != null && $date != null && $start_time != null && $end_time != null && $description != null && $eventColor != null && $cyklicznosc_id != null) {
            	$calendardb->addEvent($eventTitle, $date, $start_time, $end_time, $description, $eventColor, $cyklicznosc_id, $createdBy);
        	}

        	//edycja wydarzenia
			$eventId = $_POST["EventId"];
			$updateEventTitle = $_POST["updateEventTitle"];
			$updateDate = $_POST["updateDate"];
    	    $updateStart_time = $_POST["updateStart_time"];
   		    $updateEnd_time = $_POST["updateEnd_time"];
        	$updateDescription = $_POST["updateDescription"];
			$updateEventColor = $_POST["updateEventColor"];
			if ($_POST["updateCyklicznosc"] == 1) {
				$cyklicznosc_id = 1;
			} else {
				$cyklicznosc_id = $_POST["updateCzestotliwosc"];
			}

			if ($eventId != null && $updateEventTitle != null && $updateDate != null && $updateStart_time != null && $updateEnd_time != null && $updateDescription != null && $updateEventColor != null && $cyklicznosc_id != null) {
            	$calendardb->updateEvent($eventId, $updateEventTitle, $updateDate, $updateStart_time, $updateEnd_time, $updateDescription, $updateEventColor, $cyklicznosc_id, $createdBy);
        	}

        	//usuwanie wydarzenia
			if (isset($deleteEventId)) {
				$calendardb->deleteEvent($deleteEventId);
			}

        	//dodawanie nowego zadania
        	$taskTitle = $_POST["taskTitle"];
        	$start_date = $_POST["start_date"];
       		$end_date = $_POST["end_date"];
        	$time = $_POST["time"];
			$taskColor = $_POST["kolor-zad"];

        	if ($taskTitle != null && $start_date != null && $end_date != null && $time != null && $taskColor != null) {
            	$calendardb->addTask($taskTitle, $start_date, $end_date, $time, $taskColor, $createdBy);
        	}

        	//edycja zadania
			$taskId = $_POST["taskId"];
			$updateTaskTitle = $_POST["updateTaskTitle"];
        	$updateStart_date = $_POST["updateStart_date"];
       		$updateEnd_date = $_POST["updateEnd_date"];
        	$updateTime = $_POST["updateTime"];
			$updateTaskColor = $_POST["updateTaskColor"];

        	if ($taskId != null && $updateTaskTitle != null && $updateStart_date != null && $updateEnd_date != null && $updateTime != null && $updateTaskColor != null) {
            	$calendardb->updateTask($taskId, $updateTaskTitle, $updateStart_date, $updateEnd_date, $updateTime, $updateTaskColor, $createdBy);
        	}

        	//usuwanie zadania
        	if (isset($deleteTaskId)) {
				$calendardb->deleteTask($deleteTaskId);
			}

			//dodawanie nowego udostepnienia wydarzenia
			if (isset($shareEventId) && isset($shareUserId)) {
				$calendardb->addShareEvent($shareEventId, $shareUserId);
			}

			//usuwanie udostepnienia wydarzenia
			if (isset($deleteShareEventId)) {
				$calendardb->deleteShareEvent($deleteShareEventId);
			}

			//dodawanie nowego udostepnienia zadania
			if (isset($shareTaskId) && isset($shareUserId)) {
				$calendardb->addShareTask($shareTaskId, $shareUserId);
			}

			//usuwanie udostepnienia wydarzenia
			if (isset($deleteShareTaskId)) {
				$calendardb->deleteShareTask($deleteShareTaskId);
			}
		}
        ?>
		<script>
		/*var eventArray = <?php echo json_encode($eventArray); ?>;
		document.write(eventArray[1][2])*/;
		</script>
    </body>
</html>