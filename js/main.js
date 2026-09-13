/* ============================================================
   ENTRE NÓS — uma história sem nome
   Interações · animações · leitura vertical
   (os textos vêm de js/content.js)
   ============================================================ */
(function () {
  'use strict';

  var P = window.PROJETO || {};
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduzido = !!(RM && RM.matches);

  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function clampar(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  var doc = document;
  var body = doc.body;

  /* ================================================================
     00 · ABERTURA — o site só começa depois do "abrir"
     ================================================================ */
  var abertura = $('#abertura');
  var botaoAbrir = $('#abrir');

  function travarRolagem() {
    doc.documentElement.classList.add('travado');
    body.classList.add('travado');
  }
  function destravarRolagem() {
    doc.documentElement.classList.remove('travado');
    body.classList.remove('travado');
  }

  function esconderAbertura(rapido) {
    if (!abertura) return;
    destravarRolagem();
    abertura.classList.add('solta');
    abertura.setAttribute('aria-hidden', 'true');
    setTimeout(function () {
      abertura.style.display = 'none';
    }, rapido ? 250 : (reduzido ? 250 : 1250));
  }

  if (botaoAbrir && abertura) {
    travarRolagem();
    botaoAbrir.addEventListener('click', function () {
      window.scrollTo(0, 0);
      esconderAbertura(false);
    });
  }

  var pularConteudo = $('.pular-ao-conteudo');
  if (pularConteudo) {
    pularConteudo.addEventListener('click', function () { esconderAbertura(true); });
  }

  var guiaRole = $('.guia-role');
  if (guiaRole) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) guiaRole.classList.add('sumir');
    }, { passive: true, once: true });
  }

  /* ================================================================
     observers centrais (revelar · virar página · desenhar linhas)
     ================================================================ */
  var ioRevelar = null;
  function observarRevelacoes() {
    ioRevelar = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visivel');
          ioRevelar.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
  }
  function observarEl(el) { if (ioRevelar && el) ioRevelar.observe(el); }

  var ioDesenho = null;
  function observarDesenhos() {
    ioDesenho = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('desenhado');
          ioDesenho.unobserve(e.target);
        }
      });
    }, { threshold: 0.18 });
  }
  function observarDesenho(el) { if (ioDesenho && el) ioDesenho.observe(el); }

  function jaPassou(el) {
    var r = el.getBoundingClientRect();
    return r.bottom < 0;
  }
  function vigiar(documento) {
    $$('[data-reveal]', documento).forEach(function (el) {
      if (jaPassou(el)) { el.classList.add('visivel'); return; }
      observarEl(el);
    });
    $$('[data-revelar-pg]', documento).forEach(function (el) {
      if (jaPassou(el)) { el.classList.add('visivel'); return; }
      observarEl(el);
    });
    $$('[data-desenho]', documento).forEach(function (el) {
      if (jaPassou(el)) { el.classList.add('desenhado'); return; }
      observarDesenho(el);
    });
  }

  /* rede de segurança: se o usuário rolar rápido demais para o observer,
     nada pode ficar invisível já dentro da viewport. */
  var pedidoSonda = null;
  function agendarSonda() {
    if (pedidoSonda) return;
    pedidoSonda = requestAnimationFrame(function () {
      pedidoSonda = null;
      var vh = window.innerHeight;
      var ocultos = $$('[data-reveal]:not(.visivel),[data-revelar-pg]:not(.visivel),[data-desenho]:not(.desenhado)');
      for (var i = 0; i < ocultos.length; i++) {
        var el = ocultos[i];
        if (el.getBoundingClientRect().top < vh) {
          if (el.hasAttribute('data-desenho')) el.classList.add('desenhado');
          else el.classList.add('visivel');
        }
      }
    });
  }
  window.addEventListener('scroll', agendarSonda, { passive: true });

  /* ================================================================
     parallax sutil (4–12px; desligado com reduced motion)
     ================================================================ */
  var alvosParallax = [];
  function montarParallax() {
    if (reduzido) return;
    alvosParallax = $$('[data-parallax]').map(function (el) {
      return { el: el, vel: parseFloat(el.getAttribute('data-parallax')) || 0.08 };
    });
    if (!alvosParallax.length) return;
    window.addEventListener('scroll', agendarParallax, { passive: true });
    agendarParallax();
  }

  var pedidoPar = null;
  function agendarParallax() {
    if (pedidoPar) return;
    pedidoPar = requestAnimationFrame(function () {
      pedidoPar = null;
      var vh = window.innerHeight;
      alvosParallax.forEach(function (o) {
        var r = o.el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var centro = r.top + r.height / 2 - vh / 2;
        var desloc = (-centro * o.vel);
        desloc = clampar(desloc, -14, 14);
        o.el.style.transform = 'translateY(' + desloc.toFixed(1) + 'px)';
      });
    });
  }

  /* ================================================================
     virar ao toque (memórias · papéis)
     ================================================================ */
  doc.addEventListener('click', function (e) {
    var alvo = e.target.closest('[data-virar]');
    if (!alvo) return;
    var cartao = alvo.closest('.memoria') || alvo.closest('.papel');
    if (!cartao) return;
    var virado = cartao.classList.toggle('virado');
    if (alvo.hasAttribute('aria-pressed')) {
      alvo.setAttribute('aria-pressed', virado ? 'true' : 'false');
    }
  });

  /* descobertas: tocar revela a palavra */
  doc.addEventListener('click', function (e) {
    var inner = e.target.closest('.descoberta-inner');
    if (!inner) return;
    var d = inner.closest('.descoberta');
    if (!d) return;
    var aberta = d.classList.toggle('aberta');
    inner.setAttribute('aria-expanded', aberta ? 'true' : 'false');
  });

  /* ================================================================
     TELAS DE PALAVRA (cap 07 · 08)
     ================================================================ */
  function montarTelas(alvo, lista, opts) {
    if (!alvo || !lista || !lista.length) return;
    opts = opts || {};
    var modoFrase = opts.modo === 'frase';
    var inicio = opts.inicio || 0;

    alvo.innerHTML = lista.map(function (item, i) {
      var num = String(inicio + i + 1).padStart(2, '0');
      var classe = 'tela-grande';
      var texto = item.t || item.palavra || '';
      if (modoFrase) {
        classe = 'tela-grande tela-frase';
      } else if (item.mono) {
        classe = 'tela-grande tela-mono-grande';
      }
      return '<div class="tela-palavra" data-reveal style="--atraso:' + (i * 0.05) + 's">' +
        '<span class="tela-mono">' + num + '</span>' +
        '<p class="' + classe + '">' + esc(texto) + '</p>' +
        (item.d ? '<p class="tela-sub">' + esc(item.d) + '</p>' : '') +
      '</div>';
    }).join('');
    $$('.tela-palavra', alvo).forEach(observarEl);
  }

  /* ================================================================
     02 · PEQUENAS COISAS — descobertas desenhadas
     ================================================================ */
  function montarDescobertas() {
    var alvo = $('[data-descobertas]');
    if (!alvo || !P.descobertas) return;

    alvo.innerHTML = P.descobertas.map(function (c, i) {
      return '<article class="descoberta' + (c.vermelho ? ' vermelha' : '') + '">' +
        '<button class="descoberta-inner" type="button" aria-expanded="false" aria-label="' +
        esc(c.palavra) + ' · ' + esc(c.nota) + '">' +
          '<span class="descoberta-num">' + String.fromCharCode(97 + i) + '.</span>' +
          '<span class="descoberta-desenho" data-desenho>' + c.desenho + '</span>' +
          '<span class="descoberta-corpo">' +
            '<span class="descoberta-palavra">' + esc(c.palavra) + '</span>' +
            '<span class="descoberta-nota">' + esc(c.nota) + '</span>' +
          '</span>' +
        '</button>' +
      '</article>';
    }).join('');

    vigiar(alvo);
    $$('.descoberta', alvo).forEach(function (d, i) { d.style.setProperty('--atraso', (i * 0.08) + 's'); });
  }

  /* ================================================================
     03 · MÚSICA — páginas de atmosfera + áudio (nunca autoplay)
     ================================================================ */
  function montarMusicas() {
    var alvo = $('[data-musicas]');
    if (!alvo || !P.musicas) return;

    var arquivos = (P.audio && P.audio.faixas) || [];

    alvo.innerHTML = P.musicas.map(function (m, i) {
      var atmos = m.atmosfera === 'sombria' ? 'faixa-sombria'
              : m.atmosfera === 'luz' ? 'faixa-luz'
              : 'faixa-transforma';
      var temAudio = !!(arquivos[i] && arquivos[i].arquivo);
      return '<div class="faixa-pagina ' + atmos + '" data-revelar-pg data-ghost="' + String(i + 1).padStart(2, '0') + '">' +
        '<span class="faixa-num">0' + (i + 1) + '</span>' +
        '<div class="faixa-motivo" data-desenho>' + m.desenho + '</div>' +
        '<h2 class="faixa-titulo">' + esc(m.nome) + '</h2>' +
        '<p class="faixa-nota">' + esc(m.nota) + '</p>' +
        (m.extra ? '<span class="faixa-extra">' + esc(m.extra) + '</span>' : '') +
        '<span class="faixa-controle">' +
          '<button class="ouvir" type="button" data-faixa="' + i + '" ' +
            (temAudio ? 'aria-label="tocar ' + esc(m.nome) + '" aria-pressed="false"' : 'disabled aria-disabled="true"') + '>' +
            (temAudio ? 'ouvir' : 'em breve') +
          '</button>' +
        '</span>' +
      '</div>';
    }).join('');

    vigiar(alvo);
  }

  var tocando = null;
  var botaoAtivo = null;
  var faixasAudio = (P.audio && P.audio.faixas) || [];

  function ligarAudio() {
    var alvo = $('[data-musicas]');
    if (!alvo) return;
    alvo.addEventListener('click', function (e) {
      var btn = e.target.closest('.ouvir');
      if (!btn || btn.disabled) return;
      var i = Number(btn.getAttribute('data-faixa'));
      var rec = faixasAudio[i];
      if (!rec || !rec.arquivo) { mostrarDica('áudio será adicionado em assets/audio/'); return; }

      if (tocando && botaoAtivo === btn) { pausar(); return; }
      if (tocando) pausar();

      var audio = new Audio('assets/audio/' + rec.arquivo);
      audio.play().catch(function () { mostrarDica('não foi possível tocar o áudio'); });
      audio.addEventListener('ended', function () { reposar(); });
      tocando = audio;
      botaoAtivo = btn;
      btn.classList.add('tocado');
      btn.setAttribute('aria-pressed', 'true');
    });
  }

  function pausar() {
    if (tocando) { tocando.pause(); tocando = null; }
    reposar();
  }
  function reposar() {
    if (botaoAtivo) {
      botaoAtivo.classList.remove('tocado');
      botaoAtivo.setAttribute('aria-pressed', 'false');
    }
    botaoAtivo = null;
  }

  /* ================================================================
     04 · LEITURAS — estante editorial
     ================================================================ */
  function montarObras() {
    var alvo = $('[data-obras]');
    if (!alvo || !P.obras) return;

    alvo.innerHTML = P.obras.map(function (o, i) {
      return '<article class="obra-folha" data-reveal>' +
        '<span class="obra-num">L.' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="obra-rotulo">' + esc(o.rotulo) + '</span>' +
        '<h3 class="obra-titulo">' + esc(o.titulo) + '</h3>' +
        '<p class="obra-nota">' + esc(o.nota) + '</p>' +
      '</article>';
    }).join('');
    vigiar(alvo);
  }

  /* ================================================================
     05 · VEIL — introdução, fragmentos, páginas silenciosas
     ================================================================ */
  function montarVeil() {
    var intro = $('[data-intro]');
    if (intro && P.veil && P.veil.introducao) intro.innerHTML = P.veil.introducao;

    var fr = P.veil && P.veil.fragmentos;
    $$('[data-fragmento]').forEach(function (span) {
      var i = Number(span.getAttribute('data-fragmento'));
      if (fr && fr[i]) span.textContent = fr[i];
    });

    var alvoExp = $('[data-explicacao]');
    if (alvoExp) {
      var linhas = (P.veil && P.veil.explicacao) || ["você me explicou veil em pedaços pequenos.", "um por vez."];
      alvoExp.innerHTML = linhas.map(function (linha, i) {
        return '<p class="fragmento" data-reveal style="--atraso:' + (i * 0.09) + 's">' + esc(linha) + '</p>';
      }).join('');
      vigiar(alvoExp);
    }

    var alvoPg = $('[data-veil-paginas]');
    if (alvoPg && P.veil && P.veil.paginas) {
      alvoPg.innerHTML = P.veil.paginas.map(function (pg, i) {
        var alin = pg.alinhar === 'dir' ? 'alinhar-dir'
                : pg.alinhar === 'centro' ? 'alinhar-centro'
                : 'alinhar-esq';
        return '<div class="veil-pagina ' + alin + '" data-revelar-pg data-ghost="' + String(i + 1).padStart(2, '0') + '">' +
          '<span class="veil-pagina-num">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<div class="veil-motivo" data-desenho>' + (pg.motivo || '') + '</div>' +
          '<p class="veil-pagina-fala">' + esc(pg.fala) + '</p>' +
          (pg.nota ? '<p class="veil-pagina-nota">' + esc(pg.nota) + '</p>' : '') +
        '</div>';
      }).join('');
      vigiar(alvoPg);
    }

    if (P.veil && P.veil.personagem) {
      if (P.veil.personagem.rotulo) $('.aleksandre-rotulo').textContent = P.veil.personagem.rotulo;
      if (P.veil.personagem.nome) $('.aleksandre-nome').textContent = P.veil.personagem.nome;
    }
  }

  /* ================================================================
     06 · MEMÓRIAS — fotografias antigas que viram
     ================================================================ */
  var fotosMemoria = [
    '<svg viewBox="0 0 120 72" fill="none" aria-hidden="true"><g class="desenha"><circle cx="34" cy="30" r="10" style="--d:0s"/><path d="M34 18 v-6 M34 42 v-6 M22 30 h-6 M46 30 h6" style="--d:.3s"/><path d="M8 58 h104 M30 58 v-8" style="--d:.6s"/></g></svg>',
    '<svg viewBox="0 0 120 72" fill="none" aria-hidden="true"><g class="desenha"><path d="M8 34 h104" style="--d:0s"/><path d="M14 46 q10 -5 20 0 t20 0 t20 0 t20 0 t10 0" style="--d:.4s"/><circle cx="96" cy="18" r="9" style="--d:.7s"/><path d="M99 13 a5 5 0 0 1 0 10" style="--d:1s"/></g></svg>',
    '<svg viewBox="0 0 120 72" fill="none" aria-hidden="true"><g class="desenha"><path d="M20 58 h80 M20 20 v38 M100 20 v38" style="--d:0s"/><circle cx="60" cy="14" r="4" style="--d:.5s"/><path d="M34 24 h52" style="--d:.7s"/></g></svg>',
    '<svg viewBox="0 0 120 72" fill="none" aria-hidden="true"><g class="desenha"><path d="M30 16 v30" style="--d:0s"/><path d="M30 40 a8 8 0 1 1 -8 0" style="--d:.4s"/><path d="M52 24 v26" style="--d:.6s"/><path d="M52 44 a7 7 0 1 1 -7 0" style="--d:.8s"/></g></svg>'
  ];

  function montarMemorias() {
    var alvo = $('[data-memorias]');
    if (!alvo || !P.memorias) return;

    alvo.innerHTML = P.memorias.map(function (m, i) {
      var foto = fotosMemoria[i % fotosMemoria.length] || '';
      return '<article class="memoria" data-reveal style="--atraso:' + (i * 0.08) + 's">' +
        '<button class="memoria-inner" type="button" data-virar aria-pressed="false" aria-label="' + esc('virar lembrança: ' + (m.rotulo || m.frente || '')) + '">' +
          '<span class="memoria-rotulo">' + esc(m.rotulo || '') + '</span>' +
          '<span class="memoria-lado memoria-frente">' +
            '<span class="memoria-foto" data-desenho>' + foto + '</span>' +
            '<span class="memoria-frente-txt">' + esc(m.frente || '') + '</span>' +
            '<span class="memoria-vinheta" aria-hidden="true"></span>' +
          '</span>' +
          '<span class="memoria-lado memoria-vers">' +
            '<span class="memoria-vers-txt">' + esc(m.verso || '') + '</span>' +
            '<span class="memoria-vinheta" aria-hidden="true"></span>' +
          '</span>' +
        '</button>' +
      '</article>';
    }).join('');
    vigiar(alvo);
  }

  /* ================================================================
     10 · COISAS QUE NÃO DISSE — papéis que viram
     ================================================================ */
  function montarPapeis() {
    var alvo = $('#papeis-coisas');
    if (!alvo || !P.coisas) return;

    alvo.innerHTML = P.coisas.map(function (frase, i) {
      var ultimo = (i === P.coisas.length - 1);
      var sigla = ultimo
        ? '<span class="papel-pontinhos">· · ·</span>'
        : '<span class="papel-sigla">nº ' + String(i + 1).padStart(2, '0') + '</span>';

      return '<div class="papel" data-reveal style="--atraso:' + (i * 0.04) + 's">' +
        '<button class="papel-inner" type="button" data-virar aria-pressed="false" aria-label="virar papel">' +
          (ultimo
            ? '<span class="papel-lado papel-frente papel-costa">' + sigla + '</span>' +
              '<span class="papel-lado papel-vers papel-tinta">'
            : '<span class="papel-lado papel-frente">' + sigla + '</span>' +
              '<span class="papel-lado papel-vers">') +
            '<span class="papel-frase">' + esc(frase) + '</span>' +
          '</span>' +
        '</button>' +
      '</div>';
    }).join('');
    vigiar(alvo);
  }

  /* ================================================================
     11 · O QUE É ISSO? — quatro atmosferas
     ================================================================ */
  function montarOque() {
    var alvo = $('[data-oque]');
    if (!alvo || !P.oque) return;

    alvo.innerHTML = P.oque.map(function (b, i) {
      return '<div class="oque-beat ' + esc(b.tema) + '" data-revelar-pg data-ghost="' + String(i + 1).padStart(2, '0') + '">' +
        '<span class="oque-num">0' + (i + 1) + '</span>' +
        '<div class="oque-motivo" data-desenho>' + (b.motivo || '') + '</div>' +
        '<p class="oque-palavra">' + esc(b.palavra) + '</p>' +
        '<p class="oque-det">' + esc(b.det) + '</p>' +
      '</div>';
    }).join('');
    vigiar(alvo);
  }

  /* ================================================================
     09 · DISTÂNCIA — as duas figuras se aproximam
     ================================================================ */
  var dist = { sec: null, pista: null, fio: null, frase: null, figCima: null, figBaixo: null, palavras: [] };

  function montarDistancia() {
    dist.sec = $('[data-distancia]');
    if (!dist.sec) return;
    dist.pista = $('[data-palavras]', dist.sec);
    dist.fio = $('.distancia-fio', dist.sec);
    dist.frase = $('.distancia-frase', dist.sec);
    dist.figCima = $('[data-figura="cima"]', dist.sec);
    dist.figBaixo = $('[data-figura="baixo"]', dist.sec);

    var base = (P.distancia && P.distancia.length) ? P.distancia : [];
    dist.palavras = base.map(function (w, i) {
      var el = doc.createElement('span');
      el.className = 'distancia-palavra';
      el.innerHTML = '<span class="ondular" style="--d:' + (i * 0.35) + 's">' + esc(w.palavra) + '</span>';
      el.style.left = w.x + '%';
      el.style.top = w.y + '%';
      dist.pista.appendChild(el);
      return { el: el, x: w.x, y: w.y };
    });

    if (reduzido) return;
    window.addEventListener('scroll', agendarDistancia, { passive: true });
    agendarDistancia();
  }

  var pedidoDist = null;
  function agendarDistancia() {
    if (pedidoDist) return;
    pedidoDist = requestAnimationFrame(function () {
      pedidoDist = null;
      atualizarDistancia();
    });
  }

  function atualizarDistancia() {
    var rect = dist.sec.getBoundingClientRect();
    var vh = window.innerHeight;
    if (rect.top > vh || rect.bottom < 0) return;

    var total = dist.sec.offsetHeight - vh;
    if (total <= 0) return;
    var p = clampar(-rect.top / total, 0, 1);
    var suave = 0.5 - 0.5 * Math.cos(Math.PI * p);

    if (!reduzido) {
      if (dist.figCima) dist.figCima.style.transform = 'translateX(-50%) translateY(' + (6 * suave) + 'vh)';
      if (dist.figBaixo) dist.figBaixo.style.transform = 'translateX(-50%) translateY(' + (-6 * suave) + 'vh)';
    }

    if (dist.palavras.length) {
      var cx = 50, cy = 44;
      var opPalavra = clampar(p * 4, 0, 1) * (1 - clampar((p - 0.55) * 5, 0, 1));
      dist.palavras.forEach(function (w) {
        var dx = (cx - w.x) * suave * 0.9;
        var dy = (cy - w.y) * suave * 0.9;
        w.el.style.transform = 'translate(calc(-50% + ' + dx + 'vw), calc(-50% + ' + dy + 'vh))';
        w.el.style.opacity = opPalavra.toFixed(3);
      });
    }

    if (dist.fio) {
      dist.fio.style.transform = 'scaleY(' + suave + ')';
    }

    if (dist.frase) {
      var opFrase = clampar((p - 0.62) / 0.2, 0, 1);
      dist.frase.style.opacity = opFrase.toFixed(3);
      if (opFrase > 0.3) dist.frase.classList.add('aceso');
    }
  }

  /* ================================================================
     contador de página
     ================================================================ */
  function montarContador() {
    var num = $('#numPagina');
    if (!num) return;
    var secs = $$('.capitulo[data-num]');
    var atual = null;
    var pedidoPag = null;
    function atualizarPagina() {
      pedidoPag = null;
      var vh = window.innerHeight;
      var alvo = null;
      for (var i = 0; i < secs.length; i++) {
        var s = secs[i];
        if (s.getBoundingClientRect().top < vh * 0.5) alvo = s;
      }
      if (alvo) {
        var n = alvo.getAttribute('data-num');
        if (n && n !== atual) { atual = n; num.textContent = n; }
      }
    }
    function agendarPagina() {
      if (pedidoPag) return;
      pedidoPag = requestAnimationFrame(atualizarPagina);
    }
    window.addEventListener('scroll', agendarPagina, { passive: true });
    window.addEventListener('resize', agendarPagina, { passive: true });
    atualizarPagina();
  }

  /* ================================================================
     dica (toast)
     ================================================================ */
  var dicaTimer = null;
  function mostrarDica(msg) {
    var d = $('#dica');
    if (!d) return;
    d.textContent = msg;
    d.classList.add('amostrar');
    clearTimeout(dicaTimer);
    dicaTimer = setTimeout(function () { d.classList.remove('amostrar'); }, 2600);
  }

  /* segredo: pressione e segure ~700ms */
  function ligarSegredo() {
    var segredo = $('[data-segredo]');
    if (!segredo) return;
    segredo.setAttribute('aria-pressed', 'false');
    var timer = null;
    var cancelar = function () { if (timer) { clearTimeout(timer); timer = null; } };
    segredo.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      cancelar();
      timer = setTimeout(function () {
        segredo.classList.add('revelado');
        segredo.setAttribute('aria-pressed', 'true');
        mostrarDica('20:00 · seu horário.');
      }, 700);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
      segredo.addEventListener(ev, cancelar);
    });
  }

  var repetir = $('#fim-repetir');
  if (repetir) {
    repetir.addEventListener('click', function () { window.location.reload(); });
  }

  /* ================================================================
     iniciar
     ================================================================ */
  function iniciar() {
    observarRevelacoes();
    observarDesenhos();
    vigiar(doc);

    montarTelas($('[data-quem]'), P.quem);
    montarTelas($('[data-guardar]'), P.guardar, { modo: 'frase', inicio: P.quem ? P.quem.length : 5 });
    montarTelas($('[data-felicidade]'), P.felicidade, { inicio: (P.quem ? P.quem.length : 5) + (P.guardar ? P.guardar.length : 3) });
    montarTelas($('[data-sonhos]'), P.sonhos);

    montarDescobertas();
    montarMusicas();
    ligarAudio();
    montarObras();
    montarVeil();
    montarMemorias();
    montarPapeis();
    montarOque();
    montarDistancia();
    montarContador();
    montarParallax();
    ligarSegredo();
    agendarSonda();
  }

  function iniciarComSeguranca() {
    try { iniciar(); }
    catch (err) {
      if (document.documentElement) document.documentElement.classList.remove('js');
      destravarRolagem();
      var abr = $('#abertura');
      if (abr) abr.style.display = 'none';
      if (window.console) console.error('falha na inicialização:', err);
    }
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', iniciarComSeguranca);
  } else {
    iniciarComSeguranca();
  }
})();