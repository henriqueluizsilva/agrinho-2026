let quantidade = "2";
let precoPorUnidade = 5.00;
let carrinho = [];
let produtoSelecionado = 0;
let precosPersonalizados = [5.00, 12.50, 8.00];
let bolhas = [];

let produtos = [
  { nome: "Sementes Organicas", precoInicial: 5.00, icone: "🌱", impacto: "Baixo" },
  { nome: "Adubo Natural (kg)", precoInicial: 12.50, icone: "🌿", impacto: "Muito Baixo" },
  { nome: "Mudas Nativas", precoInicial: 8.00, icone: "🌳", impacto: "Positivo" }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Arial');
  rectMode(CENTER);
  
  for (let i = 0; i < 20; i++) {
    bolhas.push({
      x: random(width),
      y: random(height),
      t: random(10, 50),
      v: random(0.3, 1.5)
    });
  }
}

function draw() {
  clear(); 
  
  // Bolhas
  noStroke();
  for (let b of bolhas) {
    fill(255, 255, 255, 30);
    ellipse(b.x, b.y, b.t);
    b.y = b.y - b.v;
    if (b.y < -b.t) {
      b.y = height + b.t;
      b.x = random(width);
    }
  }
  
  textAlign(CENTER, CENTER);
  
  // Título
  textSize(24);
  fill('#004d4d');
  textStyle(BOLD);
  text("🌾 Portal Agricola Tech", width/2, 40);
  
  textSize(12);
  fill('#006666');
  textStyle(ITALIC);
  text("Agro forte, futuro sustentavel", width/2, 65);
  
  let larguraMax = min(width - 40, 350); // Base de largura para alinhar tudo proporcionalmente
  
  // Produtos
  for (let i = 0; i < produtos.length; i++) {
    let y = 110 + i * 50;
    
    if (produtoSelecionado === i) {
      fill('#00b4db');
      stroke(255);
      strokeWeight(3);
    } else {
      fill(255, 255, 255, 170);
      stroke(255, 255, 255, 200);
      strokeWeight(1);
    }
    
    rect(width/2, y, larguraMax, 42, 12);
    
    noStroke();
    fill(produtoSelecionado === i ? 255 : '#004d4d');
    textSize(14);
    textStyle(BOLD);
    text(produtos[i].icone + " " + produtos[i].nome, width/2, y);
  }
  
  // Preço e Botões (+ e -) Dinâmicos
  let precoY = 275;
  let tamBotaoPreco = larguraMax * 0.16; // Botões laterais proporcionais
  let tamBarraPreco = larguraMax * 0.64; // Barra de preço do meio proporcional
  let distPreco = larguraMax * 0.42;    // Distância para os lados
  
  // Desenha os fundos dos botões e do preço
  fill(255, 255, 255, 180);
  stroke('#00ff87');
  strokeWeight(2);
  rect(width/2 - distPreco, precoY, tamBotaoPreco, 40, 10); // Botão -
  rect(width/2, precoY, tamBarraPreco, 40, 10);            // Barra Preço
  rect(width/2 + distPreco, precoY, tamBotaoPreco, 40, 10); // Botão +
  
  // Textos do preço, + e -
  noStroke();
  fill('#004d4d');
  textSize(22);
  textStyle(BOLD);
  text("-", width/2 - distPreco, precoY); 
  text("+", width/2 + distPreco, precoY); 
  
  fill('#003366');
  textSize(15);
  text("Preco: R$ " + precoPorUnidade.toFixed(2).replace('.', ','), width/2, precoY);
  
  // Quantidade
  let qtdY = 330;
  fill(255, 255, 255, 180);
  stroke('#00b4db');
  strokeWeight(2);
  rect(width/2, qtdY, larguraMax * 0.6, 40, 10);
  
  noStroke();
  fill('#003366');
  textSize(16);
  textStyle(BOLD);
  text("Qtd: " + quantidade + " un", width/2, qtdY);
  
  // Teclado Totalmente Alinhado
  let teclas = ['1','2','3','4','5','6','7','8','9','C','0','←'];
  let ty = 385;
  let larguraTecla = larguraMax * 0.3; // Cada tecla ocupa 30% do espaço máximo
  let espacoTecla = larguraMax * 0.35; // Espaçamento fixo proporcional entre elas
  
  for (let i = 0; i < teclas.length; i++) {
    let col = i % 3;
    let row = floor(i / 3);
    
    // Posiciona em relação ao centro exato da tela (col - 1 transforma 0,1,2 em -1,0,1)
    let x = width/2 + (col - 1) * espacoTecla; 
    let y = ty + row * 52;
    
    fill(255, 255, 255, 170);
    stroke(255, 255, 255, 200);
    strokeWeight(1);
    rect(x, y, larguraTecla, 45, 10);
    
    noStroke();
    fill('#004d4d');
    textSize(18);
    textStyle(BOLD);
    text(teclas[i], x, y);
  }
  
  // Botão Adicionar
  let addY = ty + 225;
  fill('#00cc6a');
  stroke('#00ff87');
  strokeWeight(2);
  rect(width/2, addY, larguraMax, 48, 15);
  
  noStroke();
  fill(255);
  textSize(16);
  textStyle(BOLD);
  text("🛒 ADICIONAR AO CARRINHO", width/2, addY);
  
  // Carrinho
  let cartY = addY + 75;
  fill(255, 255, 255, 160);
  stroke('#00cc6a');
  strokeWeight(2);
  rect(width/2, cartY, larguraMax, 85, 12);
  
  noStroke();
  
  if (carrinho.length > 0) {
    fill('#004d4d');
    textSize(14);
    textStyle(BOLD);
    text("🛒 Carrinho (" + carrinho.length + " itens)", width/2, cartY - 28);
    
    let totalCarrinho = 0;
    for (let item of carrinho) {
      totalCarrinho = totalCarrinho + item.subtotal;
    }
    
    fill('#005500');
    textSize(15);
    text("Total: R$ " + totalCarrinho.toFixed(2).replace('.', ','), width/2, cartY - 10);
    
    textAlign(LEFT, CENTER);
    let startX = width/2 - larguraMax/2 + 15;
    for (let i = 0; i < min(carrinho.length, 2); i++) {
      let item = carrinho[i];
      let pi = encontrarProduto(item.nome);
      fill('#004d4d');
      textSize(11);
      textStyle(BOLD);
      text((i+1) + ". " + produtos[pi].icone + " " + item.qtd + "x = R$" + item.subtotal.toFixed(2).replace('.', ','), startX, cartY + 12 + i * 18);
    }
    textAlign(CENTER, CENTER); 
  } else {
    fill('#999999');
    textSize(13);
    textStyle(ITALIC);
    text("🛒 Carrinho vazio", width/2, cartY);
  }
  
  // Rodapé
  textSize(10);
  fill('#004d4d');
  textStyle(NORMAL);
  text("Agrinho 2026 | SENAR-PR e SEED-PR", width/2, height - 15);
}

