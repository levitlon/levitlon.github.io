document.addEventListener("DOMContentLoaded", () => {
    const resumoPedido = document.getElementById("resumoPedido");
    const totalPagamento = document.getElementById("totalPagamento");
    const formPagamento = document.getElementById("formPagamento");

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let total = 0;

    function atualizarResumo() {
        resumoPedido.innerHTML = "";
        total = 0;

        carrinho.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.nome} ${item.tamanho} x ${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
            resumoPedido.appendChild(li);
            total += item.preco * item.quantidade;
        });

        totalPagamento.textContent = total.toFixed(2);
    }

    formPagamento.addEventListener("submit", (e) => {
        e.preventDefault();

        const formaPagamento = document.querySelector("input[name='pagamento']:checked").value;
        const comentarios = document.getElementById("comentarios").value;

        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        const pedido = carrinho.map(item => `${item.nome} ${item.tamanho} x ${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}`).join("\n");

        // Simulação de envio para o Google Apps Script (substitua pelo seu script real)
        const url = "https://script.google.com/macros/s/AKfycbwBt6QgyEkqQCauJzilGyVXq9s5TOrNNrGWCxtGM4-ZkS7VSyVWaSu5CzK6aJzFY4a3vA/exec"; // Substitua pelo seu ID
        const data = new FormData();
        data.append("pedido", pedido);
        data.append("total", total.toFixed(2));
        data.append("pagamento", formaPagamento);
        data.append("comentarios", comentarios);

        fetch(url, {
            method: "POST",
            body: data
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao registrar o pedido!");
                }
                return response.json();
            })
            .then(result => {
                alert("Pedido confirmado com sucesso! Obrigado pela preferência.");
                localStorage.removeItem("carrinho");
                window.location.href = "index.html";
            })
            .catch(error => {
                alert("Erro ao registrar o pedido! Tente novamente.");
                console.error("Erro:", error);
            });
    });

    atualizarResumo();
});
