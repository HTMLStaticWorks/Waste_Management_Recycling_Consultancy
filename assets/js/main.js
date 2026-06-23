/**
 * Waste Management & Recycling Consultancy main interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initMobileNav();
  initFAQAccordion();
  initWasteCalculator();
  initContactForm();
});

/* Sticky Navigation behavior */
function initStickyNavbar() {
  const header = document.querySelector('.navbar-custom');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page loaded scrolled
}

/* Mobile Menu Navigation & Submenu Toggle */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    
    // Toggle icon type between menu and close
    if (navMenu.classList.contains('active')) {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width: 1.5rem; height: 1.5rem;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    } else {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width: 1.5rem; height: 1.5rem;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('active');
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width: 1.5rem; height: 1.5rem;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  });

  // Mobile submenu accordion
  const parentLinks = document.querySelectorAll('.nav-item > .nav-link-custom');
  parentLinks.forEach(link => {
    const parent = link.parentElement;
    const submenu = parent.querySelector('.dropdown-custom');
    
    if (submenu) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          parent.classList.toggle('active');
        }
      });
    }
  });
}

/* FAQ Accordion Toggle */
function initFAQAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isActive = parent.classList.contains('active');
      
      // Collapse all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

/* Interactive Waste Audit Calculator */
function initWasteCalculator() {
  const calcBtn = document.getElementById('calculateBtn');
  if (!calcBtn) return;

  const sectorSelect = document.getElementById('calcSector');
  const tonnageInput = document.getElementById('calcTonnage');
  const recyclingInput = document.getElementById('calcRecycling');

  const diversionVal = document.getElementById('resultDiversion');
  const savingsVal = document.getElementById('resultSavings');
  const co2Val = document.getElementById('resultCO2');
  const certVal = document.getElementById('resultCert');

  calcBtn.addEventListener('click', () => {
    const sector = sectorSelect.value;
    const tonnage = parseFloat(tonnageInput.value) || 0;
    const recycling = parseFloat(recyclingInput.value) || 0;

    if (tonnage <= 0 || recycling < 0 || recycling > 100) {
      alert('Please enter valid facility metrics.');
      return;
    }

    // Calculators factors depending on sector
    let savingsFactor = 120; // Avg landfill cost savings per ton
    let co2Factor = 2.8;     // Avg metric tons CO2 offset per ton recycled

    if (sector === 'industrial') {
      savingsFactor = 145;
      co2Factor = 3.2;
    } else if (sector === 'hospitality') {
      savingsFactor = 98;
      co2Factor = 2.2;
    } else if (sector === 'educational') {
      savingsFactor = 85;
      co2Factor = 2.4;
    }

    // Calculations
    const potentialRecycling = Math.max(90, recycling + (100 - recycling) * 0.7); // Estimated zero-waste goal
    const increasePercentage = potentialRecycling - recycling;
    const tonnesDivertedMore = tonnage * (increasePercentage / 100);

    const landfillSavings = tonnesDivertedMore * savingsFactor * 12; // Annual Savings
    const carbonMitigation = tonnesDivertedMore * co2Factor * 12; // Annual Tons CO2 offset

    // Format outputs
    diversionVal.innerText = `${potentialRecycling.toFixed(0)}%`;
    savingsVal.innerText = `$${Math.round(landfillSavings).toLocaleString()}`;
    co2Val.innerText = `${Math.round(carbonMitigation).toLocaleString()} t`;

    // Certification level recommendation
    let certType = 'Zero-Waste Candidate';
    if (potentialRecycling >= 95) {
      certType = 'Platinum Certified';
    } else if (potentialRecycling >= 90) {
      certType = 'Gold Certified';
    } else if (potentialRecycling >= 80) {
      certType = 'Silver Certified';
    }
    
    certVal.innerText = certType;
  });
}

/* Contact and Audit Request forms */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Select parameters
      const name = document.getElementById('contactName')?.value;
      const email = document.getElementById('contactEmail')?.value;
      
      const successMsg = document.createElement('div');
      successMsg.className = 'glass-panel p-4 text-center animate-fade-in-up mt-4 border-accent';
      successMsg.style.borderColor = 'var(--accent)';
      successMsg.innerHTML = `
        <h4 class="text-gradient mb-2">Inquiry Submitted Successfully</h4>
        <p class="mb-0">Thank you, <strong>${name || 'Client'}</strong>. Our sustainability advisory team will reach out to <strong>${email || 'your email'}</strong> within 24 hours.</p>
      `;

      contactForm.innerHTML = '';
      contactForm.parentElement.appendChild(successMsg);
    });
  }
}
