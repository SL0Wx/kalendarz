<?php

error_reporting(0);

class CalendarDatabase {
    private $server = "localhost";
    private $user = "root";
    private $password = "";
    private $db = "kalendarz";

    public $conn;

    public function __construct()
    {
        try {
            $this->conn = new mysqli($this->server, $this->user, $this->password, $this->db);
        } catch (Exception $e) {
            echo "Błąd połączenia z bazą danych: ".$e->getMessage();
        }
    }

    //dodawanie rekordów
    public function addEvent($title, $date, $start_time, $end_time, $description, $color, $cyklicznosc_id, $createdBy, $calendarId) {
        $sql = "INSERT INTO wydarzenia (tytul, opis, data, godzina_rozp, godzina_zak, kolor, cyklicznosc_id, stworzone_przez, kalendarz_id) VALUES 
        ('$title', '$description', '$date', '$start_time', '$end_time', '$color', $cyklicznosc_id, $createdBy, $calendarId)";
        $check_events = "SELECT id FROM wydarzenia WHERE data = '$date' AND godzina_rozp = '$start_time' ";
        $result = $this->conn->query($check_events);
        if ($result->num_rows > 0) {
            //Placeholder
        }
        else {
            $query = $this->conn->query($sql);
        }
    }

    public function addTask($title, $description, $date, $time, $color, $createdBy, $calendarId) {
        $sql = "INSERT INTO zadania (tytul, opis, data, godzina, kolor, stworzone_przez, kalendarz_id)
        VALUES ('$title', '$description', '$date', '$time', '$color', $createdBy, $calendarId)";
        $query = $this->conn->query($sql);
    }

    public function addUser($email, $login, $password) {
        $sql = "INSERT INTO uzytkownicy (email, login , haslo) VALUES
        ('$email', '$login', '$password')";
        $query = $this->conn->query($sql);
    }

    public function addCalendar($name, $createdBy) {
        $sql = "INSERT INTO kalendarze (nazwa, stworzone_przez) VALUES
        ('$name', $createdBy)";
        $query = $this->conn->query($sql);
        echo "<meta http-equiv='refresh' content='0'>";
    }

    public function addShareEvent($eventId, $userId) {
        $sql = "INSERT INTO udostepnienia_wyd (wydarzenie_id, udostepnione_dla) VALUES
        ($eventId, $userId)";
        $query = $this->conn->query($sql);
    }

    public function addShareTask($taskId, $userId) {
        $sql = "INSERT INTO udostepnienia_zad (zadanie_id, udostepnione_dla) VALUES
        ($taskId, $userId)";
        $query = $this->conn->query($sql);
    }

    //wyświetlanie rekordów

    public function displayEvent($createdBy) {
        $sql = "SELECT * FROM wydarzenia WHERE stworzone_przez = $createdBy";
        $query = $this->conn->query($sql);
        $data = array();
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_row()) {
                $data[] = $row;
            }
            return $data;
        }
        else {
            return $data = [];
        }
    }

    public function displayTask($createdBy) {
        $sql = "SELECT * FROM zadania WHERE stworzone_przez = $createdBy";
        $query = $this->conn->query($sql);
        $data = array();
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_row()) {
                $data[] = $row;
            }
            return $data;
        }
        else {
            return $data = [];
        }
    }

    public function displayUser() {
        $sql = "SELECT id, email, login FROM uzytkownicy";
        $query = $this->conn->query($sql);
        $data = array();
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_row()) {
                $data[] = $row;
            }
            return $data;
        }
        else {
            return false;
        }
    }

    public function displayCalendar($createdBy) {
        $sql = "SELECT id, nazwa FROM kalendarze WHERE stworzone_przez = $createdBy";
        $query = $this->conn->query($sql);
        $data = array();
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_row()) {
                $data[] = $row;
            }
            return $data;
        } else {
            return false;
        }
    }

    public function displayShareEvent($createdBy) {
        $sql = "SELECT w.* FROM wydarzenia w JOIN udostepnienia_wyd u ON
        w.id = u.wydarzenie_id WHERE u.udostepnione_dla = $createdBy";
        $query = $this->conn->query($sql);
        $data = array();
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_row()) {
                $data[] = $row;
            }
            return $data;
        }
        else {
            return $data = [];
        }
    }

    public function displayAllShareEvent() {
        $sql = "SELECT * FROM udostepnienia_wyd";
        $query = $this->conn->query($sql);
        $data = array();
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_row()) {
                $data[] = $row;
            }
            return $data;
        }
        else {
            return $data = [];
        }
    }

    public function displayShareTask($createdBy) {
        $sql = "SELECT z.* FROM zadania z JOIN udostepnienia_zad u ON
        z.id = u.zadanie_id WHERE u.udostepnione_dla = $createdBy";
        $query = $this->conn->query($sql);
        $data = array();
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_row()) {
                $data[] = $row;
            }
            return $data;
        }
        else {
            return $data = [];
        }
    }

    public function displayAllShareTask() {
        $sql = "SELECT * FROM udostepnienia_zad";
        $query = $this->conn->query($sql);
        $data = array();
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_row()) {
                $data[] = $row;
            }
            return $data;
        }
        else {
            return $data = [];
        }
    }
    
    //modyfikacja rekordów

    public function updateEvent($id, $title, $date, $start_time, $end_time, $description, $color, $cyklicznosc_id, $createdBy, $calendarId) {
        $sql = "UPDATE wydarzenia SET tytul='$title', opis='$description', data='$date', godzina_rozp='$start_time', godzina_zak='$end_time',
        kolor='$color', cyklicznosc_id=$cyklicznosc_id, stworzone_przez=$createdBy, kalendarz_id=$calendarId WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    public function updateTask($id, $title, $description, $date, $time, $color, $createdBy, $calendarId) {
        $sql = "UPDATE zadania SET tytul='$title', opis='$description', data='$date',
         godzina='$time', kolor='$color', stworzone_przez=$createdBy, kalendarz_id=$calendarId WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    //usuwanie rekordów

    public function deleteEvent($id) {
        $sql = "DELETE FROM wydarzenia WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    public function deleteShareEvent($id, $createdBy) {
        $sql = "DELETE FROM udostepnienia_wyd WHERE wydarzenie_id = $id AND udostepnione_dla = $createdBy";
        $query = $this->conn->query($sql);
    }

    public function deleteTask($id) {
        $sql = "DELETE FROM zadania WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    public function deleteShareTask($id, $createdBy) {
        $sql = "DELETE FROM udostepnienia_zad WHERE zadanie_id = $id AND udostepnione_dla = $createdBy";
        $query = $this->conn->query($sql);
    }

    public function deleteCalendar($id) {
        $sql = "DELETE FROM kalendarze WHERE id = $id";
        $query = $this->conn->query($sql);
        $sql = "DELETE FROM wydarzenia WHERE kalendarz_id = $id";
        $query = $this->conn->query($sql);
        $sql = "DELETE FROM zadania WHERE kalendarz_id = $id";
        $query = $this->conn->query($sql);
        echo "<meta http-equiv='refresh' content='0'>";
    }

}

?>