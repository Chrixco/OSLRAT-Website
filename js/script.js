/**
 * OSLRAT - Open-Source Sea-Level Rise Assessment Tool
 * Main JavaScript File
 * Handles all interactive elements, animations, and dynamic functionality
 */

// ============================================================================
// MOBILE NAVIGATION
// ============================================================================

/**
 * Initialize mobile navigation toggle functionality
 */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
  });

  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-active');
      navMenu.classList.remove('is-active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove('is-active');
      navMenu.classList.remove('is-active');
    }
  });
}

// ============================================================================
// STICKY NAVIGATION
// ============================================================================

/**
 * Add/remove shadow on navigation when scrolling
 */
function initStickyNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
      nav.style.boxShadow = 'var(--shadow-md)';
    } else {
      nav.style.boxShadow = 'var(--shadow-sm)';
    }

    lastScroll = currentScroll;
  });
}

// ============================================================================
// ANIMATED COUNTER
// ============================================================================

/**
 * Animate numbers counting up
 * @param {HTMLElement} element - The element containing the number
 * @param {number} target - The target number to count to
 * @param {number} duration - Animation duration in milliseconds
 * @param {number} decimals - Number of decimal places (default: 0)
 */
function animateCounter(element, target, duration = 2000, decimals = 0) {
  const start = 0;
  const increment = target / (duration / 16); // 60 FPS
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = decimals > 0 ? target.toFixed(decimals) : target;
      clearInterval(timer);
    } else {
      element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
    }
  }, 16);
}

/**
 * Initialize counter animations when they come into view
 */
function initCounters() {
  const counters = document.querySelectorAll('.counter[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        const target = parseFloat(entry.target.dataset.target);
        const decimals = parseInt(entry.target.dataset.decimals) || 0;
        animateCounter(entry.target, target, 2000, decimals);
        entry.target.dataset.counted = 'true';
      }
    });
  }, {
    threshold: 0.3
  });

  counters.forEach(counter => observer.observe(counter));
}

// ============================================================================
// NEON BAR CHART ANIMATIONS
// ============================================================================

/**
 * Animate neon bar charts when they come into view
 */
function initNeonBarCharts() {
  const neonBars = document.querySelectorAll('.neon-bar[data-height]');
  if (!neonBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const bar = entry.target;
        const fill = bar.querySelector('.neon-bar-fill');
        const height = bar.dataset.height;

        // Delay based on position
        const index = Array.from(neonBars).indexOf(bar);
        setTimeout(() => {
          fill.style.height = height;
        }, index * 200);

        bar.dataset.animated = 'true';
      }
    });
  }, {
    threshold: 0.3
  });

  neonBars.forEach(bar => observer.observe(bar));
}

/**
 * Animate progress bars when they come into view
 */
function initProgressBars() {
  const progressBars = document.querySelectorAll('.impact-progress-fill[data-width]');
  if (!progressBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const fill = entry.target;
        const width = fill.dataset.width;

        // Delay based on position
        const index = Array.from(progressBars).indexOf(fill);
        setTimeout(() => {
          fill.style.width = width;
        }, 500 + (index * 300));

        fill.dataset.animated = 'true';
      }
    });
  }, {
    threshold: 0.3
  });

  progressBars.forEach(bar => observer.observe(bar));
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

/**
 * Initialize intersection observer for scroll animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) translateX(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Set initial state
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    const animationType = element.dataset.animate;
    if (animationType === 'fade-up') {
      element.style.transform = 'translateY(30px)';
    } else if (animationType === 'slide-right') {
      element.style.transform = 'translateX(-30px)';
    } else if (animationType === 'slide-left') {
      element.style.transform = 'translateX(30px)';
    }

    observer.observe(element);
  });
}

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const offsetTop = target.offsetTop - 80; // Account for fixed nav

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });
}

// ============================================================================
// DOCUMENTATION NAVIGATION
// ============================================================================

/**
 * Highlight active section in documentation navigation
 */
function initDocsNav() {
  const docsNav = document.querySelector('.docs-nav');
  if (!docsNav) return;

  const sections = document.querySelectorAll('.docs-section');
  const navLinks = docsNav.querySelectorAll('.docs-nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('docs-nav__link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('docs-nav__link--active');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-100px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// ============================================================================
// CODE BLOCK COPY FUNCTIONALITY
// ============================================================================

/**
 * Copy code block content to clipboard
 * @param {HTMLElement} button - The copy button element
 */
function copyCode(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('code');

  if (!code) return;

  // Create temporary textarea to copy text
  const textarea = document.createElement('textarea');
  textarea.value = code.textContent;
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  // Update button text
  const originalText = button.textContent;
  button.textContent = 'Copied!';
  button.style.backgroundColor = 'var(--color-success)';

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = '';
  }, 2000);
}

