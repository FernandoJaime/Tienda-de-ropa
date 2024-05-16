(function() {
    // Función para inicializar el carrusel
    function initializeCarousel() {
        var slideIndex = 0;

        function showSlides() {
            var slides = document.getElementsByClassName("slide");
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            slides[slideIndex].style.display = "block";
            setTimeout(showSlides, 3000);
        }

        showSlides(); // Llama a la función showSlides al cargar la página
    }

    // Llamar a la función para inicializar el carrusel al cargar la página
    document.addEventListener("DOMContentLoaded", function() {
        initializeCarousel();
    });
})();
