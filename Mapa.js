// Mapas = população
class Mapa {
  constructor() {
      this.dna = criador_dna();
      this.custo = calcula_custo(this.dna);
      this.desenpenho = 0;
      this.distancia = calcula_custo(this.dna);
    }
  }


function criador_dna(){
  var dna = [];
  for(var i = 0; i<numdecidades; i++){
      append(dna,i);    //cria uma array com números ordenados de 0 até o número de cidades
  }
    for(var i = 0; i<numdecidades*2; i++){
      var a = floor(random(numdecidades));  //posicao1 aleatória da array
      var b = floor(random(numdecidades));  //posicao2 aleatória da array
      dna = troca(dna, a, b);   //array com os números embaralhados
    }
    return dna;
}

function troca(array, a, b){
  var temporaria = array[a];
  array[a] = array[b];
  array[b] = temporaria;
  return array;
}

function calcula_custo(dna_do_objeto){
  var distancia = 0;
  var temporaria;
  for(var i = 0; i<dna_do_objeto.length-1; i++){
    temporaria = p5.Vector.sub(cidades[dna_do_objeto[i]].posicao, cidades[dna_do_objeto[i+1]].posicao);
    temporaria = temporaria.mag();
    distancia = distancia + temporaria;
  }
  return distancia;
}


function selecao_natural(){
  var r = random(1);
  var i = 0;
  while(r>0){
    r = r - velha_população[i].desenpenho;
    i++
  }

  return velha_população[i-1];
}

function crossing_over(){
  var progenitor1 = selecao_natural();
  var progenitor2 = selecao_natural();
  var novo_dna = [];
  var crianca = new Mapa();
  var comeco = floor(random(progenitor1.dna.length));
  var fim = floor(random(comeco+1,progenitor1.dna.length))

  novo_dna = progenitor1.dna.slice(comeco,fim)

  for(var i = 0; i<progenitor2.dna.length; i++){
    if(!novo_dna.includes(progenitor2.dna[i])){
      append(novo_dna,progenitor2.dna[i]);
    }
  }
  crianca.dna = novo_dna;

//mutação
  crianca = mutacao(crianca);
  return crianca;
}


function mutacao(crianca){
  var fator_mutante = 0.07;
  var r = random(1);

  var a = floor(random(crianca.dna.length));
  var b = (a+1) % numdecidades;

  if(r<fator_mutante){
    troca(crianca.dna, a, b);
  }
  return crianca
}