function encontrarProduto(nome) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].nome === nome) return i;
  }
  return 0;
}

function mousePressed() {
  let larguraMax = min(width - 40, 350);
  
  // Produtos
  for (let i = 0; i < produtos.length; i++) {
    let y = 110 + i * 50;
    if (mouseX > width/2 - larguraMax/2 && mouseX < width/2 + larguraMax/2 && mouseY > y - 21 && mouseY < y + 21) {
      produtoSelecionado = i;
      precoPorUnidade = precosPersonalizados[i];
      return;
    }
  }
  
  // Cliques dos Botões + e - Dinâmicos
  let precoY = 275;
  let tamBotaoPreco = larguraMax * 0.16;
  let distPreco = larguraMax * 0.42;
  
  // Clique no botão menos
  if (mouseX > (width/2 - distPreco) - tamBotaoPreco/2 && mouseX < (width/2 - distPreco) + tamBotaoPreco/2 && mouseY > precoY - 20 && mouseY < precoY + 20) {
    precoPorUnidade = precoPorUnidade - 0.50;
    if (precoPorUnidade < 0.50) precoPorUnidade = 0.50;
    precosPersonalizados[produtoSelecionado] = precoPorUnidade;
    return;
  }
  // Clique no botão mais
  if (mouseX > (width/2 + distPreco) - tamBotaoPreco/2 && mouseX < (width/2 + distPreco) + tamBotaoPreco/2 && mouseY > precoY - 20 && mouseY < precoY + 20) {
    precoPorUnidade = precoPorUnidade + 0.50;
    precosPersonalizados[produtoSelecionado] = precoPorUnidade;
    return;
  }
  
  // Cliques do Teclado Dinâmico
  let teclas = ['1','2','3','4','5','6','7','8','9','C','0','←'];
  let ty = 385;
  let larguraTecla = larguraMax * 0.3;
  let espacoTecla = larguraMax * 0.35;
  
  for (let i = 0; i < teclas.length; i++) {
    let col = i % 3;
    let row = floor(i / 3);
    let x = width/2 + (col - 1) * espacoTecla;
    let y = ty + row * 52;
    
    if (mouseX > x - larguraTecla/2 && mouseX < x + larguraTecla/2 && mouseY > y - 22 && mouseY < y + 22) {
      let t = teclas[i];
      
      if (t === 'C') {
        quantidade = "0";
      } else if (t === '←') {
        if (quantidade.length > 1) quantidade = quantidade.slice(0, -1);
        else quantidade = "0";
      } else {
        if (quantidade === "0") quantidade = t;
        else quantidade = quantidade + t;
      }
      
      if (quantidade.length > 5) quantidade = quantidade.slice(0, 5);
      break;
    }
  }
  
  // Botão Adicionar
  let addY = ty + 225;
  if (mouseX > width/2 - larguraMax/2 && mouseX < width/2 + larguraMax/2 && mouseY > addY - 24 && mouseY < addY + 24) {
    let qtd = parseInt(quantidade);
    if (qtd > 0) {
      let p = produtos[produtoSelecionado];
      carrinho.push({
        nome: p.nome,
        qtd: qtd,
        preco: precoPorUnidade,
        subtotal: qtd * precoPorUnidade
      });
      quantidade = "1";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