// Make copyCode globally available for onclick handlers
window.copyCode = copyCode;

// ============================================================================
// FORM HANDLING
// ============================================================================

/**
 * Initialize contact form submission
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simulate form submission (replace with actual API call)
    console.log('Form submitted:', data);

    // Show success message
    form.style.display = 'none';
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
      successMessage.style.display = 'block';
    }

    // In production, you would send this to your backend:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    //   });
    //   // Handle response
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  });
}

/**
 * Initialize newsletter form submission
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');

    if (!emailInput || !button) return;

    const email = emailInput.value;

    // Simulate submission
    console.log('Newsletter signup:', email);

    // Update button text
    const originalText = button.textContent;
    button.textContent = 'Subscribed!';
    button.style.backgroundColor = 'var(--color-success)';
    emailInput.value = '';

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = '';
    }, 3000);

    // In production:
    // try {
    //   const response = await fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    //   });
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  });
}

// ============================================================================
// LAZY LOADING IMAGES
// ============================================================================

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ============================================================================
// PARALLAX EFFECTS
// ============================================================================

/**
 * Add subtle parallax effect to hero section
 */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = hero.querySelector('.hero__background');

    if (parallax && scrolled < window.innerHeight) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Log Core Web Vitals for performance monitoring
 */
function initPerformanceMonitoring() {
  // Only in development or with analytics enabled
  if (typeof PerformanceObserver === 'undefined') return;

  // Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Observer not supported
  }

  // First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    // Observer not supported
  }

  // Cumulative Layout Shift (CLS)
  try {
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      }
      console.log('CLS:', clsScore);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // Observer not supported
  }
}

// ============================================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================================

/**
 * Trap focus within modal dialogs (if implemented)
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
}

/**
 * Announce content changes to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Debounce function to limit how often a function can run
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
function debounce(func, wait = 250) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to ensure function runs at most once per interval
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function}
 */
function throttle(func, limit = 250) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================

/**
 * Add keyboard shortcuts for better navigation
 */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Skip if user is typing in an input
    if (e.target.matches('input, textarea, select')) return;

    // Keyboard shortcuts
    switch(e.key) {
      case '/':
        // Focus search (if implemented)
        e.preventDefault();
        break;
      case 'Escape':
        // Close any open modals or menus
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
          navMenu.classList.remove('is-active');
          navToggle.classList.remove('is-active');
        }
        break;
    }
  });
}

// ============================================================================
// EXTERNAL LINK HANDLING
// ============================================================================

/**
 * Add icon and accessibility attributes to external links
 */
function initExternalLinks() {
  const links = document.querySelectorAll('a[href^="http"]');

  links.forEach(link => {
    // Skip if it's the current domain
    if (link.hostname === window.location.hostname) return;

    // Add external link attributes if not already present
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
    }
    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }

    // Add screen reader text
    if (!link.querySelector('.sr-only')) {
      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = ' (opens in new tab)';
      link.appendChild(srText);
    }
  });
}

// ============================================================================
// PRINT STYLES
// ============================================================================

/**
 * Optimize content for printing
 */
function initPrintOptimization() {
  window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections before printing
    const collapsedSections = document.querySelectorAll('[aria-expanded="false"]');
    collapsedSections.forEach(section => {
      section.setAttribute('aria-expanded', 'true');
    });
  });
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Global error handler
 */
function initErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // In production, send to error tracking service
  });
}

// ============================================================================
// THEME DETECTION (for future dark mode support)
// ============================================================================

/**
 * Detect and apply user's color scheme preference
 */
