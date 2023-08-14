document
  .getElementById("registroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Recupera os valores dos campos
    const data = document.getElementById("data").value;
    const situacao = document.getElementById("situacao").value;
    const pensamentos = document.getElementById("pensamentos").value;
    const emocoes = document.getElementById("emocoes").value;
    const consequencias = document.getElementById("consequencias").value;
    const crencas = document.getElementById("crencas").value;

    // Cria uma nova linha na tabela com os dados do registro
    const tabela = document.getElementById("tabelaRegistros");

    // Salva o registro localmente no navegador
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const novoRegistro = {
      data: data,
      situacao: situacao,
      pensamentos: pensamentos,
      emocoes: emocoes,
      consequencias: consequencias,
      crencas: crencas,
    };
    registros.push(novoRegistro);
    localStorage.setItem("registros", JSON.stringify(registros));
    novaLinhaNaTabela(tabela, novoRegistro, registros.length - 1);
    console.log(registros);

    limpaForm();
  });

// Evento do botão para exportar em PDF
document.getElementById("imprimir").addEventListener("click", function () {
  const divContents = document.getElementById("registros").innerHTML;
  
  const printWindow = window.open("", "", "height=400,width=800");
  printWindow.document.write("<html><head><title>DIV Contents</title>");
  printWindow.document.write("<link rel='stylesheet' href='style.css' />");
  printWindow.document.write("</head><body >");
  printWindow.document.write(divContents);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  setTimeout(()=>{
    printWindow.print();
    printWindow.close();
  }
    ,1000);
});

// Evento do botão para exportar em PDF
document.getElementById("limpar").addEventListener("click", function () {
  localStorage.setItem("registros", JSON.stringify([]));
  limpaVisualizacaoTabela();
});

function limpaVisualizacaoTabela() {
  const tableHeaderRowCount = 1;
  const table = document.getElementById("tabelaRegistros");
  const rowCount = table.rows.length;
  for (let i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
}

function limpaForm() {
  document.getElementById("data").value = "";
  document.getElementById("situacao").value = "";
  document.getElementById("pensamentos").value = "";
  document.getElementById("emocoes").value = "";
  document.getElementById("consequencias").value = "";
  document.getElementById("crencas").value = "";
}

function excluirLinha(botao) {
  const tabela = document.getElementById("tabelaRegistros");
  const registros = JSON.parse(localStorage.getItem("registros"));
  registros.splice(Number(botao.getAttribute("data-id")),1);
  localStorage.setItem("registros", JSON.stringify(registros));
  limpaVisualizacaoTabela();
  carregarRegistros();
}

// Função para carregar os registros salvos localmente na tabela
function carregarRegistros() {
  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  const tabela = document.getElementById("tabelaRegistros");

  for (let i = 0; i < registros.length; i++) {
    const registro = registros[i];
    novaLinhaNaTabela(tabela, registro, i);
  }
}

function novaLinhaNaTabela(tabela, registro, index) {
  const novaLinha = tabela.insertRow();

  const celulaData = novaLinha.insertCell();
  celulaData.innerHTML = registro.data;

  const celulaSituacao = novaLinha.insertCell();
  celulaSituacao.innerHTML = registro.situacao;

  const celulaPensamentos = novaLinha.insertCell();
  celulaPensamentos.innerHTML = registro.pensamentos;

  const celulaEmocoes = novaLinha.insertCell();
  celulaEmocoes.innerHTML = registro.emocoes;

  const celulaConsequencias = novaLinha.insertCell();
  celulaConsequencias.innerHTML = registro.consequencias;

  const celulaCrencas = novaLinha.insertCell();
  celulaCrencas.innerHTML = registro.crencas;

  const celulaAcoes = novaLinha.insertCell();
  const botaoExcluir = document.createElement("button");
  botaoExcluir.setAttribute("data-id", index);
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.addEventListener("click", function () {
    excluirLinha(this);
  });
  celulaAcoes.appendChild(botaoExcluir);
}

// Carrega os registros ao carregar a página
carregarRegistros();

function updatemenu() {
  if (document.getElementById('responsive-menu').checked == true) {
    document.getElementById('menu').style.borderBottomRightRadius = '0';
    document.getElementById('menu').style.borderBottomLeftRadius = '0';
  }else{
    document.getElementById('menu').style.borderRadius = '10px';
  }
}