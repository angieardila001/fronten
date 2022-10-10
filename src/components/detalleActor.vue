 <template>
  <v-container>
    <v-row class="justify-center mb-6">
      <v-alert
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
      <v-col cols="12">
        <v-row>
          <v-col cols="5" class="justify-center mb-6">
             <v-img 
          :src="pelicula.foto"
          aspect-ratio="1.7"
          :height="height"
          :width="width"
          contain
        ></v-img>
            <input v-if="$store.state.datos.rol==='admi'" type="file" @change="subir" />
          </v-col>
          <v-col cols="6">
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
              <v-card
                aspect-ratio="1.7"
                id="bor"
                height="500px"
                width="500px"
                justify="center"
                class="rounded-xl"
              >
                <br />
                <br />
                <v-icon class="font-weight-black black--text"
                  >mdi-account</v-icon
                >
                <v-toolbar-title class="font-weight-bold black--text">
                  Detalle del Actor
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <br />

                <h2 class="font-weight-black">{{ pelicula.nombre }}</h2>
                <h4>{{ pelicula.alias }}</h4>
                <br />

                <h3>Sinopsis</h3>
                <div>{{ pelicula.biografia }}</div>
                
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
      <v-bottom-sheet v-model="sheet">
        <v-sheet justify="center" class="text-center" height="600px">
          <div class="py-3">
            Registro exitoso de la foto del actor si deseas verla ve a listar
            los actores.
          </div>
          <v-btn
            to="/listarA"
            class="mt-6"
            text
            color="red"
            @click="sheet = !sheet"
          >
            Ir a ver los actores
          </v-btn>
        </v-sheet>
      </v-bottom-sheet>
    </v-row>
  </v-container>
</template> 
<script>
import axios from "axios";
export default {
  name: "PagePelicula",
  data() {
    return {
      height:400,
      width: 400,
      alert1: false,
      sheet: false,
      pelicula: this.$store.state.detalleActor,
    };
  },
  methods: {
    subir(e) {
      this.img = e.target.files[0];
      //console.log(this.img);
      let fd = new FormData();
      fd.append("archivo", this.img);
      let header = { headers: { "x-token": this.$store.state.token } };
      //console.log(fd);
      axios
        .post(
          `https://angpelicula.herokuapp.com/api/actor/uploadcloud/${this.$store.state.detalleActor._id}`,
          fd,
          header
        )
        .then((response) => {
          response
          //console.log(response.data.url);
          this.sheet = !this.sheet;
        })
        .catch((error) => {
          if (error.response.data.msg === "No hay token en la peticion") {
            this.alert1 = true;
          } else {
            //console.log(error);
          }
        });
    },
  },
  created() {},
};
</script> 
<style>
#bor {
  background: white;

  justify-content: center;
  text-justify: center;
  border: solid 3px #ba2121 !important;
}
</style>