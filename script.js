// ============================================
// PORTAL AGRÍCOLA TECH - AGRINHO 2026
// Tema: Agro forte, futuro sustentável
// Layout horizontal e espaçoso
// ============================================

let quantidade = "2"; 
let precoPorUnidade = 5.00; 
let total = 10.00;
let bolhas = [];
let botoesNum = [];
let botoesProduto = [];
let botoesPreco = [];
let botaoAdicionar = null;
let botaoLimparCarrinho = null;
let botaoRemoverUltimo = null;
let mensagemSustentavel = "";
let tempoMensagem = 0;
let mensagemFeedback = "";
let tempoFeedback = 0;

// Carrinho de compras
let carrinho = [];

// Produtos agrícolas
let produtos = [
  { 
    nome: "Sementes Orgânicas", 
    precoInicial: 5.00,
    infoSustentavel: "🌱 Cultivo sem agrotóxicos",
    impactoCO2: "Baixo",
    icone: "🌱"
  },
  { 
    nome: "Adubo Natural (kg)", 
    precoInicial: 12.50,
    infoSustentavel: "🌿 Compostagem orgânica",
    impactoCO2: "Muito Baixo",
    icone: "🌿"
  },
  { 
    nome: "Mudas Nativas", 
    precoInicial: 8.00,
    infoSustentavel: "🌳 Reflorestamento local",
    impactoCO2: "Negativo (captura CO₂)",
    icone: "🌳"
  }
];

let produtoSelecionado = 0;
let precosPersonalizados = [5.00, 12.50, 8.00];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Arial');
  
  // Teclado Numérico (posicionado à esquerda)
  let infosBotoes = [
    { label: '1', x: 60, y: 80 },   { label: '2', x: 140, y: 80 },  { label: '3', x: 220, y: 80 },
    { label: '4', x: 60, y: 145 },  { label: '5', x: 140, y: 145 }, { label: '6', x: 220, y: 145 },
    { label: '7', x: 60, y: 210 },  { label: '8', x: 140, y: 210 }, { label: '9', x: 220, y: 210 },
    { label: 'C', x: 60, y: 275 },  { label: '0', x: 140, y: 275 }, { label: '←', x: 220, y: 275 }
  ];
  
  for (let b of infosBotoes) {
    botoesNum.push({ label: b.label, x: b.x, y: b.y, w: 65, h: 50 });
  }

  // Seletor de Produtos (centralizado no topo)
  for (let i = 0; i < produtos.length; i++) {
    botoesProduto.push({
      id: i,
      label: produtos[i].icone + " " + produtos[i].nome,
      x: width/2 - 225 + (i * 225),
      y: 20,
      w: 200,
      h: 55
    });
  }

  // Botões de preço (no centro)
  botoesPreco.push({ label: '-', x: width/2 - 120, y: 200, w: 55, h: 50, acao: -0.50 });
  botoesPreco.push({ label: '+', x: width/2 + 65, y: 200, w: 55, h: 50, acao: 0.50 });
  
  // Botões de ação (abaixo do carrinho)
  botaoAdicionar = { label: '🛒 Adicionar ao Carrinho', x: width/2 - 350, y: 420, w: 320, h: 55 };
  botaoRemoverUltimo = { label: '↩️ Remover Último', x: width/2 - 170, y: 485, w: 200, h: 45 };
  botaoLimparCarrinho = { label: '🗑️ Limpar Tudo', x: width/2 + 70, y: 485, w: 200, h: 45 };
  
  // Bolhas do fundo
  for (let i = 0; i < 30; i++) {
    bolhas.push({
      x: random(width),
      y: random(height, height + 200),
      tamanho: random(15, 70),
      velocidade: random(0.3, 1.8),
      tipo: random() > 0.7 ? 'folha' : 'bolha'
    });
  }
  
  atualizarMensagemSustentavel();
  recalcularTotal();
}

function normalizarQuantidade(qtd) {
  if (qtd === "" || qtd === "0") return "0";
  return qtd.replace(/^0+/, "") || "0";
}

