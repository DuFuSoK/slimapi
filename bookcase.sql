-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1
-- Čas generovania: Po 12.Dec 2016, 14:03
-- Verzia serveru: 5.7.14
-- Verzia PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `library`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `bookcase`
--

CREATE TABLE `bookcase` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Sťahujem dáta pre tabuľku `bookcase`
--

INSERT INTO `bookcase` (`id`, `name`) VALUES
(1, 'Hlava XXII'),
(2, 'Havran'),
(3, 'Odviate vetrom'),
(4, 'Na zapade nic nove'),
(5, 'Smely zajko v Afrike'),
(6, 'Hobbit'),
(7, 'Pan Prstenov : Navrat krala'),
(9, 'Frankenstein'),
(14, 'Tarzan'),
(15, 'Pan Prstenov : Dve veze'),
(16, 'Pan Prstenov : Spolocenstvo prstena');

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `bookcase`
--
ALTER TABLE `bookcase`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `bookcase`
--
ALTER TABLE `bookcase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
