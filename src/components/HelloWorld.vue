<template>
  <v-container fluid class="bg pt-0 mt-0 " >
    <h1 v-if="clasificar.length>=1" class="field white--text ">Acción </h1>
    <v-row>
      <v-col v-for="value in limitcom1" :key="value" >
        <v-hover v-slot="{ hover }"
        open-delay="200">
        <v-card max-width="200" :elevation="hover ? 22 : 2"
          :class="{ 'on-hover': hover }" :color="hover ? 'red' : 'black'" >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="value.poster"  @click="informa(value)"></v-img>
          <v-card-title class="fieldP white--text my-0 py-0 text-center">{{ value.titulo }}</v-card-title>
          <div class=" text-h9 white--text text-right my-0 py-0">{{value.duracion}}</div>
        </v-card>
        </v-hover>
      </v-col>
      <v-btn v-if="clasificar.length>=5" @click="limit2=null" class="ma-2 display:none" color="primary" dark 
      > Ver más... 
      </v-btn>
      <v-btn v-else disabled class="ma-2 display:none"
      > Ver menos 
      </v-btn>
    </v-row>
    <h1 v-if="clasificar2.length>=1" class="field  white--text">Animación</h1>
    <v-row>
      <v-col v-for="value in limitcom" :key="value" >
        <v-hover v-slot="{ hover }"
        open-delay="200">
        <v-card max-width="200" :elevation="hover ? 22 : 2"
          :class="{ 'on-hover': hover }" :color="hover ? 'red' : 'black'" >
          
          <v-img height="250" :src="value.poster"  @click="informa(value)"></v-img>
          <v-card-title class="fieldP white--text my-0 py-0 text-center">{{ value.titulo }}</v-card-title>
          <div class=" text-h9 white--text text-right my-0 py-0 ">{{value.duracion}}</div>
         
        </v-card>
        </v-hover>
      </v-col>
      <v-btn v-if="clasificar2.length>=5" @click="limit=null" class="ma-2 display:none" color="primary" dark 
      > Ver más... 
      </v-btn>
     
    </v-row>
    <h1 v-if="clasificar3.length>=1" class="field white--text">Romanticas</h1>
    <v-row>
      <v-col v-for="value in limitcom3" :key="value" >
        <v-hover v-slot="{ hover }"
        open-delay="200">
        <v-card max-width="200" :elevation="hover ? 22 : 2"
          :class="{ 'on-hover': hover }" :color="hover ? 'red' : 'black'">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250" :src="value.poster"  @click="informa(value)"></v-img>
          <v-card-title class="fieldP white--text my-0 py-0 text-center">{{ value.titulo }}</v-card-title>
          <div class=" text-h9 white--text text-right mb-0 pb-0">{{value.duracion}}</div>
          
        </v-card>
        </v-hover>
      </v-col>
      <v-btn  @click="limit3=null" class="ma-2 display:none" color="primary" dark 
      > Ver más... 
      </v-btn>
    </v-row>
    <h1 v-if="clasificar4.length>=1" class="field white--text">Comedia</h1>
    <v-row>
      <v-col v-for="value in limitcom4" :key="value" >
        <v-hover v-slot="{ hover }"
        open-delay="200">
        <v-card max-width="200" :elevation="hover ? 22 : 2"
          :class="{ 'on-hover': hover }" :color="hover ? 'red' : 'black'">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250" :src="value.poster"  @click="informa(value)"></v-img>
          <v-card-title class="fieldP white--text my-0 py-0 text-center">{{ value.titulo }}</v-card-title>
          <div class=" text-h9 white--text text-right my-0 py-0">{{value.duracion}}</div>
        </v-card>
        </v-hover>
      </v-col>
      <v-btn v-if="clasificar4.length>=5" @click="limit4=null" class="ma-2 display:none" color="primary" dark 
      > Ver más... 
      </v-btn>
     
    </v-row>

    <h1 v-if="clasificar5.length>=1" class="field white--text">Drama</h1>
    <v-row>
      <v-col v-for="value in limitcom5" :key="value" >
        <v-hover v-slot="{ hover }"
        open-delay="200">
        <v-card max-width="200" :elevation="hover ? 22 : 2"
          :class="{ 'on-hover': hover }">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250" :src="value.poster"  @click="informa(value)"></v-img>
          <v-card-title class="fieldP white--text my-0 py-0 text-center">{{value.titulo }}</v-card-title>
          <div class=" text-h9 white--text text-right my-0 py-0">{{value.duracion}}</div>
          
        </v-card>
        </v-hover>
      </v-col>
      <v-btn  @click="limit5=null" class="ma-2 display:none" color="primary" dark 
      > Ver más... 
      </v-btn>
    </v-row>

    <h1 v-if="clasificar6.length>=1" class="field white--text">Terror</h1>
    <v-row>
      <v-col v-for="value in limitcom6" :key="value" >
        <v-hover v-slot="{ hover }"
        open-delay="200" >
        <v-card id="card" max-width="200" :elevation="hover ? 22 : 2"
          :class="{ 'on-hover': hover }" :color="hover ? 'red' : 'black'">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250" :src="value.poster"  @click="informa(p)"></v-img>
          <v-card-title class="fieldP white--text my-0 py-0 text-center">{{ value.titulo }}</v-card-title>
          <div class=" text-h9 white--text text-right my-0 py-0">{{value.duracion}}</div>
          
        </v-card>
        </v-hover>
      </v-col>
      <v-btn  @click="limit6=null" class="ma-2 display:none" color="primary" dark 
      > Ver más... 
      </v-btn>
    </v-row>

    
  </v-container>
