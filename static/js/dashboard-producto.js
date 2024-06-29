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

        // Mapeo de categorías por código para poner el nombre en lugar del código en la tabla
        const categoriasMap = {};
        categorias.forEach(cat => {
            categoriasMap[cat.cod_categoria] = cat.nom_categoria;
        });

        productos.forEach(pro => {
            let tr = `
                <tr>
                    <td>${pro.cod_producto}</td> <!-- Código -->
                    <td>${categoriasMap[pro.cod_categoria] || pro.cod_categoria}</td> <!-- Categoria -->
                    <td>${pro.tipo_producto}</td> <!-- Tipo -->
                    <td>${pro.nom_producto}</td> <!-- Nombre -->
                    <td>${pro.precio_unitario}</td> <!-- Precio -->
                    <td>
                        <img src="${pro.img_producto}" width="25%"> <!-- Imagen -->
                    </td> 
                    <td>${pro.stock_pro}</td> <!-- Stock -->
                    <td>${pro.descripcion_pro}</td> <!-- Descripción -->
                    <td>
                        <button class="btn btn-primary" onclick="editarProducto(${pro.cod_producto})">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarProducto(${pro.cod_producto})">Eliminar</button>
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

async function saveProducto(){
    const cod_categoria = document.querySelector('#cod_categoria').value;
    const tipo_producto = document.querySelector('#tipo_producto').value;
    const nom_producto = document.querySelector('#nom_producto').value;
    const precio_unitario = document.querySelector('#precio_unitario').value;
    const img_producto = document.querySelector('#img_producto').value;
    const stock_pro = document.querySelector('#stock_pro').value;
    const descripcion_pro = document.querySelector('#descripcion_pro').value;

    if (!cod_categoria || !tipo_producto || !nom_producto || !precio_unitario || !img_producto || !stock_pro || !descripcion_pro) {
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
        descripcion_pro: descripcion_pro
    };

    let result = null;

    if (productoData.cod_producto) {
        result = await fetchData(`${BASEURL}/productos/editar/${productoData.cod_producto}`, 'PUT', productoData);
    } else {
        result = await fetchData(`${BASEURL}/productos/registro`, 'POST', productoData);
    }

    const formProducto = document.querySelector('#form-products');
    formProducto.reset();
    Swal.fire({
        title: 'Éxito!',
        text: 'Producto guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Cerrar'
    });
    showProductos();
}

async function editarProducto(cod_producto) {
    try {
        const producto = await fetchData(`${BASEURL}/productos/${cod_producto}`, 'GET');
        console.log('Producto a editar:', producto);

        document.querySelector('#cod_categoria').value = producto.cod_categoria;
        document.querySelector('#tipo_producto').value = producto.tipo_producto;
        document.querySelector('#nom_producto').value = producto.nom_producto;
        document.querySelector('#precio_unitario').value = producto.precio_unitario;
        document.querySelector('#img_producto').value = producto.img_producto;
        document.querySelector('#stock_pro').value = producto.stock_pro;
        document.querySelector('#descripcion_pro').value = producto.descripcion_pro;

    } catch (error) {
        console.error('Error al cargar el producto:', error);
        Swal.fire({
            title: 'Error!',
            text: `Ocurrió un error al cargar el producto: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}

async function eliminarProducto(cod_producto) {
    try {
        const result = await fetchData(`${BASEURL}/productos/eliminar/${cod_producto}`, 'DELETE');
        console.log('Producto eliminado:', result);

        Swal.fire({
            title: 'Éxito!',
            text: 'Producto eliminado correctamente.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
        showProductos();
        
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        Swal.fire({
            title: 'Error!',
            text: `Ocurrió un error al eliminar el producto: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}