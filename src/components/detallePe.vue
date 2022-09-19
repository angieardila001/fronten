 <template>
  <v-container fluid id="fon">
    <v-row class="mb-6">
      <v-btn class="ma-2" to="/informacion" color="blue lighten-2" dark>
        <v-icon dark left> mdi-arrow-left </v-icon>Atras
      </v-btn>
      <v-btn fab dark small color="green" @click="lleEditar()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-col cols="12">
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
          class="content-justify-center"
          :value="alert1"
          transition="scale-transition"
          text
          prominent
          type="error"
          icon="mdi-cloud-alert"
        >
          Por favor Registrate o Inicia Sesion
          <v-btn to="/" color="red">Ir A Iniciar Sesion</v-btn>
        </v-alert>
        <v-row>
          <v-col cols="6" class="justify-center mb-6">
            <v-img
              :src="pelicula.poster"
              aspect-ratio="1.7"
              :height="height"
              :width="width"
              contain
              elevation="12"
            ></v-img>
            <input type="file" @change="subir" />
            <br />
          </v-col>
          <v-col cols="5" class="
            my-12
            justify-center
            text-center
            white--text
            pa-4
            text-center
            s
            text-no-wrap
            rounded-xl
          ">
            <v-col
              cols="10"
              contain
              class="
                justify-center
                text-center
                black--text
                pa-4
                text-center
                s
                text-no-wrap
              "
            >
              <br />
              <br />
              <br />
              <v-card
                id="bor1"
               
                contain
                justify="center"
              >
                <br />

                <h1 class="font-italic" color="indigo darken-4">
                  {{ pelicula.titulo }}
                </h1>

                <br />

                <h3 class="mx-4 font-weight-medium font-weight-black">
                  Sinopsis
                </h3>
                <div class="mx-4 font-weight-medium">
                  {{ pelicula.sinopsis }}
                </div>

                <h3 class="mx-4 font-weight-medium font-weight-black">
                  Duracion
                </h3>
                <div class="mx-4 font-weight-medium">
                  {{ pelicula.duracion }}
                </div>
                <h3 class="mx-4 font-weight-medium font-weight-black">
                  Publicacion
                </h3>
                <div class="mx-4 font-weight-medium">
                  {{ pelicula.fechaPublicacion }}
                </div>
                <h3 class="mx-4 font-weight-medium font-weight-black">
                  Reparto
                </h3>
                <v-col v-for="(p, i) in datosactor" :key="i">
                  <div class="mx-4">{{ p.datosactor }}</div>
                  <div class="mx-4">{{ p.datosactor.nombre }}</div>
                  <div class="mx-4">{{ p.rol }}</div>
                  <div class="mx-4">{{ p.nombre }}</div>
                </v-col>

                <h3 class="mx-4 font-weight-medium font-weight-black">
                  Creador
                </h3>
                <div class="mx-4 font-weight-medium">
                  {{ pelicula.creador }}
                </div>

                <h3 class="font-weight-medium font-weight-black">Categoria</h3>
                <div class="mx-4 font-weight-medium">
                  {{ pelicula.categoria }}
                </div>
                <br />
                <v-btn color="success" class="mr-4 mx-4">▶️ Play </v-btn>
                <v-btn color="success" class="mr-4 mx-4" @click="favorito()">
                  <v-icon>mdi-heart</v-icon>Favorite
                </v-btn>
                <br />
                <br />
              </v-card>
            </v-col>
          </v-col>
        </v-row>
        <v-bottom-sheet v-model="sheet">
          <v-sheet justify="center" class="text-center" height="600px">
            <div class="py-3">
              Registro exitoso de la Pelicula, puedes añadir mas peliculas o ir
              a ver peliculas.
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
      </v-col>
    </v-row>
  </v-container>
</template> 
<script>
import axios from "axios";
export default {
  name: "PagePelicula",
  data() {
    return {
      sheet: false,
      alert: false,
      alert1: false,
      alerta: [],
      alertas: [],
      height: 700,
      width: 700,
      pelicula: this.$store.state.pelicula,
      reparto: this.$store.state.pelicula.reparto,
      datosactor: this.$store.state.pelicula.reparto.datosactor,
    };
  },
  methods: {
    subir(e) {
      this.img = e.target.files[0];
      console.log(this.img);
      let fd = new FormData();
      fd.append("archivo", this.img);
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(fd);
      axios
        .post(
          `https://angiepelicula.herokuapp.com/api/pelicula/uploadcloud/${this.$store.state.pelicula._id}`,
          fd,
          header
        )
        .then((response) => {
          this.sheet = !this.sheet;
          console.log(response.data.url);
        })
        .catch((error) => {
          if (error.response.data.msg === "No hay token en la peticion") {
            this.alert1 = true;
          } else {
            this.alert = true;
            console.log(error);

            this.alertas = error.response.data;

            console.log("revisar", this.alerta);
            this.alerta = error.response.data.errors;
            console.log(error.response.data.errors[0].msg);
          }
        });
    },
    lleEditar() {
      this.$router.push("/editarPelicula");
    },
    favorito() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .post(
          `https://angiepelicula.herokuapp.com/api/favorito`,
          {
            idusuario: this.$store.state.datos._id,
            idpelicula: this.$store.state.pelicula._id,
          },
          header
        )
        .then((res) => {
          console.log(res);
          this.favoritos = res.data.favoritos;

          this.dialog = true;
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
  },
  created() {},
};
</script> 
<style>
#bor1 {
  background: #dceaff;
  justify-content: center;
  text-justify: center;
  border: solid 3px #2321ba !important;
}
#fon {
  background: #e0eaf7;
}
</style>