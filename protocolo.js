// =================================================================
// ARQUIVO: protocolo.js (Versão Final e Funcional com doc.text)
// =================================================================

function gerarProtocoloPDF(event) {
    // ESSENCIAL: Impede o envio padrão do formulário
    event.preventDefault();

    const form = document.getElementById('protocoloForm');
    
    if (!form.checkValidity()) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // 1. COLETAR DADOS DO FORMULÁRIO
    const nome = form.querySelector('input[placeholder="Seu Nome Completo"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const tipoProblema = form.querySelector('select').options[form.querySelector('select').selectedIndex].text;
    const endereco = form.querySelector('input[placeholder="Endereço Exato do Problema e Ponto de Referência *"]').value;
    const detalhes = form.querySelector('textarea').value;

    // 2. GERAR CÓDIGO DE PROTOCOLO ALEATÓRIO E DATADO
    const data = new Date();
    const dataFormatada = [
        ('0' + data.getDate()).slice(-2),
        ('0' + (data.getMonth() + 1)).slice(-2),
        data.getFullYear()
    ].join('');
    
    const numAleatorio = Math.floor(100000 + Math.random() * 900000); 
    const protocolo = `PRT-${dataFormatada}-${numAleatorio}`;

    // =================================================================
    // 3. CRIAÇÃO DO PDF USANDO TEXTO SIMPLES (Garantia de Download)
    // =================================================================
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4'); 
    let y = 20; // Posição vertical inicial (20mm do topo)

    // TÍTULO
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102); // Azul Escuro
    doc.text("Comprovante de Denúncia - Fiscalize Aqui", 15, y);
    y += 10;

    // PROTOCOLO
    doc.setFontSize(14);
    doc.setTextColor(51, 51, 51);
    doc.text(`NÚMERO DE PROTOCOLO: ${protocolo}`, 15, y);
    y += 8;

    doc.setFontSize(10);
    doc.text(`Data/Hora do Registro: ${data.toLocaleString('pt-BR')}`, 15, y);
    y += 15;

    // DETALHES DO CIDADÃO
    doc.setFontSize(12);
    doc.text("--- Detalhes do Problema ---", 15, y);
    y += 8;
    
    doc.text(`Nome do Cidadão: ${nome}`, 15, y);
    y += 6;
    doc.text(`E-mail: ${email}`, 15, y);
    y += 6;
    doc.text(`Tipo de Ocorrência: ${tipoProblema}`, 15, y);
    y += 6;
    doc.text(`Endereço: ${endereco}`, 15, y);
    y += 15;

    // DESCRIÇÃO
    doc.setFontSize(12);
    doc.text("--- Descrição Completa ---", 15, y);
    y += 8;
    
    // Divide o texto da descrição em linhas para caber no PDF
    const textLines = doc.splitTextToSize(detalhes, 180); 
    doc.text(textLines, 15, y);
    y += (textLines.length * 5) + 15; // Ajusta a posição Y baseada no número de linhas

    // MENSAGEM FINAL
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); 
    doc.text("MENSAGEM IMPORTANTE:", 15, y);
    y += 6;
    const msg = "O seu protocolo foi gerado com sucesso! Utilize o NÚMERO DE PROTOCOLO acima para acompanhar o status no nosso Dashboard. O prazo de análise inicial é de 7 dias úteis. Agradecemos sua colaboração com o ODS 16.";
    const msgLines = doc.splitTextToSize(msg, 180);
    doc.text(msgLines, 15, y);
    y += (msgLines.length * 5) + 10;


    // Dispara o pop-up de confirmação imediata
    alert(`Protocolo Gerado com Sucesso! Seu número é: ${protocolo}. O PDF será baixado.`);
    
    // COMANDO DE DOWNLOAD GARANTIDO
    doc.save(`${protocolo}.pdf`); 
    
    form.reset(); 
}


// =================================================================
// 4. VINCULAR A FUNÇÃO AO FORMULÁRIO (Listener)
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('protocoloForm');
    
    if (form) {
        form.addEventListener('submit', gerarProtocoloPDF);
    }
});