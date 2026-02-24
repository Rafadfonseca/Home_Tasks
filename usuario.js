const usuario = localStorage.getItem("usuario");

document.addEventListener("DOMContentLoaded", () => {

    // segurança
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    // nome no topo
    const nome = document.getElementById("nomeUsuario");
    if (nome) {
        nome.textContent =
            usuario.charAt(0).toUpperCase() + usuario.slice(1);
    }

    // aplica tema
    document.body.classList.add(usuario);

    iniciarAccordion();
    carregarMoney();
});
function iniciarAccordion() {

    const botoes = document.querySelectorAll(".acc-btn");

    botoes.forEach(btn => {
        btn.addEventListener("click", function () {

            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight =
                    content.scrollHeight + "px";
            }
        });
    });
}

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

function adicionarTarefa() {

    const select = document.getElementById("tarefa");
    const tarefa = select.value;

    if (!tarefa) {
        alert("Selecione uma tarefa");
        return;
    }

    const dados = {
        usuario: usuario,
        tarefa: tarefa,
        data: new Date().toLocaleDateString("pt-BR"),
        valor: 20
    };

    fetch("https://script.google.com/macros/s/AKfycbzyUWn-_SfnPRoMeFCdkmNO_kFhzX0QKc9eQQkovPFipeg82JPLTQ0ueRiutFCdg-yD/exec", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(dados)
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro no servidor");
        return res.json();
    })
    .then(() => {
        alert("✅ Tarefa salva!");

        // ⭐ limpa o select
        select.selectedIndex = 0;
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao enviar");
    });
}
function carregarMoney() {

    fetch("https://script.google.com/macros/s/AKfycbzyUWn-_SfnPRoMeFCdkmNO_kFhzX0QKc9eQQkovPFipeg82JPLTQ0ueRiutFCdg-yD/exec?usuario=" + usuario)
        .then(res => {
            if (!res.ok) throw new Error("Erro no servidor");
            return res.json();
        })
        .then(data => {

            const el = document.getElementById("moneyValor");

            if (el) {
                el.textContent =
                    "Você tem R$ " + data.total + ",00";
            }
        })
        .catch(err => console.error("Money erro:", err));
}
function salvarMeta() {

    const valor = document.getElementById("valorMeta").value;

    if (!valor) {
        alert("Digite um valor");
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbzyUWn-_SfnPRoMeFCdkmNO_kFhzX0QKc9eQQkovPFipeg82JPLTQ0ueRiutFCdg-yD/exec", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
            tipo: "meta",
            usuario: usuario,
            valor: valor
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro no servidor");
        return res.json();
    })
    .then(() => {
        alert("🎯 Meta salva!");
        carregarMeta();
    });
}



async function carregarMeta() {

  const usuario = localStorage.getItem("usuario");

  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbzyUWn-_SfnPRoMeFCdkmNO_kFhzX0QKc9eQQkovPFipeg82JPLTQ0ueRiutFCdg-yD/exec?usuario="
    + usuario + "&tipo=meta"
  );

  const dados = await res.json();

  const barra = document.getElementById("progressoMeta");
  const textoPorcentagem = document.getElementById("porcentagemMeta");

  if (!barra) return;

  // sem meta ainda
  if (!dados.meta || dados.meta == 0) {
    barra.style.width = "0%";
    textoPorcentagem.textContent = "0%";
    return;
  }

  let progresso = (dados.total / dados.meta) * 100;

  if (progresso > 100) progresso = 100;

  barra.style.width = progresso + "%";
  textoPorcentagem.textContent = Math.floor(progresso) + "%";
}




async function criarMeta() {

  const usuario = localStorage.getItem("usuario");

  // busca meta atual
  const res = await fetch("https://script.google.com/macros/s/AKfycbzyUWn-_SfnPRoMeFCdkmNO_kFhzX0QKc9eQQkovPFipeg82JPLTQ0ueRiutFCdg-yD/exec?usuario=" + usuario + "&tipo=meta");
  const dados = await res.json();

  let valor;

  // já existe meta
  if (dados.meta > 0) {

    const trocar = confirm("Você já tem uma meta. Deseja criar uma nova?");
    if (!trocar) return;

    valor = prompt("Qual o novo valor da sua meta?");
  } 
  else {
    valor = prompt("Qual o valor da sua meta?");
  }

  if (!valor) return;

  await fetch("https://script.google.com/macros/s/AKfycbzyUWn-_SfnPRoMeFCdkmNO_kFhzX0QKc9eQQkovPFipeg82JPLTQ0ueRiutFCdg-yD/exec", {
    method: "POST",
    body: JSON.stringify({
      tipo: "meta",
      usuario: usuario,
      valor: Number(valor)
    })
  });

  carregarMeta();
}
window.onload = () => {
  carregarMeta();
};