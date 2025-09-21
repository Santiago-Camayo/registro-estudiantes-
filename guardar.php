<?php
// Este archivo recibe los datos del formulario y los guarda en la base de datos

// Incluir el archivo que conecta con la base de datos
include 'conexion.php';

// Solo funciona si se reciben datos del formulario
if ($_POST) {
    
    // Recibir todos los datos del formulario
    $tipoDoc = $_POST['tipoDoc'];
    $numDoc = $_POST['numDoc'];
    $nombres = $_POST['nombres'];
    $apellidos = $_POST['apellidos'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];

    // Verificar si ya existe un estudiante con ese documento
    $buscar = "SELECT id FROM estudiantes WHERE numero_documento = '$numDoc'";
    $resultado = $conexion->query($buscar);

    // Si ya existe el documento, mostrar error
    if ($resultado->num_rows > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Ya existe un estudiante con este número de documento'
        ]);
    } else {
        // Si no existe, guardar el nuevo estudiante
        $guardar = "INSERT INTO estudiantes (tipo_documento, numero_documento, nombres, apellidos, direccion, telefono, email) VALUES ('$tipoDoc', '$numDoc', '$nombres', '$apellidos', '$direccion', '$telefono', '$email')";
        
        // Intentar guardar en la base de datos
        if ($conexion->query($guardar)) {
            echo json_encode([
                'success' => true,
                'message' => 'Estudiante registrado correctamente'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Error al guardar en la base de datos'
            ]);
        }
    }
} else {
    // Si no se recibieron datos, mostrar error
    echo json_encode([
        'success' => false,
        'message' => 'No se recibieron datos del formulario'
    ]);
}

// Cerrar conexión con la base de datos
$conexion->close();
?>