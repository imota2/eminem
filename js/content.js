/* ============================================================
   ENTRE NÓS — uma história sem nome
   ------------------------------------------------------------------
   ARQUIVO DE CONTEÚDO (EDITE AQUI)
   ------------------------------------------------------------------
   Todo texto, lembrança, música e conceito mora aqui.
   Regras seguidas do briefing:
   - nada de declaração romântica/amorosa explícita;
   - nada de corações ou flores;
   - nada de datas ou fatos inventados;
   - informações que ela contou são a única fonte.
   ============================================================ */

window.PROJETO = {

  /* --------------------------------------------------------
     01 · CAPÍTULO ELA — pequenas descobertas
     Cada item é uma página quase vazia com um desenho de
     linha que se completa ao rolar. Ao tocar, uma resposta
     minúscula (o desenho afunda e a palavra aparece).
     "desenho" é um SVG próprio (nunca ícone de banco).
     -------------------------------------------------------- */
  descobertas: [
    {
      palavra: "gatos",
      nota: "você gosta deles.",
      desenho: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
        '<path pathLength="1" d="M33 34 L26 12 L42 26" style="--d:0s"/>' +
        '<path pathLength="1" d="M63 34 L70 12 L54 26" style="--d:.08s"/>' +
        '<path pathLength="1" d="M32 46 C20 60 22 80 48 80 C74 80 76 60 64 46" style="--d:.22s"/>' +
        '<path pathLength="1" d="M40 51 q1 -2 2 -1 M56 51 q1 -2 2 -1" style="--d:.4s"/>' +
        '<path pathLength="1" d="M43 63 q5 4 10 0" style="--d:.55s"/>' +
        '<path pathLength="1" d="M16 45 L30 49 M80 45 L66 49" style="--d:.7s"/></g></svg>'
    },
    {
      palavra: "lasanha",
      nota: "sua comida favorita.",
      desenho: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
        '<ellipse pathLength="1" cx="48" cy="54" rx="34" ry="27" style="--d:0s"/>' +
        '<ellipse pathLength="1" cx="48" cy="54" rx="25" ry="19" style="--d:.2s"/>' +
        '<path pathLength="1" d="M31 47 q17 -6 34 0 M31 55 q17 -6 34 0 M31 63 q17 -6 34 0" style="--d:.5s"/>' +
        '<path pathLength="1" d="M40 28 c4 -7 12 -7 16 0" style="--d:.8s"/></g></svg>'
    },
    {
      palavra: "energético de morango",
      nota: "sua escolha.",
      vermelho: true,
      desenho: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
        '<rect pathLength="1" x="31" y="14" width="34" height="14" style="--d:0s"/>' +
        '<path pathLength="1" d="M34 28 H62 L62 76 H34 Z" style="--d:.18s"/>' +
        '<path pathLength="1" d="M34 50 H62" style="--d:.4s"/>' +
        '<path pathLength="1" d="M48 58 c-6 0 -8 5 -8 10 a8 8 0 0 0 16 0 c0 -5 -2 -10 -8 -10 z" style="--d:.62s"/>' +
        '<path pathLength="1" d="M48 66 c0 4 3 6 7 7 M42 68 c1 3 4 5 7 6" style="--d:.8s"/></g></svg>'
    },
    {
      palavra: "cabelo",
      nota: "uma coisa que você ama em você.",
      desenho: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
        '<path pathLength="1" d="M48 14 C32 18 26 42 34 64 C40 78 48 84 54 78" style="--d:0s"/>' +
        '<path pathLength="1" d="M48 14 C64 18 70 42 62 64 C56 78 48 84 42 78" style="--d:.1s"/>' +
        '<path pathLength="1" d="M48 14 C40 30 36 48 40 70" style="--d:.3s"/>' +
        '<path pathLength="1" d="M48 14 C56 30 60 48 56 70" style="--d:.45s"/>' +
        '<path pathLength="1" d="M44 22 c-9 4 -13 18 -11 30" style="--d:.62s"/>' +
        '<path pathLength="1" d="M52 22 c9 4 13 18 11 30" style="--d:.78s"/></g></svg>'
    }
  ],

  /* --------------------------------------------------------
     02 · MÚSICA — três páginas, três atmosferas
     atmosfera: sombria (glory box) · transforma (metamorfose)
                · luz (sorriso resplandecente)
     -------------------------------------------------------- */
  musicas: [
    {
      nome: "glory box",
      nota: "sua música favorita.",
      atmosfera: "sombria",
      desenho: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
        '<rect pathLength="1" x="26" y="46" width="44" height="30" style="--d:0s"/>' +
        '<path pathLength="1" d="M22 46 h52" style="--d:.25s"/>' +
        '<path pathLength="1" d="M48 46 v-8 c0 -8 -14 -8 -14 0" style="--d:.5s"/>' +
        '<circle pathLength="1" cx="48" cy="61" r="2.4" style="--d:.8s"/></g></svg>'
    },
    {
      nome: "metamorfose",
      nota: "a que você mais escuta agora.",
      atmosfera: "transforma",
      extra: "algumas músicas carregam mais do que som.",
      desenho: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
        '<ellipse pathLength="1" cx="48" cy="54" rx="22" ry="29" style="--d:0s"/>' +
        '<path pathLength="1" d="M48 25 v-11 C64 12 68 20 70 34" style="--d:.3s"/>' +
        '<path pathLength="1" d="M50 19 C62 18 66 26 62 34" style="--d:.5s"/>' +
        '<path pathLength="1" d="M32 47 h32 M34 57 h28 M36 67 h24 M40 39 q8 -5 16 0" style="--d:.7s"/></g></svg>'
    },
    {
      nome: "sorriso resplandecente",
      nota: "se sua vida tivesse uma abertura, você escolheria essa.",
      atmosfera: "luz",
      desenho: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
        '<path pathLength="1" d="M26 54 Q48 68 70 54" style="--d:0s"/>' +
        '<path pathLength="1" d="M48 18 v-8 M48 92 v-8 M12 54 h-8 M92 54 h-8 M21 26 l-6 -6 M75 26 l6 -6 M21 82 l-6 6 M75 82 l6 6" style="--d:.45s"/>' +
        '<path pathLength="1" d="M38 56 q3 5 6 5 M50 56 q3 5 6 5" style="--d:.8s"/></g></svg>'
    }
  ],

  /* --------------------------------------------------------
     03 · LEITURAS — uma pequena estante editorial
     Cada obra vira uma folha. A página do Takemichi é
     construída no HTML (é uma cena, não uma ficha).
     -------------------------------------------------------- */
  obras: [
    {
      rotulo: "o anime que você mais gosta",
      titulo: "tokyo revengers",
      nota: "sobre recomeçar, proteger quem importa e voltar no tempo por quem se ama."
    },
    {
      rotulo: "uma obra que mudou seu jeito de pensar",
      titulo: "attack on titan",
      nota: "e a obra que você apagaria da memória para conhecer de novo."
    },
    {
      rotulo: "a cena que você nunca esqueceu",
      titulo: "oshi no ko",
      nota: "a morte da ai."
    }
  ],

  /* --------------------------------------------------------
     04 · VEIL — o capítulo central
     introducao     : abre a seção
     fragmentos     : legendas dos 6 quadros do miolo
     paginas        : uma página silenciosa atrás da outra
                      (mesmo é o mote · motivo é um traço)
     personagem     : aleksandre
     -------------------------------------------------------- */
  veil: {
    introducao:
      "“gosto da ideia de que, mesmo quando alguém se sente sozinho,<br>" +
      "pode existir alguém para mostrar que não está.”",

    fragmentos: [
      "a presença de alguém.",
      "cuidar.",
      "fazer coisas por alguém que se ama,",
      "mesmo sem existir compromisso entre os dois.",
      "estar presente.",
      "amar alguém independentemente do que ela é."
    ],

    paginas: [
      {
        fala: "mesmo quando alguém se sente sozinho...",
        nota: "você encontrou isso em veil.",
        alinhar: "esq",
        motivo: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
          '<path pathLength="1" d="M60 22 a16 16 0 1 0 2 36 a12 12 0 1 1 -2 -36" style="--d:0s"/>' +
          '<path pathLength="1" d="M34 28 h3 M30 34 h5 M40 40 h2" style="--d:.8s"/></g></svg>'
      },
      {
        fala: "pode existir alguém para lembrar que não está sozinho.",
        nota: "presença.",
        alinhar: "dir",
        motivo: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
          '<circle pathLength="1" cx="38" cy="48" r="20" style="--d:0s"/>' +
          '<path pathLength="1" d="M58 48 a18 18 0 1 0 18 18" style="--d:.4s"/>' +
          '<path pathLength="1" d="M64 66 a12 12 0 0 1 14 0 M64 74 a6 6 0 0 1 8 0" style="--d:.7s"/></g></svg>'
      },
      {
        fala: "alguém que permanece.",
        nota: "mesmo quando tudo muda ao redor.",
        alinhar: "esq",
        motivo: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
          '<path pathLength="1" d="M48 18 v58" style="--d:0s"/>' +
          '<path pathLength="1" d="M34 84 h28" style="--d:.35s"/>' +
          '<path pathLength="1" d="M48 30 q-8 6 -8 14 q0 6 8 8 q8 -2 8 -8 q0 -8 -8 -14" style="--d:.6s"/></g></svg>'
      },
      {
        fala: "alguém que cuida.",
        nota: "que faz coisas por quem ama, sem precisar de motivo.",
        alinhar: "dir",
        motivo: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
          '<path pathLength="1" d="M38 40 q-6 0 -10 8 q-4 8 -2 16 q2 6 10 10" style="--d:0s"/>' +
          '<path pathLength="1" d="M38 40 q10 -4 18 8 q4 6 2 14 q-2 8 -10 12" style="--d:.35s"/>' +
          '<path pathLength="1" d="M36 74 h20" style="--d:.7s"/></g></svg>'
      },
      {
        fala: "estar presente.",
        nota: "é o presente que não precisa de palavra.",
        alinhar: "esq",
        motivo: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
          '<rect pathLength="1" x="26" y="22" width="44" height="30" style="--d:0s"/>' +
          '<path pathLength="1" d="M26 34 h44" style="--d:.3s"/>' +
          '<path pathLength="1" d="M26 30 v-8 c0 -4 44 -4 44 0 v8" style="--d:.55s"/></g></svg>'
      },
      {
        fala: "amar alguém independentemente do que ela é.",
        nota: "você chamou isso de veil.",
        alinhar: "centro",
        motivo: '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true"><g class="desenha">' +
          '<path pathLength="1" d="M48 78 a26 16 90 1 1 2 -20" style="--d:0s"/>' +
          '<path pathLength="1" d="M34 66 q-6 8 -2 16" style="--d:.5s"/>' +
          '<path pathLength="1" d="M60 62 q8 6 6 16" style="--d:.7s"/></g></svg>'
      }
    ],

    personagem: {
      rotulo: "personagem favorito",
      nome: "aleksandre"
    }
  },

  /* --------------------------------------------------------
     05 · MEMÓRIAS — fotografias antigas que viram ao toque
     -------------------------------------------------------- */
  memorias: [
    {
      rotulo: "um dia",
      frente: "uma das suas melhores lembranças.",
      verso: "seu aniversário."
    },
    {
      rotulo: "a praia",
      frente: "um dia que você gostaria de reviver.",
      verso: "a praia com sua família."
    },
    {
      rotulo: "uma conversa",
      frente: "um momento pequeno que se tornou importante.",
      verso: "conversar seriamente com seu pai, pela primeira vez."
    },
    {
      rotulo: "uma música",
      frente: "uma lembrança que ainda faz você sorrir.",
      verso: "cantar músicas com seu pai."
    }
  ],

  /* --------------------------------------------------------
     06 · QUEM É VOCÊ — páginas de palavra
     quem        : o que ela observa no outro
     guardar      : a sua natureza introvertida
     felicidade   : pequenas alegrias
     -------------------------------------------------------- */
  quem: [
    { t: "sorriso",  d: "uma das primeiras coisas que você nota numa pessoa." },
    { t: "olhar",    d: "outra coisa que você observa antes de qualquer palavra." },
    { t: "lealdade", d: "algo que você valoriza sem nem precisar explicar." },
    { t: "conversa", d: "uma qualidade que você considera indispensável." }
  ],

  guardar: [
    { t: "você costuma guardar o que sente.", d: "introvertida, do seu jeito." },
    { t: "por isso o jeito das pessoas importa tanto.", d: "o que elas fazem, não apenas o que dizem." },
    { t: "e é pelas pequenas ações que você confia.", d: "" }
  ],

  felicidade: [
    { t: "sair com pessoas de quem gosta.", d: "talvez seja o suficiente." },
    { t: "conversar com quem gosta.", d: "às vezes, é tudo o que importa." }
  ],

  /* --------------------------------------------------------
     07 · SONHOS — palavras grandes e desejo quieto
     (o Japão tem composição própria no HTML)
     -------------------------------------------------------- */
  sonhos: [
    { t: "suas próprias coisas", d: "algo que você deseja conquistar." },
    { t: "fazer o que dá prazer", d: "aquilo que realmente te faz bem." },
    { t: "novas experiências", d: "o que ainda está por vir." }
  ],

  /* --------------------------------------------------------
     08 · DISTÂNCIA — palavras que flutuam entre as figuras
     -------------------------------------------------------- */
  distancia: [
    { palavra: "20:00",     x: 20, y: 10 },
    { palavra: "veil",      x: 68, y: 18 },
    { palavra: "japão",     x: 30, y: 30 },
    { palavra: "noite",     x: 62, y: 38 },
    { palavra: "música",    x: 22, y: 52 },
    { palavra: "praia",     x: 72, y: 58 },
    { palavra: "conversa",  x: 38, y: 72 },
    { palavra: "inverno",   x: 58, y: 82 }
  ],

  /* --------------------------------------------------------
     09 · COISAS QUE NÃO DISSE — pequenos papéis
     o último fica virado para baixo.
     -------------------------------------------------------- */
  coisas: [
    "você ama seu cabelo.",
    "você escolheu azul.",
    "você gosta do inverno.",
    "você gosta da noite.",
    "20:00 é o seu horário.",
    "você encontra paz numa praia à noite.",
    "você gosta de gatos.",
    "você guarda o que sente.",
    "você valoriza lealdade.",
    "você presta atenção no sorriso das pessoas.",
    "você presta atenção no olhar.",
    "você gosta de conversar com quem gosta.",
    "e talvez não perceba quantas pequenas coisas sobre você ficam na memória de alguém."
  ],

  /* --------------------------------------------------------
     10 · O QUE É ISSO? — quatro palavras, quatro atmosferas
     -------------------------------------------------------- */
  oque: [
    { palavra: "noite",   det: "azul · praia · 20:00 · inverno",
      tema: "noite",
      motivo: '<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><g class="desenha">' +
        '<path pathLength="1" d="M52 18 a14 14 0 1 0 2 28 a10 10 0 1 1 -2 -28" style="--d:0s"/>' +
        '<path pathLength="1" d="M18 30 h2 M24 40 h3 M16 50 h2 M30 16 h2" style="--d:.7s"/></g></svg>' },
    { palavra: "música",  det: "glory box · metamorfose · sorriso resplandecente",
      tema: "musica",
      motivo: '<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><g class="desenha">' +
        '<path pathLength="1" d="M34 18 v44" style="--d:0s"/>' +
        '<path pathLength="1" d="M34 52 a10 10 0 1 1 -10 0' + '" style="--d:.4s"/>' +
        '<path pathLength="1" d="M46 26 v30" style="--d:.6s"/>' +
        '<path pathLength="1" d="M46 48 a8 8 0 1 1 -8 0" style="--d:.8s"/></g></svg>' },
    { palavra: "memória", det: "aniversário · praia · conversa com seu pai",
      tema: "memoria",
      motivo: '<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><g class="desenha">' +
        '<rect pathLength="1" x="18" y="16" width="44" height="48" style="--d:0s"/>' +
        '<circle pathLength="1" cx="40" cy="36" r="9" style="--d:.35s"/>' +
        '<circle pathLength="1" cx="40" cy="54" r="12" style="--d:.6s"/>' +
        '<path pathLength="1" d="M40 54 a20 6 90 0 0 18 4" style="--d:.8s"/></g></svg>' },
    { palavra: "sonho",   det: "japão · suas próprias coisas · novas experiências",
      tema: "sonho",
      motivo: '<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><g class="desenha">' +
        '<path pathLength="1" d="M20 62 C36 62 36 30 60 30" style="--d:0s"/>' +
        '<circle pathLength="1" cx="62" cy="28" r="4" style="--d:.45s"/>' +
        '<path pathLength="1" d="M16 62 h10 M50 34 v6 M56 30 v6 M62 26 v6" style="--d:.7s"/></g></svg>' }
  ],

  /* --------------------------------------------------------
     11 · ÁUDIO (opcional — nunca toca sozinho)
     Coloque os arquivos em assets/audio/ e escreva o nome.
     Enquanto for null, o controle não é desenhado.
     -------------------------------------------------------- */
  audio: {
    faixas: [
      { nome: "glory box",              arquivo: null },
      { nome: "metamorfose",            arquivo: null },
      { nome: "sorriso resplandecente", arquivo: null }
    ]
  }

};