function formatarMoeda(valor) {
  return "R$ " + valor.toFixed(2).replace('.', ',');
}

function atualizarMensagemSustentavel() {
  let mensagens = [
    "🌍 Cada escolha sustentável faz a diferença!",
    "🌱 Agricultura consciente = Futuro verde",
    "💚 Preservar hoje para colher amanhã",
    "🌿 Equilíbrio entre produção e natureza",
    "🍃 Produzir sem destruir é possível!"
  ];
  mensagemSustentavel = mensagens[floor(random(mensagens.length))];
  tempoMensagem = millis();
}

function mostrarFeedback(msg) {
  mensagemFeedback = msg;
  tempoFeedback = millis();
}

function draw() {
  desenharFundoDegrade();
  desenharBolhas();
  
  // ============================================
  // PAINÉIS SEPARADOS - LAYOUT HORIZONTAL
  // ============================================
  
  // --- PAINEL ESQUERDO: TECLADO E QUANTIDADE ---
  rectMode(CORNER);
  stroke(255, 255, 255, 180);
  strokeWeight(2);
  fill(255, 255, 255, 120);
  rect(20, 20, 320, 580, 25);
  
  // Brilho no painel esquerdo
  noStroke();
  fill(255, 255, 255, 50);
  ellipse(180, 50, 250, 30);
  
  textAlign(CENTER, CENTER);
  
  // Título do painel esquerdo
  fill('#004d4d');
  textSize(18);
  textStyle(BOLD);
  text("🔢 Calculadora", 180, 45);
  
  // Quantidade atual
  stroke(255, 255, 255, 200);
  strokeWeight(1.5);
  fill('rgba(255, 255, 255, 0.8)');
  rect(60, 350, 240, 55, 12);
  
  noStroke();
  fill('#003366');
  textSize(16);
  textStyle(BOLD);
  text("Quantidade:", 180, 365);
  textSize(22);
  text(quantidade + " un", 180, 388);
  
  // Teclado numérico
  for (let bn of botoesNum) {
    let btnX = 20 + bn.x;
    let btnY = 20 + bn.y;
    
    if (mouseX > btnX && mouseX < btnX + bn.w && mouseY > btnY && mouseY < btnY + bn.h) {
      fill(255, 255, 255, 230);
      stroke('#00b4db');
      strokeWeight(2.5);
    } else {
      fill(255, 255, 255, 150);
      stroke(255, 255, 255, 180);
      strokeWeight(1.5);
    }
    rect(btnX, btnY, bn.w, bn.h, 12);
    
    noStroke();
    fill('#004d4d');
    textSize(20);
    textStyle(BOLD);
    text(bn.label, btnX + bn.w/2, btnY + bn.h/2);
  }
  
  // Subtotal deste item
  fill(255, 255, 255, 180);
  stroke('#00b4db');
  strokeWeight(1.5);
  rect(40, 430, 280, 50, 12);
  
  noStroke();
  fill('#003366');
  textSize(13);
  text("Subtotal do item:", 180, 445);
  fill('#005500');
  textSize(20);
  textStyle(BOLD);
  text(formatarMoeda(total), 180, 468);
  
  // Botão Adicionar
  let btnAX = botaoAdicionar.x;
  let btnAY = botaoAdicionar.y;
  
  if (mouseX > btnAX && mouseX < btnAX + botaoAdicionar.w && 
      mouseY > btnAY && mouseY < btnAY + botaoAdicionar.h) {
    fill('#00ff87');
    stroke('#00b4db');
    strokeWeight(3);
  } else {
    fill('#00cc6a');
    stroke('#00ff87');
    strokeWeight(2);
  }
  rect(btnAX, btnAY, botaoAdicionar.w, botaoAdicionar.h, 20);
  
  noStroke();
  fill(255);
  textSize(16);
  textStyle(BOLD);
  text(botaoAdicionar.label, btnAX + botaoAdicionar.w/2, btnAY + botaoAdicionar.h/2);
  
  // --- PAINEL CENTRAL: PRODUTOS E PREÇO ---
  rectMode(CORNER);
  let centroX = width/2 - 175;
  
  stroke(255, 255, 255, 180);
  strokeWeight(2);
  fill(255, 255, 255, 120);
  rect(centroX, 20, 350, 280, 25);
  
  noStroke();
  fill(255, 255, 255, 50);
  ellipse(centroX + 175, 50, 280, 30);
  
  // Título
  fill('#004d4d');
  textSize(18);
  textStyle(BOLD);
  text("📦 Produtos", centroX + 175, 45);
  
  // Mensagem sustentável
  if (millis() - tempoMensagem > 6000) {
    atualizarMensagemSustentavel();
  }
  
  fill(255, 255, 255, 200);
  stroke('#00cc6a');
  strokeWeight(1);
  rect(centroX + 15, 65, 320, 30, 15);
  
  noStroke();
  fill('#005500');
  textSize(12);
  textStyle(BOLD);
  text(mensagemSustentavel, centroX + 175, 80);
  
  // Botões de produtos (vertical)
  for (let i = 0; i < botoesProduto.length; i++) {
    let bp = botoesProduto[i];
    let btnX = centroX + 25;
    let btnY = 110 + (i * 55);
    
    if (produtoSelecionado === bp.id) {
      fill('#00b4db'); 
      stroke(255);
      strokeWeight(3);
    } else {
      fill(255, 255, 255, 170);
      stroke(255, 255, 255, 200);
      strokeWeight(1.5);
    }
    rect(btnX, btnY, 300, 45, 12);
    
    noStroke();
    fill(produtoSelecionado === bp.id ? 255 : '#004d4d');
    textSize(13);
    textStyle(BOLD);
    text(bp.label, btnX + 150, btnY + 22);
  }
  
  // Info sustentável
  fill(255, 255, 255, 180);
  stroke('#00cc6a');
  strokeWeight(1);
  rect(centroX + 15, 235, 320, 45, 10);
  
  noStroke();
  fill('#003366');
  textSize(11);
  textStyle(ITALIC);
  text(produtos[produtoSelecionado].infoSustentavel, centroX + 175, 250);
  text("Impacto CO₂: " + produtos[produtoSelecionado].impactoCO2, centroX + 175, 268);
  
  // --- PAINEL DIREITO: PREÇO E CONTROLES ---
  let direitaX = width/2 + 195;
  
  stroke(255, 255, 255, 180);
  strokeWeight(2);
  fill(255, 255, 255, 120);
  rect(direitaX, 20, 300, 280, 25);
  
  noStroke();
  fill(255, 255, 255, 50);
  ellipse(direitaX + 150, 50, 230, 30);
  
  fill('#004d4d');
  textSize(18);
  textStyle(BOLD);
  text("💰 Preço Base", direitaX + 150, 45);
  
  // Preço atual GRANDE
  fill(255, 255, 255, 200);
  stroke('#00ff87');
  strokeWeight(2);
  rect(direitaX + 30, 80, 240, 80, 15);
  
  noStroke();
  fill('#003366');
  textSize(14);
  text("Preço por Unidade", direitaX + 150, 105);
  
  fill('#005500');
  textSize(32);
  textStyle(BOLD);
  text(formatarMoeda(precoPorUnidade), direitaX + 150, 135);
  
  // Botões + e -
  for (let bpre of botoesPreco) {
    let btnX = bpre.x;
    let btnY = bpre.y;
    
    fill(255, 255, 255, 190);
    stroke('#00ff87');
    strokeWeight(2);
    rect(btnX, btnY, bpre.w, bpre.h, 12);
    
    noStroke();
    fill('#004d4d');
    textSize(24);
    textStyle(BOLD);
    text(bpre.label, btnX + bpre.w/2, btnY + bpre.h/2);
  }
  
  // Feedback
  if (millis() - tempoFeedback < 2000) {
    fill(255, 255, 200, 220);
    stroke('#ffaa00');
    strokeWeight(1);
    rect(direitaX + 20, 275, 260, 20, 8);
    
    noStroke();
    fill('#996600');
    textSize(11);
    textStyle(BOLD);
    text(mensagemFeedback, direitaX + 150, 285);
  }
  
  // --- PAINEL INFERIOR DIREITO: CARRINHO ---
  let carrinhoX = width/2 + 195;
  let carrinhoY = 320;
  
  stroke(255, 255, 255, 180);
  strokeWeight(2);
  fill(255, 255, 255, 120);
  rect(carrinhoX, carrinhoY, 400, 280, 25);
  
  noStroke();
  fill(255, 255, 255, 50);
  ellipse(carrinhoX + 200, carrinhoY + 20, 330, 25);
  
  fill('#004d4d');
  textSize(18);
  textStyle(BOLD);
  text("🛒 Carrinho de Compras", carrinhoX + 200, carrinhoY + 25);
  
  // Lista do carrinho
  if (carrinho.length > 0) {
    textAlign(LEFT);
    
    fill(255, 255, 255, 170);
    stroke('#00cc6a');
    strokeWeight(1);
    rect(carrinhoX + 15, carrinhoY + 45, 370, 130, 10);
    
    noStroke();
    fill('#004d4d');
    textSize(11);
    textStyle(BOLD);
    text("Itens (" + carrinho.length + "):", carrinhoX + 25, carrinhoY + 60);
    
    for (let i = 0; i < min(carrinho.length, 5); i++) {
      let item = carrinho[i];
      let yItem = carrinhoY + 80 + i * 22;
      
      fill('#004d4d');
      textSize(10);
      textStyle(BOLD);
      text((i+1) + ".", carrinhoX + 25, yItem);
      
      text(produtos[encontrarProdutoPorNome(item.nome)].icone + " " + item.nome, carrinhoX + 45, yItem);
      
      fill('#666666');
      textStyle(NORMAL);
      text(item.qtd + "x", carrinhoX + 220, yItem);
      
      fill('#005500');
      textStyle(BOLD);
      text(formatarMoeda(item.subtotal), carrinhoX + 290, yItem);
    }
    
    if (carrinho.length > 5) {
      fill('#666666');
      textSize(9);
      textStyle(ITALIC);
      text("+ " + (carrinho.length - 5) + " itens...", carrinhoX + 25, carrinhoY + 165);
    }
    
    textAlign(CENTER, CENTER);
  } else {
    fill(255, 255, 255, 100);
    stroke('#cccccc');
    strokeWeight(1);
    rect(carrinhoX + 30, carrinhoY + 50, 340, 40, 10);
    
    noStroke();
    fill('#999999');
    textSize(13);
    textStyle(ITALIC);
    text("🛒 Carrinho vazio", carrinhoX + 200, carrinhoY + 70);
  }
  
  // Botões do carrinho
  let btnRX = botaoRemoverUltimo.x;
  let btnRY = botaoRemoverUltimo.y;
  
  if (carrinho.length > 0) {
    if (mouseX > btnRX && mouseX < btnRX + botaoRemoverUltimo.w && 
        mouseY > btnRY && mouseY < btnRY + botaoRemoverUltimo.h) {
      fill('#ffaa00');
      stroke('#ff8800');
      strokeWeight(2.5);
    } else {
      fill('#ffbb33');
      stroke('#ffaa00');
      strokeWeight(1.5);
    }
  } else {
    fill('#cccccc');
    stroke('#999999');
    strokeWeight(1);
  }
  rect(btnRX, btnRY, botaoRemoverUltimo.w, botaoRemoverUltimo.h, 12);
  
  noStroke();
  fill(carrinho.length > 0 ? 255 : '#888888');
  textSize(13);
  textStyle(BOLD);
  text(botaoRemoverUltimo.label, btnRX + botaoRemoverUltimo.w/2, btnRY + botaoRemoverUltimo.h/2);
  
  let btnLX = botaoLimparCarrinho.x;
  let btnLY = botaoLimparCarrinho.y;
  
  if (carrinho.length > 0) {
    if (mouseX > btnLX && mouseX < btnLX + botaoLimparCarrinho.w && 
        mouseY > btnLY && mouseY < btnLY + botaoLimparCarrinho.h) {
      fill('#ff6b6b');
      stroke('#ff4444');
      strokeWeight(2.5);
    } else {
      fill('#ff4444');
      stroke('#ff6666');
      strokeWeight(1.5);
    }
  } else {
    fill('#cccccc');
    stroke('#999999');
    strokeWeight(1);
  }
  rect(btnLX, btnLY, botaoLimparCarrinho.w, botaoLimparCarrinho.h, 12);
  
  noStroke();
  fill(carrinho.length > 0 ? 255 : '#888888');
  textSize(13);
  textStyle(BOLD);
  text(botaoLimparCarrinho.label, btnLX + botaoLimparCarrinho.w/2, btnLY + botaoLimparCarrinho.h/2);
  
  // ============================================
  // VALOR TOTAL - GRANDE E DESTACADO!
  // ============================================
  let totalCarrinho = calcularTotalCarrinho();
  
  let totalX = 20;
  let totalY = 620;
  
  stroke(255, 255, 255, 200);
  strokeWeight(3);
  fill(255, 255, 255, 200);
  rect(totalX, totalY, width - 40, 70, 20);
  
  noStroke();
  fill(255, 255, 255, 80);
  ellipse(width/2, totalY + 10, 400, 30);
  
  fill('#004d4d');
  textSize(20);
  textStyle(BOLD);
  text("💰 VALOR TOTAL A PAGAR:", width/2 - 80, totalY + 25);
  
  textSize(40);
  if (totalCarrinho > 0) {
    fill('#005500');
  } else {
    fill('#999999');
  }
  text(formatarMoeda(totalCarrinho), width/2 + 150, totalY + 42);
  
  // Impacto
  if (carrinho.length > 0) {
    fill('#006600');
    textSize(13);
    textStyle(BOLD);
    text("🌱 " + calcularImpactoAmbiental(), width/2 - 200, totalY + 55);
  }
  
  // Rodapé
  textSize(11);
  fill('#004d4d');
  textStyle(NORMAL);
  text("Concurso Agrinho 2026 | SENAR-PR e SEED-PR | Agro forte, futuro sustentável", width/2, height - 15);
}

