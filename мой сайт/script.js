// Слайдер
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

// Инициализация слайдера
function initSlider() {
    // Начинаем автоматическое переключение слайдов
    startSlideInterval();
    
    // Добавляем обработчики событий для кнопок
    prevButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);
    
    // Добавляем обработчики событий для точек
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
    
    // Останавливаем автоматическое переключение при наведении на слайдер
    slider.addEventListener('mouseenter', stopSlideInterval);
    slider.addEventListener('mouseleave', startSlideInterval);
}

// Показать предыдущий слайд
function showPreviousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

// Показать следующий слайд
function showNextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

// Перейти к конкретному слайду
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

// Обновить отображение слайдера
function updateSlider() {
    // Перемещаем слайдер
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Обновляем активную точку
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Сбрасываем интервал
    resetSlideInterval();
}

// Начать автоматическое переключение слайдов
function startSlideInterval() {
    slideInterval = setInterval(showNextSlide, 5000);
}

// Остановить автоматическое переключение слайдов
function stopSlideInterval() {
    clearInterval(slideInterval);
}

// Сбросить интервал
function resetSlideInterval() {
    stopSlideInterval();
    startSlideInterval();
}

// Викторина
const quizData = [
    {
        question: "В каком году был основан бренд Miu Miu?",
        options: ["1983", "1993", "2003", "2013"],
        correct: 2
    },
    {
        question: "Кто является основательницей Miu Miu?",
        options: ["Донателла Версаче", "Миучча Прада", "Анна Винтур", "Коко Шанель"],
        correct: 2
    },
    {
        question: "В какой стране был основан бренд?",
        options: ["Франция", "Италия", "США", "Великобритания"],
        correct: 2
    },
    {
        question: "Как переводится название Miu Miu?",
        options: ["Моя моя", "Это прозвище основательницы", "Модная мода", "Маленькая мушка"],
        correct: 2
    },
    {
        question: "Какой бренд является основным для Миуччи Прады?",
        options: ["Gucci", "Prada", "Versace", "Chanel"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
const questionText = document.getElementById('question-text');
const quizOptions = document.querySelectorAll('.quiz-option');
const quizFeedback = document.getElementById('quiz-feedback');
const nextQuestionBtn = document.getElementById('next-question');
const restartQuizBtn = document.getElementById('restart-quiz');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');

// Инициализация викторины
function initQuiz() {
    totalQuestionsElement.textContent = quizData.length;
    loadQuestion();
    
    // Добавляем обработчики событий для вариантов ответов
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedOption = parseInt(this.getAttribute('data-option'));
            checkAnswer(selectedOption);
        });
    });
    
    // Обработчик для кнопки "Следующий вопрос"
    nextQuestionBtn.addEventListener('click', function() {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
            resetOptions();
            quizFeedback.textContent = '';
            nextQuestionBtn.style.display = 'none';
        } else {
            showFinalResults();
        }
    });
    
    // Обработчик для кнопки "Начать заново"
    restartQuizBtn.addEventListener('click', restartQuiz);
}

// Загрузить вопрос
function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionText.textContent = currentQuizData.question;
    
    quizOptions.forEach((option, index) => {
        option.textContent = currentQuizData.options[index];
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
    });
    
    nextQuestionBtn.style.display = 'none';
}

// Проверить ответ
function checkAnswer(selectedOption) {
    const correctOption = quizData[currentQuestion].correct;
    
    // Отключаем все варианты ответов
    quizOptions.forEach(option => {
        option.disabled = true;
    });
    
    // Показываем правильный и неправильный ответы
    quizOptions.forEach((option, index) => {
        if (index + 1 === correctOption) {
            option.classList.add('correct');
        } else if (index + 1 === selectedOption && selectedOption !== correctOption) {
            option.classList.add('incorrect');
        }
    });
    
    // Проверяем, правильный ли ответ
    if (selectedOption === correctOption) {
        score++;
        scoreElement.textContent = score;
        quizFeedback.textContent = "Правильно!";
        quizFeedback.style.color = "#4CAF50";
    } else {
        quizFeedback.textContent = `Неправильно. Правильный ответ: ${quizData[currentQuestion].options[correctOption-1]}`;
        quizFeedback.style.color = "#F44336";
    }
    
    // Показываем кнопку "Следующий вопрос"
    nextQuestionBtn.style.display = 'inline-block';
}

// Сбросить варианты ответов
function resetOptions() {
    quizOptions.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
    });
}

// Показать финальные результаты
function showFinalResults() {
    questionText.textContent = `Викторина завершена! Вы ответили правильно на ${score} из ${quizData.length} вопросов.`;
    
    // Скрываем варианты ответов и кнопку "Следующий вопрос"
    document.querySelector('.quiz-options').style.display = 'none';
    nextQuestionBtn.style.display = 'none';
    
    // Показываем сообщение в зависимости от результата
    let message = "";
    if (score === quizData.length) {
        message = "Отлично! Вы настоящий эксперт по Miu Miu!";
    } else if (score >= quizData.length / 2) {
        message = "Хороший результат! Вы много знаете о бренде.";
    } else {
        message = "Попробуйте еще раз, чтобы узнать больше о Miu Miu!";
    }
    
    quizFeedback.textContent = message;
    quizFeedback.style.color = "#8a6d3b";
}

// Начать викторину заново
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = score;
    
    // Восстанавливаем отображение вариантов ответов
    document.querySelector('.quiz-options').style.display = 'grid';
    
    loadQuestion();
    quizFeedback.textContent = '';
}

// Форма подписки
const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // В реальном приложении здесь был бы код для отправки данных на сервер
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        
        // Показываем сообщение об успехе
        alert(`Спасибо, ${name}! Вы успешно подписались на новости Miu Miu.`);
        
        // Очищаем форму
        this.reset();
    });
}

// Кнопка "Наверх"
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Плавная прокрутка к якорям
document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initQuiz();
    
    // Анимация при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за секциями для анимации
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});