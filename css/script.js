// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle")
const nav = document.getElementById("nav")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  nav.classList.toggle("active")
})

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    nav.classList.remove("active")
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(26, 26, 26, 0.98)"
  } else {
    header.style.background = "rgba(26, 26, 26, 0.95)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections for fade-in animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

// Observe cards and items for staggered animation
document.querySelectorAll(".composition-item, .benefit-item, .technical-item").forEach((item, index) => {
  item.style.opacity = "0"
  item.style.transform = "translateY(30px)"
  item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
  observer.observe(item)
})

// Performance optimization: Debounce scroll events
let ticking = false

function updateScrollEffects() {
  const header = document.querySelector(".header")
  const scrollY = window.scrollY

  if (scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Parallax effect for hero elements
  const heroElements = document.querySelectorAll(".floating-element")
  heroElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrollY * speed)
    element.style.transform = `translateY(${yPos}px)`
  })

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects)
    ticking = true
  }
})

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-count]")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-count"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      counter.textContent = Math.floor(current)
    }, 16)
  })
}

// Trigger counter animation when summary section is visible
const summaryObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        summaryObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const summarySection = document.querySelector("#summary")
if (summarySection) {
  summaryObserver.observe(summarySection)
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    menuToggle.classList.remove("active")
    nav.classList.remove("active")
  }
})

// Keyboard navigation for mobile menu
menuToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault()
    menuToggle.click()
  }
})

// Enhanced hover effects for cards
document.querySelectorAll(".composition-item, .benefit-item").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// QR Code hover effect
const qrCode = document.querySelector(".qr-container")
if (qrCode) {
  qrCode.addEventListener("mouseenter", () => {
    qrCode.querySelectorAll(".qr-grid div.filled").forEach((div, index) => {
      setTimeout(() => {
        div.style.transform = "scale(1.2)"
        div.style.boxShadow = "0 0 15px rgba(154, 205, 50, 0.8)"
      }, index * 50)
    })
  })

  qrCode.addEventListener("mouseleave", () => {
    qrCode.querySelectorAll(".qr-grid div.filled").forEach((div) => {
      div.style.transform = "scale(1)"
      div.style.boxShadow = "0 0 5px rgba(154, 205, 50, 0.5)"
    })
  })
}

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--animation-duration", "0.3s")
}

// Error handling for failed animations
window.addEventListener("error", (e) => {
  console.warn("Animation error caught:", e.error)
})

// Preload critical resources
const preloadResources = () => {
  const link = document.createElement("link")
  link.rel = "preload"
  link.as = "font"
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
  link.crossOrigin = "anonymous"
  document.head.appendChild(link)
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  preloadResources()

  // Add loading animation to percentage bars
  setTimeout(() => {
    document.querySelectorAll(".percentage-fill").forEach((bar) => {
      bar.style.animation = "fillBar 2s ease-out forwards"
    })
  }, 1000)

  // Add staggered animation to metric circles
  setTimeout(() => {
    document.querySelectorAll(".metric-fill").forEach((circle, index) => {
      circle.style.animationDelay = `${index * 0.2}s`
    })
  }, 1500)
})

// Resize handler for responsive particles
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    const particles = document.querySelectorAll(".particle")
    particles.forEach((particle) => particle.remove())
  } else if (document.body.classList.contains("loaded")) {
    const particlesContainer = document.getElementById("particles")
    if (particlesContainer && !particlesContainer.children.length) {
      initParticles()
    }
  }
})

// Add custom cursor effect for desktop
if (window.innerWidth > 1024) {
  const cursor = document.createElement("div")
  cursor.className = "custom-cursor"
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(154, 205, 50, 0.8) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
  `
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px"
    cursor.style.top = e.clientY - 10 + "px"
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "scale(1.5)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "scale(1)"
  })
}

// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    document.body.classList.add("loaded")
    initParticles()
    initAOS()
  }, 3000)
})

// Particles System
function initParticles() {
  if (window.innerWidth < 768) return // Skip on mobile for performance

  const particlesContainer = document.getElementById("particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer)
  }
}

function createParticle(container) {
  const particle = document.createElement("div")
  particle.className = "particle"

  const size = Math.random() * 4 + 1
  const x = Math.random() * window.innerWidth
  const y = Math.random() * window.innerHeight
  const duration = Math.random() * 20 + 10
  const delay = Math.random() * 5

  particle.style.width = `${size}px`
  particle.style.height = `${size}px`
  particle.style.left = `${x}px`
  particle.style.top = `${y}px`
  particle.style.animationDuration = `${duration}s`
  particle.style.animationDelay = `${delay}s`

  container.appendChild(particle)

  // Remove and recreate particle after animation
  setTimeout(
    () => {
      if (particle.parentNode) {
        particle.remove()
        createParticle(container)
      }
    },
    (duration + delay) * 1000,
  )
}

// AOS (Animate On Scroll) Implementation
function initAOS() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate")
      }
    })
  }, observerOptions)

  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el)
  })
}

// Preload critical images
const preloadImage = (src) => {
  const img = new Image()
  img.src = src
}

// Preload hero background
preloadImage("/placeholder.svg?height=800&width=1200")

// Error handling for failed image loads
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "none"
  })
})
