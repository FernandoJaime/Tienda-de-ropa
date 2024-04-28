"use strict";

var scriptsCargados = false;

/* Función para cargar dinámicamente elementos HTML */
function includeHTML() {
    var elementos = document.querySelectorAll("[include-html]");
    elementos.forEach(function(elemento) {
        var archivo = elemento.getAttribute("include-html");
        if (archivo) {
            var solicitudHTTP = new XMLHttpRequest();
            solicitudHTTP.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elemento.innerHTML = this.responseText;
                        console.log("HTML cargado correctamente");
                        if (!scriptsCargados) {
                            cargarScripts(); // Llama a cargarScripts después de establecer el HTML
                            scriptsCargados = true;
                        }
                    }
                    if (this.status == 404) {
                        // Muestra un mensaje de error
                        elemento.innerHTML = "Página no encontrada.";
                    }
                }
            };

            // Abre el XMLHttpRequest con el método GET para obtener el archivo HTML de forma asíncrona
            solicitudHTTP.open("GET", archivo, true);
            solicitudHTTP.send();
        }
    });
}

/* Función para cargar dinámicamente un script JavaScript */
function cargarScript(src) {
    return new Promise(function(resolve, reject) {
        var script = document.createElement("script");
        script.src = src;
        script.onload = function() {
            console.log("Script cargado correctamente: " + src);
            resolve();
        };
        script.onerror = function(error) {
            console.error("Error al cargar el script: " + src, error);
            reject(error);
        };
        document.body.appendChild(script);
    });
}

/* Función para cargar los scripts JavaScript secuencialmente */
function cargarScripts() {
    console.log("Cargando scripts...");
    cargarScript("/static/js/header.js")
        .then(function() {
            return cargarScript("/static/js/signinup.js");
        })
        .catch(function(error) {
            console.error("Error al cargar los scripts:", error);
        });
}

/* Llama a la función includeHTML para realizar la carga dinámica */
includeHTML();
