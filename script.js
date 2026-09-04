// =========================================
// CONFIGURAÇÕES
// =========================================

const API_URL = "http://localhost:3000/chat";
//const API_URL = "https://turmagpt.services.ai.azure.com/openai/v1";

// =========================================
// ELEMENTOS
// =========================================

const chatMessages = document.getElementById("chatMessages");

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const newChatBtn = document.getElementById("newChatBtn");

const clearBtn = document.getElementById("clearBtn");

const themeBtn = document.getElementById("themeBtn");

const messageCounter = document.getElementById("messageCounter");

// =========================================
// HISTÓRICO DA CONVERSA
// =========================================

let messages = JSON.parse(localStorage.getItem("inovatechMessages")) || [];

// =========================================
// INICIALIZAÇÃO
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  loadMessages();

  loadTheme();

  updateCounter();
});

// =========================================
// ENVIAR MENSAGEM
// =========================================

sendBtn.addEventListener("click", sendMessage);

// =========================================
// ENTER PARA ENVIAR
// =========================================

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();

    sendMessage();
  }
});

// =========================================
// AUTO RESIZE
// =========================================

messageInput.addEventListener("input", () => {
  messageInput.style.height = "auto";

  messageInput.style.height = messageInput.scrollHeight + "px";
});

// =========================================
// FUNÇÃO PRINCIPAL
// =========================================

async function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) {
    return;
  }

  // Adiciona mensagem do usuário

  addMessage(text, "user");

  // Salva no histórico

  messages.push({
    role: "user",

    content: text,
  });

  saveMessages();

  // Limpa input

  messageInput.value = "";

  messageInput.style.height = "auto";

  // Desabilita botão

  sendBtn.disabled = true;

  // Mostra loading

  showLoading();

  try {
    // =========================================
    // FETCH API
    // =========================================

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        mensagem: text,

        messages: messages,
      }),
    });

    // Verifica erro HTTP

    if (!response.ok) {
      throw new Error("Erro na comunicação com a API.");
    }

    const data = await response.json();

    // Remove loading

    removeLoading();

    // Adiciona resposta da IA

    addMessage(
      data.response,

      "assistant",
    );

    // Salva resposta

    messages.push({
      role: "assistant",

      content: data.response,
    });

    saveMessages();
  } catch (error) {
    console.error("Erro completo", error);

    removeLoading();

    // Mensagem amigável

addMessage(
            `### ⚠️ Problema de conexão

            Não foi possível estabelecer comunicação com a **TechGuide** neste momento.

            **Erro encontrado:**

            \`${error.message}\`

            Por gentileza, verifique se o servidor está funcionando e tente novamente.`,
        "assistant"
    );

  } finally {
    sendBtn.disabled = false;

    messageInput.focus();

    updateCounter();
  }
}

// =========================================
// ADICIONAR MENSAGEM
// =========================================

function addMessage(content, role) {
  const message = document.createElement("div");

  message.classList.add("message");

  message.classList.add(`${role}-message`);

  // Avatar

  const avatar = document.createElement("div");

  avatar.classList.add("message-avatar");

  avatar.innerHTML =
    role === "assistant" ? `<i class="fa-solid fa-robot"></i>`: `<i class="fa-solid fa-user"></i>`;

  // Conteúdo

  const messageContent = document.createElement("div");

  messageContent.classList.add("message-content");

  const bubble = document.createElement("div");

  bubble.classList.add("message-bubble");

  // Markdown

  bubble.innerHTML = marked.parse(content);

  // Footer

  const footer = document.createElement("div");

  footer.classList.add("message-footer");

  const time = document.createElement("span");

  time.classList.add("message-time");

  time.textContent = getCurrentTime();

  footer.appendChild(time);

  // Botão copiar apenas IA

  if (role === "assistant") {
    const copyButton = document.createElement("button");

    copyButton.classList.add("copy-btn");

    copyButton.innerHTML = `
            <i class="fa-regular fa-copy"></i>
            Copiar
            `;

    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(content);

      copyButton.innerHTML = `
                    <i class="fa-solid fa-check"></i>
                    Copiado!
                    `;

      setTimeout(
        () => {
          copyButton.innerHTML = `
                            <i class="fa-regular fa-copy"></i>
                            Copiar
                            `;
        },

        2000,
      );
    });

    footer.appendChild(copyButton);
  }

  messageContent.appendChild(bubble);

  messageContent.appendChild(footer);

  message.appendChild(avatar);

  message.appendChild(messageContent);

  chatMessages.appendChild(message);

  scrollToBottom();
}