function encontrarProdutoPorNome(nome) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].nome === nome) return i;
  }
  return 0;
}

function mousePressed() {
  // Clique nos Produtos
  let centroX = width/2 - 175;
  for (let i = 0; i < botoesProduto.length; i++) {
    let bp = botoesProduto[i];
    let btnX = centroX + 25;
    let btnY = 110 + (i * 55);
    
    if (mouseX > btnX && mouseX < btnX + 300 && mouseY > btnY && mouseY < btnY + 45) {
      produtoSelecionado = bp.id;
      precoPorUnidade = precosPersonalizados[bp.id];
      recalcularTotal();
      mostrarFeedback("✅ " + produtos[bp.id].nome);
      return;
    }
  }

  // Clique nos botões de preço
  for (let bpre of botoesPreco) {
    if (mouseX > bpre.x && mouseX < bpre.x + bpre.w && mouseY > bpre.y && mouseY < bpre.y + bpre.h) {
      precoPorUnidade += bpre.acao;
      if (precoPorUnidade < 0.50) precoPorUnidade = 0.50;
      precosPersonalizados[produtoSelecionado] = precoPorUnidade;
      recalcularTotal();
      mostrarFeedback("💰 " + formatarMoeda(precoPorUnidade));
      return;
    }
  }

  // Clique no Teclado Numérico
  for (let bn of botoesNum) {
    let btnX = 20 + bn.x;
    let btnY = 20 + bn.y;
    
    if (mouseX > btnX && mouseX < btnX + bn.w && mouseY > btnY && mouseY < btnY + bn.h) {
      if (bn.label === 'C') {
        quantidade = "0";
        mostrarFeedback("🔄 Zerado");
      } else if (bn.label === '←') {
        if (quantidade.length > 1) {
          quantidade = quantidade.slice(0, -1); 
        } else {
          quantidade = "0";
        }
      } else {
        if (quantidade === "0") {
          quantidade = bn.label;
        } else {
          quantidade += bn.label;
        }
      }
      
      quantidade = normalizarQuantidade(quantidade);
      if (quantidade.length > 5) quantidade = quantidade.slice(0, 5);
      if (parseInt(quantidade) > 99999) quantidade = "99999";
      
      recalcularTotal();
      break;
    }
  }
  
  // Botão Adicionar
  if (mouseX > botaoAdicionar.x && mouseX < botaoAdicionar.x + botaoAdicionar.w && 
      mouseY > botaoAdicionar.y && mouseY < botaoAdicionar.y + botaoAdicionar.h) {
    let qtdNumerica = parseInt(quantidade);
    if (qtdNumerica > 0) {
      adicionarAoCarrinho(produtoSelecionado, qtdNumerica, precoPorUnidade);
      quantidade = "1";
      recalcularTotal();
    } else {
      mostrarFeedback("⚠️ Quantidade inválida!");
    }
  }
  
  // Botão Remover Último
  if (mouseX > botaoRemoverUltimo.x && mouseX < botaoRemoverUltimo.x + botaoRemoverUltimo.w && 
      mouseY > botaoRemoverUltimo.y && mouseY < botaoRemoverUltimo.y + botaoRemoverUltimo.h) {
    if (carrinho.length > 0) {
      let itemRemovido = carrinho.pop();
      mostrarFeedback("❌ " + itemRemovido.nome);
    } else {
      mostrarFeedback("⚠️ Carrinho vazio!");
    }
  }
  
  // Botão Limpar
  if (mouseX > botaoLimparCarrinho.x && mouseX < botaoLimparCarrinho.x + botaoLimparCarrinho.w && 
      mouseY > botaoLimparCarrinho.y && mouseY < botaoLimparCarrinho.y + botaoLimparCarrinho.h) {
    if (carrinho.length > 0) {
      let qtd = carrinho.length;
      carrinho = [];
      mostrarFeedback("🗑️ " + qtd + " itens removidos");
    }
  }
}

