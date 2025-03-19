document.addEventListener('DOMContentLoaded', function() {
    function toHex(color) {
        if (color.startsWith('#')) {
            return color.slice(1);
        }
        if (color.startsWith('rgb')) {
            const values = color.substring(color.indexOf('(') + 1, color.indexOf(')')).split(',');
            const r = parseInt(values[0].trim()).toString(16).padStart(2, '0');
            const g = parseInt(values[1].trim()).toString(16).padStart(2, '0');
            const b = parseInt(values[2].trim()).toString(16).padStart(2, '0');
            return r + g + b;
        }
        return null;
    }

    function checkContrast(element) {
        const computedStyle = window.getComputedStyle(element);
        const foregroundColor = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;

        const hexForegroundColor = toHex(foregroundColor);
        const hexBackgroundColor = toHex(backgroundColor);

        if (hexForegroundColor && hexBackgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            const apiUrl = `https://webaim.org/resources/contrastchecker/?fcolor=${hexForegroundColor}&bcolor=${hexBackgroundColor}&api`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    let elementIdentifier = element.tagName;
                    if (element.id) {
                        elementIdentifier += `#${element.id}`;
                    }
                    if (element.className) {
                        elementIdentifier += `.${element.className.split(' ').join('.')}`;
                    }
                    const textContentSnippet = element.textContent.trim().substring(0, 30) + (element.textContent.trim().length > 30 ? '...' : '');

                    const outputString = `Element: ${elementIdentifier} | Text: "${textContentSnippet}" | FG: ${foregroundColor} (#${hexForegroundColor}) | BG: ${backgroundColor} (#${hexBackgroundColor}) | Ratio: ${data.ratio} | AA Norm: ${data.AA} | AAA Norm: ${data.AAA} | AA Large: ${data.AALarge} | AAA Large: ${data.AAALarge}`;
                    console.log(outputString);
                })
                .catch(error => {
                    console.error('Errore nel recupero del contrasto per', element, error);
                });
        }
    }

    const allElements = document.querySelectorAll('*'); // Seleziona ogni elemento della pagina

    allElements.forEach(element => {
        console.log('------------------------------'); // Separatore per ogni elemento
        checkContrast(element);
    });
});
