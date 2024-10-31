const botaoAdicionar = document.getElementById("botaoAdicionar");
const campoInput = document.getElementById("items");
const listaDeCompras = document.querySelector("#listaDeCompras");

function adicionaLista(){
    botaoAdicionar.addEventListener("click", clickar)
}
function clickar(event){
    event.preventDefault();
    const novoItem = campoInput.value;
    if (novoItem !== "") {
        const novoItemLista = document.createElement("li");
        novoItemLista.textContent = novoItem;
        listaDeCompras.appendChild(novoItemLista);

        campoInput.value = "";
    }
    
}
adicionaLista();
