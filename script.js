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
  textSize(28);
  fill('#004d4d');
  textStyle(BOLD);
  text("🌾 Portal Agricola Tech", width/2, 40);
  
  textSize(13);
  fill('#006666');
  textStyle(ITALIC);
  text("Agro forte, futuro sustentavel", width/2, 65);
  
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
    
    let w = min(width - 40, 350);
    rect(width/2, y, w, 42, 12);
    
    noStroke();
    fill(produtoSelecionado === i ? 255 : '#004d4d');
    textSize(14);
    textStyle(BOLD);
    text(produtos[i].icone + " " + produtos[i].nome, width/2, y);
  }
  
  // Preço
  let precoY = 275;
  fill(255, 255, 255, 180);
  stroke('#00ff87');
  strokeWeight(2);
  rect(width/2, precoY, 250, 40, 10);
  
  noStroke();
  fill('#003366');
  textSize(16);
  textStyle(BOLD);
  text("Preco: R$ " + precoPorUnidade.toFixed(2).replace('.', ','), width/2, precoY);
  
  // Botões + e -
  fill(255, 255, 255, 190);
  stroke('#00ff87');
  strokeWeight(2);
  rect(width/2 - 90, precoY, 50, 40, 10);
  rect(width/2 + 90, precoY, 50, 40, 10);
  
  noStroke();
  fill('#004d4d');
  textSize(22);
  textStyle(BOLD);
  text("-", width/2 - 90, precoY); 
  text("+", width/2 + 90, precoY); 
  
  // Quantidade
  let qtdY = 330;
  fill(255, 255, 255, 180);
  stroke('#00b4db');
  strokeWeight(2);
  rect(width/2, qtdY, 200, 40, 10);
  
  noStroke();
  fill('#003366');
  textSize(16);
  textStyle(BOLD);
  text("Qtd: " + quantidade + " un", width/2, qtdY);
  
  // Teclado
  let teclas = ['1','2','3','4','5','6','7','8','9','C','0','←'];
  let tx = width/2 - 75; 
  let ty = 385;
  
  for (let i = 0; i < teclas.length; i++) {
    let col = i % 3;
    let row = floor(i / 3);
    let x = tx + (col - 1) * 75; 
    let y = ty + row * 55;
    
    fill(255, 255, 255, 170);
    stroke(255, 255, 255, 200);
    strokeWeight(1);
    rect(x, y, 65, 45, 10);
    
    noStroke();
    fill('#004d4d');
    textSize(18);
    textStyle(BOLD);
    text(teclas[i], x, y);
  }
  
  // Botão Adicionar
  let addY = ty + 230;
  fill('#00cc6a');
  stroke('#00ff87');
  strokeWeight(2);
  rect(width/2, addY, min(width - 40, 350), 48, 15);
  
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
  rect(width/2, cartY, min(width - 40, 350), 90, 12);
  
  noStroke();
  
  if (carrinho.length > 0) {
    fill('#004d4d');
    textSize(14);
    textStyle(BOLD);
    text("🛒 Carrinho (" + carrinho.length + " itens)", width/2, cartY - 30);
    
    let totalCarrinho = 0;
    for (let item of carrinho) {
      totalCarrinho = totalCarrinho + item.subtotal;
    }
    
    fill('#005500');
    textSize(16);
    text("Total: R$ " + totalCarrinho.toFixed(2).replace('.', ','), width/2, cartY - 10);
    
    textAlign(LEFT, CENTER);
    let startX = width/2 - min(width - 40, 350)/2 + 15;
    for (let i = 0; i < min(carrinho.length, 2); i++) {
      let item = carrinho[i];
      let pi = encontrarProduto(item.nome);
      fill('#004d4d');
      textSize(11);
      textStyle(BOLD);
      text((i+1) + ". " + produtos[pi].icone + " " + item.qtd + "x = R$" + item.subtotal.toFixed(2).replace('.', ','), startX, cartY + 12 + i * 20);
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
  // Produtos
  for (let i = 0; i < produtos.length; i++) {
    let y = 110 + i * 50;
    let w = min(width - 40, 350);
    if (mouseX > width/2 - w/2 && mouseX < width/2 + w/2 && mouseY > y - 21 && mouseY < y + 21) {
      produtoSelecionado = i;
      precoPorUnidade = precosPersonalizados[i];
      return;
    }
  }
  
  // Botões + e -
  let precoY = 275;
  if (mouseX > width/2 - 115 && mouseX < width/2 - 65 && mouseY > precoY - 20 && mouseY < precoY + 20) {
    precoPorUnidade = precoPorUnidade - 0.50;
    if (precoPorUnidade < 0.50) precoPorUnidade = 0.50;
    precosPersonalizados[produtoSelecionado] = precoPorUnidade;
    return;
  }
  if (mouseX > width/2 + 65 && mouseX < width/2 + 115 && mouseY > precoY - 20 && mouseY < precoY + 20) {
    precoPorUnidade = precoPorUnidade + 0.50;
    precosPersonalizados[produtoSelecionado] = precoPorUnidade;
    return;
  }
  
  // Teclado
  let teclas = ['1','2','3','4','5','6','7','8','9','C','0','←'];
  let tx = width/2 - 75;
  let ty = 385;
  
  for (let i = 0; i < teclas.length; i++) {
    let col = i % 3;
    let row = floor(i / 3);
    let x = tx + (col - 1) * 75;
    let y = ty + row * 55;
    
    if (mouseX > x - 32 && mouseX < x + 32 && mouseY > y - 22 && mouseY < y + 22) {
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
  let addY = ty + 230;
  let btnW = min(width - 40, 350);
  if (mouseX > width/2 - btnW/2 && mouseX < width/2 + btnW/2 && mouseY > addY - 24 && mouseY < addY + 24) {
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
