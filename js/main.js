
(() => {
  'use strict';

  const CONFIG = {
    whatsapp: '5492964600490',
    whatsappMessage: 'Hola Mateo, quiero consultar por contrataciones.',
    instagram: 'mateo.nalda',

venueCategories: [
      {
        title: 'Buenos Aires',
        venues: [
          'Cruza Recoleta', 'Cruza Polo', 'La Mala Pub', 'The Laundry Soho',
          'Behind Palermo', 'Kika Club', 'Bayside', 'Brandy San Isidro',
          'Abraham', 'Distrito Federal Bar', 'Burro Bar', 'Heart Costanera',
          'Podesta', 'La Tincho Fierro', 'Tamarisco', 'Fiebre Fiesta',
          'Zegre', 'Renee', 'Enero Costanera', 'Caix', 'Darren Adrogue',
          'Porto Soho', 'Cobra', 'Mil Vidas', 'Costa 7070', 'Aribau',
          'Maldini', 'Archi Club'
        ]
      },
      {
        title: 'Interior',
        venues: [
          'Luxx — Villa Carlos Paz',
          'Living — Ushuaia',
          'Level — Río Grande',
          'La Morena — Río Grande',
          'Valhalla — Saladillo',
          'Yes! — Santa Rosa',
          'Vacilon — Santa Rosa',
          'Búnker — Azul',
          'Sirius — Laprida'
        ]
      },
      {
        title: 'Eventos Destacados',
        venues: [
          'After Polo × Palermo Polo',
          'La Voz Argentina × Jecan',
          'La Sirenita El Show × Jecan',
          'Matías Bottero × Jecan',
          'Legalmente Rubia × Jecan',
          'Luzu TV × Jecan',
          'Tigre Rugby Fiestas',
          'Cerro Castor × Corona',
          'Cerro Castor After Ski'
        ]
      }
    ],

    loaderDuration: 1800, // ms
  };


  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const loader        = $('#loader');
  const carouselTrack = $('#carouselTrack');
  const btnTrayectoria    = $('#btnTrayectoria');
  const modal         = $('#modalTrayectoria');
  const modalClose    = $('#modalClose');
  const venuesList    = $('#venuesList');

  const initLoader = () => {
    document.body.style.overflow = 'hidden';

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, CONFIG.loaderDuration);
    });
  };

  
const initCarousel = () => {
    const cards = carouselTrack.querySelectorAll('.carousel-card');
    const cardCount = cards.length;

    for (let i = 0; i < 4; i++) {
      cards.forEach((card) => {
        carouselTrack.appendChild(card.cloneNode(true));
      });
    }

    carouselTrack.style.setProperty('--card-count', cardCount);
  };

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

const renderVenues = () => {
    venuesList.innerHTML = CONFIG.venueCategories
      .map((cat) => `
        <div class="venues__category">
          <h4 class="venues__cat-title">${escapeHTML(cat.title)}</h4>
          <div class="venues__cat-grid">
            ${cat.venues.map((v) => `
              <div class="venue-card">
                <p class="venue-card__name">${escapeHTML(v)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `)
      .join('');
  };  

  const initModal = () => {
    const openModal = () => {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const focusable = modal.querySelectorAll('button, a, [tabindex]');
      if (focusable.length) focusable[0].focus();
    };

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      btnTrayectoria.focus();
    };

    btnTrayectoria.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  };

  const initRiderModal = () => {
    const btnRider = $('#btnRider');
    const modalRider = $('#modalRider');
    const riderClose = $('#riderClose');

  const openRider = () => {
      modalRider.classList.add('open');
      modalRider.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      riderClose.focus();
    };

  const closeRider = () => {
      modalRider.classList.remove('open');
      modalRider.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      btnRider.focus();
    };

    btnRider.addEventListener('click', openRider);
    riderClose.addEventListener('click', closeRider);
    modalRider.addEventListener('click', (e) => {
      if (e.target === modalRider) closeRider();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalRider.classList.contains('open')) {
        closeRider();
      }
    });
  };

  const initLightbox = () => {
    const lightbox = $('#lightbox');
    const lightboxImg = $('#lightboxImg');
    const lightboxClose = $('#lightboxClose');

    document.addEventListener('click', (e) => {
      const galleryImg = e.target.closest('.modal-gallery__item img');
      if (galleryImg) {
        lightboxImg.src = galleryImg.src;
        lightboxImg.alt = galleryImg.alt || 'Foto ampliada';
        lightbox.classList.add('open');
      }
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  };

  const initImageFallbacks = () => {
    document.querySelectorAll('img[data-fallback]').forEach((img) => {
      const applyFallback = () => {
        if (!img.dataset.failed) {
          img.dataset.failed = 'true';
          img.src = img.dataset.fallback;
        }
      };

      img.addEventListener('error', applyFallback);

      if (img.complete && img.naturalWidth === 0) {
        applyFallback();
      }
    });
  };

  const sanitizeLinks = () => {
    $$('a[target="_blank"]').forEach((link) => {
      link.setAttribute('rel', 'noopener noreferrer');
    });
  };

const init = () => {
    initLoader();
    initCarousel();
    initScrollReveal();
    renderVenues();
    initModal();
    initRiderModal();
    initLightbox();
    initImageFallbacks();
    sanitizeLinks();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
