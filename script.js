// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Menu mobile
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Validação do formulário
const contactForm = document.getElementById("contactForm")

// Funções de validação
function validateName(name) {
  return name.length >= 2
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone) {
  if (phone === "") return true // Campo opcional
  const phoneRegex = /^[\d\s\-$$$$]+$/
  return phoneRegex.test(phone) && phone.length >= 10
}

function validateMessage(message) {
  return message.length >= 10
}

// Mostrar erro
function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + "Error")
  const inputElement = document.getElementById(fieldId)

  errorElement.textContent = message
  inputElement.style.borderColor = "#e74c3c"
}

// Limpar erro
function clearError(fieldId) {
  const errorElement = document.getElementById(fieldId + "Error")
  const inputElement = document.getElementById(fieldId)

  errorElement.textContent = ""
  inputElement.style.borderColor = "#e0e0e0"
}

// Validação em tempo real
document.getElementById("name").addEventListener("blur", function () {
  if (!validateName(this.value)) {
    showError("name", "Nome deve ter pelo menos 2 caracteres")
  } else {
    clearError("name")
  }
})

document.getElementById("email").addEventListener("blur", function () {
  if (!validateEmail(this.value)) {
    showError("email", "Por favor, insira um e-mail válido")
  } else {
    clearError("email")
  }
})

document.getElementById("phone").addEventListener("blur", function () {
  if (!validatePhone(this.value)) {
    showError("phone", "Por favor, insira um telefone válido")
  } else {
    clearError("phone")
  }
})

document.getElementById("message").addEventListener("blur", function () {
  if (!validateMessage(this.value)) {
    showError("message", "Mensagem deve ter pelo menos 10 caracteres")
  } else {
    clearError("message")
  }
})

// Envio do formulário
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const phone = document.getElementById("phone").value.trim()
  const message = document.getElementById("message").value.trim()

  let isValid = true

  // Validar todos os campos
  if (!validateName(name)) {
    showError("name", "Nome deve ter pelo menos 2 caracteres")
    isValid = false
  } else {
    clearError("name")
  }

  if (!validateEmail(email)) {
    showError("email", "Por favor, insira um e-mail válido")
    isValid = false
  } else {
    clearError("email")
  }

  if (!validatePhone(phone)) {
    showError("phone", "Por favor, insira um telefone válido")
    isValid = false
  } else {
    clearError("phone")
  }

  if (!validateMessage(message)) {
    showError("message", "Mensagem deve ter pelo menos 10 caracteres")
    isValid = false
  } else {
    clearError("message")
  }

  if (isValid) {
    // Criar o corpo do e-mail
    const subject = encodeURIComponent("Contato do Site - Nil Cabelos")
    const body = encodeURIComponent(
      `Nome: ${name}\n` + `E-mail: ${email}\n` + `Telefone: ${phone}\n\n` + `Mensagem:\n${message}`,
    )

    // Abrir cliente de e-mail
    window.location.href = `mailto:cvdinizramos@gmail.com?subject=${subject}&body=${body}`

    // Mostrar mensagem de sucesso
    alert("Obrigado! Seu cliente de e-mail será aberto para enviar a mensagem.")

    // Limpar formulário
    contactForm.reset()
  }
})

// Efeito de scroll na navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
  }
})

// Animação de entrada dos elementos
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

// Aplicar animação aos elementos
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .gallery-item, .contact-info, .contact-form-container",
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
