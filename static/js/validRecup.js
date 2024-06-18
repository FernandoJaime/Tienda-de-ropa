// Tomo los botones que necesito
const RecupContra = document.getElementById('RecuperarContra');


// Funcion para asegurarme que no pase el iniciar sesion sin antes validar 
RecupContra.addEventListener('click', function(event){
    event.preventDefault(); // Comportamiento predeterminado del formulario
    if (validoRecup()){
        console.log("Recuperar clave con exito");
        window.location.href = '../sections/signinup.html'; // Redirecciono al inicio de sesion despues de recupero exitoso
    }
});

// Recuperar
function validoRecup(){

    // recuperar tiene: email
    let email = document.querySelector("#recup-email").value;
    let format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de email

    if (email.trim() == ''){ // valido campos vacios
        mostrar('#F-CampoRecup', 'Debes completar el email para continuar');
        return false;
    } else 
    if (!format.test(email)){ // valido formato email
        mostrar('#F-RecuEmail', 'El email no tiene el formato valido');
        return false;
    } 
    return true;
};

// Función para mostrar el mensaje y hacerle un temporizador
function mostrar(selector, mensaje) {
    const elemento = document.querySelector(selector);
    elemento.innerHTML = mensaje; // Tomo el mensaje que pongo en el HTML

    setTimeout(() => {elemento.innerHTML = ''; }, 10000); 
}

// Funcion para borrar los div de error cuando se escribe en los inputs
document.querySelector("#recup-email").addEventListener('input', function() { 
    document.querySelector('#F-RecuEmail').innerHTML = '';
    document.querySelector('#F-CampoRecup').innerHTML = '';
});