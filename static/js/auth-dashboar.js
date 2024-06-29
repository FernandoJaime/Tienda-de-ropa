/**
 * Maneja el evento 'DOMContentLoaded' para verificar y mostrar el nombre del usuario autenticado.
 */
document.addEventListener('DOMContentLoaded', function () {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        try {
            const decodedToken = parseJwt(accessToken);

            console.log('Token decodificado:', decodedToken);

            if (decodedToken && decodedToken.nombre && decodedToken.apellido) {
                const greetingsElement = document.getElementById('greetings');
                if (greetingsElement) {
                    greetingsElement.textContent = `${decodedToken.nombre} ${decodedToken.apellido}`;
                } else {
                    console.error('Elemento con ID "greetings" no encontrado en la página.');
                }
            } else {
                console.error('No se pudo obtener el nombre y apellido del usuario del token de acceso.');
            }
        } catch (error) {
            console.error('Error al decodificar el token JWT:', error);
        }
    } else {
        console.error('No se encontró un token de acceso en localStorage.');
    }
});

/**
 * Maneja el evento 'DOMContentLoaded' para configurar el botón de cierre de sesión.
 */
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('btn-logout');

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); 

            // Borrar el token de acceso del almacenamiento local
            localStorage.removeItem('access_token');

            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = './login-admin.html';
        });
    } else {
        console.error("Botón 'btn-logout' no encontrado.");
    }
});

/**
 * Función para decodificar un token JWT.
 * @param {string} token - El token JWT a decodificar.
 * @returns {Object|null} - El payload decodificado del token JWT o null si hay un error.
 */
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
        return null;
    }
}
