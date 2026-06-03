# 🌍 Países e suas Informações

Projeto interativo que exibe informações de países com navegação entre lista e página de detalhes.

## 📋 O que o projeto oferece

- Página inicial com título e botão para abrir a lista de países.
- Lista de países com bandeira, capital, região, população, área e idiomas.
- Navegação para página de detalhes de cada país.
- Uso de parâmetros de URL (`URLSearchParams`) para carregar detalhes específicos.
- Requisição à API Rest Countries para exibir dados atualizados.
- Feedback de carregamento e mensagem de erro em caso de falha.
- Organização do código em módulos JavaScript.

## 📁 Estrutura do projeto

```
AV1-RAPHAELA/
├── index.html          # Página inicial e lista de países
├── details.html        # Página de detalhes do país
├── README.md           # Documentação do projeto
├── CSS/
│   └── style.css       # Estilos da aplicação
├── JS/
│   ├── api.js          # Requisições à API
│   ├── utils.js        # Funções utilitárias
│   ├── script.js       # Lógica da página inicial/listagem
│   └── details.js      # Lógica da página de detalhes
└── data/ (opcional)    # Dados estáticos ou extras
```

## 🚀 Como usar

1. Abra `index.html` em um navegador moderno.
2. Clique em **Ver países** para carregar a lista.
3. Aguarde o carregamento e use a busca para filtrar resultados.
4. Clique em um país para abrir `details.html` com informações específicas.

## 🔧 Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript ES6 com módulos (`import` / `export`)
- Bootstrap 5
- API Rest Countries

## 🌐 Funcionalidades principais

- **Página inicial clara** com chamada para ação.
- **Busca responsiva** em tempo real.
- **Detalhes do país** em outra página usando parâmetros de URL.
- **Carregamento com spinner** e tratamento de erro.
- **Dados atualizados** via API.

## 📌 Observações

- A página de detalhes depende do parâmetro `code` na URL.
- Caso a API não encontre o país, uma mensagem de erro aparece.
- O projeto está organizado em módulos para melhor manutenção.

## 👩‍💻 Desenvolvido por

Raphaela Bozi - Junho 2026

