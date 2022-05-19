<?php
	error_reporting(0);

	require "lib/CalendarClass.php";
	$calendardb = new CalendarDatabase();

	if (!isset($_SESSION)) {
		session_start();
	}
	if (isset($_SESSION["user"])) {
		$createdBy = $_SESSION["userId"];
		if ($calendardb->displayCalendar($createdBy) == false) {
			$calendardb->addCalendar("główny", $createdBy);
			echo "<meta http-equiv='refresh' content='0'>";
		}
	}
	
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$_SESSION['postdata'] = $_POST;
		unset($_POST);
		header("Location: ".$_SERVER['PHP_SELF']);
		exit;
	}
	
	if ($_SESSION['postdata']){
		$_POST=$_SESSION['postdata'];
		unset($_SESSION['postdata']);
	}	
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
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
        <title>Kalendarium</title>
    </head>
    <body class="body-main">
		<!-- Poszczególne formularze do tworzenia, 
		edytowania, usuwania i udostępniania zdarzeń -->
        <div id="EventWindow">
            <div class="EventPanel">
				<button onclick="hideEventWindow()">X</button>
				<h1 id="eventLabel"><span id="event-label-first">NOWE WYDARZENIE</span> / <span id="event-label-second" onClick="displayOtherForm(1)">ZADANIE</span></h1>
				<form method="post" action="" id="wydarzenie-form" name="wydarzenie-form" onsubmit="return Validation(1)">
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
					<label for="calendars">Kalendarz: </label>
					<span class="input-wrap"><select name="calendars" id="calendarSelect">
						<?php
						if (isset($_SESSION["user"])) {
							$calendarArray = $calendardb->displayCalendar($createdBy);
							for ($i = 0; $i < count($calendarArray); $i++) {
								echo '<option value="'.$calendarArray[$i][0].'">'.$calendarArray[$i][1].'</option>';
							}
						}
						?>
					</select></span>
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
						<input type="radio" id="tak" checked="checked" name="cyklicznosc" onClick="enableCycle(1)" value="0"/>
						<label for="tak">TAK</label>
						<input type="radio" id="nie" name="cyklicznosc" onClick="disableCycle(1)" value="1"/>
						<label for="nie">NIE</label>
						<label for="cycleCount" id="CCount">ILOŚĆ:<input type="number" name="cycleCount" id="cycleCount" placeholder="1-12" min="1" max="12" required /></label>
					</div>
					<div class="czestotliwosc">
						<input type="radio" id="tydzien" name="czestotliwosc" value="2"/>
						<label for="tydzien" id="tydzien-label">CO TYDZIEŃ</label>
						<input type="radio" id="miesiac" checked="checked"  name="czestotliwosc" value="3"/>
						<label for="miesiac" id="miesiac-label">CO MIESIĄC</label>
						<input type="radio" id="rok" name="czestotliwosc" value="4"/>
						<label for="rok" id="rok-label">CO ROKU</label>
					</div>
					<div id="event_error"></div>
					<div class="submit-wrap">
						<input type="submit" name="submit" value="DODAJ">
					</div>
				</form>
				<form method="post" action="" id="update-wydarzenie-form" name="update-wydarzenie-form">
					<input type="hidden" id="EventId" name="EventId" value="">
					<input type="hidden" id="EventAuthor" name="EventAuthor" value="">
					<label for="updateStart_time">Godzina rozpoczęcia: </label>
					<span class="input-wrap"><input type="time" name="updateStart_time" id="Ugodz-roz" required /></span><br>
					<label for="updateDate">Data: </label>
					<span class="input-wrap"><input type="date" name="updateDate" id="Udata" required /></span><br>
					<label for="updateEnd_time">Godzina zakończenia: </label>
					<span class="input-wrap"><input type="time" name="updateEnd_time" id="Ugodz-zak"required /></span><br>
					<label for="updateEventTitle">Tytuł: </label>
					<span class="input-wrap"><input type="text" name="updateEventTitle" id="Utytul" placeholder="Przykładowy tytuł" required /></span><br>
					<label for="updateDescription" id="opis-label">Opis: </label>
					<span class="input-wrap"><textarea name="updateDescription" rows="4" id="Uopis" placeholder="Przykładowy opis" required></textarea></span><br>
					<label for="calendars">Kalendarz: </label>
					<span class="input-wrap"><select name="calendars" id="calendarSelectE">
						<?php
						if (isset($_SESSION["user"])) {
							$calendarArray = $calendardb->displayCalendar($createdBy);
							for ($i = 0; $i < count($calendarArray); $i++) {
								echo '<option value="'.$calendarArray[$i][0].'">'.$calendarArray[$i][1].'</option>';
							}
						}
						?>
					</select></span>
					<div class="color-buttons">
						<input type="radio" name="updateKolor-wyd" value="#7A4BFF" id="kolor" checked>
						<input type="radio" name="updateKolor-wyd" value="#4BD4FF" id="kolor">
						<input type="radio" name="updateKolor-wyd" value="#FFB74B" id="kolor">
						<input type="radio" name="updateKolor-wyd" value="#FF4B4B" id="kolor">
						<input type="radio" name="updateKolor-wyd" value="#4FFF4B" id="kolor">
						<input type="radio" name="updateKolor-wyd" value="#FF4BCD" id="kolor">
						<input type="radio" name="updateKolor-wyd" value="#FFF72C" id="kolor">
					</div>
					<div class="cycle-buttons">
						<h1>Cykliczność: </h1>
						<input type="radio" id="Utak" name="updateCyklicznosc" onClick="enableCycle(2)" value="0"/>
						<label for="Utak" id="Utak-label">TAK</label>
						<input type="radio" id="Unie" checked="checked" name="updateCyklicznosc" onClick="disableCycle(2)" value="1"/>
						<label for="Unie" id="Unie-label">NIE</label>
					</div>
					<div class="czestotliwosc">
						<input type="radio" id="Utydzien" name="updateCzestotliwosc" value="2"/>
						<label for="Utydzien" id="Utydzien-label">CO TYDZIEŃ</label>
						<input type="radio" id="Umiesiac" checked="checked"  name="updateCzestotliwosc" value="3"/>
						<label for="Umiesiac" id="Umiesiac-label">CO MIESIĄC</label>
						<input type="radio" id="Urok" name="updateCzestotliwosc" value="4"/>
						<label for="Urok" id="Urok-label">CO ROKU</label>
					</div>
					<div id="event_error"></div>
					<div class="submit-wrap">
						<input type="submit" name="submit" value="EDYTUJ">
					</div>
				</form>
				<form method="post" action="" id="zadanie-form" onsubmit="return Validation(2)">
					<label for="time">Godzina: </label>
					<span class="input-wrap"><input type="time" name="time" id="godz" required /></span><br>
					<label for="taskDate">Data: </label>
					<span class="input-wrap"><input type="date" name="taskDate" id="data" required /></span><br>
					<label for="taskTitle">Tytuł: </label>
					<span class="input-wrap"><input type="text" name="taskTitle" id="tytul" placeholder="Przykładowy tytuł" required /></span><br>
					<label for="description" id="opis-label">Opis: </label>
					<span class="input-wrap"><textarea name="taskDesc" rows="4" id="opis" placeholder="Przykładowy opis" required ></textarea></span><br>
					<label for="calendars">Kalendarz: </label>
					<span class="input-wrap"><select name="calendars" id="calendarSelect">
						<?php
						if (isset($_SESSION["user"])) {
							$calendarArray = $calendardb->displayCalendar($createdBy);
							for ($i = 0; $i < count($calendarArray); $i++) {
								echo '<option value="'.$calendarArray[$i][0].'">'.$calendarArray[$i][1].'</option>';
							}
						}
						?>
					</select></span>
					<div class="color-buttons">
						<input type="radio" name="kolor-zad" value="#7A4BFF" id="kolor-zad" checked>
						<input type="radio" name="kolor-zad" value="#4BD4FF" id="kolor-zad">
						<input type="radio" name="kolor-zad" value="#FFB74B" id="kolor-zad">
						<input type="radio" name="kolor-zad" value="#FF4B4B" id="kolor-zad">
						<input type="radio" name="kolor-zad" value="#4FFF4B" id="kolor-zad">
						<input type="radio" name="kolor-zad" value="#FF4BCD" id="kolor-zad">
						<input type="radio" name="kolor-zad" value="#FFF72C" id="kolor-zad">
					</div>
					<div id="task_error"></div>
					<div class="submit-wrap">
						<input type="submit" value="DODAJ">
					</div>
					<input type="hidden" id="CalendarId" name="CalendarId" value="">
				</form>
				<form method="post" action="" id="update-zadanie-form">
					<input type="hidden" id="UTaskId" name="UTaskId" value="">
					<label for="time">Godzina: </label>
					<span class="input-wrap"><input type="time" name="updateTime" id="UZgodz" required /></span><br>
					<label for="taskDate">Data: </label>
					<span class="input-wrap"><input type="date" name="updateTaskDate" id="UZdata" required /></span><br>
					<label for="taskTitle">Tytuł: </label>
					<span class="input-wrap"><input type="text" name="updateTaskTitle" id="UZtytul" placeholder="Przykładowy tytuł" required /></span><br>
					<label for="description" id="opis-label">Opis: </label>
					<span class="input-wrap"><textarea name="updateTaskDesc" rows="4" id="UZopis" placeholder="Przykładowy opis" required ></textarea></span><br>
					<label for="calendars">Kalendarz: </label>
					<span class="input-wrap"><select name="calendars" id="calendarSelectT">
						<?php
						if (isset($_SESSION["user"])) {
							$calendarArray = $calendardb->displayCalendar($createdBy);
							for ($i = 0; $i < count($calendarArray); $i++) {
								echo '<option value="'.$calendarArray[$i][0].'">'.$calendarArray[$i][1].'</option>';
							}
						}
						?>
					</select></span>
					<div class="color-buttons">
						<input type="radio" name="updateKolor-zad" value="#7A4BFF" checked>
						<input type="radio" name="updateKolor-zad" value="#4BD4FF">
						<input type="radio" name="updateKolor-zad" value="#FFB74B">
						<input type="radio" name="updateKolor-zad" value="#FF4B4B">
						<input type="radio" name="updateKolor-zad" value="#4FFF4B">
						<input type="radio" name="updateKolor-zad" value="#FF4BCD">
						<input type="radio" name="updateKolor-zad" value="#FFF72C">
					</div>
					<div class="submit-wrap">
						<input type="submit" value="EDYTUJ">
					</div>
				</form>
				<form method="post" action="" id="udostepnij-form" onsubmit="return Validation(3)">
					<div class="users-buttons">
						<?php
						//wyświetlenie listy użytkowników
						$userArray = $calendardb->displayUser();
						for ($i = 1; $i <= count($userArray); $i++) {
							if ($userArray[$i-1][0] != $createdBy) {
								echo '<input type="checkbox" id="'.$i.'" name="shareUserId[]" value="'.$userArray[$i-1][0].'" />
								<label for="'.$i.'"><i class="fa-regular fa-user"></i><p>'.$userArray[$i-1][2].'</p></label>';
							}
						}
						?>
					</div>
					<input type="hidden" id="shareEventId" name="shareEventId" />
					<input type="hidden" id ="shareTaskId" name="shareTaskId" />
					<div id="share_error"></div>
					<input type="submit" value="UDOSTĘPNIJ">
				</form>
				<form method="post" id="create-calendar" action="" onSubmit="return Validation(4)">
					<label for="calendarName">Nazwa: </label>
					<span class="input-wrap"><input type="text" name="calendarName" id="calendarName" placeholder="Przykładowa nazwa" required /></span><br>
					<div id="calendar_error"></div>
					<input type="submit" value="UTWÓRZ">
				</form>
				<form method="post" id="delete-calendar" action="" onSubmit="return Validation(5)">
					<label for="deleteCalendarId">Nazwa: </label>
					<span class="input-wrap"><select name="deleteCalendar" id="deleteCalendarId">
						<?php
						if (isset($_SESSION["user"])) {
							$calendarArray = $calendardb->displayCalendar($createdBy);
							for ($i = 0; $i < count($calendarArray); $i++) {
								echo '<option value="'.$calendarArray[$i][0].'" >'.$calendarArray[$i][1].'</option>';
							}
						}
						?>
					</select></span>
					<div id="calendar_delete_error"></div>
					<input type="submit" value="USUŃ">
				</form>
				<div id="EventsWindow">
					<h1 id="wydAll">WYDARZENIA</h1>
						<div id="allWydarzenia"></div>
					<h1 id="zadAll" style="background: #4da6ff;">ZADANIA</h1>
						<div id="allZadania"></div>
					<h1 id="udosAll" style="background: #ff4d4d;">UDOSTĘPNIONE</h1>
						<div id="allUdostepnione"></div>
				</div>
				<div class="gradientBox"></div>
			</div>
		</div>
		<div class="authorsWindow">
			<button id="x" onClick="hideAuthorsWindow()">X</button>
			<div id="circleA"><p>JAKUB<br>SZAFRYK</p></div>
			<div id="circleB"><p>&</p></div>
			<div id="circleC"><p>KAROL<br>MACIEJSKI</p></div>
		</div>
		<form method="post" id="deleteEventForm" action="">
			<input type="hidden" id="deleteEventId" name="deleteEventId" value="">
		</form>
		<form method="post" id="deleteTaskForm" action="">
			<input type="hidden" id="deleteTaskId" name="deleteTaskId" value="">
		</form>
		<form method="post" id="deleteShareEventForm" action="">
			<input type="hidden" id="deleteShareEventId" name="deleteShareEventId" value="">
		</form>
		<form method="post" id="deleteShareTaskForm" action="">
			<input type="hidden" id="deleteShareTaskId" name="deleteShareTaskId" value="">
		</form>
		<div class="label-top">
			<h1>Kalendarium</h1>
			<button id="authors" onClick="showAuthorsWindow()">Autorzy</button>
		</div>
		<div class="navbar">
			<div class="button-wrap">
				<?php
				//sprawdzenie zalogowanego użytkownika
				if (isset($_SESSION["user"])) {
					echo '<button>'.$_SESSION["user"].'</button>';
				} else {
					echo '<button><a href="loginPage.php">ZALOGUJ SIĘ</a></button>';
				}
				?>
			</div>
			<div class="logo">
				<img src="lib/logo.svg" alt="Kalendarium" onclick="location.href='mainPage.php';"/>
			</div>
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
		<div class="calendarList">
			<ul id="calendars">
				<?php
					if (isset($_SESSION["user"])) {
						$calendars = $calendardb->displayCalendar($createdBy);
						foreach ($calendars as $calendar) {
							if ($calendar[1] == "główny"){
								echo '<li style="background: white;" id="'.$calendar[0].'" name="'.$calendar[1].'">'.$calendar[1].'</li>';
							}
							else {
								echo '<li id="'.$calendar[0].'" name="'.$calendar[1].'">'.$calendar[1].'</li>';
							}
						}
					}
				?>
				<li value="+" id="+" onClick="showCalendars(1)"><i class="fa-solid fa-plus"></i></li>
				<li value="-" id="-" onClick="showCalendars(2)"><i class="fa-solid fa-minus"></i></li>
				</ul>
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
			<div class="color-box"><button id="printBtn" onClick="window.print();"><i class="fa-solid fa-print"></i></button><p id="curDate"></p><button id="printBtn" onClick="saveDiv()"><i class="fa-solid fa-download"></i></button></div>
			<div class="calendar">
				<div class="calendar-label">
					<div id="labelA">Rok 2022</div>
					<div id="labelB">XXI Wiek</div>
				</div>
				<div class="grid">
				</div>
			</div>
		</div>
		<div class="events">
			<h2>NADCHODZĄCE WYDARZENIA I ZADANIA<span style="float: right;">GODZINA</span></h2>
			<div id="event-list"></div>
			<div class="buttons">
				<div class="btn-wrap"><button onClick='showEventWindow(1)'>DODAJ NOWE</button></div>
				<button class="showAllBtn" onClick="showAllWindow()">WYŚWIETL WSZYSTKIE</button>
			</div>		
		</div>
		<script src="lib/script.js"></script>
        <?php
		if (isset($_SESSION["user"])) {
			
			echo '<script type="text/javascript">',
				'disableSwitch(0);',
				'</script>'
			;

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
			$cycleCount = $_POST["cycleCount"];
			$CalendarId = $_POST["calendars"];

        	if ($eventTitle != null && $date != null && $start_time != null && $end_time != null && $description != null && $eventColor != null && $cyklicznosc_id != null && $CalendarId != null) {	
				$eventArray = $calendardb->displayEvent($createdBy);
				$exists = false;
				foreach ($eventArray as $eventTable) {
					if ($date == $eventTable[3] && $start_time == $eventTable[4] && $eventTitle == $eventTable[1] && $description == $eventTable[2] && $eventColor == $eventTable[6] && $createdBy == $eventTable[7]) {
						$exists = true;
						event_error();
					}
				}
				if ($exists === false) {
					for ($i = 0; $i <= $cycleCount; $i++) {
						$calendardb->addEvent($eventTitle, $date, $start_time, $end_time, $description, $eventColor, $cyklicznosc_id, $createdBy, $CalendarId);
						if ($cyklicznosc_id == "1") {
							break;
						}
						if ($cyklicznosc_id == "2") {
							$date = date('Y-m-d', strtotime("+1 week", strtotime($date)));
						}
						if ($cyklicznosc_id == "3") {
							$date = date('Y-m-d', strtotime("+1 month", strtotime($date)));
						}
						if ($cyklicznosc_id == "4") {
							$date = date('Y-m-d', strtotime("+1 year", strtotime($date)));
						}
					}
					echo $CalendarId;
				}
        	}

        	//edycja wydarzenia
			$eventId = $_POST["EventId"];
			$eventAuthor = $_POST["EventAuthor"];
			$updateEventTitle = $_POST["updateEventTitle"];
			$updateDate = $_POST["updateDate"];
    	    $updateStart_time = $_POST["updateStart_time"];
   		    $updateEnd_time = $_POST["updateEnd_time"];
        	$updateDescription = $_POST["updateDescription"];
			$updateEventColor = $_POST["updateKolor-wyd"];
			if ($_POST["updateCyklicznosc"] == 1) {
				$cyklicznosc_id = 1;
			} else {
				$cyklicznosc_id = $_POST["updateCzestotliwosc"];
			}

			if ($eventId != null && $updateEventTitle != null && $updateDate != null && $updateStart_time != null && $updateEnd_time != null && $updateDescription != null && $updateEventColor != null && $cyklicznosc_id != null && $CalendarId != null) {
				$calendardb->updateEvent($eventId, $updateEventTitle, $updateDate, $updateStart_time, $updateEnd_time, $updateDescription, $updateEventColor, $cyklicznosc_id, $eventAuthor, $CalendarId);
			}

			$deleteEventId = $_POST["deleteEventId"];		
			
        	//usuwanie wydarzenia
			if (isset($deleteEventId) && $deleteEventId != "") {
				$shareEvents = $calendardb->displayAllShareEvent();
				foreach ($shareEvents as $shareEvent) {
					if ($shareEvent[1] == $deleteEventId){
						$calendardb->deleteShareEvent($deleteEventId,$shareEvent[2]);
					}
				}
				$calendardb->deleteEvent($deleteEventId);
			}

        	//dodawanie nowego zadania
        	$taskTitle = $_POST["taskTitle"];
			$taskDesc = $_POST["taskDesc"];
        	$taskDate = $_POST["taskDate"];
        	$time = $_POST["time"];
			$taskColor = $_POST["kolor-zad"];

        	if ($taskTitle != null && $taskDesc != null && $taskDate != null && $time != null && $taskColor != null && $CalendarId != null) {
				$taskArray = $calendardb->displayTask($createdBy);
				$Exists = false;
				foreach ($taskArray as $taskTable) {
					if ($taskDate == $taskTable[3] && $time == $taskTable[4] && $eventTitle == $taskTable[1] && $description == $taskTable[2] && $eventColor == $taskTable[5] && $createdBy == $taskTable[6]) {
						$Exists = true;
						event_error();
					}
				}
				if ($Exists === false) {
					$calendardb->addTask($taskTitle, $taskDesc, $taskDate, $time, $taskColor, $createdBy, $CalendarId);
				}
        	}

        	//edycja zadania
			$taskId = $_POST["UTaskId"];
			$updateTaskTitle = $_POST["updateTaskTitle"];
			$updateTaskDesc = $_POST["updateTaskDesc"];
        	$updateTaskDate = $_POST["updateTaskDate"];
        	$updateTime = $_POST["updateTime"];
			$updateTaskColor = $_POST["updateKolor-zad"];

        	if ($taskId != null && $updateTaskTitle != null && $updateTaskDesc != null && $updateTaskDate != null && $updateTime != null && $updateTaskColor != null && $CalendarId != null) {
            	$calendardb->updateTask($taskId, $updateTaskTitle, $updateTaskDesc, $updateTaskDate, $updateTime, $updateTaskColor, $createdBy, $CalendarId);
        	}

			$deleteTaskId = $_POST["deleteTaskId"];

        	//usuwanie zadania
        	if (isset($deleteTaskId)) {
				$shareTasks = $calendardb->displayAllShareTask();
				foreach ($shareTasks as $shareTask) {
					if ($shareTask[1] == $deleteTaskId){
						$calendardb->deleteShareTask($deleteTaskId,$shareTask[2]);
					}
				}
				$calendardb->deleteTask($deleteTaskId);
			}
			
			//dodawanie nowego kalendarza
			$calendarName = $_POST["calendarName"];

			if ($calendarName != null) {
				$calendardb->addCalendar($calendarName, $createdBy);
			}

			//usuwanie kalendarza
			$deleteCalendarId = $_POST["deleteCalendar"];

			if ($deleteCalendarId != null) {
				$calendardb->deleteCalendar($deleteCalendarId);
			}

			//dodawanie nowego udostepnienia wydarzenia
			$shareEventId = $_POST["shareEventId"];
			$shareUserId = $_POST["shareUserId"];

			if ($shareEventId != null && $shareUserId != null) {
				for ($i = 0; $i < count($shareUserId); $i++) {
					$calendardb->addShareEvent($shareEventId, $shareUserId[$i]);
				}
			}

			//dodawanie nowego udostepnienia zadania
			$shareTaskId = $_POST["shareTaskId"];

			if ($shareTaskId != null && $shareUserId != null) {
				for ($i = 0; $i < count($shareUserId); $i++) {
					$calendardb->addShareTask($shareTaskId, $shareUserId[$i]);
				}
			}

			//usuwanie udostępnienia wydarzeń i zadań
			$deleteShareEventId = $_POST["deleteShareEventId"];

			if (isset($deleteShareEventId) && $deleteShareEventId != "") {
				$calendardb->deleteShareEvent($deleteShareEventId,$createdBy);
			}

			$deleteShareTaskId = $_POST["deleteShareTaskId"];

			if (isset($deleteShareTaskId) && $deleteShareTaskId != "") {
				$calendardb->deleteShareTask($deleteShareTaskId,$createdBy);
			}

			unset($_POST);
		}
		else {
			echo '<script type="text/javascript">',
				'disableSwitch(1);',
				'</script>'
			;
		}
    	?>
		<script type="text/javascript">
			//Widok poszczególnych kalendarzy
			showCalendar(document.querySelector('#calendars :nth-child(1)').id, document.querySelector('#calendars :nth-child(1)').getAttribute("name"));
			function showCalendar(id,name) {
				window.user = <?php echo json_encode($createdBy); ?>;
				window.wydarzenia = [];
				window.zadania = [];

				//Pobieranie wydarzeń z bazy danych
				var eventArray = <?php echo json_encode(array_merge($calendardb->displayEvent($createdBy), $calendardb->displayShareEvent($createdBy))); ?>;
				var wydarzenie = new Array();
				for (i = 0; i < eventArray.length; i++){
					for (j = 0; j < 10; j++){
						wydarzenie.push(eventArray[i][j])
					}
					if (wydarzenie[9] == id || (name == "główny" && wydarzenie[8] != window.user)){
						window.wydarzenia.push(wydarzenie);
					}
					wydarzenie = [];
				}
				
				//Pobieranie zadań z bazy danych
				var taskArray = <?php echo json_encode(array_merge($calendardb->displayTask($createdBy), $calendardb->displayShareTask($createdBy))); ?>;
				var zadanie = new Array();
				for (i = 0; i < taskArray.length; i++){
					for (j = 0; j < 8; j++){
						zadanie.push(taskArray[i][j])
					}
					if (zadanie[7] == id || (name == "główny" && zadanie[6] != window.user)){
						window.zadania.push(zadanie);
					}
					zadanie = [];
				}
				
				//Pobieranie użytkowników z bazy danych
				var userArray = <?php echo json_encode($calendardb->displayUser()); ?>;
				var user = new Array();
				for (i = 0; i < userArray.length; i++){
					for (j = 0; j < 8; j++){
						user.push(userArray[i][j])
					}
					window.users.push(user);
					user = [];
				}	
				showWydarzenia(<?php echo json_encode($createdBy); ?>);
				var calendarArray = <?php echo json_encode($calendardb->displayCalendar($createdBy)); ?>;
				if (calendarArray.length > 1){
					document.getElementById("-").style.display = "block";
				}
				else {
					document.getElementById("-").style.display = "none";
				}	
			}
			
			//Sprawdzanie poprawności wypełnienia poszczególnych formularzy
			function Validation(x){
				switch (x){
					case 1:
						let dateE = document.forms["wydarzenie-form"]["date"].value;
						let timeE = document.forms["wydarzenie-form"]["start_time"].value;
						timeE = timeE.concat(":00");
						let titleE = document.forms["wydarzenie-form"]["eventTitle"].value;
						let descE = document.forms["wydarzenie-form"]["description"].value;
						let colorE = document.querySelector('#kolor:checked').value;
						let existsE = false;
						for (i = 0;i < window.wydarzenia.length; i++){
							if (dateE == window.wydarzenia[i][3] && timeE == window.wydarzenia[i][4] && titleE == window.wydarzenia[i][1] && descE == window.wydarzenia[i][2] && colorE == window.wydarzenia[i][6]){
								existsE = true;
							}
						}
						if (existsE == true){
							document.getElementById("event_error").innerHTML = "<p>Wydarzenie o podanych parametrach już istnieje!</p>";
							return false;
						}
						else {
							return true;
						}
						break;
					case 2:
						let dateT = document.forms["zadanie-form"]["taskDate"].value;
						let timeT = document.forms["zadanie-form"]["time"].value;
						timeT = timeT.concat(":00");
						let titleT = document.forms["zadanie-form"]["taskTitle"].value;
						let descT = document.forms["zadanie-form"]["taskDesc"].value;
						let colorT = document.querySelector('#kolor-zad:checked').value;
						let existsT = false;
						for (i = 0;i < window.zadania.length; i++){
							if (dateT == window.zadania[i][3] && timeT == window.zadania[i][4] && titleT == window.zadania[i][1] && descT == window.zadania[i][2] && colorT == window.zadania[i][5]){
								existsT = true;
							}
						}
						if (existsT == true){
							document.getElementById("task_error").innerHTML = "<p>Zadanie o podanych parametrach już istnieje!</p>";
							return false;
						}
						else {
							return true;
						}
						break;
					case 3:
						var isChecked = $("input[type=checkbox]").is(":checked");
						if (isChecked){
							return true;
						}
						else {
							document.getElementById("share_error").innerHTML = "<p>Musisz wybrać conajmniej jednego użytkownika, aby udostępnić!</p>";
							return false;
						}
						break;
					case 4:
						var calendarArray = <?php echo json_encode($calendardb->displayCalendar($createdBy)); ?>;
						if (calendarArray.length >= 3){
							document.getElementById("calendar_error").innerHTML = "<p>Możesz posiadać wyłącznie trzy kalendarze na raz!</p>";
							return false;
						}
						var calendarName = document.getElementById("calendarName").value;
						for (let i = 0; i < calendarArray.length; i++){
							if (calendarArray[i][1].toLowerCase() == calendarName.toLowerCase()){
								document.getElementById("calendar_error").innerHTML = "<p>Kalendarz o takiej nazwie już istnieje!</p>";
								return false;
							}	
						}
						break;	
					case 5:
						var calendarArray = <?php echo json_encode($calendardb->displayCalendar($createdBy)); ?>;
						var calendarId = document.getElementById("deleteCalendarId").value;
						for (let i = 0; i < calendarArray.length; i++){
							if (calendarArray[i][0] == calendarId && calendarArray[i][1] == "główny"){
								document.getElementById("calendar_delete_error").innerHTML = "<p>Nie możesz usunąć głównego kalendarza!</p>";
								return false;
							}	
						}
						break;	
				}
			}
		</script>
    </body>
</html>