</template>

<script>

export default {
  name: "CategoriaPage",
  data() {
    return {
      selection: 1,
      peliculas: this.$store.state.todos,
      limit:5,
      limit2:5,
      limit3:5,
      limit4:5,
      limit5:5,
      limit6:5,

    };
  },

  methods: {
    
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    informa(p) {
      this.$store.commit("setPelicula", p);
      this.$router.push("/pelicula");
    },
  },
  computed: {
    clasificar() {
      return this.peliculas.filter((e) => e.categoria == "Accion");
    },
    clasificar2() {
      return this.peliculas.filter((e) => e.categoria == "Animacion");
    },
    clasificar3() {
      return this.peliculas.filter((e) => e.categoria == "Romanticas");
    },
    clasificar4() {
      return this.peliculas.filter((e) => e.categoria == "Comedia");
    },
    clasificar5() {
      return this.peliculas.filter((e) => e.categoria == "Dramas");
    },
    clasificar6() {
      return this.peliculas.filter((e) => e.categoria == "Terror");
    },
    limitcom(){
      return this.limit ? this.clasificar2.slice(0,this.limit) : this.clasificar2
    },
    limitcom1(){
      return this.limit2 ? this.clasificar.slice(0,this.limit2) : this.clasificar },
    limitcom3(){
      return this.limit3 ? this.clasificar3.slice(0,this.limit3) : this.clasificar3},
    limitcom4(){
      return this.limit4 ? this.clasificar4.slice(0,this.limit4) : this.clasificar4},
    limitcom5(){
      return this.limit5 ? this.clasificar5.slice(0,this.limit5) : this.clasificar5},
    limitcom6(){
      return this.limit6 ? this.clasificar6.slice(0,this.limit6) : this.clasificar6
   
    },
   
  },
  created() {
    this.traerpeliculas();
  },
};
</script>

<style>
  #card{
    box-shadow: brown;
  }
  .bg{
    background:rgb(57, 54, 54)
  }
  .text-h5{
    font: small-caption
  }
  .field{
    font-family: "Homer Simpson UI";
    font-size: 200%;
    font-weight: bold;
    
  }
 
  
  .fieldP{
    font-family: "Segoe UI"; font-size: 20px; font-style: normal; font-variant: normal; font-weight: 700; line-height: 33px;
  }
</style>