(function() {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function(form) {
    form.addEventListener(
      "submit",
      function(event) {
        if (!form.checkValidity()) {
          form.classList.add("was-validated");
        } else {
          inserir();
          form.classList.remove("was-validated");
          form.reset();
        }
        event.preventDefault();
        event.stopPropagation();
      },
      false
    );
  });
})();

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("bd_veiculos")) ?? [];
}

function setLocalStorage(bd_veiculos) {
  localStorage.setItem("bd_veiculos", JSON.stringify(bd_veiculos));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() {
  limparTabela();
  const bd_veiculos = getLocalStorage();
  let index = 1;
  for (veiculo of bd_veiculos) {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${veiculo.fabricante}</td>
        <td>${veiculo.modelo}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.motor}</td>
        <td>${veiculo.proprietario}</td>
        <td>${veiculo.ano}</td>

        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `;
    document.querySelector("#tabela>tbody").appendChild(novaLinha);
    index++;
  }
}

function inserir() {
  const veiculo = {
    fabricante: document.getElementById("fabricante").value.toUpperCase(),
    modelo: document.getElementById("modelo").value.toUpperCase(),
    placa: document.getElementById("placa").value.toUpperCase(),
    motor: document.getElementById("motor").value,
    proprietario: document.getElementById("proprietario").value.toUpperCase(),
    ano: document.getElementById("ano").value,
  };
  const bd_veiculos = getLocalStorage();
  bd_veiculos.push(veiculo);
  setLocalStorage(bd_veiculos);
  atualizarTabela();
}

function excluir(index) {
  const bd_veiculos = getLocalStorage();

  bd_veiculos.splice(index - 1, 1);

  setLocalStorage(bd_veiculos);
  atualizarTabela();
}

function alterar(index) {
  const bd_veiculos = getLocalStorage();
}

function validarPlaca() {
  const bd_veiculos = getLocalStorage();
  for (veiculo of bd_veiculos) {
    if (placa.value.toUpperCase() === veiculo.placa) {
      placa.setCustomValidity("Esta placa já foi cadastrada");
      feedbackPlaca.innerText = "Esta placa já foi cadastrada!";
      return false;
    } else {
      placa.setCustomValidity("");
      feedbackPlaca.innerText = "Informe a placa corretamente.";
    }
  }
  return true;
}

atualizarTabela();

const placa = document.getElementById("placa");
const feedbackPlaca = document.getElementById("feedbackPlaca");
placa.addEventListener("input", validarPlaca);
