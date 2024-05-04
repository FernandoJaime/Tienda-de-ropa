
// tengo que terminar y refactorizar el codigo

document.addEventListener("DOMContentLoaded", function() {

    // Función para agregar un producto al carrito
    function addToCart(productName, productPrice, productImage) {
        console.log("Agregando producto al carrito:", productName, productPrice);
        
        // Convertir el precio a un número
        var price = parseFloat(productPrice.replace("$", ""));

        // Almacena el producto seleccionado en localStorage
        var product = {
            name: productName,
            price: price,
            image: productImage,
            cantidad: 1
        };
        var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
        // Verificar si el producto ya está en el carrito
        var existingProduct = productsInCart.find(function(item) {
            return item.name === product.name;
        });
        if (existingProduct) {
            // Si el producto ya está en el carrito, incrementamos la cantidad
            existingProduct.cantidad++;
        } else {
            // Si el producto no está en el carrito, lo añadimos
            productsInCart.push(product);
        }
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    }
    
    // Verificar si estamos en la página hombres.html
    var isHombresPage = window.location.pathname.includes("hombres.html");

    // Si estamos en la página hombres.html, seleccionar los botones y agregar el evento clic
    if (isHombresPage) {
        // Obtén todos los botones de compra
        var buyButtons = document.querySelectorAll(".btn-buy");

        // Agrega un evento de clic a cada botón
        buyButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                // Encuentra la tarjeta padre del botón presionado
                var card = this.closest(".card");

                // Obtén los elementos de la tarjeta
                var productName = card.querySelector("h3").innerText;
                var productPrice = card.querySelector("span").innerText;
                var productImage = card.querySelector("img").src;

                // Llama a la función para agregar el producto al carrito
                addToCart(productName, productPrice, productImage);
            });
        });
    }

    // Verificar si estamos en la página shoppingCart.html
    var isShoppingCartPage = window.location.pathname.includes("shoppingCart.html");

    // Si estamos en la página shoppingCart.html, agregar productos del localStorage al carrito
    if (isShoppingCartPage) {
        var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
        var cartContainer = document.getElementById("cart-container");
        var cantidadElement = document.getElementById("cantidad");
        var precioElement = document.getElementById("precio");

        // Limpiar el carrito antes de agregar productos
        cartContainer.innerHTML = "";

        // Agregar cada producto del localStorage al carrito
        productsInCart.forEach(function(product) {
            var listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="tarjeta-producto">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <span>$${product.price}</span>
                    <div clas="acciones">
                        <button>+</button>
                        <span class="cantidad">${product.cantidad}</span>
                        <button>-</button>
                        <button class="eliminar">Eliminar</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(listItem);
        });

        // Actualizar el total de unidades y el precio total
        var totalCantidad = productsInCart.reduce((total, product) => total + product.cantidad, 0);
        var totalPrice = productsInCart.reduce((total, product) => total + (product.price * product.cantidad), 0);

        cantidadElement.textContent = totalCantidad;
        precioElement.textContent = totalPrice.toFixed(2);
    }

    /** Función para eliminar un producto del carrito */
    function eliminarDelCarrito(producto) {
        var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
        // Filtrar los productos en el carrito para eliminar el producto específico
        var newProductsInCart = productsInCart.filter(function(item) {
            return item.name !== producto.name;
        });
        // Actualizar el localStorage con los productos restantes en el carrito
        localStorage.setItem("productsInCart", JSON.stringify(newProductsInCart));
        // Volver a cargar la página para actualizar el carrito
        location.reload();
    }

    // Agregar evento de clic a los botones de eliminar
    document.querySelectorAll(".eliminar").forEach(function(el) {
        el.addEventListener("click", function() {
            var productName = this.closest(".tarjeta-producto").querySelector("h3").innerText;
            var product = productsInCart.find(function(item) {
                return item.name === productName;
            });
            eliminarDelCarrito(product);
        });
    });

    // Función para reiniciar el carrito
    document.getElementById("reiniciar").addEventListener("click", function() {
        localStorage.removeItem("productsInCart");
        location.reload();
    });

    // Agregar eventos a los botones de restar y sumar cantidad
    document.querySelectorAll(".tarjeta-producto button:not(.eliminar)").forEach((button) => {
        button.addEventListener("click", (e) => {
            const cantidadElement = e.target.parentElement.querySelector(".cantidad");
            const productName = e.target.closest(".tarjeta-producto").querySelector("h3").innerText;
            const product = productsInCart.find(item => item.name === productName);

            if (button.textContent === "-") {
                restarProducto(product);
                cantidadElement.innerText = product.cantidad;
            } else if (button.textContent === "+") {
                agregarProducto(product);
                cantidadElement.innerText = product.cantidad;
            }

            actualizarTotales();
        });
    });

    /** Función para restar un producto del carrito */
    function restarProducto(producto) {
        if (producto.cantidad > 1) {
            producto.cantidad--;
            localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
        }
    }

    /** Función para sumar un producto al carrito */
    function agregarProducto(producto) {
        producto.cantidad++;
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    }

   
/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
    const productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
    let cantidad = 0;
    let precio = 0;
    if (productsInCart && productsInCart.length > 0) {
        productsInCart.forEach((producto) => {
            cantidad += producto.cantidad;
            // Asegurarse de que el precio sea un número antes de realizar la multiplicación
            const productPrice = parseFloat(product.price);
            if (!isNaN(productPrice)) {
                precio += productPrice * producto.cantidad;
            }
        });
    }
    cantidadElement.innerText = cantidad;
    // Verificar si el precio es un número válido antes de mostrarlo
    if (!isNaN(precio)) {
        precioElement.innerText = precio.toFixed(2);
    }
    if (precio === 0) {
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}



    /** Muestra o esconde el mensaje de que no hay nada en el carrito */
    function revisarMensajeVacio() {
        const productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
        const carritoVacioElement = document.getElementById("carrito-vacio");
        const totalesContainer = document.getElementById("totales");
        carritoVacioElement.classList.toggle("escondido", productsInCart && productsInCart.length > 0);
        totalesContainer.classList.toggle("escondido", !(productsInCart && productsInCart.length > 0));
    }
});

