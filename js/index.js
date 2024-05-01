// Requisição
async function consultaDados() {
    const dadosProdutos = document.querySelector('.livros');

    try {
        const url = await fetch('http://127.0.0.1:8000/produtos');
        const descricao = await url.json();

        descricao.forEach((info) => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produtos');

            produtoDiv.innerHTML +=
                `<img src="${info.imagem}" alt="Imagem do livro" class="img-produto">
                <div class="conteudo">
                    <h1 class="titulo">${info.nome}</h1>
                    <p class="autor">${info.autor}</p>
                    <hr>
                    <p>${info.sinopse}</p>
                    <p class="genero">Gênero: <strong>${info.gênero}</strong></p>
                    <p class="editora">Editora: <strong>${info.editora}</strong</p>
                </div>`
            ;

            dadosProdutos.appendChild(produtoDiv);
        });
    } catch (error) {
        switch (error.toString()) {
            case 'TypeError: Failed to fetch':
                console.error("Erro de Tipo! Falha na requisição da url.");
                break;
            case `SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON`:
                console.error("Erro de Syntax! Caminho do arquivo não encontrado.");
                break;
            case `Cannot read properties of null (reading 'appendChild')`:
                console.error("Erro! Não é possível ler propriedades vazias.");
                break;
            default:
                console.log(error.toString());
                break;
        }
    }
};

consultaDados();

// Barra de pesquisa
const botaoPesquisa = document.querySelector('.btn');
botaoPesquisa.addEventListener("click", filtraPesquisa);

async function filtraPesquisa() {
    const infor = document.querySelectorAll('.produtos');
    const pesquisa = document.getElementById('pesquisar');

    for (let resultado of infor) {
        const titulo = resultado.querySelector(".titulo").textContent.toLowerCase();
        const autor = resultado.querySelector(".autor").textContent.toLowerCase();
        const genero = resultado.querySelector(".genero").textContent.toLowerCase();
        const editora = resultado.querySelector(".editora").textContent.toLowerCase();

        let valorPesquisa = await pesquisa.value.toLowerCase();

        if (titulo.includes(valorPesquisa) || genero.includes(valorPesquisa) || editora.includes(valorPesquisa) || autor.includes(valorPesquisa)) {
            resultado.style.display = "grid";
        } else {
            resultado.style.display = "none";
        }
    }
};

// Botão de pesquisa
const generoBTN = document.querySelectorAll('.botaoPesquisa');

generoBTN.forEach((valores) => {
    let nomeGenero = valores.getAttribute('name');
    valores.addEventListener("click", () => filtraDetalhe(nomeGenero))
});

function filtraDetalhe(filtro) {
    const produtos = document.querySelectorAll(".produtos");

    for (let produto of produtos) {
        let generos = produto.querySelector(".genero").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if (!generos.includes(valorFiltro) && valorFiltro !== 'tudo') {
            produto.style.display = "none";
        } else {
            produto.style.display = "grid";
        }
    }
};