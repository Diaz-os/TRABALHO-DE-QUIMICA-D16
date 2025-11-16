// =================================================================
// 1. FUNÇÃO PRINCIPAL: CHAMADA AO ENVIAR O FORMULÁRIO
// =================================================================
function gerarProtocoloPDF(event) {
    // Impede o envio padrão do formulário (que recarregaria a página)
    event.preventDefault();

    // 1. COLETAR DADOS DO FORMULÁRIO
    const form = document.querySelector('.form-section form');
    const nome = form.querySelector('input[placeholder="Seu Nome Completo"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const tipoProblema = form.querySelector('select').options[form.querySelector('select').selectedIndex].text;
    const endereco = form.querySelector('input[placeholder="Endereço Exato do Problema e Ponto de Referência *"]').value;
    const detalhes = form.querySelector('textarea').value;

    // 2. GERAR CÓDIGO DE PROTOCOLO ALEATÓRIO E DATADO
    const data = new Date();
    // Gera DDMMAAAA
    const dataFormatada = [
        ('0' + data.getDate()).slice(-2),
        ('0' + (data.getMonth() + 1)).slice(-2),
        data.getFullYear()
    ].join('');
    
    // Gera um número aleatório de 6 dígitos
    const numAleatorio = Math.floor(100000 + Math.random() * 900000); 

    const protocolo = `PRT-${dataFormatada}-${numAleatorio}`;

    // 3. CONSTRUIR O CONTEÚDO HTML DO PDF
    const conteudoPDF = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #003366; border-bottom: 2px solid #FFC107; padding-bottom: 10px;">
                Comprovante de Denúncia - Fiscalize Aqui
            </h1>
            
            <p style="font-size: 1.2em; font-weight: bold;">
                NÚMERO DE PROTOCOLO: <span style="color: #dc3545;">${protocolo}</span>
            </p>
            <p><strong>Data/Hora do Registro:</strong> ${data.toLocaleString('pt-BR')}</p>
            
            <h3 style="color: #004080; margin-top: 30px;">Detalhes do Problema</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; width: 30%; font-weight: bold;">Nome do Cidadão:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${nome}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Tipo de Ocorrência:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${tipoProblema}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Endereço:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${endereco}</td>
                </tr>
            </table>

            <h3 style="color: #004080; margin-top: 30px;">Descrição</h3>
            <p style="border: 1px dashed #ccc; padding: 15px;">${detalhes}</p>

            <div style="background-color: #f0f8ff; border-left: 5px solid #007bff; padding: 15px; margin-top: 40px;">
                <p style="font-weight: bold;">MENSAGEM IMPORTANTE:</p>
                <p>O seu protocolo foi gerado com sucesso! A Prefeitura de Cascavel (simulada) foi notificada. Seu problema será analisado por uma equipe técnica. Por favor, utilize o NÚMERO DE PROTOCOLO acima para acompanhar o status no nosso Dashboard. O prazo de análise inicial é de 7 dias úteis.</p>
                <p>Agradecemos sua colaboração com o ODS 16.</p>
            </div>
            <p style="font-size: 0.8em; text-align: center; margin-top: 20px;">
                *Este documento foi gerado automaticamente pela plataforma Fiscalize Aqui.
            </p>
        </div>
    `;

    // 4. CHAMAR A GERAÇÃO DO PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4'); // 'p' = retrato, 'mm' = milímetros, 'a4' = tamanho

    // Usamos html2canvas para renderizar o HTML complexo com estilos no PDF
    doc.html(conteudoPDF, {
        callback: function (doc) {
            // Salva o PDF com o nome do protocolo
            doc.save(`${protocolo}.pdf`); 
        },
        x: 10,
        y: 10,
        width: 180, // Largura máxima do conteúdo no PDF em mm
        windowWidth: 650 // Simula a largura da tela para renderização
    });
    
    // Opcional: Limpa o formulário após a submissão
    form.reset(); 
    
    alert(`Protocolo Gerado com Sucesso! Seu número é: ${protocolo}. O PDF será baixado.`);
}


// =================================================================
// 3. VINCULAR A FUNÇÃO AO BOTÃO DE ENVIAR
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-section form');
    // Encontra o botão (que é um <a> com type submit simulado no HTML original)
    const submitButton = form.querySelector('button[type="submit"]'); 

    if (form) {
        // Remove a ação de envio padrão do HTML
        form.removeAttribute('action'); 
        form.removeAttribute('source'); 

        // Adiciona o nosso evento de envio personalizado
        form.addEventListener('submit', gerarProtocoloPDF);
    }
});