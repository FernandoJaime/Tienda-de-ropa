 //URL base en config.js

// Función para realizar una petición fetch con JSON
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

// Función para mostrar productos
async function showProductos() {
    try {
        const productos = await fetchData(`${BASEURL}/productos/listar`, 'GET');
        const categorias = await fetchData(`${BASEURL}/categorias/listar`, 'GET');
        console.log('Datos recibidos del backend:', productos);
        console.log('Datos recibidos del backend:', categorias);

        const tablaProductos = document.querySelector('#table-body-productos');
        if (!tablaProductos) {
            console.error('Elemento #table-body-productos no encontrado en el DOM');
            return;
        }

        tablaProductos.innerHTML = '';

        const categoriasMap = {};
        categorias.forEach(cat => {
            categoriasMap[cat.cod_categoria] = cat.nom_categoria;
        });

        productos.forEach(pro => {
            let tr = `
                <tr>
                    <td>${pro.cod_producto}</td>
                    <td>${categoriasMap[pro.cod_categoria] || pro.cod_categoria}</td>
                    <td>${pro.tipo_producto}</td>
                    <td>${pro.nom_producto}</td>
                    <td>${pro.precio_unitario}</td>
                    <td>
                        <img src="${pro.img_producto}" width="25%">
                    </td>
                    <td>${pro.stock_pro}</td>
                    <td>${pro.descripcion_pro}</td>
                    <td class="d-flex flex-row justify-content-center align-items-center">
                        <button class="btn btn-primary me-2" onclick="editarProducto(${pro.cod_producto})">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarProducto(${pro.cod_producto})">Eliminar</button>
                    </td>
                </tr>`;
            tablaProductos.insertAdjacentHTML('beforeend', tr);
        });

    } catch (error) {
        console.error('Error al cargar productos:', error);
        Swal.fire({
            title: 'Error!',
            text: `Ocurrió un error al cargar los productos: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}

// Función para guardar producto
async function saveProducto() {
    const cod_categoria = document.querySelector('#cod_categoria').value;
    const tipo_producto = document.querySelector('#tipo_producto').value;
    const nom_producto = document.querySelector('#nom_producto').value;
    const precio_unitario = document.querySelector('#precio_unitario').value;
    const stock_pro = document.querySelector('#stock_pro').value;
    const descripcion_pro = document.querySelector('#descripcion_pro').value;
    const tipo_categoria = document.querySelector('#tipo_categoria').value;

    const img_producto_input = document.querySelector('#img_producto');
    let img_producto = '';

    if (img_producto_input.files.length > 0) {
        const file = img_producto_input.files[0];
        img_producto = URL.createObjectURL(file);
    }

    // Verificar que todos los campos estén llenos
    if (!cod_categoria || !tipo_producto || !nom_producto || !precio_unitario || !img_producto || !stock_pro || !descripcion_pro || !tipo_categoria) {
        console.log({
            cod_categoria,
            tipo_producto,
            nom_producto,
            precio_unitario,
            img_producto,
            stock_pro,
            descripcion_pro,
            tipo_categoria
        });
        Swal.fire({
            title: 'Error',
            text: 'Por favor, complete todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    const productoData = {
        cod_categoria: cod_categoria,
        tipo_producto: tipo_producto,
        nom_producto: nom_producto,
        precio_unitario: precio_unitario,
        img_producto: img_producto,
        stock_pro: stock_pro,
        descripcion_pro: descripcion_pro,
        tipo_categoria: tipo_categoria
    };

    try {
        const response = await fetch(`${BASEURL}/productos/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(productoData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Error al registrar el producto');
        }

        const result = await response.json();
        Swal.fire({
            title: 'Éxito',
            text: 'Producto registrado exitosamente',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });

        // Opcionalmente, recargar o actualizar la lista de productos
        showProductos();

    } catch (error) {
        console.error('Error al registrar el producto:', error);
        Swal.fire({
            title: 'Error',
            text: `Ocurrió un error al registrar el producto: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}






// Función para cargar y mostrar el producto en el modal
async function editarProducto(id) {
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${BASEURL}/productos/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Error al obtener el producto');
        }
        
        const producto = await response.json();

        // Guardar el producto en el localStorage
        localStorage.setItem('productoEditar', JSON.stringify(producto));

        // Mostrar el modal usando Bootstrap
        const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
        modal.show();

        // Llenar los campos del formulario con los datos del producto
        llenarModalEdicion(producto);

    } catch (error) {
        console.error('Error al cargar el producto:', error.message);
        Swal.fire({
            title: 'Error',
            text: `Ocurrió un error al obtener el producto: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}


function llenarModalEdicion(producto) {
    document.getElementById('edit_cod_categoria').value = producto.cod_categoria;
    document.getElementById('edit_tipo_producto').value = producto.tipo_producto;
    document.getElementById('edit_nom_producto').value = producto.nom_producto;
    document.getElementById('edit_precio_unitario').value = producto.precio_unitario;
    document.getElementById('edit_stock_pro').value = producto.stock_pro;
    document.getElementById('edit_descripcion_pro').value = producto.descripcion_pro;
    // Manejar la carga de la imagen si es necesario
}

document.getElementById('editProductModal').addEventListener('show.bs.modal', () => {
    const producto = JSON.parse(localStorage.getItem('productoEditar'));
    if (producto) {
        llenarModalEdicion(producto);
    }
});

// Función asincrónica para actualizar un producto
async function actualizarProducto() {
    try {
        const token = localStorage.getItem('access_token');
        const productoEditar = JSON.parse(localStorage.getItem('productoEditar'));
        const id = productoEditar.cod_producto;

        const producto = {
            cod_categoria: document.getElementById('edit_cod_categoria').value,
            tipo_producto: document.getElementById('edit_tipo_producto').value,
            nom_producto: document.getElementById('edit_nom_producto').value,
            precio_unitario: document.getElementById('edit_precio_unitario').value,
            stock_pro: document.getElementById('edit_stock_pro').value,
            descripcion_pro: document.getElementById('edit_descripcion_pro').value,
            img_producto: document.getElementById('edit_img_producto').value
        };

        // Mostrar alerta de confirmación
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas guardar los cambios?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar cambios',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const response = await fetch(`${BASEURL}/productos/editar/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(producto) 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error al actualizar el producto');
            }

            Swal.fire({
                title: 'Éxito',
                text: 'Producto actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });

            const modal = document.getElementById('editProductModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();

            showProductos(); // Actualizar la lista de productos
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error.message);
        Swal.fire({
            title: 'Error',
            text: `Ocurrió un error al actualizar el producto: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}


// Función para eliminar producto
// Función para eliminar producto
async function eliminarProducto(id) {
    try {
        // Mostrar alerta de confirmación
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Realmente deseas eliminar este producto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            // Proceder con la eliminación si el usuario confirma
            await fetchData(`${BASEURL}/productos/eliminar/${id}`, 'DELETE');
            Swal.fire({
                title: 'Éxito!',
                text: 'Producto eliminado correctamente.',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });
            showProductos(); 

        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error.message);
        Swal.fire({
            title: 'Error!',
            text: `Ocurrió un error al eliminar el producto: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}


// Evento para guardar producto
document.querySelector('#btn-save-product').addEventListener('click', saveProducto);

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', showProductos);
