**Curso: Inteligências Artificiais Generativas Aplicadas a Programação - ChatGPT - SENAI - 08/2026**  
#### https://jeffersonlsilva2021-source.github.io/ProjetoIAChat/


# Situação de Aprendizagem
## Projeto Final — Assistente Virtual com IA

---

## 📋 Índice
- [Objetivo](#objetivo)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Prompt](#prompt)
- [API](#api)
- [Fluxo](#fluxo)
- [Bônus](#bônus)
- [Entrega](#entrega)

---

## Projeto Final

### 🎯 Objetivo

Neste projeto você desenvolverá um Assistente Virtual Inteligente utilizando a API da OpenAI. O sistema deverá possuir um front-end desenvolvido em HTML, CSS e JavaScript, comunicando-se com uma API criada em Node.js responsável por acessar a OpenAI.

**Importante:** Não será utilizado banco de dados neste projeto.

---

### 🛠 Tecnologias Obrigatórias

| Front-end | Back-end |
|-----------|----------|
| HTML5 | Node.js |
| CSS3 | Express |
| JavaScript | API da OpenAI |
| Fetch API | |

---

### ✅ Funcionalidades Obrigatórias

#### 1. Interface do Chat
- Design de acordo com o tema/cenário escolhido
- Área de mensagens
- Campo de digitação
- Botão Enviar
- Botão Nova Conversa

#### 2. Envio de Mensagens
- Capturar mensagem digitada
- Enviar utilizando Fetch
- Exibir resposta da IA

#### 3. Histórico
As mensagens devem permanecer armazenadas durante toda a conversa.

```javascript```
let messages = [];

**4. Nova Conversa**
- Limpar mensagens
- Reiniciar histórico

**5. Indicador de Carregamento**
- Pensando...
- Carregando...
- Spinner

**6. Tratamento de Erros**
Exibir mensagem amigável caso ocorra erro na comunicação com a API.

**7. Organização Visual**
- Diferenciar mensagens do usuário
- Diferenciar mensagens da IA

---

### 🎨 Escolha do Tema

Neste projeto, você pode escolher livremente o tema e o cenário do seu Assistente Virtual.

A ideia é que você utilize sua criatividade para desenvolver um assistente que tenha uma finalidade específica e uma identidade visual relacionada ao tema escolhido.

💡 Algumas ideias de temas
- 🍕 Assistente de uma pizzaria
- 🏋️ Assistente de uma academia
- 🎓 Assistente de uma escola ou curso
- 🏥 Assistente de uma clínica
- ✈️ Assistente de uma agência de viagens
- 🎮 Assistente de uma loja de jogos
- 🐶 Assistente de um pet shop
- 💻 Assistente de suporte técnico
- 🍔 Assistente de um restaurante
- 🎬 Assistente de uma plataforma de filmes

🚀 Use a criatividade!

O tema é livre. Escolha uma ideia que permita demonstrar suas habilidades em HTML, CSS, JavaScript, Node.js e integração com a API da OpenAI.

🎯 O tema deve influenciar o projeto

O tema escolhido não deve aparecer apenas no título. Ele deve estar presente na identidade visual, no conteúdo das conversas, na personalidade da IA e no System Prompt.

Por exemplo, se você criar um assistente para uma academia, a IA pode atuar como um personal trainer virtual, utilizando uma linguagem motivadora e respondendo dúvidas relacionadas a exercícios e atividades físicas.

---

### 🧠 System Prompt

O System Prompt é responsável por definir o comportamento, a personalidade, as regras e as instruções que a IA deverá seguir durante toda a conversa.

Antes de enviar as mensagens do usuário para a API da OpenAI, sua aplicação deverá incluir um System Prompt. Esse prompt servirá como contexto inicial para orientar o modelo sobre como responder, quais regras seguir e qual papel desempenhar durante a interação.

Por exemplo, o System Prompt pode definir:

🎭 Persona: quem a IA deve representar;
🗣️ Tom de comunicação: formal, amigável, técnico, descontraído etc.;
📋 Regras de comportamento: o que a IA deve ou não fazer;
🎯 Objetivo: qual é a finalidade principal do assistente;
🚫 Restrições: informações ou comportamentos que devem ser evitados;
💬 Formato das respostas: texto, JSON, listas, tabelas, entre outros.

Dessa forma, o System Prompt funciona como um conjunto de instruções fundamentais que orienta o comportamento do modelo ao longo da conversa.

---

### 🌐 API

POST /chat

**Entrada:**
```json```
{ "mensagem":"Oi" }

**Saída:**
```json```
{ "response":"Olá! Como posso ajudá-lo hoje?" }

## 🔄 Fluxo Esperado

1. Usuário digita uma mensagem.
2. JavaScript envia para API utilizando Fetch.
3. A API adiciona o Prompt do Sistema.
4. A API envia a conversa para a OpenAI.
5. A OpenAI retorna a resposta.
6. A API devolve a resposta.
7. Front-end exibe a resposta.

## ⭐ Funcionalidades Extras (Bônus)

- Hospedagem do chat e api
- Documentação da API em um README.md
- Modo Claro e modo Escuro
- Enviar com Enter
- Copiar respostas
- Limpar conversa
- Contador de mensagens
- Horário das mensagens
- Scroll automático
- Markdown
- LocalStorage

## 📧 Entrega

- Data entrega: **05/09/2026**
- Código do Front-end
- Código da API em Node.js
- **Postar os arquivos no classroom da sala, ou enviar no email jefferson.lopes@sp.senai.br**
  - Caso o código esteja no github, envie o link do repositório público
  - Se o site está hospedado, também envie o link para acesso na internet.
