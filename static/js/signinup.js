'use strict';

  const container = document.getElementById('container');
  const registerBtn = document.getElementById('register');
  const loginBtn = document.getElementById('login');

  if (container && registerBtn && loginBtn) {
    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });

    // Evento de clic para redireccionar al carrito de compras cuando se inicia sesión
    const redirectLoginButton = document.getElementById('redirectLogin');
    if (redirectLoginButton) {
      redirectLoginButton.addEventListener('click', function () {
        window.location.href = '/sections/shoppingCart.html';
      });
    }
  }
