// Mostrar mensajes en la pantalla
function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = texto;
    mensaje.className = tipo;
    mensaje.style.display = 'block';

    // Ocultar después de unos segundos
    setTimeout(function() {
        mensaje.style.display = 'none';
    }, 6000);
}

// Validar nombres y apellidos
// Deben empezar con mayúscula, tener solo letras y espacios
function nombreValido(texto) {
    if (texto.length < 2 || texto.length > 50) return false;
    

    for (let i = 0; i < texto.length; i++) {
        const c = texto[i];
        const esLetra = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === ' ';
        if (!esLetra) return false;
    }
    return true;
}

// Validar email (forma sencilla pero útil)
function emailValido(email) {
    if (!email.includes("@")) return false;

    const partes = email.split("@");
    if (partes.length !== 2) return false;

    const usuario = partes[0];
    const dominio = partes[1];

    if (usuario.length < 2) return false;
    if (!dominio.includes(".")) return false;

    return true;
}

// Validar dirección
// Debe tener letras y números, y estar entre 8 y 80 caracteres
function direccionValida(texto) {
    if (texto.length < 8 || texto.length > 80) return false;

    let tieneLetra = false;
    let tieneNumero = false;

    for (let i = 0; i < texto.length; i++) {
        const c = texto[i];
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) tieneLetra = true;
        if (c >= '0' && c <= '9') tieneNumero = true;
    }

    return tieneLetra && tieneNumero;
}

// Validar que solo sean números
function soloNumeros(texto) {
    for (let i = 0; i < texto.length; i++) {
        const c = texto[i];
        if (c < '0' || c > '9') return false;
    }
    return true;
}

// Función principal de registrar
function registrar() {
    const tipoDoc = document.getElementById('tipoDoc').value;
    const numDoc = document.getElementById('numDoc').value.trim();
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validaciones una por una
    if (tipoDoc === "") {
        mostrarMensaje("Debe seleccionar el tipo de documento", "error");
        return;
    }

    if (!soloNumeros(numDoc) || numDoc.length < 6 || numDoc.length > 12) {
        mostrarMensaje("El documento debe tener entre 6 y 12 números", "error");
        return;
    }

    if (!nombreValido(nombres)) {
        mostrarMensaje("Ingrese un nombre válido (solo letras )", "error");
        return;
    }

    if (!nombreValido(apellidos)) {
        mostrarMensaje("Ingrese un apellido válido (solo letras)", "error");
        return;
    }

    if (!direccionValida(direccion)) {
        mostrarMensaje("Ingrese una dirección válida (ej: Calle 123 #45-67)", "error");
        return;
    }

    if (!soloNumeros(telefono) || telefono.length < 6) {
        mostrarMensaje("El teléfono debe tener al menos 6 números", "error");
        return;
    }

    if (!emailValido(email)) {
        mostrarMensaje("Ingrese un correo válido (ej: ejemplo@correo.com)", "error");
        return;
    }

    // Si todo está bien, se envían los datos
    enviarDatos(tipoDoc, numDoc, nombres, apellidos, direccion, telefono, email);
}

// Enviar datos al servidor (PHP)
function enviarDatos(tipoDoc, numDoc, nombres, apellidos, direccion, telefono, email) {
    const datos = new FormData();
    datos.append('tipoDoc', tipoDoc);
    datos.append('numDoc', numDoc);
    datos.append('nombres', nombres);
    datos.append('apellidos', apellidos);
    datos.append('direccion', direccion);
    datos.append('telefono', telefono);
    datos.append('email', email);

    fetch('guardar.php', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(resultado => {
        if (resultado.success) {
            mostrarMensaje(resultado.message, "exito");
            limpiar();
        } else {
            mostrarMensaje(resultado.message, "error");
        }
    })
    .catch(error => {
        mostrarMensaje("Error al conectar con la base de datos", "error");
    });
}

// Limpiar todos los campos del formulario
function limpiar() {
    document.getElementById('tipoDoc').value = "";
    document.getElementById('numDoc').value = "";
    document.getElementById('nombres').value = "";
    document.getElementById('apellidos').value = "";
    document.getElementById('direccion').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('email').value = "";
}
