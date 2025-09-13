<div align="center">

Meu Pet Amigo 🐾✨
O seu assistente pessoal para o cuidado e a alegria do seu pet.
Uma experiência "lovable" que conecta tutores e pets através de tecnologia, design e inteligência artificial.

<p>
<a href="#-sobre-o-projeto">Sobre</a> •
<a href="#-funcionalidades-em-destaque">Funcionalidades</a> •
<a href="#-tech-stack-as-ferramentas-por-trás-da-magia">Tecnologias</a> •
<a href="#-como-executar-o-projeto-localmente">Como Executar</a>
</p>

➡️ Acesse a versão Beta do App aqui!

</div>

🎬 Demonstração
(GIF demonstrando a fluidez da navegação, a personalização do perfil e a interação com o chat de IA)

💖 Sobre o Projeto: Mais que um App, um Companheiro
O Meu Pet Amigo nasceu de uma premissa simples: o cuidado com nossos pets deveria ser tão alegre quanto a companhia que eles nos oferecem. Rejeitando a ideia de um utilitário genérico, o projeto foi concebido desde o primeiro dia para ser uma experiência "lovable" — um companheiro digital que fortalece o vínculo entre os donos e seus animais de estimação.

Gerenciado através de uma metodologia ágil com Sprints, este projeto foi meticulosamente desenvolvido com um foco obsessivo em UX/UI Design. Cada pixel, cada animação e cada linha de código foram pensados para transformar interações rotineiras em momentos de encanto e utilidade. Desde a microinteração tátil em um botão até uma conversa empática com a IA, cada detalhe serve a um propósito: fazer o usuário sorrir.

✨ Funcionalidades em Destaque
🏠 Dashboard Premium e Dinâmico: Uma tela inicial que acolhe o usuário com uma saudação personalizada baseada no horário, um fundo com gradiente animado e interações sutis que criam uma experiência imersiva e viva.

🤖 Assistente Virtual com IA: Um chat inteligente, potencializado pelo Google Gemini, que oferece conselhos, recomendações de produtos e ajuda, tudo com um tom carinhoso e personalizado para o nome e a raça do pet.

👤 Perfil do Pet 100% Personalizável: O usuário pode editar o nome, a raça e a foto do seu pet. As informações são salvas no localStorage para uma experiência contínua e pessoal.

🛍️ Vitrine de Produtos Inteligente: Uma tela de produtos com design coeso, apresentando recomendações personalizadas da IA e uma interface de compra clara, tudo envolto em um elegante efeito de glassmorphism.

💅 Design Consistente e Moderno: Todas as telas compartilham uma identidade visual premium, utilizando efeitos de backdrop-blur para criar profundidade e uma paleta de cores que inspira confiança e carinho.

✅ Feedback de Usuário Aprimorado: O aplicativo utiliza notificações "toast" para confirmações e erros, e feedback háptico (vibração) para uma sensação de interatividade mais tátil e responsiva.

🛠️ Tech Stack: As Ferramentas por Trás da Magia
Cada tecnologia foi escolhida com um propósito claro: entregar a melhor experiência para o usuário com a máxima performance e uma base de código limpa e escalável.

Tecnologia

Função no Projeto

Por que foi escolhida?

React

Biblioteca principal para a UI

Para criar uma interface reativa e componentizada. A gestão de estados com Hooks (useState, useEffect) foi essencial para a complexidade dos modais e a sincronização de dados.

Vite

Ferramenta de Build e Servidor de Desenvolvimento

Pela sua velocidade incomparável no desenvolvimento (Hot Module Replacement) e um processo de build otimizado que resulta em um bundle de produção leve e performático.

Tailwind CSS

Framework de Estilização

Possibilitou a prototipagem e a construção rápida de uma UI customizada e consistente, seguindo os princípios de utility-first.

Google Gemini

Motor de IA

O modelo gemini-2.5-flash foi escolhido por seu excelente equilíbrio entre velocidade, inteligência e acessibilidade via API, sendo o cérebro do nosso assistente virtual.

React Hot Toast

Sistema de Notificações

Forneceu um sistema de feedback visual elegante e não intrusivo para ações como salvar um perfil ou encontrar erros de validação.

GitHub

Controle de Versão

Essencial para gerenciar o código-fonte, rastrear mudanças e colaborar de forma segura.

Vercel

Plataforma de Deploy

Integrada ao GitHub, permitiu um fluxo de CI/CD (Continuous Integration/Continuous Deployment) automatizado, publicando o app a cada atualização.

🚀 Como Executar o Projeto Localmente
Siga os passos abaixo para ter uma cópia do projeto rodando na sua máquina.

Pré-requisitos:

Node.js (versão LTS recomendada): Baixe aqui

Git: Baixe aqui

Passos:

Clone o repositório:

git clone [https://github.com/B0Nascimento/meu-pet-amigo.git](https://github.com/B0Nascimento/meu-pet-amigo.git)

Navegue até a pasta do projeto:

cd meu-pet-amigo

Instale as dependências:

npm install

Configure sua Chave de API:

Crie um arquivo chamado .env.local na raiz do projeto.

Dentro dele, adicione sua chave da API do Google AI Studio:

VITE_GEMINI_API_KEY=SUA_CHAVE_DE_API_AQUI

Inicie o servidor de desenvolvimento:

npm run dev

Agora, abra seu navegador e acesse http://localhost:5173 para ver o aplicativo em ação!

<div align="center">
Este projeto foi uma jornada incrível de colaboração e aprendizado. Cada linha de código foi escrita com a intenção de não apenas funcionar, mas de criar uma pequena faísca de alegria na rotina de cuidado com os pets. 🐾
</div>