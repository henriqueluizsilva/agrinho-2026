let quantidade = "2";
let precoPorUnidade = 5.00;
let total = 10.00;
let carrinho = [];
let produtoSelecionado = 0;
let precosPersonalizados = [5.00, 12.50, 8.00];
let isMobile = false;
let bolhas = [];

let produtos = [
  { nome: "Sementes Organicas", precoInicial: 5.00, icone: "🌱" },
  { nome: "Adubo Natural (kg)", precoInicial: 12.50, icone: "🌿" },
  { nome: "Mudas Nativas", precoInicial: 8.00, icone: "🌳" }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Arial');
  isMobile = windowWidth < 768;
  
  for (let i = 0; i < 20; i++) {
    bolhas.push({
      x: random(width),
      y: random(height),
      tamanho: random(10, 50),
      velocidade: random(0.3, 1.5)
    });
  }
}

function draw() {
  background(0, 180, 219);
  
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#00b4db'), color('#00ff87'), inter);
    stroke(c);
    line(0, y, width, y);
  }
  
  noStroke();
  for (let b of bolhas) {
    fill(255, 255, 255, 30);
    ellipse(b.x, b.y, b.tamanho);
    b.y = b.y - b.velocidade;
    if (b.y < -b.tamanho) {
      b.y = height + b.tamanho;
      b.x = random(width);
    }
  }
  
  textAlign(CENTER, CENTER);
  
  textSize(30);
  fill('#004d4d');
  textStyle(BOLD);
  text("🌾 Portal Agricola Tech", width/2, 50);
  
  textSize(14);
  fill('#006666');
  textStyle(ITALIC);
  text("Agro forte, futuro sustentavel", width/2, 80);
  
  textSize(16);
  fill('#004d4d');
  textStyle(NORMAL);
  text("Preco: R$ " + precoPorUnidade.toFixed(2).replace('.', ','), width/2, 120);
  text("Quantidade: " + quantidade + " un", width/2, 150);
  
  let totalCarrinho = 0;
  for (let item of carrinho) {
    totalCarrinho = totalCarrinho + item.subtotal;
  }
  
  textSize(20);
  fill('#005500');
  textStyle(BOLD);
  text("Total Carrinho: R$ " + totalCarrinho.toFixed(2).replace('.', ','), width/2, 200);
  
  fill('#004d4d');
  textSize(12);
  textStyle(NORMAL);
  text("Agrinho 2026 | SENAR-PR e SEED-PR", width/2, height - 20);
}

function mousePressed() {
  console.log("Mouse clicado em: " + mouseX + ", " + mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  isMobile = windowWidth < 768;
}    
    noStroke();
    fill('#004d4d');
    textSize(22);
    textStyle(BOLD);
    text("-", width/2 - 80, precoY);
    text("+", width/2 + 80, precoY);
    
    // Quantidade
    let qtdY = 340;
    fill(255, 255, 255, 180);
    stroke('#00b4db');
    strokeWeight(2);
    rect(width/2, qtdY, 200, 40, 10);
    
    noStroke();
    fill('#003366');
    textSize(16);
    text("Qtd: " + quantidade + " un", width/2, qtdY);
    
    // Teclado numérico
    let teclas = ['1','2','3','4','5','6','7','8','9','C','0','←'];
    let tx = width/2 - 110;
    let ty = 400;
    
    for (let i = 0; i < teclas.length; i++) {
      let col = i % 3;
      let row = floor(i / 3);
      let x = tx + col * 75;
      let y = ty + row * 55;
      
      fill(255, 255, 255, 170);
      stroke(255, 255, 255, 200);
      strokeWeight(1);
      rect(x, y, 65, 45, 10);
      
      noStroke();
      fill('#004d4d');
      textSize(18);
      textStyle(BOLD);
      text(teclas[i], x + 32, y + 22);
    }
    
    // Botão Adicionar
    let addY = ty + 230;
    fill('#00cc6a');
    stroke('#00ff87');
    strokeWeight(2);
    rect(width/2, addY, width - 40, 50, 15);
    
    noStroke();
    fill(255);
    textSize(16);
    textStyle(BOLD);
    text("🛒 ADICIONAR AO CARRINHO", width/2, addY);
    
    // Carrinho
    let cartY = addY + 70;
    fill(255, 255, 255, 160);
    stroke('#00cc6a');
    strokeWeight(2);
    rect(width/2, cartY, width - 40, 100, 12);
    
    noStroke();
    fill('#004d4d');
    textSize(14);
    textStyle(BOLD);
    
    if (carrinho.length > 0) {
      text("🛒 Carrinho: " + carrinho.length + " itens", width/2, cartY - 35);
      
      let totalCarrinho = 0;
      for (let item of carrinho) totalCarrinho += item.subtotal;
      
      fill('#005500');
      textSize(20);
      text("Total: R$ " + totalCarrinho.toFixed(2).replace('.', ','), width/2, cartY - 10);
      
      textSize(10);
      fill('#004d4d');
      textAlign(LEFT);
      for (let i = 0; i < min(carrinho.length, 3); i++) {
        let item = carrinho[i];
        let pi = encontrarProduto(item.nome);
        text(produtos[pi].icone + " " + item.qtd + "x R$" + item.subtotal.toFixed(2).replace('.', ','), 30, cartY + 15 + i * 20);
      }
      textAlign(CENTER, CENTER);
    } else {
      fill('#999999');
      text("Carrinho vazio", width/2, cartY);
    }
    
    // Rodapé
    textSize(10);
    fill('#004d4d');
    textStyle(NORMAL);
    text("Agrinho 2026 | SENAR-PR e SEED-PR", width/2, height - 15);
    
  } else {
    // MODO COMPUTADOR (original simplificado)
    textSize(30);
    fill('#004d4d');
    textStyle(BOLD);
    text("🌾 Portal Agricola Tech", width/2, 40);
    
    textSize(14);
    fill('#006666');
    text("Agro forte, futuro sustentavel", width/2, 70);
    
    // Conteúdo desktop básico
    textSize(18);
    fill('#004d4d');
    text("Seu site esta funcionando!", width/2, height/2 - 20);
    textSize(14);
    fill('#666666');
    text("Redimensione a janela para ver o modo mobile", width/2, height/2 + 20);
  }
}

