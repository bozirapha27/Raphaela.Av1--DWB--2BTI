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

    tarefas.forEach((tarefa, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = tarefa;

      // botão excluir 🗑️
      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "🗑️";
      btnExcluir.style.marginLeft = "10px";

      btnExcluir.addEventListener("click", () => {
        tarefas.splice(index, 1);
        renderTarefas();
      });

      // botão editar ✏️
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏️";
      btnEditar.style.marginLeft = "10px";

      btnEditar.addEventListener("click", () => {
        const novoTexto = prompt("Editar tarefa:", tarefa);

        if (novoTexto !== null && novoTexto.trim() !== "") {
          tarefas[index] = novoTexto.trim();
          renderTarefas();
        }
      });

      li.appendChild(span);
      li.appendChild(btnEditar);
      li.appendChild(btnExcluir);

      lista.appendChild(li);
    });
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