function adicionarAoCarrinho(idProduto, qtd, preco) {
  let produto = produtos[idProduto];
  carrinho.push({
    nome: produto.nome,
    qtd: qtd,
    preco: preco,
    subtotal: qtd * preco,
    impactoCO2: produto.impactoCO2
  });
  mostrarFeedback("✅ " + produto.icone + " " + produto.nome);
}

function calcularTotalCarrinho() {
  let totalCarrinho = 0;
  for (let item of carrinho) {
    totalCarrinho += item.subtotal;
  }
  return totalCarrinho;
}

function calcularImpactoAmbiental() {
  let b = 0, mb = 0, n = 0;
  for (let item of carrinho) {
    if (item.impactoCO2 === "Baixo") b++;
    else if (item.impactoCO2 === "Muito Baixo") mb++;
    else if (item.impactoCO2.includes("Negativo")) n++;
  }
  if (n > 0) return "🌟 Positivo";
  if (mb > b) return "🍃 Muito Baixo";
  if (b > 0) return "🌿 Baixo";
  return "⚪ Neutro";
}

function recalcularTotal() {
  total = float(quantidade) * precoPorUnidade;
}

function desenharFundoDegrade() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#00b4db'), color('#00ff87'), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function desenharBolhas() {
  noStroke();
  for (let b of bolhas) {
    if (b.tipo === 'folha') {
      fill(34, 139, 34, 25);
      ellipse(b.x, b.y, b.tamanho, b.tamanho * 0.6);
      fill(34, 139, 34, 40);
      ellipse(b.x - b.tamanho/6, b.y - b.tamanho/8, b.tamanho/2, b.tamanho/3);
    } else {
      fill(255, 255, 255, 30);
      ellipse(b.x, b.y, b.tamanho);
      fill(255, 255, 255, 55);
      ellipse(b.x - b.tamanho/4, b.y - b.tamanho/4, b.tamanho/3);
    }
    b.y -= b.velocidade;
    if (b.y < -b.tamanho) {
      b.y = height + b.tamanho;
      b.x = random(width);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}