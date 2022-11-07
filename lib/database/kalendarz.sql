-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 12 Maj 2022, 12:17
-- Wersja serwera: 10.4.19-MariaDB
-- Wersja PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `kalendarz`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cyklicznosc`
--

CREATE TABLE `cyklicznosc` (
  `id` int(11) NOT NULL,
  `okres` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `cyklicznosc`
--

INSERT INTO `cyklicznosc` (`id`, `okres`) VALUES
(1, 'brak'),
(2, 'co tydzien'),
(3, 'co miesiac'),
(4, 'co rok');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kalendarze`
--

CREATE TABLE `kalendarze` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(64) NOT NULL,
  `stworzone_przez` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `kalendarze`
--

INSERT INTO `kalendarze` (`id`, `nazwa`, `stworzone_przez`) VALUES
(1, 'główny', 1),
(2, 'główny', 2),
(3, 'główny', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `udostepnienia_wyd`
--

CREATE TABLE `udostepnienia_wyd` (
  `id` int(11) NOT NULL,
  `wydarzenie_id` int(11) NOT NULL,
  `udostepnione_dla` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `udostepnienia_wyd`
--

INSERT INTO `udostepnienia_wyd` (`id`, `wydarzenie_id`, `udostepnione_dla`) VALUES
(9, 148, 1),
(10, 2, 1),
(11, 2, 3),
(12, 150, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `udostepnienia_zad`
--

CREATE TABLE `udostepnienia_zad` (
  `id` int(11) NOT NULL,
  `zadanie_id` int(11) NOT NULL,
  `udostepnione_dla` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `udostepnienia_zad`
--

INSERT INTO `udostepnienia_zad` (`id`, `zadanie_id`, `udostepnione_dla`) VALUES
(6, 12, 1),
(7, 12, 3),
(9, 15, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `login` varchar(32) NOT NULL,
  `haslo` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`id`, `email`, `login`, `haslo`) VALUES
(1, 'admin@gmail.com', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997'),
(2, 'user1@gmail.com', 'user1', 'b3daa77b4c04a9551b8781d03191fe098f325e67'),
(3, 'user2@gmail.com', 'user2', 'a1881c06eec96db9901c7bbfe41c42a3f08e9cb4');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wydarzenia`
--

CREATE TABLE `wydarzenia` (
  `id` int(11) NOT NULL,
  `tytul` varchar(128) NOT NULL,
  `opis` text NOT NULL,
  `data` date NOT NULL,
  `godzina_rozp` time NOT NULL,
  `godzina_zak` time NOT NULL,
  `kolor` varchar(7) NOT NULL,
  `cyklicznosc_id` int(11) NOT NULL,
  `stworzone_przez` int(11) NOT NULL,
  `kalendarz_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `wydarzenia`
--

INSERT INTO `wydarzenia` (`id`, `tytul`, `opis`, `data`, `godzina_rozp`, `godzina_zak`, `kolor`, `cyklicznosc_id`, `stworzone_przez`, `kalendarz_id`) VALUES
(1, 'Wydarzenie', 'Spotkanie biznesowe.', '2022-04-12', '11:00:00', '13:00:00', '#4BD4FF', 1, 1, 1),
(2, 'Omówienie zadania', 'podsumowanie dotychczasowej pracy', '2022-04-21', '15:00:00', '16:00:00', '#4BD4FF', 3, 2, 2),
(3, 'Wydarzenie', 'Podsumowanie miesiąca.', '2022-04-04', '14:00:00', '18:00:00', '#FFF72C', 3, 1, 1),
(133, 'Urodziny ', 'Impreza urodzinowa Magdy', '2022-04-25', '11:30:00', '19:00:00', '#FF4BCD', 1, 3, 3),
(134, 'Impreza cykliczna', 'SALWA Festiwal', '2022-05-01', '15:00:00', '16:00:00', '#FF4B4B', 3, 1, 1),
(135, 'Impreza cykliczna', 'SALWA Festiwal', '2022-06-01', '15:00:00', '16:00:00', '#FFB74B', 3, 1, 1),
(136, 'Wydarzenie', 'Wycieczka do kina', '2022-07-01', '15:00:00', '16:00:00', '#4FFF4B', 1, 1, 1),
(138, 'Impreza cykliczna', 'SALWA Festiwal', '2022-09-01', '15:00:00', '16:00:00', '#FFB74B', 3, 1, 1),
(140, 'Wydarzenie', 'Lorem Ipsum ', '2022-05-01', '12:30:00', '15:00:00', '#4FFF4B', 1, 1, 1),
(141, 'Kartkówka', 'Future Perfect', '2022-05-01', '18:00:00', '18:00:00', '#FF4BCD', 1, 1, 1),
(142, 'Sprawdzian', 'Rozdział IV', '2022-04-27', '12:00:00', '13:00:00', '#FF4BCD', 1, 1, 1),
(145, 'Wydarzenie', 'Wydarzenie przykładowe', '2022-05-17', '12:00:00', '14:00:00', '#7A4BFF', 1, 1, 1),
(146, 'Wydarzenie', 'Wycieczka do Poznania', '2022-05-11', '07:30:00', '22:00:00', '#FFB74B', 1, 1, 1),
(147, 'Wesele', 'Wesele kuzyna', '2022-05-15', '21:40:00', '23:10:00', '#FF4B4B', 3, 2, 2),
(148, 'Wydarzenie', 'Wyjazd w góry.', '2022-06-15', '22:40:00', '23:10:00', '#7A4BFF', 1, 2, 2),
(151, 'Impreza', 'BGT Asylum', '2022-07-12', '12:00:00', '15:00:00', '#7A4BFF', 3, 3, 3),
(152, 'Test', 'Testowy', '2022-06-05', '10:10:00', '12:00:00', '#FFF72C', 1, 3, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zadania`
--

CREATE TABLE `zadania` (
  `id` int(11) NOT NULL,
  `tytul` varchar(128) NOT NULL,
  `opis` text NOT NULL,
  `data` date NOT NULL,
  `godzina` time NOT NULL,
  `kolor` varchar(7) NOT NULL,
  `stworzone_przez` int(11) NOT NULL,
  `kalendarz_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `zadania`
--

INSERT INTO `zadania` (`id`, `tytul`, `opis`, `data`, `godzina`, `kolor`, `stworzone_przez`, `kalendarz_id`) VALUES
(4, 'Zadanie SQL', 'Polecenia SQL', '2022-05-09', '20:00:00', '#7A4BFF', 1, 1),
(5, 'JS Obiektowo', 'Aplikacja kalkulator', '2022-05-13', '15:00:00', '#4BD4FF', 1, 1),
(9, 'Zadanie PHP', 'PHP Podstawy', '2022-05-11', '21:00:00', '#4FFF4B', 1, 1),
(10, 'Aplikacja', 'Xamarin i XAML', '2022-05-12', '11:20:00', '#FFB74B', 1, 1),
(12, 'Zadanie SQL', 'Podstawy SQL', '2022-05-11', '08:30:00', '#4FFF4B', 2, 2),
(13, 'Zadanie PWiAW', 'Kalendarz', '2022-05-12', '09:00:00', '#FF4BCD', 3, 3),
(14, 'Zadanie', 'SQL Zapytania', '2022-01-23', '12:44:00', '#FF4B4B', 1, 1),
(15, 'Zadanie', 'Program python', '2022-06-01', '12:30:00', '#4FFF4B', 2, 2);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `cyklicznosc`
--
ALTER TABLE `cyklicznosc`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `kalendarze`
--
ALTER TABLE `kalendarze`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stworzone_przez` (`stworzone_przez`);

--
-- Indeksy dla tabeli `udostepnienia_wyd`
--
ALTER TABLE `udostepnienia_wyd`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wydarzenie_id` (`wydarzenie_id`),
  ADD KEY `udostepnione_dla` (`udostepnione_dla`);

--
-- Indeksy dla tabeli `udostepnienia_zad`
--
ALTER TABLE `udostepnienia_zad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zadanie_id` (`zadanie_id`),
  ADD KEY `udostepnione_dla` (`udostepnione_dla`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `wydarzenia`
--
ALTER TABLE `wydarzenia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cyklicznosc_id` (`cyklicznosc_id`),
  ADD KEY `stworzone_przez` (`stworzone_przez`),
  ADD KEY `kalendarz_id` (`kalendarz_id`);

--
-- Indeksy dla tabeli `zadania`
--
ALTER TABLE `zadania`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stworzone_przez` (`stworzone_przez`),
  ADD KEY `kalendarz_id` (`kalendarz_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `cyklicznosc`
--
ALTER TABLE `cyklicznosc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `kalendarze`
--
ALTER TABLE `kalendarze`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `udostepnienia_wyd`
--
ALTER TABLE `udostepnienia_wyd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT dla tabeli `udostepnienia_zad`
--
ALTER TABLE `udostepnienia_zad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `wydarzenia`
--
ALTER TABLE `wydarzenia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT dla tabeli `zadania`
--
ALTER TABLE `zadania`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `kalendarze`
--
ALTER TABLE `kalendarze`
  ADD CONSTRAINT `kalendarze_ibfk_1` FOREIGN KEY (`stworzone_przez`) REFERENCES `uzytkownicy` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