function initThemeDetection() {
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function handleThemeChange(e) {
    if (e.matches) {
      // User prefers dark mode
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      // User prefers light mode
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  // Initial check
  handleThemeChange(darkModeQuery);

  // Listen for changes
  darkModeQuery.addEventListener('change', handleThemeChange);
}

// ============================================================================
// INTERACTIVE SLR CHART
// ============================================================================

/**
 * Initialize interactive sea level rise chart
 */
function initInteractiveSLRChart() {
  const chart = document.getElementById('interactiveChart');
  if (!chart) return;

  const dangerPath = document.getElementById('dangerPath');
  const infoPanel = document.getElementById('infoPanel');
  const panelYear = document.getElementById('panelYear');
  const panelSLR = document.getElementById('panelSLR');
  const panelCost = document.getElementById('panelCost');
  const dropletsGroup = document.getElementById('dropletsGroup');
  const splashesGroup = document.getElementById('splashesGroup');

  // SLR data points based on IPCC AR6 (2021) SSP5-8.5 scenario
  // Values relative to 1995-2014 baseline
  // Economic costs in trillions USD (based on climate economics literature)
  // Note: Economic damages accelerate non-linearly with SLR
  const slrData = [
    { year: 2024, slr: 0.10, cost: 0.5, people: 0, peopleDisplay: '0', impact: 'Current sea level (~0.1m since 1995-2014)' },
    { year: 2030, slr: 0.15, cost: 1.5, people: 100, peopleDisplay: '100M', impact: 'Increased coastal flooding frequency' },
    { year: 2050, slr: 0.32, cost: 4.5, people: 200, peopleDisplay: '200M', impact: 'Major delta cities at severe risk' },
    { year: 2075, slr: 0.56, cost: 9.0, people: 250, peopleDisplay: '250M', impact: 'Significant coastal infrastructure loss' },
    { year: 2100, slr: 0.84, cost: 14.0, people: 280, peopleDisplay: '280M+', impact: 'Catastrophic global displacement' }
  ];

  // Linear interpolation function
  function lerp(start, end, t) {
    return start + (end - start) * t;
  }

  // Quadratic interpolation for accelerating economic damages
  function quadraticInterp(start, end, t) {
    // Accelerating curve: y = x^2.2 (economic damages accelerate faster than linear)
    const accelerationFactor = 2.2;
    const adjustedT = Math.pow(t, accelerationFactor);
    return start + (end - start) * adjustedT;
  }

  // Calculate economic cost based on SLR from mouse position
  // X-axis = SLR (0.10m to 0.84m), Y-axis = Economic cost ($0 to $15T)
  function calculateDataFromPosition(x) {
    const rect = chart.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, x / rect.width));

    // Map percentage to SLR range (0.10m to 0.84m)
    const slr = lerp(0.10, 0.84, percentage);

    // Find closest data points for this SLR value
    let lowerIndex = 0;
    for (let i = 0; i < slrData.length - 1; i++) {
      if (slr >= slrData[i].slr && slr <= slrData[i + 1].slr) {
        lowerIndex = i;
        break;
      }
    }

    const lower = slrData[lowerIndex];
    const upper = slrData[lowerIndex + 1] || lower;

    // Interpolate economic cost with acceleration, year and people linearly
    const slrProgress = (slr - lower.slr) / (upper.slr - lower.slr);
    const cost = quadraticInterp(lower.cost, upper.cost, slrProgress);
    const year = Math.round(lerp(lower.year, upper.year, slrProgress));
    const people = Math.round(lerp(lower.people, upper.people, slrProgress));

    // Get impact description for nearest SLR
    const nearestData = slrData.reduce((prev, curr) =>
      Math.abs(curr.slr - slr) < Math.abs(prev.slr - slr) ? curr : prev
    );

    return {
      year,
      slr: slr.toFixed(2),
      cost: cost.toFixed(1),
      people: people,
      peopleDisplay: people === 0 ? '0' : `${people}M`,
      impact: nearestData.impact,
      percentage: percentage * 100, // X position (SLR progress)
      costPercentage: (cost / 15.0) * 100, // Y position (cost as % of $15T max)
      peoplePercentage: (people / 280) * 100
    };
  }

  // Fluid physics state
  let fluidState = {
    targetX: 100,
    targetCost: 93.3,
    currentX: 100,
    currentCost: 93.3,
    velocityX: 0,
    velocityCost: 0,
    waveOffset: 0,
    waveVelocity: 0,
    isAnimating: false,
    lastMouseX: 0,
    lastMouseTime: 0,
    mouseVelocity: 0,
    droplets: [], // Active water droplets
    splashes: []  // Active splash particles
  };

  // Create organic SVG path with fluid wave motion
  // xPercent = SLR progress (0-100), costPercent = economic cost (0-100)
  function createFluidPath(xPercent, costPercent, peoplePercent, waveOffset = 0) {
    // Create a smooth curve that grows in height (cost) as we move right (SLR)
    const points = [];
    const numPoints = 30; // More points for smoother wave motion

    for (let i = 0; i <= numPoints; i++) {
      const progress = i / numPoints; // 0 to 1
      const x = progress * xPercent; // X position from 0 to cursor position (SLR)

      // Height grows from 0 to target economic cost at cursor position
      const currentCost = progress * costPercent;
      const currentPeople = progress * peoplePercent;

      // Add wave motion (like water sloshing) - visible slow waves
      const waveFrequency = 2.5; // Multiple waves for sloshing effect
      const waveAmplitude = 1.5 + (currentCost / 100) * 2.5; // Visible wave motion
      const wave = Math.sin(progress * Math.PI * waveFrequency + waveOffset) * waveAmplitude;

      // Surface tension effect at the edge - realistic water behavior
      const edgeDistance = Math.abs(progress - 1.0);
      const surfaceTension = edgeDistance < 0.15 ? Math.sin(edgeDistance * Math.PI * 5) * 1.2 : 0;

      // Y position with wave and surface tension (inverted because SVG y=0 is top)
      const y = 100 - currentCost + wave + surfaceTension;

      points.push({ x, y, cost: currentCost });
    }

    // Build SVG path with smooth Bezier curves
    let pathD = `M 0 100`;

    for (let i = 0; i < points.length; i++) {
      if (i === 0) {
        pathD += ` L ${points[i].x} ${points[i].y}`;
      } else {
        const prevPoint = points[i - 1];

        // Adaptive control points for smoother fluid motion
        const tension = 0.4;
        const cp1x = prevPoint.x + (points[i].x - prevPoint.x) * tension;
        const cp1y = prevPoint.y + (points[i].y - prevPoint.y) * 0.2;
        const cp2x = prevPoint.x + (points[i].x - prevPoint.x) * (1 - tension);
        const cp2y = points[i].y - (points[i].y - prevPoint.y) * 0.2;

        pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
      }
    }

    pathD += ` L ${xPercent} 100 L 0 100 Z`;

    return pathD;
  }

  // Physics animation loop for fluid motion
  function animateFluid() {
    if (!fluidState.isAnimating) return;

    // Graph follows mouse instantly, only waves are slow
    const baseSpringStrength = 0.3; // Fast response - graph follows cursor immediately
    const velocityMultiplier = Math.min(Math.abs(fluidState.mouseVelocity) * 0.5, 2.0);
    const springStrength = baseSpringStrength * (1 + velocityMultiplier);

    const damping = 0.75; // Low damping - snappy response for graph position

    // Calculate forces
    const forceX = (fluidState.targetX - fluidState.currentX) * springStrength;
    const forceCost = (fluidState.targetCost - fluidState.currentCost) * springStrength;

    // Update velocities with damping
    fluidState.velocityX = (fluidState.velocityX + forceX) * damping;
    fluidState.velocityCost = (fluidState.velocityCost + forceCost) * damping;

    // Update positions
    fluidState.currentX += fluidState.velocityX;
    fluidState.currentCost += fluidState.velocityCost;

    // Wave motion (oscillates back and forth) - VERY SLOW waves on fast-moving water
    const waveDecay = 0.995; // Very slow decay = waves persist much longer
    const waveResponse = 0.02; // Low response - 10x slower reaction to height changes
    fluidState.waveVelocity += (fluidState.velocityCost * waveResponse);

    // Add extra waves from mouse velocity - much more subtle
    fluidState.waveVelocity += (fluidState.mouseVelocity * 0.015);

    fluidState.waveVelocity *= waveDecay;
    fluidState.waveOffset += fluidState.waveVelocity * 0.03; // 10x slower wave propagation

    // Decay mouse velocity over time - slower decay
    fluidState.mouseVelocity *= 0.95;

    // Update droplets (falling water drops)
    fluidState.droplets = fluidState.droplets.filter(droplet => {
      droplet.y += droplet.velocity;
      droplet.velocity += 0.3; // Gravity
      droplet.life -= 1;
      return droplet.life > 0 && droplet.y < 100;
    });

    // Update splashes (particles from impact)
    fluidState.splashes = fluidState.splashes.filter(splash => {
      splash.x += splash.vx;
      splash.y += splash.vy;
      splash.vy += 0.15; // Gravity on splash particles
      splash.life -= 1;
      splash.opacity = splash.life / splash.maxLife;
      return splash.life > 0;
    });

    // Update the path
    const pathD = createFluidPath(
      fluidState.currentX,
      fluidState.currentCost,
      100,
      fluidState.waveOffset
    );
    dangerPath.setAttribute('d', pathD);

    // Render droplets
    if (dropletsGroup) {
      dropletsGroup.innerHTML = fluidState.droplets.map(droplet =>
        `<circle cx="${droplet.x}" cy="${droplet.y}" r="${droplet.size}"
         fill="url(#dropletGradient)" opacity="${droplet.life / 60}" />`
      ).join('');
    }

    // Render splashes
    if (splashesGroup) {
      splashesGroup.innerHTML = fluidState.splashes.map(splash =>
        `<circle cx="${splash.x}" cy="${splash.y}" r="${splash.size}"
         fill="#00ffff" opacity="${splash.opacity * 0.6}" />`
      ).join('');
    }

    // Stop animating if settled - graph stops quickly, waves continue longer
    const isSettled =
      Math.abs(fluidState.velocityX) < 0.1 &&
      Math.abs(fluidState.velocityCost) < 0.1 &&
      Math.abs(fluidState.waveVelocity) < 0.001; // Tighter threshold for longer wave animations

    if (isSettled) {
      fluidState.isAnimating = false;
    } else {
      requestAnimationFrame(animateFluid);
    }
  }

  // Handle mouse move
  chart.addEventListener('mousemove', (e) => {
    const rect = chart.getBoundingClientRect();
    const x = e.clientX - rect.left;

    // Calculate mouse velocity (pixels per millisecond)
    const currentTime = Date.now();
    const deltaTime = currentTime - fluidState.lastMouseTime;

    if (deltaTime > 0 && fluidState.lastMouseTime > 0) {
      const deltaX = x - fluidState.lastMouseX;
      const instantVelocity = deltaX / deltaTime;

      // Smooth velocity using exponential moving average
      fluidState.mouseVelocity = fluidState.mouseVelocity * 0.7 + instantVelocity * 0.3;

      // Create droplets when moving fast
      if (Math.abs(instantVelocity) > 0.5 && Math.random() < 0.3) {
        const dropletX = (x / rect.width) * 100;
        const dropletY = -5 - Math.random() * 10; // Start above the visible area

        fluidState.droplets.push({
          x: dropletX,
          y: dropletY,
          velocity: 0.5 + Math.random() * 1,
          life: 60,
          size: 0.8 + Math.random() * 1.5
        });
      }
    }

    fluidState.lastMouseX = x;
    fluidState.lastMouseTime = currentTime;

    const data = calculateDataFromPosition(x);

    // Set new targets for fluid physics
    fluidState.targetX = data.percentage;
    fluidState.targetCost = data.costPercentage;

    // Create splash when water level changes significantly
    if (Math.abs(fluidState.velocityCost) > 2) {
      const splashX = data.percentage;
      const splashY = 100 - data.costPercentage;

      // Create multiple splash particles
      for (let i = 0; i < 3; i++) {
        fluidState.splashes.push({
          x: splashX + (Math.random() - 0.5) * 5,
          y: splashY,
          vx: (Math.random() - 0.5) * 2,
          vy: -2 - Math.random() * 2,
          life: 30 + Math.random() * 20,
          maxLife: 50,
          opacity: 1,
          size: 0.5 + Math.random() * 1
        });
      }
    }

    // Start animation if not already running
    if (!fluidState.isAnimating) {
      fluidState.isAnimating = true;
      requestAnimationFrame(animateFluid);
    }

    // Update info panel
    infoPanel.classList.add('active');
    panelYear.textContent = data.year;
    panelSLR.textContent = `${data.slr}m`;
    panelCost.textContent = `$${data.cost}T`;
  });

  // Handle mouse enter
  chart.addEventListener('mouseenter', () => {
    infoPanel.classList.add('active');
  });

  // Touch support for mobile
  chart.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = chart.getBoundingClientRect();
    const x = touch.clientX - rect.left;

    const data = calculateDataFromPosition(x);

    // Set new targets for fluid physics
    fluidState.targetX = data.percentage;
    fluidState.targetCost = data.costPercentage;

    if (!fluidState.isAnimating) {
      fluidState.isAnimating = true;
      requestAnimationFrame(animateFluid);
    }

    // Update info panel
    infoPanel.classList.add('active');
    panelYear.textContent = data.year;
    panelSLR.textContent = `${data.slr}m`;
    panelCost.textContent = `$${data.cost}T`;
  });

  chart.addEventListener('touchend', () => {
    // Animate back to 2100 values
    fluidState.targetX = 100;
    fluidState.targetCost = 93.3;

    if (!fluidState.isAnimating) {
      fluidState.isAnimating = true;
      requestAnimationFrame(animateFluid);
    }

    setTimeout(() => {
      infoPanel.classList.remove('active');
      if (currentSLR) currentSLR.textContent = '$14';
      currentYear.textContent = '2100';
    }, 300);
  });

  // Handle mouse leave
  chart.addEventListener('mouseleave', () => {
    // Animate back to 2100 values with fluid motion
    fluidState.targetX = 100;
    fluidState.targetCost = 93.3;

    if (!fluidState.isAnimating) {
      fluidState.isAnimating = true;
      requestAnimationFrame(animateFluid);
    }

    infoPanel.classList.remove('active');
    if (currentSLR) currentSLR.textContent = '$14';
    currentYear.textContent = '2100';
  });

  // Initialize at full shape with gentle wave animation
  setTimeout(() => {
    fluidState.currentX = 100;
    fluidState.currentCost = 93.3;
    fluidState.targetX = 100;
    fluidState.targetCost = 93.3;

    // Start with a small wave motion
    fluidState.waveVelocity = 0.2;
    fluidState.isAnimating = true;
    requestAnimationFrame(animateFluid);
  }, 500);
}

