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
  const panelImpact = document.getElementById('panelImpact');
  const currentSLR = document.getElementById('current-slr');
  const currentYear = document.getElementById('current-year');

  // SLR data points with people affected (in millions)
  const slrData = [
    { year: 2024, slr: 0, people: 0, peopleDisplay: '0', impact: 'Current sea level' },
    { year: 2030, slr: 0.28, people: 120, peopleDisplay: '120M', impact: 'Increased coastal flooding events' },
    { year: 2050, slr: 0.51, people: 200, peopleDisplay: '200M', impact: 'Major delta cities at severe risk' },
    { year: 2075, slr: 0.78, people: 250, peopleDisplay: '250M', impact: 'Significant coastal infrastructure loss' },
    { year: 2100, slr: 1.10, people: 280, peopleDisplay: '280M+', impact: 'Catastrophic global displacement' }
  ];

  // Linear interpolation function
  function lerp(start, end, t) {
    return start + (end - start) * t;
  }

  // Calculate SLR and year based on mouse position
  function calculateSLRFromPosition(x) {
    const rect = chart.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, x / rect.width));

    // Map percentage to year range (2024-2100)
    const year = Math.round(lerp(2024, 2100, percentage));

    // Find closest data points
    let lowerIndex = 0;
    for (let i = 0; i < slrData.length - 1; i++) {
      if (year >= slrData[i].year && year <= slrData[i + 1].year) {
        lowerIndex = i;
        break;
      }
    }

    const lower = slrData[lowerIndex];
    const upper = slrData[lowerIndex + 1] || lower;

    // Interpolate SLR value and people affected
    const yearProgress = (year - lower.year) / (upper.year - lower.year);
    const slr = lerp(lower.slr, upper.slr, yearProgress);
    const people = Math.round(lerp(lower.people, upper.people, yearProgress));

    // Get impact description for nearest year
    const nearestData = slrData.reduce((prev, curr) =>
      Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev
    );

    return {
      year,
      slr: slr.toFixed(2),
      people: people,
      peopleDisplay: people === 0 ? '0' : `${people}M`,
      impact: nearestData.impact,
      percentage: percentage * 100,
      slrPercentage: (slr / 1.2) * 100, // Scale to Y-axis max of 1.2m
      peoplePercentage: (people / 280) * 100
    };
  }

  // Create organic SVG path based on cursor position
  function createOrganicPath(xPercent, slrPercent, peoplePercent) {
    // Create a smooth curve that grows in height as we move right
    const points = [];
    const numPoints = 20;

    for (let i = 0; i <= numPoints; i++) {
      const progress = i / numPoints; // 0 to 1
      const x = progress * xPercent; // X position from 0 to cursor position

      // Height grows linearly from 0 to target SLR at cursor position
      // At progress=0 (start), height=0
      // At progress=1 (cursor position), height=slrPercent
      const currentSlr = progress * slrPercent;
      const currentPeople = progress * peoplePercent;

      // Y position (inverted because SVG y=0 is top)
      const y = 100 - currentSlr;

      // Width multiplier based on people affected (creates organic spreading)
      const widthMultiplier = 1 + (currentPeople / 200);

      points.push({ x, y, width: widthMultiplier });
    }

    // Build SVG path with smooth curves
    let pathD = `M 0 100`;

    for (let i = 0; i < points.length; i++) {
      if (i === 0) {
        pathD += ` L ${points[i].x} ${points[i].y}`;
      } else {
        const prevPoint = points[i - 1];
        const cp1x = prevPoint.x + (points[i].x - prevPoint.x) * 0.5;
        const cp1y = prevPoint.y;
        const cp2x = prevPoint.x + (points[i].x - prevPoint.x) * 0.5;
        const cp2y = points[i].y;

        pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
      }
    }

    pathD += ` L ${xPercent} 100 L 0 100 Z`;

    return pathD;
  }

  // Handle mouse move
  chart.addEventListener('mousemove', (e) => {
    const rect = chart.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const data = calculateSLRFromPosition(x);

    // Update danger overlay with organic path
    const pathD = createOrganicPath(data.percentage, data.slrPercentage, data.peoplePercentage);
    dangerPath.setAttribute('d', pathD);

    // Update info panel
    infoPanel.classList.add('active');
    panelYear.textContent = data.year;
    panelSLR.textContent = `+${data.slr}m`;
    panelImpact.textContent = `${data.peopleDisplay} people at risk`;

    // Update header stats
    currentSLR.textContent = data.slr;
    currentYear.textContent = data.year;
  });

  // Handle mouse enter
  chart.addEventListener('mouseenter', () => {
    infoPanel.classList.add('active');
  });

  // Handle mouse leave
  chart.addEventListener('mouseleave', () => {
    // Reset to 2100 values
    const fullPath = createOrganicPath(100, 100, 100);
    dangerPath.setAttribute('d', fullPath);
    infoPanel.classList.remove('active');
    currentSLR.textContent = '1.10';
    currentYear.textContent = '2100';
  });

  // Initialize at full shape
  setTimeout(() => {
    const fullPath = createOrganicPath(100, 100, 100);
    dangerPath.setAttribute('d', fullPath);
  }, 500);
}

// ============================================================================
// DATA CAROUSEL
// ============================================================================

/**
 * Initialize carousel for data tables
 */
function initDataCarousel() {
  const track = document.getElementById('cityDataTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const indicators = document.querySelectorAll('.carousel-indicator');

  if (!track || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.children);
  let currentSlide = 0;

  function updateCarousel() {
    // Move track
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    // Update active states
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel();
    }, 250);
  });

  // Initial setup
  updateCarousel();
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
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

  // Data Carousel
  initDataCarousel();

  // Page-specific functionality
  initDocsNav();
  initContactForm();
  initNewsletterForm();

  // Enhancements
  initLazyLoading();
  initExternalLinks();
  initPrintOptimization();

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
