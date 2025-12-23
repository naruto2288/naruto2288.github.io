// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Закрыть меню при клике на ссылку
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Данные для слайдера
const cars = [
    {
        image: 's-class.jpg',
        name: 'Новый Mercedes S-Class',
        description: 'Флагманский седан с инновационными технологиями'
    },
    {
        image: 'GLE.jpg',
        name: 'Mercedes GLE Coupe 2023',
        description: 'Спортивный кроссовер с обновленным дизайном'
    },
    {
        image: 'c-class.jpg',
        name: 'Mercedes C-Class AMG',
        description: 'Спортивный седан с двигателем AMG'
    },
    {
        image: 'g-class.jpg',
        name: 'Mercedes G-Class',
        description: 'Легендарный внедорожник с современными технологиями'
    },
    {
        image: 'eqc.jpg',
        name: 'Mercedes EQC',
        description: 'Электрический кроссовер с запасом хода 450 км'
    }
];

// Инициализация слайдера
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;

// Создание слайдов
function createSlides() {
    sliderTrack.innerHTML = '';
    sliderDots.innerHTML = '';
    
    cars.forEach((car, index) => {
        // Создаем слайд
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <div class="slide-info">
                <h3>${car.name}</h3>
                <p>${car.description}</p>
            </div>
        `;
        sliderTrack.appendChild(slide);
        
        // Создаем точку для навигации
        const dot = document.createElement('button');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    // Добавляем клон первого слайда в конец для бесконечной прокрутки
    const firstSlide = sliderTrack.children[0].cloneNode(true);
    sliderTrack.appendChild(firstSlide);
}

// Обновление позиции слайдера
function updateSlider() {
    const slideWidth = sliderTrack.children[0].offsetWidth;
    sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    // Обновляем активную точку
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentSlide % cars.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Переход к определенному слайду
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Следующий слайд
function nextSlide() {
    currentSlide++;
    sliderTrack.style.transition = 'transform 0.5s ease';
    
    if (currentSlide >= sliderTrack.children.length - 1) {
        // Когда доходим до клона, переключаемся на начало без анимации
        setTimeout(() => {
            sliderTrack.style.transition = 'none';
            currentSlide = 0;
            updateSlider();
        }, 500);
    }
    
    updateSlider();
}

// Предыдущий слайд
function prevSlide() {
    if (currentSlide <= 0) {
        // Переключаемся на клон в начале
        sliderTrack.style.transition = 'none';
        currentSlide = sliderTrack.children.length - 1;
        updateSlider();
        
        // Анимация перехода к предыдущему слайду
        setTimeout(() => {
            sliderTrack.style.transition = 'transform 0.5s ease';
            currentSlide--;
            updateSlider();
        }, 10);
    } else {
        currentSlide--;
        updateSlider();
    }
}

// Кнопки навигации
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Обработка формы
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        model: document.getElementById('model').value,
        message: document.getElementById('message').value
    };
    
    // В реальном проекте здесь была бы отправка на сервер
    alert(`Спасибо, ${formData.name}! Ваша заявка на тест-драйв модели ${formData.model || 'Mercedes'} принята. Мы свяжемся с вами по телефону ${formData.phone}.`);
    
    // Очищаем форму
    contactForm.reset();
});

// Инициализация
createSlides();

// Обновляем слайдер при изменении размера окна
window.addEventListener('resize', updateSlider);

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});