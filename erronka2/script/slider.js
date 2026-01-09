// JavaScript para el slider nuevo funcional
console.log("Slider JS cargado - Versión nueva");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado - Iniciando slider nuevo");
    
    const slider = document.querySelector('.nuevo-slider');
    const slides = document.querySelectorAll('.nuevo-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.nuevo-slider-nav-dots');
    
    // Verificar elementos
    console.log("Elementos encontrados:", {
        slider: !!slider,
        slides: slides.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dotsContainer: !!dotsContainer
    });
    
    if (!slider || slides.length === 0) {
        console.log("Slider nuevo no encontrado, no es necesario inicializar");
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Crear puntos de navegación
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        for(let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
            
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                console.log("Punto clickeado, índice:", index);
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if(index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function goToSlide(n) {
        console.log("Ir al slide:", n);
        
        // Asegurar que el índice esté dentro de los límites
        currentSlide = n;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;
        
        // Mover el slider
        const translateX = -(currentSlide * 100);
        slider.style.transform = `translateX(${translateX}%)`;
        
        console.log("Slider movido a:", translateX + "%");
        updateDots();
    }
    
    function nextSlide() {
        console.log("Siguiente slide");
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        console.log("Slide anterior");
        goToSlide(currentSlide - 1);
    }
    
    // Inicializar puntos
    createDots();
    
    // Event listeners para flechas
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Flecha anterior clickeada");
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Flecha siguiente clickeada");
            nextSlide();
        });
    }
    
    // Auto-play
    let autoPlayInterval;
    
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000);
        console.log("Auto-play iniciado");
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            console.log("Auto-play detenido");
        }
    }
    
    // Iniciar auto-play
    startAutoPlay();
    
    // Pausar auto-play al interactuar
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Pausar al interactuar con controles
    if (prevBtn) {
        prevBtn.addEventListener('mouseenter', stopAutoPlay);
        prevBtn.addEventListener('mouseleave', startAutoPlay);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('mouseenter', stopAutoPlay);
        nextBtn.addEventListener('mouseleave', startAutoPlay);
    }
    
    if (dotsContainer) {
        dotsContainer.addEventListener('mouseenter', stopAutoPlay);
        dotsContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
        } else if(e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
        }
    });
    
    console.log("Slider nuevo inicializado correctamente. Slides totales:", totalSlides);
    
    // Forzar la posición inicial
    slider.style.transform = 'translateX(0%)';
});