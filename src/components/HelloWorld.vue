<template>
  <v-container>
    <h1 v-if="clasificar.length>=1">Acción</h1>
    <v-row>
      <v-col v-for="(p, i) in clasificar" :key="i">
        <v-card max-width="200">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="p.poster"  @click="informa(p)"></v-img>
          <v-card-title>{{ p.titulo }}</v-card-title>
        
        </v-card>
      </v-col>
    </v-row>
    <h1 v-if="clasificar2.length>=1">Animacion</h1>
    <v-row>
      <v-col v-for="(p, i) in clasificar2" :key="i">
        <v-card :loading="loading" max-width="200">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250" :src="p.poster"  @click="informa(p)"></v-img>
          <v-card-title>{{ p.titulo }}</v-card-title>
         
        </v-card>
      </v-col>
    </v-row>
    <h1 v-if="clasificar3.length>=1">Romanticas</h1>
    <v-row>
      <v-col v-for="(p, i) in clasificar3" :key="i">
        <v-card :loading="loading" max-width="200">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250" :src="p.poster"  @click="informa(p)"></v-img>
          <v-card-title>{{ p.titulo }}</v-card-title>
          
        </v-card>
      </v-col>
    </v-row>
    <h1 v-if="clasificar4.length>=1">Comedia</h1>
    <v-row>
      <v-col v-for="(p, i) in clasificar4" :key="i">
        <v-card :loading="loading" max-width="200">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250" :src="p.poster"  @click="informa(p)"></v-img>
          <v-card-title>{{ p.titulo }}</v-card-title>
         
        </v-card>
      </v-col>
    </v-row>

    <h1 v-if="clasificar5.length>=1">Drama</h1>
    <v-row>
      <v-col v-for="(p, i) in clasificar5" :key="i">
        <v-card :loading="loading" max-width="200">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250" :src="p.poster"  @click="informa(p)"></v-img>
          <v-card-title>{{ p.titulo }}</v-card-title>
          
        </v-card>
      </v-col>
    </v-row>

    <h1 v-if="clasificar6.length>=1">Terror</h1>
    <v-row>
      <v-col v-for="(p, i) in clasificar6" :key="i">
        <v-card :loading="loading" max-width="200">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250" :src="p.poster"  @click="informa(p)"></v-img>
          <v-card-title>{{ p.titulo }}</v-card-title>
          
        </v-card>
      </v-col>
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
   
  },
  created() {
    this.traerpeliculas();
  },
};
</script>