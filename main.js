document.addEventListener('DOMContentLoaded', function() {
    const scrollProgressIndicator = document.getElementById('scroll-progress-indicator');
    const increaseFontButton = document.getElementById('increase-font');
    const decreaseFontButton = document.getElementById('decrease-font');
    const themeToggle = document.getElementById('theme-toggle');
    const bodyElement = document.querySelector('body');
    const defaultFontSize = parseFloat(window.getComputedStyle(bodyElement).fontSize);
    const step = 2;
    const minFontSize = 11;
    const maxFontSize = 22; 
    const fontSizeStorageKey = 'fontSizePreference';
    const themeStorageKey = 'themePreference';
    const lightThemeScrollColor = '#FF0000';
    const darkThemeScrollColor = '#80cfff';
    let timeoutId;

    // Funzionalità indicatore di scorrimento
    scrollProgressIndicator.style.opacity = '0.2';
    window.addEventListener('scroll', function() {
        scrollProgressIndicator.style.opacity = '1';
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgressIndicator.style.width = scrollPercentage + '%';
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            scrollProgressIndicator.style.opacity = '0.2';
        }, 500);
    });

    // Funzioni per salvare e caricare la dimensione del testo
    function saveFontSize(fontSize) {
        localStorage.setItem(fontSizeStorageKey, fontSize);
    }

    function loadFontSize() {
        const storedFontSize = localStorage.getItem(fontSizeStorageKey);
        if (storedFontSize) {
            bodyElement.style.fontSize = storedFontSize;
        }
    }

    // Funzioni per salvare e caricare il tema
    function saveTheme(theme) {
        localStorage.setItem(themeStorageKey, theme);
    }

    function loadTheme() {
        const storedTheme = localStorage.getItem(themeStorageKey);
        if (storedTheme === 'dark') {
            bodyElement.classList.add('dark-theme');
            themeToggle.textContent = 'Tema chiaro ☀️';
            scrollProgressIndicator.style.backgroundColor = darkThemeScrollColor;
        } else {
            bodyElement.classList.remove('dark-theme');
            themeToggle.textContent = 'Tema scuro 🌘';
            scrollProgressIndicator.style.backgroundColor = lightThemeScrollColor;
        }
    }

    // Carica le preferenze all'avvio
    loadFontSize();
    loadTheme();

    // Event listener per aumentare la dimensione del testo
    increaseFontButton.addEventListener('click', function() {
        let currentFontSize = parseFloat(window.getComputedStyle(bodyElement).fontSize);
        if (currentFontSize < maxFontSize) {
            const newFontSize = (currentFontSize + step) + 'px';
            bodyElement.style.fontSize = newFontSize;
            saveFontSize(newFontSize);
        }
    });

    // Event listener per diminuire la dimensione del testo
    decreaseFontButton.addEventListener('click', function() {
        let currentFontSize = parseFloat(window.getComputedStyle(bodyElement).fontSize);
        if (currentFontSize > minFontSize) {
            const newFontSize = (currentFontSize - step) + 'px';
            bodyElement.style.fontSize = newFontSize;
            saveFontSize(newFontSize);
        }
    });

    // Event listener per cambiare il tema
    themeToggle.addEventListener('click', function() {
        bodyElement.classList.toggle('dark-theme');
        const isDarkMode = bodyElement.classList.contains('dark-theme');
        saveTheme(isDarkMode ? 'dark' : 'light');
        themeToggle.textContent = isDarkMode ? 'Tema chiaro ☀️' : 'Tema scuro 🌘';
        scrollProgressIndicator.style.backgroundColor = isDarkMode ? darkThemeScrollColor : lightThemeScrollColor;
    });
});



document.addEventListener('DOMContentLoaded', function() {
  

    const starRatingContainer = document.querySelector('.star-rating');
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingMessage = document.getElementById('rating-message');
    let currentRating = 0;

    if (starRatingContainer && stars && ratingMessage) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                currentRating = rating;
                highlightStars(rating);
                ratingMessage.textContent = `Hai valutato l'accessibilità con ${rating} stelle. Grazie!`;
                // Qui si potrebbe aggiungere codice per inviare la valutazione (ad es., tramite un'API)
            });

            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.dataset.rating);
                highlightStars(rating, true); // Evidenzia le stelle al passaggio del mouse
            });

            star.addEventListener('mouseout', function() {
                highlightStars(currentRating); // Ripristina l'evidenziazione alla valutazione corrente
            });

            // Gestione dell'accessibilità da tastiera
            star.setAttribute('tabindex', '0');
            star.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    const rating = parseInt(this.dataset.rating);
                    currentRating = rating;
                    highlightStars(rating);
                    ratingMessage.textContent = `Hai valutato l'accessibilità con ${rating} stelle. Grazie!`;
                    // Anche qui si potrebbe aggiungere del codice per inviare la valutazione
                }
            });
        });

        function highlightStars(rating, isHover = false) {
            stars.forEach(star => {
                const starRating = parseInt(star.dataset.rating);
                if (starRating <= rating) {
                    star.textContent = '★'; // Stellina piena
                    star.classList.add('filled');
                } else {
                    star.textContent = '☆'; // Stellina vuota
                    star.classList.remove('filled');
                }
            });
        }

        
        highlightStars(currentRating);
    }
});