// =========================================
// LOADING
// =========================================

function showLoading() {
  const loading = document.createElement("div");

  loading.id = "loadingMessage";

  loading.classList.add("message", "assistant-message");

  loading.innerHTML = `
        <div class="message-avatar">

            <i class="fa-solid fa-robot"></i>

        </div>


        <div class="message-content">

            <div class="message-bubble">

                <strong>
                    TechGuide está pensando...
                </strong>


                <div class="typing-indicator">

                    <div class="typing-dot"></div>

                    <div class="typing-dot"></div>

                    <div class="typing-dot"></div>

                </div>

            </div>

        </div>
        `;

  chatMessages.appendChild(loading);

  scrollToBottom();
}

// =========================================
// REMOVER LOADING
// =========================================

function removeLoading() {
  const loading = document.getElementById("loadingMessage");

  if (loading) {
    loading.remove();
  }
}

// =========================================
// NOVA CONVERSA
// =========================================

newChatBtn.addEventListener("click", startNewConversation);

clearBtn.addEventListener("click", startNewConversation);

function startNewConversation() {
  const confirmClear = confirm("Deseja realmente iniciar uma nova conversa?");

  if (!confirmClear) {
    return;
  }

  // Limpa histórico

  messages = [];

  // Remove LocalStorage

  localStorage.removeItem("inovatechMessages");

  // Limpa tela

  chatMessages.innerHTML = "";

  // Cria mensagem inicial

  showWelcomeMessage();

  updateCounter();
}

// =========================================
// MENSAGEM INICIAL
// =========================================

function showWelcomeMessage() {
  addMessage(
    `
### 👋 Saudações!

Seja muito bem-vindo à **Escola de Tecnologia InovaTech**.

Sou a **TechGuide**, sua mentora virtual.

Posso auxiliá-lo a conhecer nossas principais áreas:

💻 **Programação**

📊 **Dados**

🎨 **Design UX**

🛡️ **Cibersegurança**

☁️ **Cloud Computing**

**Como posso auxiliá-lo em sua jornada tecnológica?**
        `,

    "assistant",
  );
}

// =========================================
// SALVAR MENSAGENS
// =========================================

function saveMessages() {
  localStorage.setItem(
    "inovatechMessages",

    JSON.stringify(messages),
  );

  updateCounter();
}

// =========================================
// CARREGAR MENSAGENS
// =========================================

function loadMessages() {
  // Se não houver mensagens

  if (messages.length === 0) {
    return;
  }

  // Remove mensagem inicial HTML

  chatMessages.innerHTML = "";

  // Recria histórico

  messages.forEach((message) => {
    addMessage(
      message.content,

      message.role,
    );
  });
}

// =========================================
// CONTADOR
// =========================================

function updateCounter() {
  messageCounter.textContent = messages.length;
}

// =========================================
// HORÁRIO
// =========================================

function getCurrentTime() {
  const now = new Date();

  return now.toLocaleTimeString(
    "pt-BR",

    {
      hour: "2-digit",

      minute: "2-digit",
    },
  );
}

// =========================================
// SCROLL
// =========================================

function scrollToBottom() {
  chatMessages.scrollTo({
    top: chatMessages.scrollHeight,

    behavior: "smooth",
  });
}

// =========================================
// MODO CLARO / ESCURO
// =========================================

themeBtn.addEventListener("click", toggleTheme);

function toggleTheme() {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");

  // Salva preferência

  localStorage.setItem(
    "theme",

    isLight ? "light" : "dark",
  );

  // Altera ícone

  themeBtn.innerHTML = isLight
    ? `
                <i class="fa-solid fa-sun"></i>
              `
    : `
                <i class="fa-solid fa-moon"></i>
              `;
}

// =========================================
// CARREGAR TEMA
// =========================================

function loadTheme() {
  const theme = localStorage.getItem("theme");

  if (theme === "light") {
    document.body.classList.add("light-mode");

    themeBtn.innerHTML = `
            <i class="fa-solid fa-sun"></i>
            `;
  }
}
