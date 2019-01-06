// Mapas = população
class Mapa {
  constructor() {
      this.dna = criador_dna(); //the path
      this.distancia = calcula_distancia(this.dna); //total distance
      this.desenpenho = 1/(pow(this.distancia,8)+1); //performance - the bigger the distance, the less the performance
    }
  }


function criador_dna(){
  var dna = [];
  for(var i = 0; i<numdecidades; i++){
      append(dna,i); //create an array with numbers from 0 to number of cities
  }
    for(var i = 0; i<numdecidades*2; i++){
      var a = floor(random(numdecidades));  //posicao1 aleatória da array
      var b = floor(random(numdecidades));  //posicao2 aleatória da array
      dna = troca(dna, a, b);   //shuffle the order of items in the array
    }
    return dna;
}

function troca(array, a, b){ //this function switches two itens in a array
  var temporaria = array[a];
  array[a] = array[b];
  array[b] = temporaria;
  return array;
}

function calcula_distancia(dna_do_objeto){ //calculates the total distance in the map
  var distancia = 0;
  var temporaria;
  for(var i = 0; i<dna_do_objeto.length-1; i++){
    temporaria = p5.Vector.sub(cidades[dna_do_objeto[i]].posicao, cidades[dna_do_objeto[i+1]].posicao);
    temporaria = temporaria.mag();
    distancia = distancia + temporaria;
  }
  return distancia;
}

function normaliza_distancias(){ //Normalize all maps performance
  var total = 0;

  for(var i = 0; i<população.length; i++){
    total = total + população[i].desenpenho;
  }
  for(var i = 0; i<população.length; i++){
    população[i].desenpenho = população[i].desenpenho/total;
  }
}

//Genetic algorithm
function selecao_natural(){ //natural selection algorithm
  var r = random(1);
  var i = 0;
  while(r>0){
    r = r - velha_população[i].desenpenho;
    i++
  }

  return velha_população[i-1];
}

function crossing_over(){ //crossing over algorithm (obviously)
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
  crianca.dna = novo_dna; //update child's characteristcs

  crianca = mutacao(crianca); //mutation
  crianca.distancia = calcula_distancia(crianca.dna);
  crianca.desenpenho = 1/(pow(crianca.distancia,8)+1);

  return crianca; //returns a new map
}


function mutacao(crianca){ //mutation
  var fator_mutante = 0.01; //mutation rate
  var r = random(1);

  var a = floor(random(crianca.dna.length)); //switch two neighbours
  var b = (a+1) % numdecidades;

  if(r<fator_mutante){
    troca(crianca.dna, a, b);
  }
  return crianca
}
