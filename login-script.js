// Datos correctos para entrar
const USUARIO_CORRECTO = "santiago";
const CLAVE_CORRECTA = "1234";

// Mostrar mensajes al usuario
function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = texto;
    mensaje.className = tipo;
    mensaje.style.display = 'block';
    
    // Ocultar después de 3 segundos
    setTimeout(function() {
        mensaje.style.display = 'none';
    }, 3000);
}

// Función principal del login
function validarLogin() {
    // Obtener lo que escribió el usuario
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    
    // Verificar que el usuario solo tenga letras
    let soloLetras = true;
    for (let i = 0; i < usuario.length; i++) {
        const letra = usuario[i];
        if (!(letra >= 'a' && letra <= 'z') && !(letra >= 'A' && letra <= 'Z')) {
            soloLetras = false;
            break;
        }
    }
    
    // Verificar que la contraseña solo tenga números
    let soloNumeros = true;
    for (let i = 0; i < password.length; i++) {
        const numero = password[i];
        if (!(numero >= '0' && numero <= '9')) {
            soloNumeros = false;
            break;
        }
    }
    
    // Validaciones paso a paso
    if (usuario === "") {
        mostrarMensaje("Por favor ingresa un usuario", "error");
    }
    else if (password === "") {
        mostrarMensaje("Por favor ingresa una contraseña", "error");
    }
    else if (!soloLetras) {
        mostrarMensaje("El usuario solo puede tener letras", "error");
    }
    else if (!soloNumeros) {
        mostrarMensaje("La contraseña solo puede tener números", "error");
    }
    // Si los datos son correctos
    else if (usuario.toLowerCase() === USUARIO_CORRECTO && password === CLAVE_CORRECTA) {
        mostrarMensaje("Login exitoso! Redirigiendo...", "exito");
        
        // AQUÍ ESTÁ LA FUNCIÓN QUE REDIRIGE AL REGISTRO
        // Espera 2 segundos y cambia de página
        setTimeout(function() {
            window.location.href = "index.html";
        }, 2000);
    }
    else {
        mostrarMensaje("Usuario o contraseña incorrectos", "error");
    }
}

// Permitir login con Enter
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        validarLogin();
    }
});