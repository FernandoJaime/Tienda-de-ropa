'use strict';

//--------------- CONTROL DE MODALES -------------//

document.addEventListener('DOMContentLoaded', function () {
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

  // Función para mostrar el modal de favoritos
  const showFavoriteModal = function () {
    const favoriteModal = document.getElementById('modalFavorite');
    if (favoriteModal) {
      favoriteModal.style.display = 'block';
    }
  };

  // Evento de clic para mostrar el modal de favoritos
  const favoritesBtn = document.getElementById('openModalBtn');
  if (favoritesBtn) {
    favoritesBtn.addEventListener('click', showFavoriteModal);
  }

  

  // Variables de notificación y cierre
  const notificationToast = document.querySelector('[data-toast]');
  const toastCloseBtn = document.querySelector('[data-toast-close]');

  // Comprobación de la existencia de los elementos de notificación antes de agregar el event listener
  if (notificationToast && toastCloseBtn) {
    toastCloseBtn.addEventListener('click', function () {
      notificationToast.classList.add('closed');
    });
  }
});

// Función para mostrar el modal de favoritos
function showFavoriteModal() {
  const favoriteModal = document.getElementById('modalFavorite');
  if (favoriteModal) {
    favoriteModal.style.display = 'block';
  }
}



//------------- REDIRECCIONAMIENTO DE BOTONES MENU PRINCIPAL ------------------//


// Botones de redirección
const loginRedirectBtn = document.querySelector('.header-user-actions .action-btn[data-redirect="sections/login.html"]');
const shopBtn = document.querySelectorAll('.header-user-actions .action-btn')[2];

// Evento de clic para mostrar el modal de favoritos
const favoritesBtn = document.getElementById('openModalBtn');
if (favoritesBtn) {
  favoritesBtn.addEventListener('click', showFavoriteModal);
}

// Redireccionar a la página de inicio de sesión al hacer clic en el botón de inicio de sesión
if (loginRedirectBtn) {
  loginRedirectBtn.addEventListener('click', function () {
    window.location.href = '../sections/login.html';
  });
}

// Redireccionar a la página de tienda al hacer clic en el botón de tienda
if (shopBtn) {
  shopBtn.addEventListener('click', function () {
    window.location.href = '../sections/login.html';
  });
}





//-------------- MENU MOVIL --------------------//

// Variables y funciones del menú móvil
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const accordionItems = document.querySelectorAll('[data-accordion]');
const accordionButtons = document.querySelectorAll('[data-accordion-btn]');
const overlay = document.querySelector('[data-overlay]'); // Agregar variable de superposición

// Función para alternar el menú móvil
const toggleMobileMenu = function (index) {
  mobileMenu[index].classList.toggle('active');
  overlay.classList.toggle('active');
  
  // Si el menú móvil está abierto, cierra todas las subcategorías
  if (mobileMenu[index].classList.contains('active')) {
    for (let j = 0; j < accordionItems.length; j++) {
      accordionItems[j].classList.remove('active');
    }
    for (let j = 0; j < accordionButtons.length; j++) {
      accordionButtons[j].classList.remove('active');
    }
  }
}

