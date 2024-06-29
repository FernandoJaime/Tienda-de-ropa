const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
    const accessToken = localStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
    };

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
        Swal.fire({
            title: 'Error',
            text: 'No se encontró un token de autenticación. Por favor, inicia sesión nuevamente.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        throw new Error('Token de autenticación no encontrado');
    }

    const options = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : null,
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        Swal.fire({
            title: 'Error',
            text: `Ocurrió un error al obtener los datos: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        throw error;
    }
}

/**
 * Función para guardar un usuario (crear o actualizar).
 */
async function saveUser() {
    const nombre = document.querySelector('#user_nombre').value;
    const apellido = document.querySelector('#user_apellido').value;
    const fechaNacimiento = document.querySelector('#user_fecha_nacimiento').value;
    const email = document.querySelector('#user_email').value;
    const password = document.querySelector('#user_password').value;
    const telefono = document.querySelector('#user_telefono').value;
    const nacionalidad = document.querySelector('#user_nacionalidad').value;
    const domicilio = document.querySelector('#user_domicilio').value;
    const rol = document.querySelector('#user_rol').value;

    // Validación de formulario
    if (!nombre || !apellido || !fechaNacimiento || !email || !password || !telefono || !nacionalidad || !domicilio || !rol) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    // Convertir nombre, apellido y rol a formato capitalize
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    // Objeto con los datos del usuario
    const userData = {
        nombre: capitalize(nombre),
        apellido: capitalize(apellido),
        fecha_nacimiento: fechaNacimiento,
        email: email,
        password: password,
        telefono: telefono,
        nacionalidad: nacionalidad,
        domicilio: domicilio,
        rol: capitalize(rol)
    };

    try {
        const result = await fetchData(`${BASEURL}/usuarios/registro`, 'POST', userData);

        const formUser = document.querySelector('#form-users');
        formUser.reset();
        Swal.fire({
            title: 'Éxito!',
            text: result.msg,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
        showUsers(); // Actualizar la lista de usuarios después de guardar uno nuevo
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        Swal.fire({
            title: 'Error!',
            text: `Ocurrió un error al guardar el usuario: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}

/**
 * Función para cargar y mostrar los usuarios.
 */
async function showUsers() {
    try {
        const usersArray = await fetchData(`${BASEURL}/usuarios/listar`, 'GET');
        console.log('Datos recibidos del backend:', usersArray);

        const tableUsers = document.querySelector('#table-body-users');
        if (!tableUsers) {
            console.error('Elemento #table-body-users no encontrado en el DOM');
            return;
        }

        tableUsers.innerHTML = '';

        usersArray.forEach(user => {
            let tr = `
                <tr>
                    <td>${user.id}</td> <!-- id -->
                    <td>${user.nombre}</td> <!-- Nombre -->
                    <td>${user.apellido}</td> <!-- Apellido -->
                    <td>${user.fecha_nacimiento}</td> <!-- Fecha de Nacimiento -->
                    <td>${user.email}</td> <!-- Email -->
                    <td>${user.telefono}</td> <!-- Teléfono -->
                    <td>${user.nacionalidad}</td> <!-- Nacionalidad -->
                    <td>${user.domicilio}</td> <!-- Domicilio -->
                    <td>${user.rol}</td> <!-- Rol -->
                </tr>`;
            tableUsers.insertAdjacentHTML('beforeend', tr);
        });

    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        Swal.fire({
            title: 'Error!',
            text: `Ocurrió un error al cargar los usuarios: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}

/**
 * Función para cerrar sesión.
 */
async function logout() {
    try {
        const response = await fetch(`${BASEURL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || response.statusText);
        }

        localStorage.removeItem('access_token'); // Eliminar el token JWT del almacenamiento local
        window.location.href = './login-admin.html'; // Redirigir al usuario a la página de inicio de sesión
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Swal.fire({
            title: 'Error!',
            text: `Ocurrió un error al cerrar sesión: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', function () {
    const btnSaveUser = document.querySelector('#btn-save-user');
    const btnLogout = document.querySelector('#btn-logout'); // Botón de cerrar sesión

    // Verificar si los elementos están presentes antes de asignar eventos
    if (btnSaveUser) {
        btnSaveUser.addEventListener('click', saveUser);
    } else {
        console.error('Elemento #btn-save-user no encontrado en el DOM');
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', logout);
    } else {
        console.error('Elemento #btn-logout no encontrado en el DOM');
    }

    showUsers(); // Cargar la lista de usuarios al cargar la página
});
