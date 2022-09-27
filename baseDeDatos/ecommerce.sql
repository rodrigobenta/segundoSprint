-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 27-09-2022 a las 22:16:47
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `fk_id_user` int(11) NOT NULL,
  `fk_id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carts`
--

INSERT INTO `carts` (`fk_id_user`, `fk_id_product`, `quantity`, `updatedAt`) VALUES
(3, 1, 20, '2022-09-27 19:06:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_category`, `title`) VALUES
(3, 'alimentos congelados'),
(4, 'AUTOS'),
(1, 'celulares'),
(2, 'muebles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pictures`
--

CREATE TABLE `pictures` (
  `id_picture` int(11) NOT NULL,
  `url` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `fk_id_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pictures`
--

INSERT INTO `pictures` (`id_picture`, `url`, `description`, `fk_id_product`) VALUES
(1, 'fotoDeIphone12.com', 'foto de un iPhone en excelente estado', 1),
(2, 'audiA3.com', 'audi a3 excelente estado nunca taxi', 2),
(3, 'panDuro.com', 'foto de un pan duro', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `mostwanted` tinyint(1) DEFAULT NULL,
  `fk_id_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `title`, `stock`, `price`, `description`, `mostwanted`, `fk_id_category`) VALUES
(1, 'iPhone 12', 30, '70000.00', 'Pro Max', 1, 1),
(2, 'audi', 12, '800000.00', 'a3', 1, 4),
(3, 'Pan', 10000, '20.00', 'duro', 0, 3),
(4, 'mesa', 10, '3000.00', 'mesa familiar ', 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `role` varchar(50) DEFAULT 'guest',
  `profilepic` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `email`, `username`, `password`, `firstname`, `lastname`, `role`, `profilepic`) VALUES
(1, 'god@gmail.com', 'god', '$2b$10$.OboH3iSIGCvwaWU57I7xOf0TRiNg.0VgjXPbNr7dMMOmieHkV6BC', 'dios', 'sfdsg', 'god', 'notengo'),
(2, 'admin@gmail.com', 'admin', '$2b$10$w4A9rEgw/mluPHWxN9ja2OBZrFKOylRPB9EweLn9Qktm3Q7iQsj9u', 'jesu', 'sfdsg', 'admin', 'notengo2'),
(3, 'mateo@gmail.com', 'guest', '$2b$10$/93Y8zt5aR4gfSVU.ECNOOIr8udtgzyOaXI0O1efMmcJOXpdTfnM.', 'mateo', 'tambasco', 'guest', 'FotoDePerfilMateo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`fk_id_user`,`fk_id_product`),
  ADD UNIQUE KEY `carts_fk_id_user_fk_id_product_unique` (`fk_id_user`,`fk_id_product`),
  ADD KEY `fk_id_product` (`fk_id_product`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`),
  ADD UNIQUE KEY `title` (`title`),
  ADD UNIQUE KEY `title_2` (`title`);

--
-- Indices de la tabla `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`id_picture`),
  ADD UNIQUE KEY `url` (`url`),
  ADD UNIQUE KEY `url_2` (`url`),
  ADD KEY `fk_id_product` (`fk_id_product`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD UNIQUE KEY `title` (`title`),
  ADD UNIQUE KEY `title_2` (`title`),
  ADD KEY `fk_id_category` (`fk_id_category`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pictures`
--
ALTER TABLE `pictures`
  MODIFY `id_picture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`fk_id_product`) REFERENCES `products` (`id_product`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`fk_id_product`) REFERENCES `products` (`id_product`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`fk_id_category`) REFERENCES `categories` (`id_category`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