// Event listeners para el menú móvil
for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  mobileMenuOpenBtn[i].addEventListener('click', function () {
    toggleMobileMenu(i);
  });

  // Comprueba si existe mobileMenuCloseBtn antes de agregar el event listener
  if (mobileMenuCloseBtn[i]) {
    mobileMenuCloseBtn[i].addEventListener('click', function () {
      mobileMenu[i].classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Comprueba si hay overlay antes de agregar el event listener
  if (overlay) {
    overlay.addEventListener('click', function () {
      mobileMenu[i].classList.remove('active');
      overlay.classList.remove('active');
    });
  }
}

// Variables del acordeón
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

// Event listener para los botones de acordeón
for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener('click', function () {
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

// Funcionalidad para los botones agregados al menú móvil
document.addEventListener('DOMContentLoaded', function() {

  const shopifyBtn = document.querySelector('.action-btn[data-shopify-btn]');
  const homeBtn = document.querySelector('.action-btn[data-home-btn]');
  const favoriteBtn = document.querySelector('.action-btn[data-favorite-btn]');
  
  // Función para redireccionar a login.html al hacer clic en el botón de navegación a la tienda
  shopifyBtn.addEventListener('click', function() {
    window.location.href = '/section/login.html'; 
  });
  
  // Función para redireccionar a login al hacer clic en el botón de navegación a la página de inicio
  homeBtn.addEventListener('click', function() {
    window.location.href = '/sections/login.html'; 
  });
  
  // Función para abrir el modal de favoritos al hacer clic en el botón de favoritos
  // Funcionalidad para los botones agregados al menú móvil
  document.addEventListener('DOMContentLoaded', function() {
    const favoriteBtn = document.querySelector('.action-btn[data-favorite-btn]');
    
    // Verificar si el botón de favoritos se seleccionó correctamente
    if (favoriteBtn) {
      // Función para abrir el modal de favoritos
      function openFavoriteModal() {
        const favoriteModal = document.getElementById('modalFavorite');
        
        // Verificar si el modal existe
        if (favoriteModal) {
          // Mostrar el modal cambiando su estilo de visualización a "block"
          favoriteModal.style.display = 'block';
        }
      }
      
      // Agregar event listener al botón de favoritos
      favoriteBtn.addEventListener('click', openFavoriteModal);
    } else {
      console.error("No se pudo encontrar el botón de favoritos.");
    }
  });
});









//------------- MENU BUSQUEDA ---------------//

// Variables y funciones del menú de búsqueda
const searchBtn = document.querySelector('.search-btn');
const searchMenu = document.querySelector('.search-menu');

// Función para mostrar u ocultar el menú de búsqueda
const toggleSearchContainer = function () {
  const isActive = searchMenu && searchMenu.classList.contains('active');
  
  if (isActive) {
    searchMenu.classList.remove('active');
    searchMenu.style.left = '-250px'; 
    searchBtn.removeEventListener('click', toggleSearchContainer); 
  } else {
    searchMenu.classList.add('active');
    searchMenu.style.left = '0'; 
    searchBtn.addEventListener('click', toggleSearchContainer); 
  }
}

// Event listener para mostrar u ocultar el menú de búsqueda
if (searchBtn) {
  searchBtn.addEventListener('click', toggleSearchContainer);
}

// Función para cerrar el menú de búsqueda
function closeSearchMenu() {
  if (searchMenu) {
    searchMenu.classList.remove('active');
    searchMenu.style.left = '-250px'; 
    searchBtn.addEventListener('click', toggleSearchContainer); 
  }
}




//------------ PROMOCIONES ---------//

document.addEventListener('DOMContentLoaded', function () {
  const promociones = [
    "¡Descuentos del 20% en toda la colección de ropa de verano! Renueva tu armario con nuestras últimas tendencias.",
    "¡Compra un par de zapatillas deportivas y llévate el segundo par con un 50% de descuento! Ideal para mantener tu estilo activo.",
    "Hazte con tus botas favoritas a precios increíbles! Compra una bota y obtén la segunda con un 40% de descuento.",
    "¡Promoción exclusiva en camisas de vestir para hombre! Lleva 3 y paga solo 2. Ideal para lucir elegante en cualquier ocasión.",
    "¡Descuentos especiales en nuestra colección infantil! Renueva el armario de tus pequeños con descuentos de hasta el 40%."
  ];

  const marqueeContent = document.getElementById("marqueeContent");

  // Función para cargar promociones
  function loadPromotions(promociones) {
    promociones.forEach(function(promocion) {
      const span = document.createElement("span");
      span.textContent = promocion;
      if (marqueeContent) {
        marqueeContent.appendChild(span);
      }
    });
  }

  // Cargar promociones antes de iniciar la animación
  loadPromotions(promociones);

  // Iniciar animación después de cargar promociones
  startAnimation();

  // Función para iniciar la animación
  function startAnimation() {
    if (marqueeContent) {
      marqueeContent.style.animation = "marquee 50s infinite linear";
      marqueeContent.style.animationPlayState = "running";
    }
  }
});
