-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 11 Kwi 2022, 10:18
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
(1, 1, 2),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `udostepnienia_zad`
--

CREATE TABLE `udostepnienia_zad` (
  `id` int(11) NOT NULL,
  `zadanie_id` int(11) NOT NULL,
  `udostepnione_dla` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(2, 'user1@gmail.com', 'user1', 'b3daa77b4c04a9551b8781d03191fe098f325e67');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wydarzenia`
--

CREATE TABLE `wydarzenia` (
  `id` int(11) NOT NULL,
  `tytul` varchar(128) NOT NULL,
  `data` date NOT NULL,
  `godzina_rozp` time NOT NULL,
  `godzina_zak` time NOT NULL,
  `opis` text NOT NULL,
  `kolor` varchar(7) NOT NULL,
  `cyklicznosc_id` int(11) NOT NULL,
  `stworzone_przez` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `wydarzenia`
--

INSERT INTO `wydarzenia` (`id`, `tytul`, `data`, `godzina_rozp`, `godzina_zak`, `opis`, `kolor`, `cyklicznosc_id`, `stworzone_przez`) VALUES
(1, 'wydarzenie', '2022-04-12', '11:00:00', '13:00:00', 'spotkanie biznesowe', '#4BD4FF', 1, 1),
(2, 'Omówienie zadania', '2022-04-21', '15:00:00', '16:00:00', 'podsumowanie dotychczasowej pracy', '#4BD4FF', 3, 2),
(3, 'wydarzenie', '2022-04-19', '14:00:00', '18:00:00', 'podsumowanie miesiąca', '#FFF72C', 3, 1),
(4, 'wydarzenie', '2022-04-04', '16:00:00', '18:00:00', 'wydarzenie', '#FF4B4B', 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zadania`
--

CREATE TABLE `zadania` (
  `id` int(11) NOT NULL,
  `tytul` varchar(128) NOT NULL,
  `data_rozp` date NOT NULL,
  `data_zak` date NOT NULL,
  `godzina` time NOT NULL,
  `kolor` int(7) NOT NULL,
  `stworzone_przez` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `cyklicznosc`
--
ALTER TABLE `cyklicznosc`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `stworzone_przez` (`stworzone_przez`);

--
-- Indeksy dla tabeli `zadania`
--
ALTER TABLE `zadania`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stworzone_przez` (`stworzone_przez`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `cyklicznosc`
--
ALTER TABLE `cyklicznosc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `udostepnienia_zad`
--
ALTER TABLE `udostepnienia_zad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `wydarzenia`
--
ALTER TABLE `wydarzenia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `zadania`
--
ALTER TABLE `zadania`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
