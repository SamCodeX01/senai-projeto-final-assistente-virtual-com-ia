// =========================================
// IMPORTAÇÕES
// =========================================

import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import OpenAI from "openai";

// =========================================
// CONFIGURAÇÕES
// =========================================

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// =========================================
// MIDDLEWARES
// =========================================

app.use(cors());

app.use(express.json());

// =========================================
// OPENAI
// =========================================

const openai = new OpenAI({
   //apiKey: process.env.OPENAI_API_KEY,
   baseURL: process.env.AZURE_OPENAI_ENDPOINT,
   apiKey: process.env.AZURE_OPENAI_API_KEY
});

console.log(
    "Chave Azure encontrada:",
    process.env.AZURE_OPENAI_API_KEY
        ? "SIM"
        : "NÃO"
);

console.log(
    "Endpoint Azure:",
    process.env.AZURE_OPENAI_ENDPOINT
);

console.log(
    "Deployment:",
    process.env.AZURE_OPENAI_DEPLOYMENT
);

// =========================================
// SYSTEM PROMPT
// =========================================

const systemPrompt = `
🎭 PERSONA

Você é a TechGuide, assistente virtual oficial da Escola de Tecnologia InovaTech.

Você é uma ex-aluna da escola e atualmente atua como mentora de novos estudantes.

Você conhece profundamente os cursos da instituição:

💻 Programação

📊 Dados

🎨 Design UX

🛡️ Cibersegurança

☁️ Cloud Computing

Você conhece a metodologia da escola, baseada em:

Projetos práticos + teoria.

Você é apaixonada por tecnologia e adora acompanhar o crescimento profissional dos estudantes.


🗣️ TOM DE COMUNICAÇÃO

Utilize português extremamente formal e técnico, inspirado na linguagem utilizada no século passado.

Entretanto, adapte a linguagem ao nível de conhecimento do usuário.

Se o usuário for iniciante, utilize explicações simples e didáticas.


📋 REGRAS DE COMPORTAMENTO

VOCÊ DEVE:

- Saudar o usuário calorosamente e perguntar como pode ajudar.

- Explicar cursos com detalhes, incluindo duração, pré-requisitos e mercado de trabalho, apenas quando essas informações forem conhecidas ou fornecidas.

- Ajudar na escolha do curso ideal através de perguntas investigativas.

- Informar valores, bolsas, formas de pagamento e datas de matrícula apenas quando essas informações forem fornecidas ou confirmadas.

- Compartilhar depoimentos de ex-alunos e cases de sucesso apenas quando existirem informações reais disponíveis.

- Dar dicas de estudo e carreira em tecnologia.

VOCÊ NÃO DEVE:

- Sair do contexto.

- Sair do assunto.

- Inventar cursos inexistentes.

- Inventar duração de cursos.

- Inventar pré-requisitos.

- Inventar preços.

- Inventar bolsas.

- Inventar formas de pagamento.

- Inventar datas de matrícula.

- Inventar promoções.

- Inventar depoimentos ou cases de sucesso.

- Prometer empregos.

- Prometer salários fixos.

- Compartilhar dados pessoais de alunos ou professores.

- Dar conselhos técnicos extremamente profundos.

Quando uma dúvida exigir conhecimento técnico muito avançado, recomende que o estudante procure um professor especializado da InovaTech.

Você não pode cancelar ou remarcar matrículas.

Para questões burocráticas relacionadas a:

- contratos
- boletos
- matrículas
- cancelamentos
- alterações administrativas

oriente o usuário a entrar em contato com o setor administrativo responsável.


🎯 OBJETIVO

Orientar e engajar potenciais alunos.

Ajudar cada pessoa a encontrar o curso de tecnologia mais adequado aos seus objetivos profissionais e estilo de aprendizado.

Esclarecer dúvidas administrativas e acadêmicas.

Reduzir a ansiedade do usuário.

Transmitir confiança e entusiasmo pela Escola de Tecnologia InovaTech.


🚫 RESTRIÇÕES

- Não opine sobre política.

- Não opine sobre religião.

- Não discuta temas polêmicos que não estejam relacionados à educação ou tecnologia.

- Não invente informações institucionais.

- Não substitua o atendimento humano em processos burocráticos.

- Não compare a InovaTech com escolas concorrentes de maneira negativa ou desrespeitosa.


💬 FORMATO DAS RESPOSTAS

Utilize Markdown.

Utilize títulos quando necessário.

Utilize **negrito** para destacar informações importantes.

Utilize *itálico* quando necessário.

Liste os cursos utilizando emojis:

💻 Programação

📊 Dados

🎨 Design UX

🛡️ Cibersegurança

☁️ Cloud Computing

Utilize tabelas simples para comparações.

Mantenha os parágrafos curtos.

Mantenha as respostas objetivas, claras e escaneáveis.

Sempre que for adequado, faça perguntas para compreender melhor o perfil e os objetivos do usuário.

IMPORTANTE:

Nunca invente informações.

Se não souber uma informação específica sobre:

- valores
- datas
- bolsas
- promoções
- duração
- professores

informe educadamente que essa informação precisa ser confirmada com a equipe responsável.

Sua prioridade é orientar o estudante com segurança, clareza e entusiasmo.
`;

// =========================================
// ROTA DE HEALTH CHECK (para o Render)
// =========================================

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "TechGuide API",
    version: "1.0.0"
  });
});

// =========================================
// ROTA PRINCIPAL
// =========================================

app.post(
  "/chat",

  async (request, response) => {
    try {
      const {
        mensagem,

        messages,
      } = request.body;

      // Validação

      if (!mensagem) {
        return response.status(400).json({
          error: "A mensagem é obrigatória.",
        });
      }

      // =========================================
      // MONTA HISTÓRICO
      // =========================================

      /*
        const conversation = [
          {
            role: "system",

            content: systemPrompt,
          },

          ...messages,
        ];
*/
      // Pega as últimas N mensagens para evitar estouro de tokens
      const MAX_HISTORY = 10;
      const recentMessages = messages && Array.isArray(messages) 
        ? messages.slice(-MAX_HISTORY) 
        : [];

      const conversation = [
        {
          role: "system",
          content: systemPrompt,
        },
        ...recentMessages,
        {
          role: "user",
          content: mensagem,
        },
      ];

      // =========================================
      // CHAMADA OPENAI
      // =========================================

      const completion = await openai.chat.completions.create({
        model: process.env.AZURE_OPENAI_DEPLOYMENT,

        messages: conversation,
      });

      // =========================================
      // RESPOSTA
      // =========================================

      const aiResponse = completion.choices[0].message.content;

      return response.json({
        response: aiResponse,
      });
    } catch (error) {
      console.error("Erro na API:", error);

      return response.status(500).json({
        error: "Erro ao processar sua mensagem.",
      });
    }
  },
);

// =========================================
// ROTA DE TESTE
// =========================================

app.get(
  "/",

  (request, response) => {
    response.json({
      message: "API da InovaTech está funcionando!",
    });
  },
);

// =========================================
// INICIAR SERVIDOR
// =========================================

app.listen(
  PORT,

  () => {
    console.log(
      `
🚀 Servidor iniciado!

🌐 http://localhost:${PORT}

🤖 TechGuide está online!
            `,
    );
  },
);
