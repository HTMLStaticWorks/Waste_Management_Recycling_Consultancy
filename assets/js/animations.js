/**
 * GSAP Reveals, Metric Counters, and Canvas Dashboard Charts
 */

document.addEventListener('DOMContentLoaded', () => {
  initGSAPReveal();
  initMetricCounters();
});

/* Safe GSAP Scroll Animations Setup */
function initGSAPReveal() {
  if (typeof gsap !== 'undefined') {
    // Register scroll trigger if loaded
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Reveal headers & heroes
    gsap.fromTo('.gsap-reveal-hero', 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    // Grid reveals on scroll
    const scrollSections = document.querySelectorAll('.gsap-scroll-fade');
    scrollSections.forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  } else {
    // GSAP fallback: immediately show reveals
    document.querySelectorAll('.gsap-reveal-hero, .gsap-scroll-fade').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
}

/* Metric Counter Animation */
function initMetricCounters() {
  const counters = document.querySelectorAll('.counter-val');
  
  const animateCounter = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const speed = counter.getAttribute('data-speed') ? parseInt(counter.getAttribute('data-speed')) : 100;
    const isFloat = counter.getAttribute('data-float') === 'true';
    let current = 0;
    const increment = target / speed;
    
    const update = () => {
      current += increment;
      if (current < target) {
        counter.innerText = isFloat ? current.toFixed(1) : Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.innerText = isFloat ? target.toFixed(1) : target;
      }
    };
    update();
  };

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}
