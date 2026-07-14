const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => observer.observe(section));

const quoteCarousel = document.querySelector('.quote-carousel');
if (quoteCarousel) {
  const quoteTrack = quoteCarousel.querySelector('.quote-track');
  const slides = [...quoteCarousel.querySelectorAll('.quote-slide')];
  const prevButton = quoteCarousel.querySelector('.carousel-control.prev');
  const nextButton = quoteCarousel.querySelector('.carousel-control.next');
  const dotsContainer = quoteCarousel.querySelector('.carousel-dots');
  let currentIndex = 0;
  let autoplayTimer = null;

  const updateSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    quoteTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === currentIndex);
    });
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = window.setInterval(() => updateSlide(currentIndex + 1), 5000);
  };

  const stopAutoplay = () => {
    if (autoplayTimer !== null) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Show quote ${index + 1}`);
    dot.addEventListener('click', () => {
      updateSlide(index);
      startAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  prevButton.addEventListener('click', () => {
    updateSlide(currentIndex - 1);
    startAutoplay();
  });

  nextButton.addEventListener('click', () => {
    updateSlide(currentIndex + 1);
    startAutoplay();
  });

  quoteCarousel.addEventListener('mouseenter', stopAutoplay);
  quoteCarousel.addEventListener('mouseleave', startAutoplay);

  updateSlide(0);
  startAutoplay();
}
