const swiper = new Swiper('.i-hero__swiper', {
    loop: true,
    pagination: {
        el: '.i-hero__swiper-pagination',
    },
});

document.addEventListener("DOMContentLoaded", function() {
    var numElements = document.querySelectorAll(".i-stats__num");

    var options = {
        threshold: 0.5 // Порог видимости элемента (от 0 до 1)
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                numElements.forEach(function(element) {
                    var targetValue = parseInt(element.textContent);
                    animateValue(element, 0, targetValue, 1000);
                    element.style.opacity = 1; // Показываем элемент после начала анимации
                });

                observer.disconnect(); // Отключаем наблюдение после первого срабатывания
            }
        });
    }, options);

    observer.observe(document.querySelector(".i-stats"));
    
    function animateValue(element, start, end, duration) {
        var range = end - start;
        var startTime = new Date().getTime();

        function update() {
            var currentTime = new Date().getTime();
            var progress = Math.min((currentTime - startTime) / duration, 1);
            var value = start + progress * range;

            element.textContent = Math.round(value);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        update();
    }
});

document.querySelector('.i-header__burger').addEventListener('click', function() {
    document.querySelector('.i-header__menu').classList.toggle('show');
});
