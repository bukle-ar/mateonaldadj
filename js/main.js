/**
 * ═══════════════════════════════════════
 *  MATEO NALDA — DJ Website
 *  main.js — Core application logic
 * ═══════════════════════════════════════
 */

(() => {
  'use strict';

  /* ─────────────────────────────────────
     CONFIGURACIÓN CENTRAL
     Toda la data editable está acá para
     facilitar futura administración.
  ───────────────────────────────────── */
  const CONFIG = {
    whatsapp: '5491100000000',
    whatsappMessage: 'Hola Mateo, quiero consultar por contrataciones',
    instagram: 'mateonalda',

    venues: [
      { name: 'Crobar', location: 'Buenos Aires' },
      { name: 'Mandarine', location: 'Buenos Aires' },
      { name: 'Niceto Club', location: 'Buenos Aires' },
      { name: 'La Estación', location: 'Córdoba' },
      { name: 'Club Bahrein', location: 'Buenos Aires' },
      { name: 'Avant Garden', location: 'Buenos Aires' },
      { name: 'Privilege', location: 'Mar del Plata' },
      { name: 'La Casa del Árbol', location: 'Mendoza' },
      { name: 'Rosario Beach Club', location: 'Rosario' },
      { name: 'Under Club', location: 'Buenos Aires' },
      { name: 'Terrazas del Este', location: 'Buenos Aires' },
      { name: 'Cosquín Rock', location: 'Córdoba' },
    ],

    slideCount: 5,
    carouselSpeed: 30, // seconds per full cycle
    loaderDuration: 1800, // ms
  };


  /* ─────────────────────────────────────
     UTILIDADES
  ───────────────────────────────────── */
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  /**
   * Escapa HTML para prevenir XSS al insertar
   * contenido dinámico en el DOM.
   */
  const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };


  /* ─────────────────────────────────────
     DOM REFERENCES
  ───────────────────────────────────── */
  const loader        = $('#loader');
  const header        = $('#header');
  const carouselTrack = $('#carouselTrack');
  const indicators    = $$('.carousel-indicators__dot');
  const btnTrayectoria    = $('#btnTrayectoria');
  const footerTrayectoria = $('#footerTrayectoria');
  const modal         = $('#modalTrayectoria');
  const modalClose    = $('#modalClose');
  const venuesList    = $('#venuesList');


  /* ─────────────────────────────────────
     LOADER
  ───────────────────────────────────── */
  const initLoader = () => {
    document.body.style.overflow = 'hidden';

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, CONFIG.loaderDuration);
    });
  };


  /* ─────────────────────────────────────
     CAROUSEL
  ───────────────────────────────────── */
  const initCarousel = () => {
    // Duplicar slides para loop infinito
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      carouselTrack.appendChild(clone);
    });

    carouselTrack.style.setProperty('--slide-count', CONFIG.slideCount);

    // Tracking del slide activo para indicadores
    let currentSlide = 0;

    const updateIndicator = () => {
      const trackRect = carouselTrack.getBoundingClientRect();
      const offset = Math.abs(trackRect.left);
      const slideWidth = window.innerWidth;
      currentSlide = Math.floor((offset / slideWidth) % CONFIG.slideCount);

      indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    };

    setInterval(updateIndicator, 500);

    // Click en indicador para saltar a slide
    indicators.forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index, 10);

        carouselTrack.style.animation = 'none';
        void carouselTrack.offsetHeight; // force reflow
        carouselTrack.style.transform = `translateX(-${idx * 100}vw)`;

        setTimeout(() => {
          carouselTrack.style.transform = '';
          carouselTrack.style.animation = `carouselScroll ${CONFIG.carouselSpeed}s linear infinite`;
        }, 3000);
      });
    });
  };


  /* ─────────────────────────────────────
     HEADER SCROLL BEHAVIOR
  ───────────────────────────────────── */
  const initHeaderScroll = () => {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  };


  /* ─────────────────────────────────────
     SCROLL REVEAL (Intersection Observer)
  ───────────────────────────────────── */
  const initScrollReveal = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    $$('.reveal').forEach((el) => observer.observe(el));
  };


  /* ─────────────────────────────────────
     VENUES RENDER
  ───────────────────────────────────── */
  const renderVenues = () => {
    venuesList.innerHTML = CONFIG.venues
      .map((v) => `
        <div class="venue-card">
          <p class="venue-card__name">${escapeHTML(v.name)}</p>
          <p class="venue-card__location">${escapeHTML(v.location)}</p>
        </div>
      `)
      .join('');
  };


  /* ─────────────────────────────────────
     MODAL (Trayectoria)
  ───────────────────────────────────── */
  const initModal = () => {
    const openModal = () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Focus trap: mover focus al primer elemento interactivo
      const focusable = modal.querySelectorAll('button, a, [tabindex]');
      if (focusable.length) focusable[0].focus();
    };

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      btnTrayectoria.focus();
    };

    // Event listeners
    btnTrayectoria.addEventListener('click', openModal);

    footerTrayectoria.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    modalClose.addEventListener('click', closeModal);

    // Cerrar al hacer click fuera del contenido
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  };


  /* ─────────────────────────────────────
     SECURITY: Sanitize external links
  ───────────────────────────────────── */
  const sanitizeLinks = () => {
    $$('a[target="_blank"]').forEach((link) => {
      link.setAttribute('rel', 'noopener noreferrer');
    });
  };


  /* ─────────────────────────────────────
     INIT — Arranque de toda la aplicación
  ───────────────────────────────────── */
  const init = () => {
    initLoader();
    initCarousel();
    initHeaderScroll();
    initScrollReveal();
    renderVenues();
    initModal();
    sanitizeLinks();
  };

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
