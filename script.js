function trocarFundo() {
    const usuario = document.getElementById("usuario").value;

    // remove fundos anteriores
    document.body.classList.remove("rafaela", "roberta", "fabiano");

    // adiciona novo fundo
    if (usuario) {
        document.body.classList.add(usuario);
    }
}

async function login() {

  const usuario = document.getElementById("usuario").value.toLowerCase().trim();
  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("erro");

  erro.textContent = "";

  if (!usuario) {
    erro.textContent = "Digite o usuário.";
    return;
  }

  // consulta login
  const resp = await fetch(
    "https://script.google.com/macros/s/AKfycbzyUWn-_SfnPRoMeFCdkmNO_kFhzX0QKc9eQQkovPFipeg82JPLTQ0ueRiutFCdg-yD/exec?tipo=login&usuario=" + usuario + "&senha=" + senha
  );

  const dados = await resp.json();

  if (!dados.existe) {

    const novaSenha = prompt(
      "Nenhuma senha criada ainda. Qual senha deseja usar?"
    );

    if (!novaSenha) return;

    await fetch(
      "https://script.google.com/macros/s/AKfycbzyUWn-_SfnPRoMeFCdkmNO_kFhzX0QKc9eQQkovPFipeg82JPLTQ0ueRiutFCdg-yD/exec?tipo=login&usuario=" +
      usuario +
      "&novaSenha=" +
      novaSenha
    );

    alert("Senha criada! Agora faça login.");
    return;
  }

  if (!dados.correta) {
    erro.textContent = "Senha incorreta.";
    return;
  }

  // ✅ login OK
  localStorage.setItem("usuario", usuario);

  if (usuario === "fabiano") {
    window.location.href = "pagar.html";
  } else {
    window.location.href = "usuario.html";
  }
}