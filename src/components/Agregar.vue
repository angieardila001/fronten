<template>
  <v-container fluid lazy-validation id="animo">
    <v-row justify="center">
      <v-col cols="5" justify="center">
        <v-img
          src="https://us.123rf.com/450wm/ssstocker/ssstocker1508/ssstocker150800006/43645158-iconos-avatar-en-dise%C3%B1o-plano-actor-de-cine-y-de-superh%C3%A9roes-jugador-de-hockey-y-hombre-de-negocios.jpg"
          aspect-ratio="1.7"
          :height="height"
          :width="width"
          contain
        ></v-img>
      </v-col>
      <v-col cols="7">
        <v-col cols="11" md="8" class="pa-6">
          <div
            id="borde3"
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
            <br />
            <br />
            <v-icon class="font-weight-black black--text">mdi-account</v-icon>
            <v-toolbar-title class="font-weight-black black--text">
              Nuevo Actor
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
              <v-btn to="/" class="mt-6" color="red"
                >Ir A Iniciar Sesion</v-btn
              >
            </v-alert>
            <v-text-field
              v-model="nombre"
              :counter="30"
              :rules="nameRules"
              label="Nombres"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
              required
            ></v-text-field>

            <v-textarea
              filled
              name="input-7-4"
              v-model="biografia"
              :counter="500"
              :rules="biografiaRules"
              label="Biografía"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
            ></v-textarea>

            <v-text-field
              v-model="alias"
              :counter="30"
              :rules="aliasRules"
              label="Alias"
              background-color="grey lighten-2"
              class="font-weight-bold black--text"
              required
            ></v-text-field>
            <br />
            <v-btn color="green" class="mr-4" @click="agregar()">
              Agregar
            </v-btn>
            <v-btn color="error" @click="info()"> Cancelar </v-btn>
            <br />
            <br />
            <v-bottom-sheet v-model="sheet">
              <v-sheet justify="center" class="text-center" height="600px">
                <div class="py-3">
                  Registro exitoso del Actor, puedes añadir mas actores o ir a
                  ver peliculas.
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
  name: "PageAgregar",
  data() {
    return {
      sheet: false,
      alert: false,
      alert1: false,
      alerta: [],
      alertas: [],
      height: 600,
      width: 600,
      nombre: "",
      nameRules: [
        (v) => !!v || "Nombre es requerido",
        (v) => (v && v.length <= 30) || "El nombre es de maximo 30 caracteres",
      ],
      alias: "",
      aliasRules: [
        (v) => !!v || "Alias es requerido",
        (v) => (v && v.length <= 30) || "Alias es de maximo 30 caracteres",
      ],
      biografia: "",
      biografiaRules: [
        (v) => !!v || "Biografía es requerida",
        (v) =>
          (v && v.length <= 500) || "Biografia es de maximo 500 caracteres",
      ],
    };
  },

  methods: {
    agregar() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .post(
          "https://angiepelicula.herokuapp.com/api/actor/",
          {
            nombre: this.nombre,
            biografia: this.biografia,
            alias: this.alias,
            foto: "",
          },
          header
        )
        .then((res) => {
          console.log(res);
          this.sheet = !this.sheet;
        })
        .catch((err) => {
          if (err.response.data.msg === "No hay token en la peticion") {
            this.alert1 = true;
          } else {
            this.alert = true;
            console.log(err);

            this.alertas = err.response.data;

            console.log("revisar", this.alerta);
            this.alerta = err.response.data.errors;
            console.log(err.response.data.errors[0].msg);
          }
        });
    },
    info() {
      this.$router.push("/informacion");
    },
    subir(e) {
      this.img = e.target.files[0];
      console.log(this.img);
      let fd = new FormData();
      fd.append("archivo", this.img);
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(fd);
      axios
        .post(
          `https://angiepelicula.herokuapp.com/api/actor/uploadcloud/${this.$store.state.actor._id}`,
          fd,
          header
        )
        .then((response) => {
          console.log(response.data.url);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script> 
<style >
#borde3 {
  width: 500px;
  justify-content: center;
  text-justify: center;
  border: solid 3px #ba2121 !important;
}
#animo {
  background: #f5e7e7;
}
</style>