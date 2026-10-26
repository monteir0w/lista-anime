// lista onde vai ficar os animes
let animes = [];

// pega os animes salvos no navegador
if (localStorage.getItem("animes") != null) {
    animes = JSON.parse(localStorage.getItem("animes"));
}

mostrarLista();

function adicionar() {
    const nome = document.getElementById("nome").value;
    const genero = document.getElementById("genero").value;
    const episodios = document.getElementById("episodios").value;
    const nota = document.getElementById("nota").value;
    const status = document.getElementById("status").value;

    // verifica se o nome ta vazio
    if (nome == "") {
        alert("Digite o nome do anime!");
        return;
    }

    if (nota > 10 || nota < 0) {
        alert("A nota tem que ser de 0 a 10");
        return;
    }

    const anime = {
        nome: nome,
        genero: genero,
        episodios: episodios,
        nota: nota,
        status: status
    };

    animes.push(anime);
    salvar();

    // limpa os campos
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("episodios").value = "";
    document.getElementById("nota").value = "";

    mostrarLista();
}

function mostrarLista() {
    const tabela = document.getElementById("tabela");
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    tabela.innerHTML = "";

    for (let i = 0; i < animes.length; i++) {
        // so mostra se tiver o texto da pesquisa
        if (animes[i].nome.toLowerCase().includes(pesquisa)) {
            tabela.innerHTML += "<tr>" +
                "<td>" + animes[i].nome + "</td>" +
                "<td>" + animes[i].genero + "</td>" +
                "<td>" + animes[i].episodios + "</td>" +
                "<td>" + animes[i].nota + "</td>" +
                "<td>" + animes[i].status + "</td>" +
                "<td>" +
                "<button class='btn-editar' onclick='editar(" + i + ")'>Editar</button> " +
                "<button class='btn-excluir' onclick='excluir(" + i + ")'>Excluir</button>" +
                "</td>" +
                "</tr>";
        }
    }

    document.getElementById("total").innerHTML = "Total: " + animes.length;
}

function excluir(i) {
    const certeza = confirm("Quer mesmo excluir " + animes[i].nome + "?");

    if (certeza == true) {
        animes.splice(i, 1);
        salvar();
        mostrarLista();
    }
}

function editar(i) {
    const novoStatus = prompt("Novo status (Assistindo, Completo, Quero assistir, Abandonado):", animes[i].status);
    const novaNota = prompt("Nova nota:", animes[i].nota);

    if (novoStatus != null && novoStatus != "") {
        animes[i].status = novoStatus;
    }

    if (novaNota != null && novaNota != "") {
        animes[i].nota = novaNota;
    }

    salvar();
    mostrarLista();
}

function salvar() {
    localStorage.setItem("animes", JSON.stringify(animes));
}