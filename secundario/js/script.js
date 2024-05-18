const id = new URLSearchParams(window.location.search).get('id') - 1;

// CARREGANDO LIVRO ESPECÍFICO
async function livroEspecifico() {
    const inforLivro = document.getElementById("inforLivros");

    try {
        const url = await fetch(`https://gustx21.github.io/E-Commerce/backend/produtos.json`);
        const dadosLivro = await url.json();

        // TITULO DO HEAD
        document.querySelector("title").innerText = dadosLivro.produtos[id].nome;

        // CARREGANDO OS DADOS DO LIVRO
        const article = document.createElement("article");
        article.classList.add('livro');

        article.innerHTML =
            `<img src="${dadosLivro.produtos[id].imagem}" alt="Imagem do livro ${dadosLivro.produtos[id].nome}" class="img-livro">
            <div class="conteudo">
                <h1 class="titulo">${dadosLivro.produtos[id].nome}</h1>
                <p${dadosLivro.produtos[id].autor}</p>
                <hr>
                <p>${dadosLivro.produtos[id].sinopse}</p>

                <p>Editora: <em>${dadosLivro.produtos[id].editora}</em></p>
                <p>Gênero: <strong>${dadosLivro.produtos[id].gênero}</strong></p>
                <p>Adaptações: <strong>${dadosLivro.produtos[id].detalhes.adaptacoes}</strong></p>
                <p>Páginas: ${dadosLivro.produtos[id].páginas}</p>
                <p>Avaliação: ${dadosLivro.produtos[id].avaliacao}</p>
                <p>Idioma: ${dadosLivro.produtos[id].idioma}</p>
                <p>Ano: ${dadosLivro.produtos[id].ano}</p>
                
                <details>
                    <p>ISBN: <strong>${dadosLivro.produtos[id].isbn}</strong></p>
                </details>
            </div>`
            ;

        inforLivro.appendChild(article);

    } catch (error) {
        switch (error.name) {
            case 'TypeError':
                console.error(`Erro de tipo! ${error.toString()}`);
                break;
            case 'ReferenceError':
                console.error(`Erro de referência! ${error.toString()}`);
                break;
            case 'ErrorEvent':
                console.error(`Erro de evento! ${error.toString()}`);
                break;
            case 'SyntaxError':
                console.error(`Erro de syntax! ${error.toString()}`);
                break;
            case 'RangeError':
                console.error(`Erro perigoso! ${error.toString()}`);
                break;
            default:
                console.log(error.toString());
                break;
        }
    }
}

document.addEventListener("DOMContentLoaded", livroEspecifico);