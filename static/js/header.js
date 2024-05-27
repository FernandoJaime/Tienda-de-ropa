'use strict';

//**********/ MODALES /**********//

// Función para cerrar modales
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
}


// Evento de clic para cerrar modales
const closeButtons = document.querySelectorAll('.modal-close-btn');
closeButtons.forEach(button => {
  button.addEventListener('click', function () {
    const modalId = this.dataset.modalId;
    closeModal(modalId);
  });
});


// Evento de clic para cerrar modales haciendo clic en el overlay
const closeOverlayButtons = document.querySelectorAll('.modal-close-overlay');
closeOverlayButtons.forEach(button => {
  button.addEventListener('click', function () {
    const modalId = this.parentElement.id;
    closeModal(modalId);
  });
});



//**********/ REDIRECCIONAMIENTO DE BOTONES ICONS /**********//

const loginRedirect = function () {
  window.location.href = 'sections/signinup.html'; 
};

// Redireccionamiento de menu desktop
const mainMenuButtons = document.querySelectorAll('.header-user-actions .action-btn, .bx-heart, .bx-shopnfy');
mainMenuButtons.forEach(button => {
  button.addEventListener('click', loginRedirect);
});

// Redireccionamiento de menu movil
const mobileMenuButtons = document.querySelectorAll('bx-user, .bx-heart, .bx-shopnfy');
mobileMenuButtons.forEach(button => {
  button.addEventListener('click', loginRedirect);
});


//**** Funcion de actualiazion de contador de producto del carro de compras ****/
function updateCartCount() {
  var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
  var countElements = document.querySelectorAll(".count");
  var totalCount = productsInCart.reduce((total, product) => total + product.cantidad, 0);

  countElements.forEach(function(element) {
    element.textContent = totalCount;
  });
}

// Llamar a la función para actualizar el contador del carrito al cargar la página
updateCartCount();



// Llamar a la función para actualizar el contador del carrito al cargar la página
updateCartCount();




//**********/ MENU MOVIL /**********//

// Variables y funciones del menú móvil
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const accordionItems = document.querySelectorAll('[data-accordion]');
const accordionButtons = document.querySelectorAll('[data-accordion-btn]');
const overlay = document.querySelector('[data-overlay]');

// Función para alternar el menú móvil
const toggleMobileMenu = function (index) {
  mobileMenu[index].classList.toggle('active');
  overlay.classList.toggle('active');

  if (mobileMenu[index].classList.contains('active')) {
    for (let j = 0; j < accordionItems.length; j++) {
      accordionItems[j].classList.remove('active');
    }
    for (let j = 0; j < accordionButtons.length; j++) {
      accordionButtons[j].classList.remove('active');
    }
  }
};

// Event listeners para el menú móvil
for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  mobileMenuOpenBtn[i].addEventListener('click', function () {
    toggleMobileMenu(i);
  });

  if (mobileMenuCloseBtn[i]) {
    mobileMenuCloseBtn[i].addEventListener('click', function () {
      mobileMenu[i].classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () {
      mobileMenu[i].classList.remove('active');
      overlay.classList.remove('active');
    });
  }
}

// Event listener para los botones de acordeón
for (let i = 0; i < accordionButtons.length; i++) {
  accordionButtons[i].addEventListener('click', function () {
    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');
  });
}

// Event listener para redireccionar desde el menú móvil
const menuLinks = document.querySelectorAll('.mobile-menu-category-list .menu-category a');
menuLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    window.location.href = href;
  });
});



//**********/  MENU DE BUSQUEDA /***********//

// Función para mostrar u ocultar el menú de búsqueda
const toggleSearchContainer = function () {
  const searchMenu = document.getElementById('searchMenu');
  if (searchMenu) {
    searchMenu.classList.toggle('active');
  }
};

// Event listener para mostrar u ocultar el menú de búsqueda
const searchButton = document.getElementById('searchButton');
if (searchButton) {
  searchButton.addEventListener('click', toggleSearchContainer);
}

// Función para cerrar el menú de búsqueda
function closeSearchMenu() {
  const searchMenu = document.getElementById('searchMenu');
  if (searchMenu) {
    searchMenu.classList.remove('active');
  }
}



//**********/ PROMOCIONES /**********//

const promociones = [
  "¡Descuentos del 20% en toda la colección de ropa de verano! Renueva tu armario con nuestras últimas tendencias.",
  "¡Compra un par de zapatillas deportivas y llévate el segundo par con un 50% de descuento! Ideal para mantener tu estilo activo.",
  "Hazte con tus botas favoritas a precios increíbles! Compra una bota y obtén la segunda con un 40% de descuento.",
  "¡Promoción exclusiva en camisas de vestir para hombre! Lleva 3 y paga solo 2. Ideal para lucir elegante en cualquier ocasión.",
  "¡Descuentos especiales en accesorios de moda! Aprovecha nuestras ofertas y completa tu look con estilo.",
];

// Iniciar la promocion desde el lado derecho de la pantalla
const marqueeContent = document.getElementById('marqueeContent');
let position = window.innerWidth;
let currentIndex = 0;

// Función para mostrar las promociones una por una
function showPromotion() {
  marqueeContent.textContent = promociones[currentIndex];
}

// Función para animar la marquesina
function animateMarquee() {
  position -= 1;
  marqueeContent.style.transform = `translateX(${position}px)`;

  // Mostrar la siguiente promoción
  if (-position > window.innerWidth / 2) {
    currentIndex = (currentIndex + 1) % promociones.length;
    showPromotion();
    position = window.innerWidth; // Reiniciar desde el lado derecho
  }

  requestAnimationFrame(animateMarquee);
}

// Iniciar la animación
showPromotion();
requestAnimationFrame(animateMarquee);
