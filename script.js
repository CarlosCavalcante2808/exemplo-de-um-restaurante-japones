// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Fecha o menu mobile se estiver aberto
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Menu Hamburger Responsivo
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');

        // Animar Links
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Carrossel da Seção Hero (Imagens de Fundo)
    const carouselImages = document.querySelectorAll('.carousel-img');
    let currentImageIndex = 0;

    function changeHeroImage() {
        carouselImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        carouselImages[currentImageIndex].classList.add('active');
    }
    if (carouselImages.length > 1) {
        setInterval(changeHeroImage, 5000); // Muda a imagem a cada 5 segundos
    }


    // Abas de Menu (Menu Categories)
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active de todos os botões e categorias
            categoryBtns.forEach(b => b.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));

            // Adiciona active ao botão clicado
            btn.classList.add('active');

            // Exibe a categoria correspondente
            const targetCategory = document.querySelector(`.menu-category.${btn.dataset.category}`);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });

    // Garante que a primeira categoria esteja ativa ao carregar
    if (categoryBtns.length > 0) {
        categoryBtns[0].click();
    }


    // Carrossel de Depoimentos
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDotsContainer = document.querySelector('.carousel-dots');
    let currentTestimonialIndex = 0;

    // Cria os pontos do carrossel
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        testimonialDotsContainer.appendChild(dot);
    });

    const testimonialDots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        testimonialItems[currentTestimonialIndex].classList.remove('active');
        testimonialDots[currentTestimonialIndex].classList.remove('active');

        currentTestimonialIndex = index;

        testimonialItems[currentTestimonialIndex].classList.add('active');
        testimonialDots[currentTestimonialIndex].classList.add('active');
    }

    function nextTestimonial() {
        const nextIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        showTestimonial(nextIndex);
    }
    if (testimonialItems.length > 1) {
        setInterval(nextTestimonial, 7000); // Muda o depoimento a cada 7 segundos
    }


    // Validação de Formulário de Reservas (Exemplo Básico)
    const reservationForm = document.querySelector('.reservation-form');
    const reservationStatus = document.getElementById('reservation-status');

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita o envio padrão do formulário

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            if (name === '' || email === '' || date === '' || time === '' || guests === '') {
                reservationStatus.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                reservationStatus.classList.remove('success');
                reservationStatus.classList.add('error');
                reservationStatus.style.display = 'block';
                return;
            }

            // Simula o envio bem-sucedido
            reservationStatus.textContent = 'Sua reserva foi enviada com sucesso! Em breve entraremos em contato.';
            reservationStatus.classList.remove('error');
            reservationStatus.classList.add('success');
            reservationStatus.style.display = 'block';

            // Limpa o formulário após 3 segundos
            setTimeout(() => {
                reservationForm.reset();
                reservationStatus.style.display = 'none';
            }, 3000);

            console.log('Dados da Reserva:', { name, email, date, time, guests });
            // Aqui você integraria com um backend real para enviar os dados
        });
    }

});

// Animação dos links do nav
// Essa é a animação que é aplicada pelo JavaScript quando o menu é aberto
// Definido aqui para referência, mas a aplicação é via JS
/*
@keyframes navLinkFade {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
}
*/