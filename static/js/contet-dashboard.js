/**
 * Este script gestiona la carga dinámica de secciones en una página administrativa.
 * También incluye formularios para administrar usuarios y productos, así como la lógica
 * para mostrar mensajes de construcción en otras secciones del menú.
 */

// Evento 'DOMContentLoaded' que se dispara cuando la página HTML se ha cargado completamente
document.addEventListener('DOMContentLoaded', function () {
    
    // Selección de todos los enlaces de la barra lateral
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    
    // Elemento donde se va a cargar el contenido dinámico
    const dynamicContent = document.getElementById("dynamic-content");

    // Itera sobre todos los enlaces de la barra lateral para agregar un evento 'click'
    sidebarLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace
            const section = this.getAttribute("data-section"); // Obtiene el atributo 'data-section' del enlace
            loadSection(section); // Carga la sección correspondiente al hacer clic en el enlace
        });
    });

    /**
     * Función para cargar dinámicamente una sección según el parámetro 'section' recibido.
     * @param {string} section - Nombre de la sección a cargar ('usuarios', 'categorias', 'compras', 'notification', 'configuracion', 'productos').
     */
    function loadSection(section) {
        let content = "";

        // Dependiendo de la sección seleccionada, genera el contenido HTML correspondiente
        if (section === "usuarios") {
            // Formulario y tabla para administrar usuarios
            content = `
                <div class="container-fluid mt-4 container-main">
                    <h1 class="text-center mb-5">Administración de Usuarios</h1>
                    <form id="form-users">
                        <div class="row">
                            <div class="col-md-3">
                                <label for="user_nombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" name="user_nombre" id="user_nombre">
                            </div>
                            <div class="col-md-3">
                                <label for="user_apellido" class="form-label">Apellido</label>
                                <input type="text" class="form-control" name="user_apellido" id="user_apellido">
                            </div>
                            <div class="col-md-3">
                                <label for="user_fecha_nacimiento" class="form-label">Fecha de Nacimiento</label>
                                <input type="date" class="form-control" name="user_fecha_nacimiento" id="user_fecha_nacimiento">
                            </div>
                            <div class="col-md-3">
                                <label for="user_email" class="form-label">Email</label>
                                <input type="email" class="form-control" name="user_email" id="user_email">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-3">
                                <label for="user_password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" name="user_password" id="user_password" placeholder="contraseña de 8 digitos o mas">
                            </div>
                            <div class="col-md-3">
                                <label for="user_telefono" class="form-label">Teléfono</label>
                                <input type="text" class="form-control" name="user_telefono" id="user_telefono">
                            </div>
                            <div class="col-md-3">
                                <label for="user_nacionalidad" class="form-label">Nacionalidad</label>
                                <input type="text" class="form-control" name="user_nacionalidad" id="user_nacionalidad">
                            </div>
                            <div class="col-md-3">
                                <label for="user_domicilio" class="form-label">Domicilio</label>
                                <input type="text" class="form-control" name="user_domicilio" id="user_domicilio">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-3">
                                <label for="user_rol" class="form-label">Rol</label>
                                <select class="form-select" name="user_rol" id="user_rol">
                                    <option value="empleado">Empleado</option>
                                    <option value="cliente">Cliente</option>
                                </select>
                            </div>
                            <div class="col-md-9 text-center mt-4">
                                <button class="btn btn-primary" type="button" id="btn-save-user">Guardar Usuario</button>
                            </div>
                        </div>
                    </form>
    
                    <div class="mt-5 container-table d-flex flex-column justify-content-center text-center">
                        <h2 class="mb-5">Listado de Usuarios</h2>
                        <div class="table-responsive"> <!-- Clase para hacer la tabla responsive -->
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Fecha de Nacimiento</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                        <th>Nacionalidad</th>
                                        <th>Domicilio</th>
                                        <th>Rol</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body-users">
                                    <!-- Aquí se cargarán dinámicamente los usuarios -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        } else if (section === "categorias") {
            // Página en construcción para la sección Categorías
            content = `<section class="construccion">
                            <h2 class="fs-1 fw-bold">Sección Categoría</h2>
                            <p class="fs-3">Página en construcción</p>
                            <p class="fs-1 text-bg">Selecciona una opción del menú</p>
                        </section>`;
        } else if (section === "compras") {
            // Página en construcción para la sección Compras
            content = `<section class="construccion">
                            <h2 class="fs-1 fw-bold">Sección Compras</h2>
                            <p class="fs-3">Página en construcción</p>
                            <p class="fs-1 text-bg">Selecciona una opción del menú</p>
                        </section>`;
        } else if (section === "notification") {
            // Página en construcción para la sección Notificación
            content = `<section class="construccion">
                            <h2 class="fs-1 fw-bold">Sección Notificacion</h2>
                            <p class="fs-3">Página en construcción</p>
                            <p class="fs-1 text-bg">Selecciona una opción del menú</p>
                        </section>`;
        } else if (section === "configuracion") {
            // Página en construcción para la sección Configuración
            content = `<section class="construccion">
                            <h2 class="fs-1 fw-bold">Sección Configuracion</h2>
                            <p class="fs-3">Página en construcción</p>
                            <p class="fs-1 text-bg">Selecciona una opción del menú</p>
                        </section>`;
        } else if (section === "productos") {
            // Formulario y lista de productos para administrar productos
            content = `
                <div class="container-fluid mt-4 container-main">
                    <h1 class="text-center mb-5">Administración de Productos</h1>
                    <form action="" id="form-products" class="container-fluid container-main mt-4">
                        <div class="row">
                            <div class="col-md-3">
                                <label for="cod_categoria" class="form-label">Categoría</label>
                                <select class="form-select" name="cod_categoria" id="cod_categoria">
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="cod_tipo" class="form-label">Tipo</label>
                                <select class="form-select" name="cod_tipo" id="cod_tipo">
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="nom_producto" class="form-label">Nombre del Producto</label>
                                <input type="text" class="form-control" name="nom_producto" id="nom_producto">
                            </div>
                            <div class="col-md-3">
                                <label for="precio_unitario" class="form-label">Precio Unitario</label>
                                <input type="number" class="form-control" name="precio_unitario" id="precio_unitario">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-3">
                                <label for="stock_pro" class="form-label">Stock</label>
                                <input type="number" class="form-control" name="stock_pro" id="stock_pro">
                            </div>
                            <div class="col-md-3">
                                <label for="img_producto" class="form-label">Imagen del Producto</label>
                                <input type="file" class="form-control" name="img_producto" id="img_producto">
                            </div>
                            <div class="col-md-6">
                                <label for="descripcion_pro" class="form-label">Descripción</label>
                                <textarea class="form-control" name="descripcion_pro" id="descripcion_pro"></textarea>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12 text-center">
                                <button class="btn btn-primary" type="button" id="btn-save-product">Agregar</button>
                            </div>
                        </div>
                    </form>
    
                    <section id="list" class="container mt-4 mb-5">
                        <h3 class="subtitle">Listado de Productos</h3>
                        <table id="list-table-products" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Tipo</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Aquí se cargarán dinámicamente los productos -->
                            </tbody>
                        </table>
                    </section>
                </div>
            `;
        } else {
            // Si no coincide con ninguna sección conocida, muestra un mensaje de bienvenida
            content = `<section class="construccion">
                            <h2 class="fs-1 fw-bold">Bienvenido</h2>
                            <p class="fs-1 text-bg">Elige una opción del menú</p>
                        </section>`;
        }

        // Actualiza el contenido dinámico con el HTML generado
        dynamicContent.innerHTML = content;
    }

    // Cargar sección inicial de Productos al inicio
    loadSection("productos");

    // Cargar sección inicial de Usuarios al inicio
    loadSection("usuarios");
});