// ============================================================================
// ANIMATED LETTER BACKGROUND
// ============================================================================

/**
 * Wave effect class for ripple animations
 */
class Wave {
  constructor(x, y, isSecondary = false, delayFrames = 0) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.isSecondary = isSecondary;
    this.delayFrames = delayFrames;
    this.currentDelay = delayFrames;

    if (isSecondary) {
      this.maxRadius = 200;
      this.speed = 2;
    } else {
      this.maxRadius = 300;
      this.speed = 3;
    }

    this.opacity = 1;
    this.lineWidth = 3;

    // Use OSLRAT colors: cyan and yellow
    const colors = [
      { r: 0, g: 255, b: 255 },     // Neon Cyan
      { r: 255, g: 215, b: 0 },     // Neon Yellow
      { r: 0, g: 204, b: 255 },     // Light Blue
      { r: 255, g: 193, b: 7 }      // Gold
    ];
    this.colorRGB = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    if (this.currentDelay > 0) {
      this.currentDelay--;
      return true;
    }

    this.radius += this.speed;
    this.opacity = 1 - (this.radius / this.maxRadius);
    this.lineWidth = 3 * this.opacity;
    return this.radius < this.maxRadius;
  }

  getColorInfluence(x, y) {
    if (this.currentDelay > 0) {
      return { influence: 0, color: null };
    }

    const dx = x - this.x;
    const dy = y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const waveThickness = this.isSecondary ? 30 : 40;
    const distFromWave = Math.abs(dist - this.radius);

    if (distFromWave < waveThickness) {
      const influence = (1 - distFromWave / waveThickness) * this.opacity;
      return { influence, color: this.colorRGB };
    }

    return { influence: 0, color: null };
  }
}

