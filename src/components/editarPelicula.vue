<template>
  <div>
    <v-row justify="center">
      <v-col cols-lg="4" justify="center" class="pa-7">
        <v-img
          
          :src="$store.state.pelicula.poster"
          aspect-ratio="1.7"
          :height="height"
          :width="width"
          contain
          elevation="12"
        ></v-img>
      </v-col>
      <v-col cols="5">
        <v-col
          contain
          id="borde1"
          cols="11"
          justify="center"
          class="
            my-12
            justify-center
            text-center
            white--text
            pa-4
            text-center
            s
            text-no-wrap
            rounded-xl
          "
        >
        <v-alert
              :value="alert"
              transition="scale-transition"
              text
              prominent
              type="error"
              icon="mdi-cloud-alert"
              v-for="(p, i) in alerta"
              :key="i"
            >
              {{ p.msg }}
            </v-alert>
            <v-alert
              :value="alert1"
              transition="scale-transition"
              text
              prominent
              type="error"
              icon="mdi-cloud-alert"
            >
              Por favor Registrate o Inicia Sesion
              <v-btn to="/" class="mt-6" text color="red"
                >Ir A Iniciar Sesion</v-btn
              >
            </v-alert>
          
          <v-text-field
              v-model="titulo"
              :counter="50"
              :rules="tituloRules"
              label="Titulo"
              required
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
            ></v-text-field>
            <v-text-field
              v-model="subtitulo"
              :counter="50"
              :rules="subtituloRules"
              label="Subtitulo"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
            ></v-text-field>

          <h3 class="black--text">Sinopsis</h3>
          <v-textarea
              filled
              name="input-7-4"
              label="Sinopsis"
              :counter="500"
              v-model="sinopsis"
              :rules="sinopsisRules"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
            ></v-textarea>
            <v-text-field
              v-model="duracion"
              :counter="25"
              :rules="duracionRules"
              label="Duracion"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
              required
            ></v-text-field>
          <h3 class="black--text">Fecha Publicacion</h3>
          <v-text-field
              v-model="fechaPublicacion"
              :counter="25"
              
              label="Fecha Publicacion"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
              required
            ></v-text-field>
          <h3 class="black--text">Categoria</h3>
          <v-text-field
              v-model="categoria"
              :counter="25"
              
              label="Categoria"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
              required
            ></v-text-field>
          <h3 class="black--text">Creador</h3>
          <v-text-field
              v-model="creador"
              :counter="35"
              :rules="creadorRules"
              label="Creador"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
              required
            ></v-text-field>
          <br />
          <input class="black--text" type="file" @change="subir" />
          <br />
          <v-btn @click="login()">Editar</v-btn>
          
        </v-col>
      </v-col>
    </v-row>
    <v-bottom-sheet v-model="sheet">
              <v-sheet justify="center" class="text-center" height="600px">
                <div class="py-3">
                  Felicidades, puedes ir a ver mas peliculas 
                </div>
                <v-btn
                  to="/informacion"
                  class="mt-6"
                  text
                  color="red"
                  @click="sheet = !sheet"
                >
                  Ir a ver Peliculas
                </v-btn>
              </v-sheet>
            </v-bottom-sheet>
  </div>

</template>
<script>
import axios from "axios";
export default {
  name: "PageEditarPelicula",
  data() {
    return {
      sheet: false,
      alert: false,
      alert1: false,
      alerta: [],
      alertas: [],
      height: 500,
      width: 500,
      titulo: this.$store.state.pelicula.titulo,
      subtitulo: this.$store.state.pelicula.subtitulo,
      sinopsis: this.$store.state.pelicula.sinopsis,
      duracion: this.$store.state.pelicula.duracion,
      fechaPublicacion: this.$store.state.pelicula.fechaPublicacion,
      categoria: this.$store.state.pelicula.categoria,
      creador: this.$store.state.pelicula.creador,
      id:this.$store.state.pelicula._id,
      img:"",
      tituloRules: [
        (v) => !!v || "Titulo es requerido",
        (v) => (v && v.length <= 50) || "el titulo es de maximo ",
      ],
      subtituloRules: [
        (v) => (v && v.length <= 50) || "el subtitulo es de maximo 50",
      ],
      sinopsisRules: [
        (v) => !!v || "Sinopsis es requerido",
        (v) => (v && v.length <= 500) || "la sinopsis es de maximo 500",
      ],
      duracionRules: [
        (v) => !!v || "Duracion es requerido",
        (v) => (v && v.length <= 25) || "la duracion es de maximo 25",
      ],
      dateRules: [
        (v) => !!v || "La fecha es requerido",
        (v) =>
          (v && v.length <= 50) || "la fecha de publicacion es de maximo 50",
      ],
      categoriaRules: [
        (v) => !!v || "Categoria es requerido",
        (v) => (v && v.length <= 25) || "la categoria es de maximo 25",
      ],
      creadorRules: [
        (v) => !!v || "Creador es requerido",
        (v) => (v && v.length <= 35) || "el creador es de maximo 35",
      ],
    };
  },

  methods: {
    login() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .put(
          `https://angpelicula.herokuapp.com/api/pelicula/${this.id}`,
          {
            titulo: this.titulo,
            subtitulo: this.subtitulo,
            sinopsis: this.sinopsis,
            duracion: this.duracion,
            fechaPublicacion: this.fechaPublicacion,
            categoria: this.categoria,
            creador: this.creador,

           
          },
          header
        )
        .then((res) => {
          this.sheet = !this.sheet;
          res
          //console.log(res);
        })
        .catch((err) => {
          if (err.response.data.msg === "No hay token en la peticion") {
            this.alert1 = true;
          } else {
            this.alert = true;
            //console.log(err);

            this.alertas = err.response.data;

            //console.log("revisar", this.alerta);
            this.alerta = err.response.data.errors;
            //console.log(err.response.data.errors[0].msg);
          }
        });
    },

    subir(e) {
      this.img = e.target.files[0];
      //console.log(this.img);
      let fd = new FormData();
      fd.append("archivo", this.img);
      let header = { headers: { "x-token": this.$store.state.token } };
      //console.log(fd);
      axios
        .put(
          `https://angpelicula.herokuapp.com/api/pelicula/${this.$store.state.pelicula._id}`,
          fd,
          header
        )
    },
    info() {
      this.$router.push("/listarA");
    },
  },
};
</script>
<style>
#bordi {
  background: white;

  justify-content: center;
  text-justify: center;
  border: solid 1px #000000 !important;
}
#borde1 {
  background: white;

  justify-content: center;
  text-justify: center;
  border: solid 2px #aa2626 !important;
}
</style>