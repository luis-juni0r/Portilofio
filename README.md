# Portfólio de Luís Junior

![Portifolio no computador](images/screenshot-desktop.png)

## Objetivo

Apresentar quem eu sou, minhas habilidades e meus projetos para recrutadores e para quem abrir o meu GitHub. O site foi feito para a atividade prática "O meu portfólio" (Desenvolvimento de Sistemas) e segue a estrutura do wireframe da aula, com 7 partes: cabeçalho, início, sobre mim, habilidades, projetos, contato e rodapé.

## Como fica no celular

O layout se reorganiza em telas estreitas (testado com 375 px): o menu vira um botão, a foto sobe para o topo e os projetos ficam em uma coluna.

<img src="images/screenshot-celular.png" alt="Portfólio no celular, com 375 px de largura" width="280">

## Tecnologias usadas

- **HTML5 semântico**: `header`, `nav`, `main`, `section` e `footer`, com texto alternativo nas imagens e `label` em todos os campos do formulário.
- **CSS3** em arquivo externo (`style.css`): Flexbox e Grid, variáveis de cor, tema claro e escuro, media queries.
- **JavaScript** puro (`script.js`):
  - tema claro/escuro (a escolha fica salva no navegador);
  - menu que abre e fecha no celular;
  - botão "Saiba mais" que expande os cartões de projeto;
  - formulário de contato com validação e confirmação.
- **Git e GitHub** para o histórico e a publicação.
- Fontes: Trebuchet MS nos títulos e Segoe UI no texto (já vêm no Windows, sem depender da internet). Cores principais: azul-marinho `#0f2747` e âmbar `#f5a400`.

## Como abrir

1. Baixe ou clone o repositório:
   ```
   git clone https://github.com/SEU-USUARIO/portfolio.git
   ```
2. Abra a pasta `portfolio` e dê dois cliques em `index.html`. Não precisa instalar nada.

## Estrutura de arquivos

```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
```

## Observações

- O formulário não usa servidor: ao enviar, ele abre o aplicativo de e-mail do visitante com a mensagem pronta.
- Este site não contém telefone, endereço, CPF, senhas nem tokens.

Site:(em breve)
