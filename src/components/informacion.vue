 <template>
  <v-container>
    <v-row>
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
        <v-btn to="/" class="mt-6" color="red">Ir A Iniciar Sesion</v-btn>
      </v-alert>
      <v-col cols="3" v-for="(p, i) in peliculas" :key="i" >
        <v-card class="mx-auto" max-width="344">
           <v-btn icon dark color="black" @click="favorito(p)">
           
            <v-icon>
              {{ active ? "mdi-heart" : "mdi-heart-outline" }}
            </v-icon>
          </v-btn>
          <v-img :src="p.poster" height="250px" @click="informa(p)"></v-img>

          <v-card-title> {{ p.titulo }} </v-card-title>

          <v-card-subtitle> {{ p.categoria }} </v-card-subtitle>
        
          
        </v-card>
       
      </v-col>

      <v-btn v-if="$store.state.datos.rol==='admi'" @click="pelicula()">AÑADIR PELICULA</v-btn>
      <v-btn v-if="$store.state.datos.rol==='admi'" @click="actor()">AÑADIR ACTOR</v-btn>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Felicitaciones!!
          </v-card-title>

          <v-card-text>
            Acabas de añadir esta pelicula a favoritos.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    </v-row>
  </v-container>
</template> 
<script>
    
import axios from "axios";
export default {
  name: "PageInformacion",
  data() {
    return {
    
      token: this.$store.state.token,
      dialog: false,
     
      peliculas: [],
   
       sheet: false,
      alert: false,
      alert1: false,
      alerta: [],
      alertas: [],
    };
  },
  methods: {
    traerpeliculas() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios.get("https://angiepelicula.herokuapp.com/api/pelicula", header)
        .then((res) => {
          console.log(res);
          this.peliculas = res.data.peliculas;
          this.$store.commit("setTodos",this.peliculas)
          console.log("jj",this.$store.state.todos.i);
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
    informa(p) {
      this.$store.commit("setPelicula", p);
      this.$router.push("/pelicula");
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
          `https://angiepelicula.herokuapp.com/api/pelicula/uploadcloud/${this.$store.state.pelicula._id}`,
          fd,
          header
        )
        .then((response) => {
          console.log(response.data.url);
          this.sheet = !this.sheet;
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
    pelicula() {
      this.$router.push("/nuevaPe");
    },
    actor() {
      this.$router.push("/agregaractor");
    },
    favorito(p) {
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
          console.log(p);
          this.pe = p;
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
    boton(){
      this.$router.push("/categorias")
    },
    
   
  },
  created() {
    this.traerpeliculas();
  },
};
</script> 
<style>
</style>