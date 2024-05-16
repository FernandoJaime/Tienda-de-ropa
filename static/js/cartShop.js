document.addEventListener("DOMContentLoaded", function () {
    function getCurrentPage() {
        var url = decodeURIComponent(window.location.pathname);
        var parts = url.split("/");
        return parts[parts.length - 1];
    }

    function isShoppingPage() {
        var currentPage = getCurrentPage();
        return (
            currentPage.includes("hombres.html") ||
            currentPage.includes("mujeres.html") ||
            currentPage.includes("calzados.html") ||
            currentPage.includes("niños.html")
        );
    }

    function initializeCartFunctionality() {
        console.log("Inicializando funcionalidad del carrito en la página actual.");

        function addToCart(productName, productPrice, productImage) {
            console.log("Agregando producto al carrito:", productName, productPrice);
            var price = parseFloat(productPrice.replace("$", ""));
            var product = {
                name: productName,
                price: price,
                image: productImage,
                cantidad: 1,
            };
            var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
            var existingProduct = productsInCart.find(function (item) {
                return item.name === product.name;
            });
            if (existingProduct) {
                existingProduct.cantidad++;
            } else {
                productsInCart.push(product);
            }
            localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

            // llama a la funcion revisar carrito vacio
            reviewMessageEmpty();
            // llama a actualizar contador
            updateCartCount();
            if (window.location.pathname.includes("shoppingCart.html")) {
                updateCart();
            }
        }

        // Función para actualizar la cantidad del producto en el carrito
function updateProductCard(product) {
    console.log("Actualizando cantidad para:", product.name);

    // Buscar todos los elementos del carrito que coincidan con el producto
    var productCards = document.querySelectorAll('.product-card');
    
    // Iterar sobre cada elemento del carrito
    productCards.forEach(function(card) {
        // Encontrar el nombre del producto en el elemento h3
        var productNameElement = card.querySelector('h3');
        
        // Verificar si el nombre del producto coincide con el producto actual
        if (productNameElement && productNameElement.innerText === product.name) {
            // Encontrar el elemento de cantidad (.amount) dentro del elemento del carrito
            var cantidadElement = card.querySelector('.amount');
            
            // Verificar si se encontró el elemento de cantidad
            if (cantidadElement) {
                console.log("Elemento encontrado, actualizando cantidad...");
                // Actualizar el texto del elemento de cantidad con la nueva cantidad del producto
                cantidadElement.textContent = `Cantidad: ${product.cantidad}`;
            } else {
                console.error("Elemento de cantidad no encontrado en el producto:", product.name);
            }
        }
    });
}

        
        
        
        
function agregarProducto(product) {
    var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
    var productIndex = productsInCart.findIndex((item) => item.name === product.name);
    if (productIndex !== -1) {
        productsInCart[productIndex].cantidad++;
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
        updateProductCard(productsInCart[productIndex]); // Actualizar la vista del producto en el carrito
        actualizarTotals(); // Actualizar totales
        updateCartCount(); // Actualizar contador de productos
        location.reload(); // Recargar la página automáticamente
    }
}

function restarProducto(product) {
    var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
    var productIndex = productsInCart.findIndex((item) => item.name === product.name);
    if (productIndex !== -1 && productsInCart[productIndex].cantidad > 1) {
        productsInCart[productIndex].cantidad--;
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
        updateProductCard(productsInCart[productIndex]); // Actualizar la vista del producto en el carrito
        actualizarTotals(); // Actualizar totales
        updateCartCount(); // Actualizar contador de productos
        location.reload(); // Recargar la página automáticamente
    }
}

        
    
        

        function actualizarTotals() {
            var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
            let cantidad = 0;
            let precio = 0;
            productsInCart.forEach((product) => {
                cantidad += product.cantidad;
                const productPrice = parseFloat(product.price);
                if (!isNaN(productPrice)) {
                    precio += productPrice * product.cantidad;
                }
            });
            var cantidadElement = document.getElementById("cantidad");
            var precioElement = document.getElementById("precio");
            cantidadElement.textContent = cantidad;
            precioElement.textContent = precio.toFixed(2);
        }

        function reviewMessageEmpty() {
            const carritoVacioElement = document.getElementById("carrito-vacio");
            const totalsContainer = document.getElementById("totals");
            if (carritoVacioElement && totalsContainer) {
                const productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
                if (productsInCart.length > 0) {
                    carritoVacioElement.classList.add("escondido");
                    totalsContainer.classList.remove("escondido");
                } else {
                    carritoVacioElement.classList.remove("escondido");
                    totalsContainer.classList.add("escondido");
                }
            }
        }

        var buyButtons = document.querySelectorAll(".btn-buy");
        buyButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var card = this.closest(".card");
                var productName = card.querySelector("h3").innerText;
                var productPrice = card.querySelector("span").innerText;
                var productImage = card.querySelector("img").src;
                addToCart(productName, productPrice, productImage);
            });
        });

        var isShoppingCartPage = window.location.pathname.includes("shoppingCart.html");
        if (isShoppingCartPage) {
            var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
            var cartContainer = document.getElementById("cart-container-shopp");
            var cantidadElement = document.getElementById("cantidad");
            var precioElement = document.getElementById("precio");
            cartContainer.innerHTML = "";
            if (productsInCart.length === 0) {
                cartContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
            } else {
                productsInCart.forEach(function (product) {
                    var productCard = document.createElement("div");
                    productCard.classList.add("product-card");
                    productCard.innerHTML = `
              <div class="product-details">
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>Precio: $${product.price}</p>
                <p class="amount">Cantidad: ${product.cantidad}</p>
                <div>
                  <button class="btn-add">+</button>
                  <button class="btn-subtract">-</button>
                  <button class="eliminate">Eliminar</button>
                </div>
              </div>
            `;
                    cartContainer.appendChild(productCard);
                });
                var totalCantidad = productsInCart.reduce((total, product) => total + product.cantidad, 0);
                var totalPrice = productsInCart.reduce((total, product) => total + product.price * product.cantidad, 0);
                cantidadElement.textContent = totalCantidad;
                precioElement.textContent = totalPrice.toFixed(2);
            }
        }

        document.querySelectorAll(".eliminate").forEach(function (el) {
            el.addEventListener("click", function () {
                var productName = this.closest(".product-card").querySelector("h3").innerText;
                var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
                var product = productsInCart.find(function (item) {
                    return item.name === productName;
                });
                if (product) removeFromCart(product);
                else console.error("Producto no encontrado en el carrito:", productName);
            });
        });

        function removeFromCart(product) {
            var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
            var newProductsInCart = productsInCart.filter(function (item) {
                return item.name !== product.name;
            });
            localStorage.setItem("productsInCart", JSON.stringify(newProductsInCart));
            updateCartCount();
            location.reload();
        }

        var reiniciarButton = document.getElementById("reiniciar");
        if (reiniciarButton) {
            reiniciarButton.addEventListener("click", function () {
                localStorage.removeItem("productsInCart");
                location.reload();
            });
        }

        document.querySelectorAll(".product-details button:not(.eliminate)").forEach((button) => {
            button.addEventListener("click", (e) => {
                const productCard = e.target.closest(".product-card");
                if (productCard) {
                    const cantidadElement = productCard.querySelector(".amount");
                    if (cantidadElement) {
                        const productName = productCard.querySelector("h3").innerText;
                        const product = productsInCart.find((item) => item.name === productName);
                        if (button.textContent === "-") {
                            if (product.cantidad > 1) { // Evitar que la cantidad sea menor que 1
                                restarProducto(product);
                                cantidadElement.innerText = `Cantidad: ${product.cantidad}`;
                            }
                        } else if (button.textContent === "+") {
                            agregarProducto(product);
                            cantidadElement.innerText = `Cantidad: ${product.cantidad}`;
                        }
                    } else {
                        console.error("Elemento de cantidad no encontrado.");
                    }
                } else {
                    console.error("Card de producto no encontrada.");
                }
            });
        });
    }

    if (isShoppingPage() || window.location.pathname.includes("shoppingCart.html")) {
        initializeCartFunctionality();
    }
});
