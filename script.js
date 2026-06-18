// Seleção dos elementos do DOM
const btn = document.querySelector("#BTN");
const res = document.querySelector(".res");

// Evento de clique para disparar o garçom (API)
btn.addEventListener("click", garçom);

// Função responsável por fazer a requisição à API (O "Garçom" que busca o pedido)
function garçom() {
    // Gera um número randômico até o limite de Pokémons (1025)
    let random = Math.floor(Math.random() * 1025) + 1;
    
    // URL da API passando o ID gerado aleatoriamente
    let url = `https://pokeapi.co/api/v2/pokemon/${random}`;

    fetch(url)
        .then((response) => response.json()) // Transforma a resposta bruta em JSON
        .then((data) => {
            // Envia os dados tratados para preencher o HTML
            gerarPokémon(data);
        })
        .catch((error) => console.error("Erro ao buscar Pokémon:", error));
}

// Função que manipula os dados recebidos e os injeta na tela
function gerarPokémon(data) {
    // Extraindo as propriedades do objeto da API
    let nome = data.name;
    let id = data.id;
    let tipo = data.types[0].type.name;
    
    // Resgate da imagem oficial alternativa (front_default) para evitar campos nulos
    let img = data.sprites.front_default;

    // Template HTML que será renderizado dentro da div '.res'
    res.innerHTML = `
        <div class="card"> 
            <img src="${img}" alt="${nome}">
            <div class="container">
                <div class="title">
                    <h1>${nome.charAt(0).toUpperCase() + nome.slice(1)}</h1>
                    <p>#${id}</p>
                </div>
                <p id="poison">${tipo.toUpperCase()}</p>
            </div>
        </div>
    `;
}