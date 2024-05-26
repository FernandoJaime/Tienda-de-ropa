/////////////// INICIO DE SESION ///////////////

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

  // Evento de click para redireccionar al carrito de compras cuando se inicia sesión
  const redirectLoginButton = document.getElementById('redirectLogin');
  if (redirectLoginButton) {
    redirectLoginButton.addEventListener('click', function () {
      if (validoIniciar()) {
        window.location.href = '../sections/shoppingCart.html';
      }
    });
  }
}

// Iniciar sesión
function validoIniciar() {
  
  // iniciar sesión tiene: email y contraseña
  let email = document.querySelector("#init-email").value;
  let format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de email
  let pass = document.querySelector("#init-pass").value;

  if (email.trim() === '' || pass.trim() === '') { // valido campos vacíos
    mostrar('#F-init-campos', 'Debes completar todos los campos');
    return false;
  } else {
    if (!format.test(email)) { // valido formato email
      mostrar('#F-email', 'El email no tiene el formato valido');
      return false;
    } 
    if (pass.length < 8) { // valido caracteres de la contraseña
      mostrar('#F-pass', 'La contraseña debe tener al menos 8 caracteres');
      return false;
    }
  }
  return true;
}

// Función para mostrar el mensaje por un cierto tiempo nomas.
function mostrar(selector, mensaje) {
  const elemento = document.querySelector(selector);
  elemento.innerHTML = mensaje; // Tomo el mensaje que pongo en el HTML

  // setTimeout ejecuta el innerHTML vacío al div que pase por parámetro luego de 10 segundos (10000 ms)
  setTimeout(() => { elemento.innerHTML = ''; }, 10000);
}

// Función para borrar los div de error cuando se escribe en los inputs
document.querySelector("#init-email").addEventListener('input', function() { // para el mail
  document.querySelector('#F-email').innerHTML = '';
  document.querySelector('#F-init-campos').innerHTML = '';
});

document.querySelector("#init-pass").addEventListener('input', function() { // Para la contraseña
  document.querySelector('#F-pass').innerHTML = '';
  document.querySelector('#F-init-campos').innerHTML = '';
});

/////////////// CREAR CUENTA ///////////////
const CreateCuen = document.getElementById('CrearCuenta');


// Funcion para asegurarme que no pase el iniciar sesion sin antes validar 
CreateCuen.addEventListener('click', function(event){
    event.preventDefault(); // Comportamiento predeterminado del formulario
    if (validoCrear()){
        console.log("Crear cuenta con exito");
        window.location.href = '../sections/signinup.html'; 
    }
});

// Recuperar
function validoCrear(){

    // crear cuenta tiene: nombre, dni, email, pass, un checkbox
    let name = document.querySelector("#fullName").value;
    let dni = document.querySelector("#dni").value;
    let mail = document.querySelector("#email").value;
    let formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular
    let pass = document.querySelector("#password").value;
    let check = document.querySelector("#terminos").checked;

    if (name.trim() == '' || dni.trim() == '' || mail.trim() == '' || pass.trim() == ''){ // valido campos vacios
        mostrar('#F-crear-campos', 'Debes completar todos los campos para continuar');
        return false;
    } else {
      if (/\d/.test(name)) { // valido que el nombre no tenga numeros
        mostrar('#F-NameCrear', 'El nombre no puede contener numeros');
        return false;
      }
      if (name.length <= 3) {
        mostrar('#F-NameCrear', 'El nombre debe tener mas de 3 caracteres');
        return false;
      }
      if (dni.toString().length !== 8) { // valido que el dni tenga 8 caracteres
          mostrar('#F-dniCrear', 'El DNI debe tener 8 caracteres');
          return false;
      }
      if (!formato.test(mail)){ // valido formato email
          mostrar('#F-emailCrear', 'El email no tiene el formato valido');
          return false;
      }
      if (pass.length < 8) {  // valido caracteres de la contraseña
          mostrar('#F-passCrear', 'La contraseña debe tener al menos 8 caracteres');
          return false;
      }
      if (!check) { // valido el checkbox
          mostrar('#F-Check', 'Debes aceptar los terminos y condiciones para crear una cuenta');
          return false;
      }
    }
    return true;
};

// Función para mostrar el mensaje y hacerle un temporizador
function mostrar(selector, mensaje) {
    const elemento = document.querySelector(selector);
    elemento.innerHTML = mensaje; 
    elemento.classList.add('error-message');
    setTimeout(() => {
      elemento.textContent = '';
      elemento.classList.remove('error-message'); 
    }, 10000); 
}

// Funcion para borrar los div de error cuando se escribe en los inputs
document.querySelector("#fullName").addEventListener('input', function() { 
    document.querySelector('#F-NameCrear').innerHTML = '';
    document.querySelector('#F-crear-campos').innerHTML = '';
});
document.querySelector("#dni").addEventListener('input', function() { 
  document.querySelector('#F-dniCrear').innerHTML = '';
  document.querySelector('#F-crear-campos').innerHTML = '';
});
document.querySelector("#email").addEventListener('input', function() { 
  document.querySelector('#F-emailCrear').innerHTML = '';
  document.querySelector('#F-crear-campos').innerHTML = '';
});
document.querySelector("#password").addEventListener('input', function() { 
  document.querySelector('#F-passCrear').innerHTML = '';
  document.querySelector('#F-crear-campos').innerHTML = '';
});
document.querySelector("#terminos").addEventListener('input', function() { 
  document.querySelector('#F-Check').innerHTML = '';
  document.querySelector('#F-crear-campos').innerHTML = '';
});