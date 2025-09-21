<?php
echo "<h2>Probando conexión...</h2>";

include 'conexion.php';

echo "<p style='color: green;'>✅ Conexión exitosa a la base de datos</p>";

// Probar consulta simple
$resultado = $conexion->query("SELECT COUNT(*) as total FROM estudiantes");
$fila = $resultado->fetch_assoc();

echo "<p>📊 Total de estudiantes en la BD: " . $fila['total'] . "</p>";

$conexion->close();
?>