// Estado inicial do jogo
let lucro = 50;
let preservacao = 50;
let rodadaAtual = 0;

// Banco de dados dos desafios (Dicionário de Rodadas)
const desafios = [
    {
        id: 1,
        texto: "⚠️ SURGIMENTO DE PRAGA: Uma infestação severa de lagartas surgiu na plantação de milho, ameaçando destruir metade da colheita desta temporada.",
        opcoes: [
            {
                texto: "Aplicar defensivo químico tradicional de ação rápida.",
                feedback: "O produto salvou a colheita rapidamente garantindo o lucro, mas contaminou o solo e afastou polinizadores da região.",
                efeitoLucro: 20,
                efeitoPreservacao: -20
            },
            {
                texto: "Utilizar controle biológico (vespas parasitoides) e defensivos naturais.",
                feedback: "O controle demorou um pouco mais e custou mais caro no início, mas restabeleceu o equilíbrio ecológico sem agredir a terra.",
                efeitoLucro: -10,
                efeitoPreservacao: 25
            }
        ]
    },
    {
        id: 2,
        texto: "💧 ESCASSEZ DE ÁGUA: A região enfrenta uma forte estiagem. Você precisa decidir como gerenciar a irrigação da sua propriedade.",
        opcoes: [
            {
                texto: "Manter o sistema de irrigação por inundação atual para não gastar com reformas.",
                feedback: "Você economizou capital imediato, mas houve um desperdício massivo de água e os lençóis freáticos secaram severamente.",
                efeitoLucro: 15,
                efeitoPreservacao: -25
            },
            {
                texto: "Investir em um sistema modernizado de gotejamento automatizado.",
                feedback: "O investimento inicial reduziu seu caixa, mas a economia de água foi drástica e a produtividade se manteve estável a longo prazo.",
                efeitoLucro: -20,
                efeitoPreservacao: 30
            }
        ]
    },
    {
        id: 3,
        texto: "🔋 ENERGIA NA FAZENDA: Os custos com energia elétrica para os galpões de armazenamento e maquinários dispararam este mês.",
        opcoes: [
            {
                texto: "Continuar utilizando a rede elétrica comum baseada em termelétricas.",
                feedback: "Sem gastos extras para instalar equipamentos, mas sua pegada de carbono continuou alta e os custos fixos continuam subindo.",
                efeitoLucro: 5,
                efeitoPreservacao: -10
            },
            {
                texto: "Instalar painéis de energia solar fotovoltaica na propriedade.",
                feedback: "Alto investimento financeiro inicial, mas a fazenda agora é autossustentável energeticamente e reduziu a emissão de gases.",
                efeitoLucro: -15,
                efeitoPreservacao: 20
            }
        ]
    }
];

// Elementos da interface
const textoCenario = document.getElementById("scenario-text");
const textoFeedback = document.getElementById("feedback-text");
const containerBotoes = document.getElementById("choice-buttons");
const barraLucro = document.getElementById("lucro-bar");
const barraPreservacao = document.getElementById("preservacao-bar");
const valLucro = document.getElementById("lucro-val");
const valPreservacao = document.getElementById("preservacao-val");

// Inicializa o jogo
function iniciarJogo() {
    lucro = 50;
    preservacao = 50;
    rodadaAtual = 0;
    textoFeedback.classList.add("hidden");
    atualizarInterface();
    mostrarDesafio();
}

// Atualiza as barras visuais de status
function atualizarInterface() {
    // Garante que os valores fiquem entre 0 e 100
    lucro = Math.max(0, Math.min(100, lucro));
    preservacao = Math.max(0, Math.min(100, preservacao));

    barraLucro.style.width = `${lucro}%`;
    barraPreservacao.style.width = `${preservacao}%`;

    valLucro.innerText = `${lucro}%`;
    valPreservacao.innerText = `${preservacao}%`;
}

// Renderiza o desafio atual na tela
function mostrarDesafio() {
    containerBotoes.innerHTML = "";

    // Verifica condições de Game Over ou Vitória antes de prosseguir
    if (lucro <= 0) {
        finalizarJogo("❌ FALEU! Suas decisões financeiras levaram a fazenda à falência. Sem dinheiro, a sustentabilidade não se sustenta.");
        return;
    }
    if (preservacao <= 0) {
        finalizarJogo("❌ DESASTRE AMBIENTAL! A terra se tornou infértil, a água secou e a propriedade foi multada e interditada pelos órgãos ambientais.");
        return;
    }

    // Se passarem todas as rodadas com sucesso
    if (rodadaAtual >= desafios.length) {
        if (lucro >= 50 && preservacao >= 50) {
            finalizarJogo("🏆 GESTOR DE EXCELÊNCIA! Você provou que é possível ter uma produção altamente lucrativa em harmonia perfeita com o meio ambiente. Parabéns!");
        } else {
            finalizarJogo("🏁 FIM DE JOGO! Você conseguiu terminar o período de gestão, mas não alcançou o equilíbrio ideal sustentável. Tente novamente!");
        }
        return;
    }

    const desafio = desafios[rodadaAtual];
    textoCenario.innerText = desafio.texto;

    // Criar botões para cada opção do desafio
    desafio.opcoes.forEach(opcao => {
        const botao = document.createElement("button");
        botao.className = "btn";
        botao.innerText = opcao.texto;
        botao.onclick = () => processarEscolha(opcao);
        containerBotoes.appendChild(botao);
    });
}

// Processa a escolha feita pelo usuário
function processarEscolha(opcao) {
    lucro += opcao.efeitoLucro;
    preservacao += opcao.efeitoPreservacao;

    atualizarInterface();

    // Mostra o feedback da ação realizada
    textoFeedback.innerText = opcao.feedback;
    textoFeedback.classList.remove("hidden");

    // Avança para o próximo desafio
    rodadaAtual++;
    
    // Pequeno delay para o jogador ler o cenário novo mantendo o feedback anterior visível
    mostrarDesafio();
}

// Finaliza o jogo mostrando o desfecho
function finalizarJogo(mensagemFinal) {
    textoCenario.innerText = mensagemFinal;
    textoFeedback.classList.add("hidden");
    containerBotoes.innerHTML = "";

    // Criar botão de reiniciar
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.className = "btn";
    botaoReiniciar.style.borderColor = "var(--primary-green)";
    botaoReiniciar.style.textAlign = "center";
    botaoReiniciar.innerText = "🔄 Jogar Novamente";
    botaoReiniciar.onclick = iniciarJogo;
    containerBotoes.appendChild(botaoReiniciar);
}

// Executa ao carregar a página
window.onload = iniciarJogo;