-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-11-2023 a las 18:40:12
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `endless_notes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

CREATE TABLE `nota` (
  `id_nota` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `texto` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL,
  `categoria` varchar(60) DEFAULT NULL,
  `audio` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nota`
--

INSERT INTO `nota` (`id_nota`, `titulo`, `texto`, `fecha`, `categoria`, `audio`, `id_usuario`) VALUES
(2, 'PRACTICA #5', 'Realizar el diseño de la aplicación', '2023-11-17 10:00:00', 'Escuela', NULL, 0),
(3, 'ACTIVIDAD #2', 'Finalizar el trabajo', '2023-11-18 08:00:00', 'Escuela', NULL, 0),
(4, 'PROYECTO #7', 'Entregar el proyecto', '2023-11-18 16:30:00', 'Escuela', NULL, 0),
(5, 'Dentista', 'Ir al dentista', '2023-11-19 18:30:00', 'Recordatorios', NULL, 0),
(6, 'Reunión', 'Ir a la ADAcon', '2023-11-19 22:00:00', 'Recordatorios', NULL, 0),
(7, 'Exámen Artes Visuales', 'Estudiar este día', '2023-11-20 16:00:00', 'Escuela', NULL, 0),
(8, 'Partido vs Química', 'El partido es en la cancha', '2023-11-20 18:00:00', 'Recordatorios', NULL, 0),
(9, 'Ir al super', 'Comprar comida', '2023-11-21 21:00:00', 'Recordatorios', NULL, 0),
(10, 'Revisión de examen de Gongora', 'Ir al salon de gongora a la de ya', '2023-11-21 23:00:00', 'Escuela', NULL, 0),
(11, 'El sat', 'Ir a declarar al SAT', '2023-11-21 23:30:00', 'Recordatorios', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `respuesta` varchar(60) DEFAULT NULL,
  `pregunta` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `correo`, `contrasena`, `respuesta`, `pregunta`) VALUES
(0, 'Juan Antonio Herrera de la Rosa', 'juanin10toni@gmail.com', '$2b$13$f7xS0hOYft6SuM5Wk3vkwOqX3xwXEKzB2LTpQ2eRgl93e/1CX74Yy', 'Naranja', 'Color favorito');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`id_nota`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `nota`
--
ALTER TABLE `nota`
  MODIFY `id_nota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
