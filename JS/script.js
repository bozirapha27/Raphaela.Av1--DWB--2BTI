document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("#formTarefa");
  const input = document.querySelector("#inputTarefa");
  const mensagemErro = document.querySelector("#mensagemErro");
  const lista = document.querySelector("#listaTarefas");

  const tarefas = [];

  function validarTarefa(texto) {
    if (texto.trim() === "") {
      return "A tarefa não pode estar vazia.";
    }
    return "";
  }

  function renderTarefas() {
    lista.innerHTML = "";

    for (const tarefa of tarefas) {
      const li = document.createElement("li");
      li.textContent = tarefa;
      lista.append(li);
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const textoDigitado = input.value;
    const erroValidacao = validarTarefa(textoDigitado);

    if (erroValidacao !== "") {
      mensagemErro.textContent = erroValidacao;
      return;
    }

    mensagemErro.textContent = "";
    tarefas.push(textoDigitado.trim());
    renderTarefas();

    input.value = "";
    input.focus();
  });

});