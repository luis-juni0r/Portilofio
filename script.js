/* =========================================================
   Portfólio de Luís Junior — interações
   1) Tema claro/escuro (lembra a escolha)
   2) Menu que abre e fecha no celular
   3) Cartões de projeto que expandem ("Saiba mais")
   4) Formulário de contato com validação e confirmação
   ========================================================= */

console.log("Portfólio carregado: script.js ligado ao index.html");

/* ---------- 1) Tema claro/escuro ---------- */
/* Roda já no <head>, antes de a página aparecer, para não "piscar". */
var CHAVE_TEMA = "portfolio-tema";

function lerTemaSalvo() {
  try {
    return localStorage.getItem(CHAVE_TEMA);
  } catch (erro) {
    return null; // navegador bloqueou o armazenamento
  }
}

function salvarTema(tema) {
  try {
    localStorage.setItem(CHAVE_TEMA, tema);
  } catch (erro) {
    /* sem problema: o tema só não será lembrado */
  }
}

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);

  var botao = document.getElementById("tema-btn");
  if (botao) {
    var vaiParaClaro = tema === "dark";
    botao.textContent = vaiParaClaro ? "☀ Claro" : "☾ Escuro";
    botao.setAttribute(
      "aria-label",
      vaiParaClaro ? "Mudar para o tema claro" : "Mudar para o tema escuro"
    );
  }
}

var prefereEscuro =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
aplicarTema(lerTemaSalvo() || (prefereEscuro ? "dark" : "light"));

/* ---------- O resto precisa da página montada ---------- */
document.addEventListener("DOMContentLoaded", function () {
  // atualiza o texto do botão agora que ele existe
  aplicarTema(document.documentElement.getAttribute("data-theme"));

  iniciarTema();
  iniciarMenu();
  iniciarCartoes();
  iniciarFormulario();
});

function iniciarTema() {
  var botao = document.getElementById("tema-btn");
  if (!botao) return;

  botao.addEventListener("click", function () {
    var atual = document.documentElement.getAttribute("data-theme");
    var novo = atual === "dark" ? "light" : "dark";
    aplicarTema(novo);
    salvarTema(novo);
  });
}

/* ---------- 2) Menu do celular ---------- */
function iniciarMenu() {
  var cabecalho = document.querySelector(".site-header");
  var botao = document.getElementById("menu-btn");
  var menu = document.getElementById("menu");
  if (!cabecalho || !botao || !menu) return;

  function definirMenu(aberto) {
    cabecalho.classList.toggle("menu-open", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }

  botao.addEventListener("click", function () {
    definirMenu(!cabecalho.classList.contains("menu-open"));
  });

  // fecha o menu ao escolher uma seção
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      definirMenu(false);
    });
  });

  // fecha com a tecla Esc
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") definirMenu(false);
  });
}

/* ---------- 3) Cartões de projeto ---------- */
function iniciarCartoes() {
  document.querySelectorAll(".link-btn").forEach(function (botao) {
    var detalhe = document.getElementById(botao.getAttribute("aria-controls"));
    if (!detalhe) return;

    botao.addEventListener("click", function () {
      var vaiAbrir = detalhe.hidden;
      detalhe.hidden = !vaiAbrir;
      botao.setAttribute("aria-expanded", String(vaiAbrir));
      botao.textContent = vaiAbrir ? "Mostrar menos ↑" : "Saiba mais →";
    });
  });
}

/* ---------- 4) Formulário de contato ---------- */
function iniciarFormulario() {
  var form = document.getElementById("form-contato");
  var status = document.getElementById("form-status");
  if (!form || !status) return;

  var campos = {
    nome: form.elements["nome"],
    email: form.elements["email"],
    mensagem: form.elements["mensagem"]
  };

  function mostrarErro(campo, texto) {
    var caixa = campo.closest(".field");
    caixa.classList.toggle("has-error", texto !== "");
    document.getElementById("erro-" + campo.name).textContent = texto;
    campo.setAttribute("aria-invalid", texto !== "" ? "true" : "false");
  }

  function validar(campo) {
    var valor = campo.value.trim();
    var erro = "";

    if (campo.name === "nome" && valor.length < 2) {
      erro = "Digite o seu nome.";
    } else if (campo.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      erro = "Digite um e-mail válido, como nome@exemplo.com.";
    } else if (campo.name === "mensagem" && valor.length < 10) {
      erro = "Escreva uma mensagem com pelo menos 10 letras.";
    }

    mostrarErro(campo, erro);
    return erro === "";
  }

  // corrige o erro assim que a pessoa começa a digitar de novo
  Object.keys(campos).forEach(function (nome) {
    campos[nome].addEventListener("input", function () {
      if (campos[nome].closest(".field").classList.contains("has-error")) {
        validar(campos[nome]);
      }
    });
  });

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    status.textContent = "";

    var tudoCerto = true;
    Object.keys(campos).forEach(function (nome) {
      if (!validar(campos[nome])) tudoCerto = false;
    });

    if (!tudoCerto) {
      // leva o foco para o primeiro campo com problema
      var primeiro = form.querySelector(".has-error input, .has-error textarea");
      if (primeiro) primeiro.focus();
      return;
    }

    var nome = campos.nome.value.trim();
    var email = campos.email.value.trim();
    var mensagem = campos.mensagem.value.trim();

    status.textContent =
      "Obrigado, " + nome + "! Estou abrindo o seu aplicativo de e-mail para enviar a mensagem.";

    // o formulário não tem servidor: a mensagem sai pelo e-mail do dono do site
    var destino = document.querySelector('a[href^="mailto:"]');
    if (destino) {
      var enderecoDestino = destino.getAttribute("href").replace("mailto:", "");
      var assunto = "Contato pelo portfólio - " + nome;
      var corpo = mensagem + "\n\nResponder para: " + email;
      window.location.href =
        "mailto:" + enderecoDestino +
        "?subject=" + encodeURIComponent(assunto) +
        "&body=" + encodeURIComponent(corpo);
    }

    form.reset();
  });
}
