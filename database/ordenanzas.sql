-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-11-2022 a las 23:30:29
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ordenanzas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_municipales`
--

CREATE TABLE `servicios_municipales` (
  `Id_Servicios_Municipales` int(11) NOT NULL,
  `Id_Tipo_Inmueble` int(11) DEFAULT NULL,
  `Id_Uso_Inmueble` int(11) DEFAULT NULL,
  `Aseo` tinyint(1) NOT NULL,
  `Disposicion_Final` tinyint(1) NOT NULL,
  `Alumbrado` tinyint(1) NOT NULL,
  `Contribucion_Especial` tinyint(1) NOT NULL,
  `Saneamiento` tinyint(1) NOT NULL,
  `Impuestos_Predio_Baldio` tinyint(1) NOT NULL,
  `Area_Comun` tinyint(1) NOT NULL,
  `Contribucion_San_Benito` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicios_municipales`
--

INSERT INTO `servicios_municipales` (`Id_Servicios_Municipales`, `Id_Tipo_Inmueble`, `Id_Uso_Inmueble`, `Aseo`, `Disposicion_Final`, `Alumbrado`, `Contribucion_Especial`, `Saneamiento`, `Impuestos_Predio_Baldio`, `Area_Comun`, `Contribucion_San_Benito`) VALUES
(1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1),
(2, 1, 2, 1, 1, 1, 1, 0, 0, 1, 1),
(3, 2, 1, 1, 1, 1, 1, 0, 0, 1, 1),
(4, 2, 2, 1, 1, 1, 1, 0, 0, 1, 1),
(5, 3, 3, 0, 1, 1, 1, 1, 1, 0, 0),
(6, 3, 4, 0, 1, 1, 1, 1, 1, 0, 0),
(7, 1, 5, 0, 1, 1, 1, 1, 0, 0, 0),
(8, 2, 5, 0, 1, 1, 1, 1, 0, 1, 1),
(9, 1, 6, 0, 1, 1, 1, 1, 0, 0, 1),
(10, 2, 6, 0, 1, 1, 1, 1, 0, 1, 1),
(11, 5, 1, 1, 1, 1, 1, 0, 0, 0, 0),
(12, 2, 7, 0, 0, 0, 1, 0, 0, 0, 0),
(13, 2, 8, 1, 1, 0, 1, 0, 0, 0, 0),
(14, 6, 1, 1, 1, 1, 1, 0, 0, 1, 1),
(15, 6, 2, 1, 1, 1, 1, 0, 0, 1, 1),
(16, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0),
(17, 4, 2, 1, 1, 1, 1, 1, 0, 0, 0),
(18, 7, NULL, 0, 1, 1, 1, 1, 0, 0, 0),
(19, 4, NULL, 0, 1, 1, 1, 1, 0, 0, 0),
(20, NULL, 9, 0, 1, 1, 1, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_inmueble`
--

CREATE TABLE `tipo_inmueble` (
  `Id_Tipo` int(11) NOT NULL,
  `Tipo_Inmueble` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_inmueble`
--

INSERT INTO `tipo_inmueble` (`Id_Tipo`, `Tipo_Inmueble`) VALUES
(1, 'Construccion Unifamiliar'),
(2, 'Condominio Vertical'),
(3, 'Predio Baldio'),
(4, 'Con Caracteristicas de Bosque'),
(5, 'Comunidad'),
(6, 'Condominio Horizontal'),
(7, 'Boscoso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuarios`
--

CREATE TABLE `tipo_usuarios` (
  `Id_Tipo_Usuario` int(11) NOT NULL,
  `Prefijo` varchar(20) NOT NULL,
  `Tipo_Usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_usuarios`
--

INSERT INTO `tipo_usuarios` (`Id_Tipo_Usuario`, `Prefijo`, `Tipo_Usuario`) VALUES
(1, 'admin', 'Administración');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `uso_inmueble`
--

CREATE TABLE `uso_inmueble` (
  `Id_Uso` int(11) NOT NULL,
  `Uso_Inmueble` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `uso_inmueble`
--

INSERT INTO `uso_inmueble` (`Id_Uso`, `Uso_Inmueble`) VALUES
(1, 'Habitacional'),
(2, 'Usos Varios'),
(3, 'Predio Baldio Urbano'),
(4, 'Predio Baldio en Reserva Ecologica'),
(5, 'Desocupado'),
(6, 'Deshabitado'),
(7, 'Estacionamiento'),
(8, 'Bodegas'),
(9, 'Abandonado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id_Usuario` int(11) NOT NULL,
  `Nombres` varchar(100) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `Usuario` varchar(100) NOT NULL,
  `Clave` varchar(255) NOT NULL,
  `Id_Tipo_Usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id_Usuario`, `Nombres`, `Apellidos`, `Usuario`, `Clave`, `Id_Tipo_Usuario`) VALUES
(1, 'Diego Alberto', 'Lemus Torres', 'diegolemus', 'mE2tsO7oVd4=', 1),
(2, 'Erick Fabricio', 'Arevalo', 'erickarevalo', 'mE2tsO7oVd4=', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `servicios_municipales`
--
ALTER TABLE `servicios_municipales`
  ADD PRIMARY KEY (`Id_Servicios_Municipales`),
  ADD KEY `Index_Tipo` (`Id_Tipo_Inmueble`),
  ADD KEY `Index_Uso` (`Id_Uso_Inmueble`);

--
-- Indices de la tabla `tipo_inmueble`
--
ALTER TABLE `tipo_inmueble`
  ADD PRIMARY KEY (`Id_Tipo`);

--
-- Indices de la tabla `tipo_usuarios`
--
ALTER TABLE `tipo_usuarios`
  ADD PRIMARY KEY (`Id_Tipo_Usuario`);

--
-- Indices de la tabla `uso_inmueble`
--
ALTER TABLE `uso_inmueble`
  ADD PRIMARY KEY (`Id_Uso`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id_Usuario`),
  ADD KEY `Index_Usuario` (`Id_Usuario`),
  ADD KEY `fk_tipo_usuario` (`Id_Tipo_Usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `servicios_municipales`
--
ALTER TABLE `servicios_municipales`
  MODIFY `Id_Servicios_Municipales` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `tipo_inmueble`
--
ALTER TABLE `tipo_inmueble`
  MODIFY `Id_Tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_usuarios`
--
ALTER TABLE `tipo_usuarios`
  MODIFY `Id_Tipo_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `uso_inmueble`
--
ALTER TABLE `uso_inmueble`
  MODIFY `Id_Uso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `servicios_municipales`
--
ALTER TABLE `servicios_municipales`
  ADD CONSTRAINT `fk_tipo` FOREIGN KEY (`Id_Tipo_Inmueble`) REFERENCES `tipo_inmueble` (`Id_Tipo`),
  ADD CONSTRAINT `fk_uso` FOREIGN KEY (`Id_Uso_Inmueble`) REFERENCES `uso_inmueble` (`Id_Uso`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_tipo_usuario` FOREIGN KEY (`Id_Tipo_Usuario`) REFERENCES `tipo_usuarios` (`Id_Tipo_Usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
