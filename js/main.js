let menu = document.querySelector(".menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  navbar.classList.toggle("open-menu");
  menu.classList.toggle("move");
};

window.onscroll = () => {
  navbar.classList.remove("open-menu");
  menu.classList.remove("move");
};

// Reviews Swiper
var swiper = new Swiper(".reviews-content", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Use Live Server To Work The Form
// Email JS
emailjs.init('PGko1wOE1zdowljwD');

function sendmail(name, email, msg) {
  emailjs.send(
    "service_ci96qxh",
    "template_0wohbjg",
    {
      from_name: name,
      to_name: "edson@r9mkt.com.br",
      email: email,
      message: msg,
    }
  )
  .then((response) => {
    console.log('E-mail enviado com sucesso!', response);
    success();
    localStorage.setItem('lastSend', new Date().toISOString());
  })
  .catch((error) => {
    console.log('Erro ao enviar e-mail:', error);
  });
}

function validate() {
  let name = document.querySelector(".name");
  let email = document.querySelector(".email");
  let msg = document.querySelector(".message");
  let sendBtn = document.querySelector(".send-btn");
  
  let lastSend = localStorage.getItem('lastSend');
  let now = new Date().toISOString();
  
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (lastSend && isSameDay(lastSend, now)) {
      swal({
        title: "Formulário já enviado hoje!",
        text: "Você só pode enviar o formulário uma vez por dia.",
        icon: "error",
      });
      return;
    }
    
    if (name.value == "" || email.value == "" || msg.value == "") {
      emptyerror();
      return;
    }
    
    if (!validateEmail(email.value)) {
      swal({
        title: "E-mail inválido!",
        text: "Por favor, insira um e-mail válido.",
        icon: "error",
      });
      return;
    }
    
    if (isSpam(msg.value)) {
      swal({
        title: "Mensagem suspeita!",
        text: "Por favor, verifique sua mensagem.",
        icon: "error",
      });
      return;
    }
    
    sendmail(name.value, email.value, msg.value);
  });
}

validate();

function emptyerror() {
  swal({
    title: "Oh No....",
    text: "Fields cannot be empty!",
    icon: "error",
  });
}

function success() {
  swal({
    title: "E-mail enviado com sucesso!",
    text: "Em até 48 horas entramos em contato.",
    icon: "success",
  });
  // Limpar formulário
  let name = document.querySelector(".name");
  let email = document.querySelector(".email");
  let msg = document.querySelector(".message");
  name.value = "";
  email.value = "";
  msg.value = "";
}

// Função para verificar se duas datas são do mesmo dia
function isSameDay(date1, date2) {
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

// Função para verificar se um e-mail é válido
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Função para verificar se uma mensagem é spam
function isSpam(msg) {
  let spamWords = ["viagra", "casino", "porn"];
  let spamLinks = ["http://", "https://"];
  
  for (let word of spamWords) {
    if (msg.toLowerCase().includes(word)) {
      return true;
    }
  }
  
  for (let link of spamLinks) {
    if (msg.includes(link)) {
      return true;
    }
  }
  
  return false;
}

// Header Background Change On Scroll
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("header-active", window.scrollY > 0);
});

// Scroll Top
let scrollTop = document.querySelector(".scroll-top");
window.addEventListener("scroll", () => {
  scrollTop.classList.toggle("scroll-active", window.scrollY >= 400);
});
