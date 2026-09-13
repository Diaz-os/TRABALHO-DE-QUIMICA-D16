document.addEventListener("DOMContentLoaded", function() {
    const secoes = document.querySelectorAll(".secao-revelacao");
    const fundos = document.querySelectorAll(".cenario-bg");

    // =========================================
    // LÓGICA DA TELA DE ENTRADA
    // =========================================
    const telaEntrada = document.getElementById("tela-entrada");
    const btnEntrar = document.getElementById("btn-entrar");
    const musica = document.getElementById("musica-fundo");
    const btnAudio = document.getElementById("btn-audio");
    let somAtivado = false;

    if (btnEntrar && telaEntrada) {
        btnEntrar.addEventListener("click", function() {
            // 1. Toca a música (agora o navegador permite porque houve um clique)
            if (musica) {
                musica.play();
                somAtivado = true;
                btnAudio.textContent = "🔊";
            }
            
            // 2. Faz a tela inicial sumir
            telaEntrada.classList.add("oculto");
            
            // 3. Libera a rolagem da página para o usuário poder descer
            document.body.style.overflowY = "auto";
            document.body.style.overflowX = "hidden";
        });
    }

    // =========================================
    // LÓGICA DE TROCA DE FUNDO (SCROLL)
    // =========================================
    window.addEventListener("scroll", function() {
        let indiceAtual = 0;

        secoes.forEach(function(secao, indice) {
            const rect = secao.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                indiceAtual = indice;
            }
        });

        fundos.forEach(function(fundo, indice) {
            if (indice === indiceAtual) {
                fundo.classList.add("ativo");
            } else {
                fundo.classList.remove("ativo");
            }
        });
    });

    // =========================================
    // LÓGICA DE ANIMAÇÃO DO TEXTO
    // =========================================
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
            }
        });
    }, { threshold: 0.2 }); 

    document.querySelectorAll(".caixa-texto.animar").forEach((caixa) => {
        observador.observe(caixa);
    });

    // =========================================
    // CONTROLE DE CLIQUE NO BOTÃO MUTAR/DESMUTAR
    // =========================================
    if (btnAudio && musica) {
        btnAudio.addEventListener("click", function() {
            if (somAtivado) {
                musica.pause();
                btnAudio.textContent = "🔇";
            } else {
                musica.play();
                btnAudio.textContent = "🔊";
            }
            somAtivado = !somAtivado;
        });
    }
});