function encontrarProduto(nome) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].nome === nome) return i;
  }
  return 0;
}

function mousePressed() {
  if (!isMobile) return;
  
  // Produtos
  for (let i = 0; i < produtos.length; i++) {
    let y = 100 + i * 55;
    if (mouseX > 20 && mouseX < width - 20 && mouseY > y - 22 && mouseY < y + 22) {
      produtoSelecionado = i;
      precoPorUnidade = precosPersonalizados[i];
      recalcularTotal();
      return;
    }
  }
  
  // Botões + e -
  let precoY = 280;
  if (mouseX > width/2 - 107 && mouseX < width/2 - 52 && mouseY > precoY - 20 && mouseY < precoY + 20) {
    precoPorUnidade -= 0.50;
    if (precoPorUnidade < 0.50) precoPorUnidade = 0.50;
    precosPersonalizados[produtoSelecionado] = precoPorUnidade;
    recalcularTotal();
    return;
  }
  if (mouseX > width/2 + 52 && mouseX < width/2 + 107 && mouseY > precoY - 20 && mouseY < precoY + 20) {
    precoPorUnidade += 0.50;
    precosPersonalizados[produtoSelecionado] = precoPorUnidade;
    recalcularTotal();
    return;
  }
  
  // Teclado numérico
  let teclas = ['1','2','3','4','5','6','7','8','9','C','0','←'];
  let tx = width/2 - 110;
  let ty = 400;
  
  for (let i = 0; i < teclas.length; i++) {
    let col = i % 3;
    let row = floor(i / 3);
    let x = tx + col * 75;
    let y = ty + row * 55;
    
    if (mouseX > x && mouseX < x + 65 && mouseY > y && mouseY < y + 45) {
      let tecla = teclas[i];
      
      if (tecla === 'C') {
        quantidade = "0";
      } else if (tecla === '←') {
        if (quantidade.length > 1) quantidade = quantidade.slice(0, -1);
        else quantidade = "0";
      } else {
        if (quantidade === "0") quantidade = tecla;
        else quantidade += tecla;
      }
      
      if (quantidade.length > 5) quantidade = quantidade.slice(0, 5);
      if (parseInt(quantidade) > 99999) quantidade = "99999";
      
      recalcularTotal();
      break;
    }
  }
  
  // Botão Adicionar
  let addY = ty + 230;
  if (mouseX > 20 && mouseX < width - 20 && mouseY > addY - 25 && mouseY < addY + 25) {
    let qtd = parseInt(quantidade);
    if (qtd > 0) {
      let produto = produtos[produtoSelecionado];
      carrinho.push({
        nome: produto.nome,
        qtd: qtd,
        preco: precoPorUnidade,
        subtotal: qtd * precoPorUnidade
      });
      quantidade = "1";
      recalcularTotal();
    }
  }
}

function recalcularTotal() {
  total = float(quantidade) * precoPorUnidade;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  isMobile = windowWidth < 768;
}
