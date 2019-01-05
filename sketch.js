//Made by Lucas Duez

//Inspired by Daniel Shiffman - The coding train
//www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw

//Inspired also by Nerdologia, a brazilian channel about science and history
//www.youtube.com/channel/UClu474HMt895mVxZdlIHXEA

var atual_melhor_mapa;
cidades = [];
numdecidades = 50;
população = [];
numdeindividuos = 1000;
velha_população =[];

function setup() {
  createCanvas(1000,600);
  background(55);

  for(var i = 0; i<numdecidades; i++){
    cidades[i] = new Cidade();
  }

  for(var i = 0; i<numdeindividuos; i++){
    população[i] = new Mapa();
    }
    normaliza_custos();
    melhor_de_todos = calcula_melhor_mapa();
    atual_melhor_mapa = população[0];
    print(população,'prime')
  }

function draw() {
    velha_população = população.slice();
    população = []
    for(var i = 0; i<numdeindividuos; i++){
      população[i] = crossing_over();
      população[i].custo = calcula_custo(população[i].dna);
      população[i].distancia = calcula_custo(população[i].dna);
      }
      normaliza_custos();
  atual_melhor_mapa = calcula_melhor_mapa();

  if(atual_melhor_mapa.distancia<melhor_de_todos.distancia){
    melhor_de_todos = atual_melhor_mapa;
    print(melhor_de_todos,'Melhor mapa de todos os tempos')
    }


background(55);
  for(var i = 0; i<numdecidades; i++){
    strokeWeight(8);
    stroke(255);
    point(cidades[i].posicao.x, cidades[i].posicao.y);
  }
  for(var i = 0; i<numdecidades-1; i++){
    strokeWeight(2);
    stroke(255)
    line(cidades[melhor_de_todos.dna[i]].posicao.x,cidades[melhor_de_todos.dna[i]].posicao.y,cidades[melhor_de_todos.dna[i+1]].posicao.x,cidades[melhor_de_todos.dna[i+1]].posicao.y)
  }
  strokeWeight(8);
  stroke(0,255,0);
  point(cidades[melhor_de_todos.dna[0]].posicao.x,cidades[melhor_de_todos.dna[0]].posicao.y);
  //print(população[0].desenpenho)
}

class Cidade {
  constructor() {
    this.posicao = new p5.Vector(random(width-6),random(height-6));
    strokeWeight(8);
    stroke(255);
    point(this.posicao.x,this.posicao.y);
  }
}


function calcula_melhor_mapa(){
  var melhor = população[0];

  for(var i = 1; i<população.length; i++){
    var atual = população[i];
    if(atual.distancia<melhor.distancia){
      melhor = atual;
    }
  }
  return melhor;
}

function normaliza_custos(){ //Normaliza os custos de todos os mapas
  var total = 0;

  for(var i = 0; i<população.length; i++){
    população[i].custo = 1/(pow(população[i].custo,8)+1);
    total = total + população[i].custo;
  }
  for(var i = 0; i<população.length; i++){
    população[i].desenpenho = população[i].custo/total;
  }
}
