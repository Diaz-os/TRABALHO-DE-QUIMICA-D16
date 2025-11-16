// =================================================================
// 1. FUNÇÃO PRINCIPAL: CHAMADA AO ENVIAR O FORMULÁRIO
// =================================================================

function gerarProtocoloPDF(event) {
    // ESSENCIAL: Impede o envio padrão do formulário (que recarregaria a página)
    event.preventDefault();

    // 1. COLETAR DADOS DO FORMULÁRIO
    // O ID "protocoloForm" foi adicionado na tag <form> do index.html
    const form = document.getElementById('protocoloForm');
    
    // Verificação simples dos campos obrigatórios
    if (!form.checkValidity()) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const nome = form.querySelector('input[placeholder="Seu Nome Completo"]').value;
    const email = form.querySelector('input[type="email"]').value;
    // Pega o texto da opção selecionada
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
    
    // Gera um número aleatório de 6 dígitos
    const numAleatorio = Math.floor(100000 + Math.random() * 900000); 

    const protocolo = `PRT-${dataFormatada}-${numAleatorio}`;

    // 3. CONSTRUIR O CONTEÚDO DO PDF COM ESTRUTURA SIMPLIFICADA (Mais confiável para jsPDF)
    const conteudoPDF = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #003366;">Comprovante de Denúncia - Fiscalize Aqui</h1>
            
            <p style="font-size: 1.2em; font-weight: bold;">
                NÚMERO DE PROTOCOLO: <span style="color: #dc3545;">${protocolo}</span>
            </p>
            <p><strong>Data/Hora do Registro:</strong> ${data.toLocaleString('pt-BR')}</p>
            
            <h3 style="color: #004080; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
                Detalhes da Ocorrência
            </h3>
            
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Tipo:</strong> ${tipoProblema}</p>
            <p><strong>Endereço:</strong> ${endereco}</p>

            <h3 style="color: #004080; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
                Descrição
            </h3>
            <p>${detalhes}</p>

            <div style="background-color: #f0f8ff; border-left: 5px solid #007bff; padding: 15px; margin-top: 30px;">
                <p style="font-weight: bold;">MENSAGEM IMPORTANTE:</p>
                <p>O seu protocolo foi gerado com sucesso! Utilize o NÚMERO DE PROTOCOLO acima para acompanhar o status no Dashboard. O prazo de análise inicial é de 7 dias úteis.</p>
                <p>Agradecemos sua colaboração com o ODS 16.</p>
            </div>
            <p style="font-size: 0.8em; text-align: center; margin-top: 20px;">
                *Este documento foi gerado automaticamente pela plataforma Fiscalize Aqui.
            </p>
        </div>
    `;

    // 4. CHAMAR A GERAÇÃO DO PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4'); 

    // Dispara o pop-up de confirmação imediata
    alert(`Protocolo Gerado com Sucesso! Seu número é: ${protocolo}. O PDF será baixado em instantes.`);
    
    // Processo de renderização do HTML no PDF (assíncrono)
    doc.html(conteudoPDF, {
        callback: function (doc) {
            // ESSENCIAL: Salva o PDF somente após a renderização completa.
            doc.save(`${protocolo}.pdf`); 
        },
        x: 10,
        y: 10,
        width: 180, 
        windowWidth: 650, 
        html2canvas: {
            timeout: 5000 // Aumenta o limite de tempo para renderizar
        }
    });
    
    // Limpa o formulário
    form.reset(); 
}
