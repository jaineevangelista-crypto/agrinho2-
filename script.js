// Banco de dados dos desafios do Agrinho
const desafios = [
    {
        id: 1,
        texto: "⚠️ SURGIMENTO DE PRAGA: Uma infestação severa de lagartas surgiu na plantação de milho, ameaçando destruir metade da colheita desta temporada. O que você faz?",
        opcoes: [
            {
                texto: "Aplicar defensivo químico tradicional de ação rápida.",
                feedback: "O produto químico salvou a colheita rapidamente garantindo o lucro, mas contaminou o solo e afastou polinizadores essenciais da região.",
                efeitoLucro: 20,
                efeitoPreservacao: -20
            },
            {
                texto: "Utilizar controle biológico (vespas parasitoides) e defensivos naturais.",
                feedback: "O controle biológico demorou um pouco mais e custou mais caro no início, mas restabeleceu o equilíbrio ecológico sem agredir a terra.",
                efeitoLucro: -10,
                efeitoPreservacao: 25
            }
        ]
    },
    {
        id: 2,
        texto: "💧 ESCASSEZ DE ÁGUA: A região enfrenta uma forte estiagem e racionamento. Você precisa gerenciar o consumo hídrico da sua lavoura.",
        opcoes: [
            {
                texto: "Manter o sistema de irrigação por inundação atual para economizar capital.",
                feedback: "Você economizou dinheiro imediato, mas causou um desperdício massivo de água e reduziu drasticamente os lençóis freáticos locais.",
                efeitoLucro: 15,
                efeitoPreservacao: -25
            },
            {
                texto: "Investir em um sistema moderno de gotejamento automatizado.",
                feedback: "O investimento inicial reduziu seu caixa, mas a economia de água foi imensa e sua produtividade ficou protegida a longo prazo.",
                efeitoLucro: -20,
                efeitoPreservacao: 30
            }
        ]
    },
    {
        id: 3,
        texto: "🔋 MATRIZ ENERGÉTICA: Os custos com energia elétrica para manter os galpões de resfriamento e maquinários dispararam.",
        opcoes: [
            {
                texto: "Manter a fazenda conectada apenas à rede elétrica convencional.",
                feedback: "Sem novos investimentos financeiros, porém sua pegada de carbono continua alta e sua fazenda fica vulnerável a novos aumentos de tarifas.",
                efeitoLucro: 5,
                efeitoPreservacao: -10
            },
            {
                texto: "Instalar placas de energia solar fotovoltaica na propriedade.",
                feedback: "Alto investimento de capital inicial, mas agora a fazenda gera energia limpa, reduz emissões e zera a conta de luz operacional.",
                efeitoLucro: -25,
                efeitoPreservacao: 25
            }
        ]
    }
];

// Estado global do Jogo
let lucro = 50;
let preservacao = 50;
let rodadaAtual = 0;

// Seleção de elementos do DOM
const elemCenario = document.getElementById("scenario-text");
const elemFeedbackBox = document.getElementById("feedback-box");
const elemFeedbackText = document.getElementById("feedback-text");
const elemButtonGroup = document.getElementById("button-group");
const barLucro = document.getElementById("lucro-bar");
const barPreservacao = document.getElementById("preservacao-bar");
const valLucro = document.getElementById("lucro-val");
const valPreservacao = document.getElementById("preservacao-val");

function iniciarJogo() {
    lucro = 50;
    preservacao = 50;
    rodadaAtual = 0;
    atualizarStatus();
    carregarRodada();
}

function atualizarStatus() {
    // Garante travas lógicas entre os limites de 0 e 100
    lucro = Math.max(0, Math.min(100, lucro));
    preservacao = Math.max(0, Math.min(100, preservacao));

    barLucro.style.width = `${lucro}%`;
    barPreservacao.style.width = `${preservacao}%`;
    valLucro.innerText = `${lucro}%`;
    valPreservacao.innerText = `${preservacao}%`;
}

function carregarRodada() {
    elemFeedbackBox.classList.add("hidden");
    elemButtonGroup.innerHTML = "";

    // Validações de Game Over e Vitória por turno
    if (lucro <= 0) {
        mostrarFimJogo("❌ FALÊNCIA! Suas finanças zeraram. Uma fazenda sem lucro não consegue se manter de pé nem investir em tecnologia.");
        return;
    }
    if (preservacao <= 0) {
        mostrarFimJogo("❌ DESASTRE AMBIENTAL! A preservação zerou. O solo se esgotou, a água secou e a propriedade foi severamente interditada.");
        return;
    }
    if (rodadaAtual >= desafios.length) {
        if (lucro >= 50 && preservacao >= 50) {
            mostrarFimJogo("🏆 GESTOR SUSTENTÁVEL VENCEDOR! Você alcançou o equilíbrio perfeito. Mostrou que o agro pode produzir com alto lucro e respeitando o meio ambiente!");
        } else {
            mostrarFimJogo("🏁 FIM DE JOGO! Você completou os anos de gestão, mas não atingiu as metas ideais de equilíbrio sustentável. Tente balancear melhor suas decisões!");
        }
        return;
    }

    const desafio = desafios[rodadaAtual];
    elemCenario.innerText = desafio.texto;

    desafio.opcoes.forEach(opcao => {
        const botao = document.createElement("button");
        botao.className = "btn";
        botao.innerText = opcao.texto;
        botao.onclick = () => aplicarDecisao(opcao);
        elemButtonGroup.appendChild(botao);
    });
}

function aplicarDecisao(opcao) {
    lucro += opcao.efeitoLucro;
    preservacao += opcao.efeitoPreservacao;
    atualizarStatus();

    elemFeedbackText.innerText = opcao.feedback;
    elemFeedbackBox.classList.remove("hidden");

    elemButtonGroup.innerHTML = "";
    const btnAvancar = document.createElement("button");
    btnAvancar.className = "btn btn-action";
    btnAvancar.innerText = "Avançar para o Próximo Desafio ➔";
    btnAvancar.onclick = () => {
        rodadaAtual++;
        carregarRodada();
    };
    elemButtonGroup.appendChild(btnAvancar);
}

function mostrarFimJogo(mensagemFinal) {
    elemCenario.innerText = mensagemFinal;
    elemFeedbackBox.classList.add("hidden");
    elemButtonGroup.innerHTML = "";

    const btnReiniciar = document.createElement("button");
    btnReiniciar.className = "btn btn-action";
    btnReiniciar.innerText = "🔄 Reiniciar Simulação";
    btnReiniciar.onclick = iniciarJogo;
    elemButtonGroup.appendChild(btnReiniciar);
}

// Inicializa a árvore de eventos da aplicação
window.onload = iniciarJogo;