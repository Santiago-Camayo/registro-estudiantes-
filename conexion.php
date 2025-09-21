<?php
// Archivo que conecta con la base de datos MySQL

// Datos de conexión
$servidor = "localhost";
$usuario = "root";
$clave = "";
$baseDatos = "registro_estudiantes_nuevo";

// Crear la conexión
$conexion = new mysqli($servidor, $usuario, $clave, $baseDatos);

// Verificar si hay error de conexión
if ($conexion->connect_error) {
    die("Error: No se pudo conectar a la base de datos");
}

// Configurar para caracteres especiales (acentos, ñ)
$conexion->set_charset("utf8");
?>