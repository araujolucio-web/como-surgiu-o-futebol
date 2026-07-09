document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MUDANÇA DE ESTILO DO HEADER AO ROLAR
    // ==========================================
    const header = document.querySelector("header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = "#143016"; // Fica um verde mais escuro
            header.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
        } else {
            header.style.backgroundColor = "#1e4620"; // Volta ao verde original
            header.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
        }
    });

    // ==========================================
    // 2. ROLAGEM SUAVE PARA OS LINKS DO MENU
    // ==========================================
    const linksDoMenu = document.querySelectorAll("nav ul li a");

    linksDoMenu.forEach(link => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede o pulo brusco padrão
            
            const idDoAlvo = link.getAttribute("href");
            const secaoAlvo = document.querySelector(idDoAlvo);

            if (secaoAlvo) {
                // Rola suavemente até a seção, descontando a altura do menu fixo
                const alturaHeader = header.offsetHeight;
                const posicaoSecao = secaoAlvo.offsetTop - alturaHeader;

                window.scrollTo({
                    top: posicaoSecao,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // 3. ANIMAÇÃO DE APARECER (FADE-IN) SEÇÕES
    // ==========================================
    const secoes = document.querySelectorAll(".conteudo-secao");

    // Configura o estilo inicial das seções via JS para não quebrar o site caso o JS esteja desativado
    secoes.forEach(secao => {
        secao.style.opacity = "0";
        secao.style.transform = "translateY(20px)";
        secao.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    const checarSecoes = () => {
        const gatilhoAtivacao = window.innerHeight * 0.85; // Ativa quando 85% da tela rolar pela seção

        secoes.forEach(secao => {
            const topoDaSecao = secao.getBoundingClientRect().top;

            if (topoDaSecao < gatilhoAtivacao) {
                secao.style.opacity = "1";
                secao.style.transform = "translateY(0)";
            }
        });
    };

    // Executa uma vez ao carregar e depois sempre que rolar a página
    checarSecoes();
    window.addEventListener("scroll", checarSecoes);
});