function trocarFundo() {
    const usuario = document.getElementById("usuario").value;

    document.body.classList.remove("rafaela","roberta","fabiano");

    if (usuario) {
        document.body.classList.add(usuario);
    }
}

function login() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    const usuarios = {
        rafaela: "1234",
        roberta: "abcd",
        fabiano: "senha123"
    };

    if (!usuario || !senha) {
        erro.textContent = "Preencha todos os campos.";
        return;
    }

    if (usuarios[usuario] === senha) {

        // 👉 redirecionamentos
        if (usuario === "rafaela" || usuario === "roberta") {
            window.location.href = "adicionar.html";
        } else if (usuario === "fabiano") {
            window.location.href = "pagar.html";
        }

    } else {
        erro.textContent = "Usuário ou senha incorretos.";
    }
}