<?php

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

    public function addEvent($title, $date, $start_time, $end_time, $description, $color, $cyklicznosc_id, $createdBy) {
        $sql = "INSERT INTO wydarzenia (tytul, data, godzina_rozp, godzina_zak, opis, kolor, cyklicznosc_id, stworzone_przez) VALUES 
        ('$title', '$date', '$start_time', '$end_time', '$description', '$color', $cyklicznosc_id, $createdBy)";
        $query = $this->conn->query($sql);
    }

    public function addTask($title, $start_date, $end_date, $time, $color, $createdBy) {
        $sql = "INSERT INTO zadania (tytul, data_rozp, data_zak, godzina, kolor, stworzone_przez)
        VALUES ('$title', '$start_date', '$end_date', '$time', '$color', $createdBy)";
        $query = $this->conn->query($sql);
    }

    public function addUser($email, $login, $password) {
        $sql = "INSERT INTO uzytkownicy (email, login , haslo) VALUES
        ('$email', '$login', '$password')";
        $query = $this->conn->query($sql);
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
            return false;
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
            return false;
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
            return false;
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
            return false;
        }
    }

    //modyfikacja rekordów

    public function updateEvent($id, $title, $date, $start_time, $end_time, $description, $color, $cyklicznosc_id, $createdBy) {
        $sql = "UPDATE wydarzenia SET tytul='$title', data='$date', godzina_rozp='$start_time', godzina_zak='$end_time',
        opis='$description', kolor='$color', cyklicznosc_id=$cyklicznosc_id, stworzone_przez=$createdBy WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    public function updateTask($id, $title, $start_date, $end_date, $time, $color, $createdBy) {
        $sql = "UPDATE zadania SET tytul='$title', data_rozp='$start_date', data_zak='$end_date',
         godzina='$time', kolor='$color', stworzone_przez=$createdBy WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    //usuwanie rekordów

    public function deleteEvent($id) {
        $sql = "DELETE FROM wydarzenia WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    public function deleteTask($id) {
        $sql = "DELETE FROM zadania WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    public function deleteUser($id) {
        $sql = "DELETE FROM uzytkownicy WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    public function deleteShareEvent($id) {
        $sql = "DELETE FROM udostepnienia_wyd WHERE id = $id";
        $query = $this->conn->query($sql);
    }

    public function deleteShareTask($id) {
        $sql = "DELETE FROM udostepnienia_zad WHERE id = $id";
        $query = $this->conn->query($sql);
    }
}

?>