// Letter background global variables
let matrixCanvas = null;
let matrixCtx = null;
let matrixCols = 0;
let matrixRows = 0;
let matrixCellSize = 24;
let matrixLetters = [];
let matrixAnimationId = null;
let mousePos = { x: -9999, y: -9999 };
let glowAlpha = 0;
let hoverRadiusBase = 60;
let hoverRadius = 60;
let waves = [];
const MAX_WAVES = 5;
let isDragging = false;
let lastWaveTime = 0;
const WAVE_INTERVAL = 100;

/**
 * Initialize the animated letter background
 */
function initLetterBackground() {
  const letterBackground = document.getElementById('letter-background');
  if (!letterBackground) return;

  // Clear previous
  if (matrixAnimationId) cancelAnimationFrame(matrixAnimationId);
  letterBackground.innerHTML = '';

  // Create canvas
  matrixCanvas = document.createElement('canvas');
  matrixCtx = matrixCanvas.getContext('2d');
  matrixCanvas.style.position = 'absolute';
  matrixCanvas.style.top = '0';
  matrixCanvas.style.left = '0';
  matrixCanvas.style.width = '100%';
  matrixCanvas.style.height = '100%';
  letterBackground.appendChild(matrixCanvas);

  const setup = () => {
    const dpr = window.devicePixelRatio || 1;
    const width = letterBackground.clientWidth;
    const height = letterBackground.clientHeight;
    matrixCanvas.width = Math.floor(width * dpr);
    matrixCanvas.height = Math.floor(height * dpr);
    matrixCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Responsive cell size
    if (width < 480) matrixCellSize = 18;
    else if (width < 768) matrixCellSize = 20;
    else matrixCellSize = 24;

    matrixCols = Math.ceil(width / matrixCellSize);
    matrixRows = Math.ceil(height / matrixCellSize);
    hoverRadiusBase = matrixCellSize * 5.4;
    hoverRadius = hoverRadiusBase;

    // Build grid letters from "SLR" and "Ultrathink"
    const pool = ['S', 'L', 'R', 'U', 'l', 't', 'r', 'a', 't', 'h', 'i', 'n', 'k'];
    matrixLetters = new Array(matrixRows * matrixCols).fill(null).map(() => ({
      ch: pool[Math.floor(Math.random() * pool.length)],
      shade: 160 + Math.floor(Math.random() * 50) // grey 160-210
    }));
  };

  setup();

  // Render loop
  const render = () => {
    const { width, height } = letterBackground.getBoundingClientRect();
    matrixCtx.clearRect(0, 0, width, height);

    // Randomly flicker letters
    for (let i = 0; i < Math.floor((matrixRows * matrixCols) * 0.01); i++) {
      const idx = Math.floor(Math.random() * matrixLetters.length);
      const cell = matrixLetters[idx];
      cell.shade = 140 + Math.floor(Math.random() * 80);

      // Occasionally change character
      if (Math.random() < 0.02) {
        const pool = ['S', 'L', 'R', 'U', 'l', 't', 'r', 'a', 't', 'h', 'i', 'n', 'k'];
        cell.ch = pool[Math.floor(Math.random() * pool.length)];
      }
    }

    matrixCtx.textBaseline = 'middle';
    matrixCtx.textAlign = 'center';
    matrixCtx.font = `600 ${Math.floor(matrixCellSize * 0.8)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

    for (let row = 0; row < matrixRows; row++) {
      for (let col = 0; col < matrixCols; col++) {
        const idx = row * matrixCols + col;
        const cell = matrixLetters[idx];
        const x = col * matrixCellSize + matrixCellSize / 2;
        const y = row * matrixCellSize + matrixCellSize / 2;

        // Hover highlight
        const dx = mousePos.x - x;
        const dy = mousePos.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = hoverRadius;

        let f = 0;
        if (radius > 0) {
          const d = Math.min(dist / radius, 1);
          f = Math.pow(1 - d, 2.2);
        }

        // Calculate wave influence
        let maxWaveInfluence = 0;
        let waveColor = null;
        for (const wave of waves) {
          const waveData = wave.getColorInfluence(x, y);
          if (waveData.influence > maxWaveInfluence) {
            maxWaveInfluence = waveData.influence;
            waveColor = waveData.color;
          }
        }

        // Determine effect: hover or wave
        const hoverInfluence = f * glowAlpha;
        let finalInfluence, rAccent, gAccent, bAccent;

        if (maxWaveInfluence > hoverInfluence) {
          // Wave effect - use wave color
          finalInfluence = maxWaveInfluence;
          rAccent = waveColor.r;
          gAccent = waveColor.g;
          bAccent = waveColor.b;
        } else {
          // Hover effect - use cyan
          finalInfluence = hoverInfluence;
          rAccent = 0;
          gAccent = 255;
          bAccent = 255;
        }

        // Blue base color (cyan-tinted blue)
        const blueIntensity = cell.shade / 255; // 0.6-0.8 range
        const rBlue = Math.round(0 * blueIntensity);
        const gBlue = Math.round(180 * blueIntensity);
        const bBlue = Math.round(255 * blueIntensity);
        const aBlue = 0.35;
        const aAccent = 1.0;
        const r = Math.round(rBlue + (rAccent - rBlue) * finalInfluence);
        const gCh = Math.round(gBlue + (gAccent - gBlue) * finalInfluence);
        const b = Math.round(bBlue + (bAccent - bBlue) * finalInfluence);
        const a = aBlue + (aAccent - aBlue) * finalInfluence;
        matrixCtx.fillStyle = `rgba(${r}, ${gCh}, ${b}, ${a})`;
        matrixCtx.fillText(cell.ch, x, y);
      }
    }

    // Update waves
    waves = waves.filter(wave => wave.update());

    // Ease hover radius and glow alpha
    hoverRadius += (hoverRadiusBase - hoverRadius) * 0.08;
    glowAlpha *= 0.96;

    matrixAnimationId = requestAnimationFrame(render);
  };

  matrixAnimationId = requestAnimationFrame(render);

  // Mouse move handler
  const updateMouse = (clientX, clientY) => {
    const rect = letterBackground.getBoundingClientRect();
    mousePos.x = clientX - rect.left;
    mousePos.y = clientY - rect.top;
    glowAlpha = 1;
    hoverRadius = hoverRadiusBase * 1.2;
  };

  window.addEventListener('mousemove', (e) => updateMouse(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  // Click/touch to create waves
  const createWave = (clientX, clientY) => {
    const rect = letterBackground.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (waves.length < MAX_WAVES) {
      waves.push(new Wave(x, y, false, 0));
      // Add secondary waves for more effect
      waves.push(new Wave(x, y, true, 5));
      waves.push(new Wave(x, y, true, 10));
    }
  };

  window.addEventListener('click', (e) => createWave(e.clientX, e.clientY));
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      createWave(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  // Dragging for continuous waves
  window.addEventListener('mousedown', () => {
    isDragging = true;
    lastWaveTime = Date.now();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const now = Date.now();
      if (now - lastWaveTime > WAVE_INTERVAL) {
        createWave(e.clientX, e.clientY);
        lastWaveTime = now;
      }
    }
  });

  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setup();
    }, 250);
  });
}

// ============================================================================
// HERO TITLE ANIMATION
// ============================================================================

/**
 * Modern 2025 hero title animation
 * Transforms full text into OSLRAT acronym with gradient effects
 */
function initHeroTitleAnimation() {
  const titleFull = document.getElementById('titleFull');
  const titleAcronym = document.getElementById('titleAcronym');
  const subtitle = document.getElementById('heroSubtitle');

  if (!titleFull || !titleAcronym || !subtitle) return;

  // Check for reduced motion preference
  if (prefersReducedMotion()) {
    // Skip animation, show final state
    titleFull.classList.add('hide');
    titleAcronym.classList.add('show');
    subtitle.classList.add('show');
    return;
  }

  // Animation sequence
  const sequence = async () => {
    // Wait 2.5 seconds after initial text appears
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Hide full text
    titleFull.classList.add('hide');

    // Wait for hide transition
    await new Promise(resolve => setTimeout(resolve, 600));

    // Show acronym
    titleAcronym.classList.add('show');

    // Wait for acronym to scale up
    await new Promise(resolve => setTimeout(resolve, 800));

    // Show subtitle
    subtitle.classList.add('show');
  };

  // Start the animation sequence
  sequence();
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
  // Initialize letter background
  if (!prefersReducedMotion()) {
    initLetterBackground();
  }
  // Core functionality
  initMobileNav();
  initStickyNav();
  initSmoothScroll();
  initKeyboardShortcuts();

  // Animations
  if (!prefersReducedMotion()) {
    initScrollAnimations();
    initCounters();
    initNeonBarCharts();
    initProgressBars();
    initParallax();
  }

  // Interactive Chart
  initInteractiveSLRChart();

  // Page-specific functionality
  initDocsNav();
  initContactForm();
  initNewsletterForm();

  // Enhancements
  initLazyLoading();
  initExternalLinks();
  initPrintOptimization();

  // Hero animation
  initHeroTitleAnimation();

  // Development/monitoring
  initErrorHandling();
  // initPerformanceMonitoring(); // Uncomment in development

  // Future features
  // initThemeDetection(); // Uncomment when dark mode is ready

  console.log('OSLRAT website initialized successfully');
}

// ============================================================================
// RUN INITIALIZATION
// ============================================================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM is already loaded
  init();
}

// Export functions for potential use in other scripts
window.OSLRAT = {
  announceToScreenReader,
  debounce,
  throttle,
  isInViewport,
  prefersReducedMotion
};
