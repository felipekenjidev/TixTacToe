// Selecionar os Elementos da Grade do Jogo da Velha
const areas = document.querySelectorAll(".area-grade");
let turnoCirculo = true;
let bloqueado = false;

// Criar o Evento de Clique na Grade
areas.forEach(function(area) {
    area.addEventListener("click", function() {
        // Adicionar a Forma
        if (area.firstChild === null && !bloqueado) {
            if (turnoCirculo) {
                area.innerHTML = `<svg viewBox="0 0 150 150" class="icone-o">
                                    <circle class="circulo-animado" cx="75" cy="75" r="67" />
                                </svg>`;
            } else {
                area.innerHTML = `<svg viewBox="0 0 150 150" class="icone-x">
                                    <path d="M 15 15 L 135 135" />
                                    <path d="M 135 15 L 15 135" />
                                </svg>`;
            }
            
            // Passar o Turno para o Próximo Jogador
            turnoCirculo = !turnoCirculo;
    
            // Verificar Vitória ou Empate
            verificarResultado(areas, turnoCirculo);
        }
    });
});


// Função para Verificar o Resultado do Jogo
function verificarResultado(areas) {
    // Criar uma Matriz dos Elementos da Grade
    let matrizElementos = [];
    for (let i = 0; i < areas.length; i += 3) {
        const linha = Array.from(areas).slice(i, i + 3);
        matrizElementos.push(linha);
    }

    // Testar as Combinações de Vitória
    const icones = ["icone-o", "icone-x"];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            if (pegarIcone(matrizElementos[j][0]) == icones[i]
                && pegarIcone(matrizElementos[j][1]) == icones[i]
                && pegarIcone(matrizElementos[j][2]) == icones[i]) {
                    mostrarResultado(icones[i].substring(6));
                    return;
                }
            
            if (pegarIcone(matrizElementos[0][j]) == icones[i]
                && pegarIcone(matrizElementos[1][j]) == icones[i]
                && pegarIcone(matrizElementos[2][j]) == icones[i]) {
                    mostrarResultado(icones[i].substring(6));
                    return;
                }
        }

        if (pegarIcone(matrizElementos[0][0]) == icones[i]
            && pegarIcone(matrizElementos[1][1]) == icones[i]
            && pegarIcone(matrizElementos[2][2]) == icones[i]) {
                mostrarResultado(icones[i].substring(6));
                return;
            }

        if (pegarIcone(matrizElementos[0][2]) == icones[i]
            && pegarIcone(matrizElementos[1][1]) == icones[i]
            && pegarIcone(matrizElementos[2][0]) == icones[i]) {
                mostrarResultado(icones[i].substring(6));
                return;
            }
    }

    let empatou = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrizElementos[i][j].innerHTML == "")
                empatou = false;
        }
    }
    if (empatou)
        mostrarResultado("e");
}

// Função para Pegar o Nome do Ícone da Área da Grade
function pegarIcone(area) {
    return area.firstChild?.classList[0];
}

// Função para Mostrar o Resultado
function mostrarResultado(resultado) {
    bloqueado = true;
    let tempo = 2200;

    if (resultado == "o") {
        const vencedor = document.querySelector("#jogador2");
        vencedor.classList.add("vencedor");

        const placarO = document.querySelector("#jogador2 > .placar");
        placarO.textContent = Number(placarO.textContent) + 1;
    } else if (resultado == "x") {
        const vencedor = document.querySelector("#jogador1");
        vencedor.classList.add("vencedor");

        const placarX = document.querySelector("#jogador1 > .placar");
        placarX.textContent = Number(placarX.textContent) + 1;
    } else {
        // O Jogo Empatou!
        tempo = 1500;
    }

    setTimeout(function() {
        const placares = document.querySelectorAll("aside");
        placares.forEach(function(placar) {
            placar.classList.remove("vencedor");
        });
    }, 1500);
    setTimeout(resetarTabuleiro, tempo);
}

// Função para Reiniciar o Jogo da Velha
function resetarTabuleiro() {
    areas.forEach(function(area) {
        area.innerHTML = "";
    });

    bloqueado = false;
}

// Função para Começar Jogo
const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(ev) {
    ev.preventDefault();

    const nomeJogador1 = document.querySelector("#input-jogador1").value.trim();
    const localJogador1 = document.querySelector("#jogador1 .nome-jogador");
    localJogador1.textContent = nomeJogador1 != "" ? nomeJogador1 : "Jogador 1";

    const nomeJogador2 = document.querySelector("#input-jogador2").value.trim();
    const localJogador2 = document.querySelector("#jogador2 .nome-jogador");
    localJogador2.textContent = nomeJogador2 != "" ? nomeJogador2 : "Jogador 2";

    const fundos = document.querySelectorAll(".tela-fundo");
    fundos.forEach(function(fundo) {
        fundo.classList.add("sem-fundo");
    });

    const caixaFormulario = document.querySelector("section");
    caixaFormulario.setAttribute("style", "display: none;");
})