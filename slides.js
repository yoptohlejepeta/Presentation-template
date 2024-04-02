document.addEventListener('DOMContentLoaded', function() {
    var slidesElement = document.querySelector('.slides');

    // Load each Markdown file from the 'slides' folder
    fetchSlides('slides').then(function(slides) {
        slides.forEach(function(slide) {
            var section = document.createElement('section');
            section.setAttribute('data-markdown', slide);
            slidesElement.appendChild(section);
        });

        // Reveal.js initialization
        Reveal.initialize({
            // Add your configuration options here
        });
    });

    function fetchSlides(folder) {
        return fetch(folder)
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                return text.split('\n').filter(function(file) {
                    return file.trim().length > 0;
                }).map(function(file) {
                    return folder + '/' + file.trim();
                });
            });
    }
});