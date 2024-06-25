const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
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
        const result = await fetchData(`${BASEURL}/setup/create`, 'POST', userData);
        
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
        const usersArray = await fetchData(`${BASEURL}/setup/users`, 'GET');
        console.log('Datos recibidos del backend:', usersArray);

        const tableUsers = document.querySelector('#table-body-users');
        tableUsers.innerHTML = '';

        usersArray.forEach(user => {
            let tr = `
                <tr>
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

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', function () {
    const btnSaveUser = document.querySelector('#btn-save-user');
    // Asociar una función al evento click del botón
    btnSaveUser.addEventListener('click', saveUser);
    showUsers();
});
