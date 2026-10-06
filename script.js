document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('mainHeader');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerClose = document.getElementById('drawerClose');
    const drawerOverlay = document.getElementById('drawerOverlay');

    // 1. ADD STICKY (SCROLLED) CLASS ON SCROLL
    window.addEventListener('scroll', () => {
        // Trigger slightly earlier than the original for better feel
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // 2. MOBILE DRAWER NAVIGATION (OPEN/CLOSE)
    const toggleMobileMenu = () => {
        mobileDrawer.classList.toggle('open');
        drawerOverlay.classList.toggle('active');
        document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : ''; // Prevent body scroll
    };

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
    if (drawerClose) drawerClose.addEventListener('click', toggleMobileMenu);
    if (drawerOverlay) drawerOverlay.addEventListener('click', toggleMobileMenu);

    // 3. OPTIONAL: CLOSE DRAWER ON LINK CLICK (useful for on-page smooth scrolling)
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });
});

// Animated Stat Counter for Hero Section
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // Speed factor

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = Math.ceil(target / (speed / 10));

      if (count < target) {
        counter.innerText = count + inc > target ? target : count + inc;
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// Trigger counter animation on page load
window.addEventListener('load', animateCounters);

// Hover Elevation Effect for Service Cards
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
});

// Dynamic Revenue Calculator & Form Handling
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const claimsInput = document.getElementById('monthly-claims');
  const claimsVal = document.getElementById('monthly-claims-val');
  const denialInput = document.getElementById('denial-rate');
  const denialVal = document.getElementById('denial-rate-val');
  const uncollectedDisplay = document.getElementById('uncollected-amount');

  // Calculator Logic
  function calculateLoss() {
    if (!claimsInput || !denialInput) return;
    
    const collections = parseFloat(claimsInput.value);
    const denialRate = parseFloat(denialInput.value) / 100;

    // Update Slider Badges
    claimsVal.textContent = `$${collections.toLocaleString()}`;
    denialVal.textContent = `${denialInput.value}%`;

    // Estimate yearly uncollected funds (assuming ~80% of denied claims go uncollected without proper RCM)
    const yearlyLoss = Math.round((collections * 12) * denialRate * 0.8);
    uncollectedDisplay.textContent = `$${yearlyLoss.toLocaleString()} / yr`;
  }

  if (claimsInput && denialInput) {
    claimsInput.addEventListener('input', calculateLoss);
    denialInput.addEventListener('input', calculateLoss);
    calculateLoss(); // Initial calculation
  }

  // Form Submit Handler
  const auditForm = document.getElementById('rcm-audit-form');
  const successMsg = document.getElementById('form-success-msg');

  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Hide form and show success confirmation
      auditForm.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
      }
    });
  }
});

// Dynamic Copyright Year
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}



  