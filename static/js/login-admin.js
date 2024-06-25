/**
 * Maneja el evento DOMContentLoaded para inicializar el formulario de inicio de sesión.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el formulario de inicio de sesión por su ID
    const loginForm = document.getElementById('loginForm');

    /**
     * Maneja el evento de envío del formulario de inicio de sesión.
     * @param {Event} event - El evento de envío del formulario.
     */
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío predeterminado del formulario

        // Crea un objeto FormData a partir del formulario
        const formData = new FormData(loginForm);
        // Convierte los datos del formulario a un objeto JSON
        const formDataJson = {
            email: formData.get('email'), // Obtiene el valor del campo 'email'
            password: formData.get('password') // Obtiene el valor del campo 'password'
        };

        // Realiza una solicitud fetch al servidor para autenticar al usuario
        fetch('http://localhost:5000/auth/login', {
            method: 'POST', // Especifica el método HTTP a usar
            headers: {
                'Content-Type': 'application/json' // Especifica el tipo de contenido
            },
            body: JSON.stringify(formDataJson) // Convierte los datos del formulario a JSON
        })
        .then(response => {
            // Verifica si la respuesta del servidor no es correcta
            if (!response.ok) {
                if (response.status === 400) {
                    // Manejar error 400: Credenciales no válidas
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Credenciales no válidas. Por favor, verifica tu correo y contraseña.',
                    });
                } else {
                    throw new Error('Error en la solicitud: ' + response.status);
                }
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Manejar la respuesta del backend

            // Verificar si se recibió un token de acceso
            if (data.access_token) {
                // Guardar el token en el almacenamiento local (localStorage)
                localStorage.setItem('access_token', data.access_token);

                // Redirigir a la página view-administrator.html
                window.location.href = './view-administrator.html';
            } else {
                console.error('Token de acceso no recibido en la respuesta.');
                // Mostrar mensaje de alerta utilizando SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Debes llenar todos los campos',
                });
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
            // Mostrar mensaje de alerta utilizando SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Credenciales no validas !Not authorized¡ ' + error.message,
            });
        });
    });
});
