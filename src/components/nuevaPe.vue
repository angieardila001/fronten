<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="5" justify="center">
        <v-img
          src="https://thumbs.dreamstime.com/b/equipo-del-vintage-y-elementos-cine-con-el-fondo-oscuro-ve-125816698.jpg"
          aspect-ratio="1.7"
          :height="height"
          :width="width"
          contain
        ></v-img>
      </v-col>
      <v-col cols="7">
        <v-col cols="11" md="8" class="pa-6">
          <div
            id="borde4"
            contain
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
            <v-icon class="font-weight-black black--text">mdi-account</v-icon>
            <v-toolbar-title class="font-weight-black black--text">
              Añadir Pelicula
            </v-toolbar-title>
            <v-spacer></v-spacer>
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

            <v-btn color="deep-purple darken-1  white--text" @click="info()"
              >AÑADIR ACTORES</v-btn
            >

            <v-container>
              <v-row>
              <v-sheet
    class="mx-auto"
    elevation="8"
    width="470"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="(p, i) in $store.state.reparto" :key="i"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : ''"
          class="ma-4"
          height="200"
          width="100"
          @click="toggle"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
              <v-img 
               :src="p.datosactor.foto"> </v-img>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
               
              </v-row>
            </v-container>
            <v-text-field
              v-model="duracion"
              :counter="25"
              :rules="duracionRules"
              label="Duracion"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
              required
            ></v-text-field>

            <v-col
              cols="12"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
            >
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    :rules="dateRules"
                    label="Fecha Publicacion"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-autocomplete
              v-model="categoria"
              :items="items"
              :rules="categoriaRules"
              dense
              filled
              label="Categoria"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
              required
            ></v-autocomplete>
            <v-text-field
              v-model="creador"
              :counter="35"
              :rules="creadorRules"
              label="Creador"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
              required
            ></v-text-field>
            <v-btn color="light-green accent-3" class="mr-4" @click="login()">
              Guardar
            </v-btn>

            <v-btn to="/informacion" icon> Atras </v-btn>
            <v-bottom-sheet v-model="sheet">
              <v-sheet justify="center" class="text-center" height="600px">
                <div class="py-3">
                  Registro exitoso de la Pelicula, puedes añadir mas peliculas o
                  ir a ver peliculas.
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
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "PageNuevaPe",
  data() {
    return {
          model: null,
      //  valid: true,
      //  select: null,
      // checkbox: false,
      // show1: false,
      length: 3,
      onboarding: 0,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      items: [
        "Accion",
        "Animacion",
        "Romanticas",
        "Comedia",
        "Terror",
        "Dramas",
      ],
      sheet: false,
      alert: false,
      alert1: false,
      alerta: [],
      alertas: [],
      height: 1100,
      width: 900,
      titulo: "",
      subtitulo: "",
      sinopsis: "",
      duracion: "",
      fechaPublicacion: "",
      categoria: "",
      creador: "",
      img: "",
     
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
        .post(
          "https://angpelicula.herokuapp.com/api/pelicula/post",
          {
            titulo: this.titulo,
            subtitulo: this.subtitulo,
            sinopsis: this.sinopsis,
            duracion: this.duracion,
            fechaPublicacion: this.date,
            categoria: this.categoria,
            creador: this.creador,
            poster: "",
            reparto: this.$store.state.reparto,
          },
          header 
        )
        .then((res) => {
          res
          //console.log(res);
          this.sheet = !this.sheet;
          this.$store.state.reparto=""
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
    info() {
      this.$router.push("/listarA");
    },
    subir(e) {
      this.img = e.target.files[0];
      //console.log(this.img);
      let fd = new FormData();
      fd.append("archivo", this.img);
      let header = { headers: { "x-token": this.$store.state.token } };
      //console.log(fd);
      axios
        .post(
          `https://angpelicula.herokuapp.com/api/pelicula/uploadcloud/${this.$store.state.pelicula._id}`,
          fd,
          header
        )
      
    },
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
  },
};
</script>
<style>
#borde4 {
  width: 500px;
  justify-content: center;
  text-justify: center;
  border: solid 3px #ba2121 !important;
}
</style>