//Made by Lucas Duez

//Inspired by Daniel Shiffman - The coding train
//www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw

//Inspired also by Nerdologia, a brazilian channel about science and history
//www.youtube.com/channel/UClu474HMt895mVxZdlIHXEA

var atual_melhor_mapa; //current best map
var melhor_de_todos; //best map ever
numdecidades = 50; //number of cities
numdeindividuos = 500; //number of maps
cidades = []; //cities
população = []; //current population
velha_população =[]; //previous population

function setup() {
  createCanvas(1000,600);
  background(55);

  for(var i = 0; i<numdecidades; i++){ //make the cities array
    cidades[i] = new Cidade();
  }

  for(var i = 0; i<numdeindividuos; i++){ //make the population array
    população[i] = new Mapa();
    }
    normaliza_distancias();
    melhor_de_todos = calcula_melhor_mapa();
  }

function draw() {
  velha_população = população.slice(); //save the current population

  for(var i = 0; i<numdeindividuos; i++){
    população[i] = crossing_over();
  }
  normaliza_distancias();
  atual_melhor_mapa = calcula_melhor_mapa();

  if(atual_melhor_mapa.distancia < melhor_de_todos.distancia){
    melhor_de_todos = atual_melhor_mapa;
  }
  desenha_caminho();

}

class Cidade {
  constructor() {
    this.posicao = new p5.Vector(random(width-6),random(height-6));
    strokeWeight(8);
    stroke(255);
    point(this.posicao.x,this.posicao.y);
  }
}


function calcula_melhor_mapa(){ //calculates the best map in the current population array
  var melhor = população[0];

  for(var i = 1; i<população.length; i++){
    var atual = população[i];
    if(atual.distancia<melhor.distancia){
      melhor = atual;
    }
  }
  return melhor;
}

function desenha_caminho(){ //draw the best path
  background(55);
  for(var i = 0; i<numdecidades-1; i++){
    var posicao_array1 = melhor_de_todos.dna[i];
    var posicao_array2 = melhor_de_todos.dna[i+1];
    strokeWeight(2);
    stroke(255)
    line(cidades[posicao_array1].posicao.x,cidades[posicao_array1].posicao.y,
         cidades[posicao_array2].posicao.x,cidades[posicao_array2].posicao.y);
  }
  for(var i = 0; i<numdecidades; i++){ //draw the cities
    stroke(255);
    strokeWeight(8);
    point(cidades[i].posicao.x,cidades[i].posicao.y);
  }
  var posicao_array = melhor_de_todos.dna[0]; //the first city is green
  strokeWeight(8);
  stroke(0,255,0);
  point(cidades[posicao_array].posicao.x, cidades[posicao_array].posicao.y);
}
