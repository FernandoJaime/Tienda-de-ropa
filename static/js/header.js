// --- MENU ---- //

'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { 
  modal.classList.add('closed');
}

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);

// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const accordionItems = document.querySelectorAll('[data-accordion]');
const accordionButtons = document.querySelectorAll('[data-accordion-btn]');

// Mobile menu function
const toggleMobileMenu = function (index) {
  mobileMenu[index].classList.toggle('active');
  overlay.classList.toggle('active');
  
  // Si el menú móvil se abre, se cierran todas las subcategorías
  if (mobileMenu[index].classList.contains('active')) {
    for (let j = 0; j < accordionItems.length; j++) {
      accordionItems[j].classList.remove('active');
    }
    for (let j = 0; j < accordionButtons.length; j++) {
      accordionButtons[j].classList.remove('active');
    }
  }
}

// Event listeners for mobile menu
for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  mobileMenuOpenBtn[i].addEventListener('click', function () {
    toggleMobileMenu(i);
  });

  mobileMenuCloseBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  });
}

// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

// Event listener for accordion buttons
for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener('click', function () {
    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');
  });
}




// Función para mostrar u ocultar el contenedor de búsqueda y generar el desplegable
const toggleSearchContainer = function () {
  searchTabContainer.classList.toggle('active');
  
  // Verificar si el contenedor de búsqueda está activo
  const isActive = searchTabContainer.style.display === 'block';

  // Si el contenedor está activo, ocultarlo
  if (isActive) {
    searchTabContainer.style.display = 'none';
    // Eliminar el input de búsqueda si está presente
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.remove();
    }
  } else {
    // Si el contenedor no está activo, agregar la clase 'active' y generar el desplegable
    searchTabContainer.style.display = 'block';

    // Crear el input para la búsqueda
    const searchInput = document.createElement('input');
    searchInput.classList.add('search-input');
    

    // Insertar el input después del botón de búsqueda
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.insertAdjacentElement('afterend', searchInput);
  }
}

// Agregar un evento de clic al botón de búsqueda para mostrar u ocultar el contenedor de búsqueda
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', toggleSearchContainer);



// ---- PROMOCIONES ----//

// CARGA DE PROMOCINES //
document.addEventListener('DOMContentLoaded', function () {
    var promociones = [
      "¡Descuentos del 20% en toda la colección de ropa de verano! Renueva tu armario con nuestras últimas tendencias.",
      "¡Compra un par de zapatillas deportivas y llévate el segundo par con un 50% de descuento! Ideal para mantener tu estilo activo.",
      "Hazte con tus botas favoritas a precios increíbles! Compra una bota y obtén la segunda con un 40% de descuento.",
      "¡Promoción exclusiva en camisas de vestir para hombre! Lleva 3 y paga solo 2. Ideal para lucir elegante en cualquier ocasión.",
      "¡Descuentos especiales en nuestra colección infantil! Renueva el armario de tus pequeños con descuentos de hasta el 40%."
    ];
  
    var marqueeContent = document.getElementById("marqueeContent");
  
    // Función para cargar las promociones
    function cargarPromociones(promociones) {
      promociones.forEach(function(promocion) {
        var span = document.createElement("span");
        span.textContent = promocion;
        marqueeContent.appendChild(span);
      });
    }
  
    // Cargar las promociones antes de iniciar la animación
    cargarPromociones(promociones);
  
    // Iniciar la animación después de cargar las promociones
    iniciarAnimacion();
  
    // Función para iniciar la animación
    function iniciarAnimacion() {
      marqueeContent.style.animation = "marquee 50s infinite linear";
      marqueeContent.style.animationPlayState = "running";
    }
  });




  // -------- redirecionamiento -------//
  document.addEventListener('DOMContentLoaded', function () {
    const loginRedirectBtn = document.querySelector('.header-user-actions .action-btn[data-redirect="sections/login.html"]');
    const favoritesBtn = document.querySelectorAll('.header-user-actions .action-btn')[1];
    const shopBtn = document.querySelectorAll('.header-user-actions .action-btn')[2];
    const carritoButtonModal = document.getElementById('carritoButtonModal');
  
    // Función para crear y mostrar el modal de favoritos
    const mostrarModal = function () {
      // Crear el contenedor del modal
      const favoriteModalContainer = document.createElement('div');
      favoriteModalContainer.classList.add('modal-favorite-container');
      favoriteModalContainer.innerHTML = `
        <div class="modal-favorite-content">
          <span id="cerrarModalBtn" class="close">&times;</span>
          <h2>Debes iniciar sesión para ingresar a esta sección desde tu cuenta de USUARIO.</h2>
          <p>Inicio de sesión de prueba</p>
          <button id="carritoButtonModal" class="btn-favorite">
            <a href="/sections/login.html">Iniciar sesión</a>
          </button>
        </div>
      `;
  
      // Agregar el modal al final del cuerpo del documento
      document.body.appendChild(favoriteModalContainer);
  
      // Agregar evento de clic para cerrar el modal
      const closeModalBtn = document.getElementById('cerrarModalBtn');
      closeModalBtn.addEventListener('click', function () {
        favoriteModalContainer.style.display = 'none';
      });
  
      // Agregar evento de clic para redirigir al carrito desde el modal
      carritoButtonModal.addEventListener('click', function () {
        window.location.href = '/sections/shoppingCart.html';
      });
  
      // Mostrar el modal
      favoriteModalContainer.style.display = 'block';
    };
  
    // Redirigir al presionar el primer botón
    loginRedirectBtn.addEventListener('click', function () {
      window.location.href = 'sections/login.html';
    });
  
    // Mostrar modal al presionar el segundo botón
    favoritesBtn.addEventListener('click', mostrarModal);
  
    // Redirigir al presionar el tercer botón
    shopBtn.addEventListener('click', function () {
      window.location.href = 'sections/login.html';
    });
  
    
  });