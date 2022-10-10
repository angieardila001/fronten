 <template>
  <v-container>
    <v-row>
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
      <v-col cols="3" v-for="(p, i) in peliculas" :key="i">
        <v-card class="mx-auto red lighten-5" max-width="344">
          <v-img
            :src="p.foto"
            aspect-ratio="1.7"
            :height="height"
            :width="width"
            contain
          ></v-img>

          <v-card-title> {{ p.nombre }} </v-card-title>

          <v-card-subtitle> {{ p.alias }} </v-card-subtitle>

          <v-card-actions>
            <v-btn block color="indigo accent-1 white--text" @click="actor(p)"
              >DETALLE DEL ACTOR
            </v-btn>
            
          
                 
                
          </v-card-actions>

          <br>
     
          <v-card-actions>
            <v-row class="mx-auto">
               <v-btn v-if="$store.state.datos.rol==='admi'"
                    color="indigo accent-1 white--text"
                    dark
                   @click="agregar(p)"
                  >
                    Añadir a Reparto
                  </v-btn>
            </v-row>
          </v-card-actions>
          <br>
        </v-card>
      </v-col>
      <v-bottom-sheet v-model="sheet">
        <v-sheet justify="center" class="text-center" height="600px">
          <div class="py-3">
            Registro exitoso de Actor, puedes añadir mas Actores o ir a terminar
            de añadir pelicula.
          </div>
          <v-btn
            to="/nuevaPe"
            class="mt-6"
            text
            color="red"
            @click="sheet = !sheet"
          >
            Ir A terminar de Añadir pelicula
          </v-btn>
        </v-sheet>
      </v-bottom-sheet>
      <v-btn color="orange lighten-2" text @click="regresar()">
        Regresar
      </v-btn>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
                
                <v-card id="alerta"> 
                  <v-card-title>
                    <span
                      class="text-h5 font-weight-bold black--text"
                      background-color="grey lighten-2"
                      >Añadir Reparto
                    </span>
                  </v-card-title>
                  <v-card-text >
                    <v-container>
                      <v-row >
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="rol"
                            background-color="grey lighten-2"
                            class="font-weight-bold black--text"
                            label="Rol"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="personaje"
                            background-color="grey lighten-2"
                            class="font-weight-bold black--text"
                            label="Personaje"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1  white--text"  @click="dialog = false">
                      Salir
                    </v-btn>
                    <v-btn color="green accent-3 white--text"  @click="guardar()">
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
  </v-container>
</template> 
<script>
import axios from "axios";
export default {
  name: "PageListarActor",
  data() {
    return {
   
      alert1: false,
      sheet: false,
      token: this.$store.state.token,
      reparto: this.$store.state.reparto,
      personaje: "",
      rol: "",
      peliculas: {},
      rol1: "hola",
      re: {},
      dialog: false,
      pe:{}
    };
  },
  methods: {
    traerpeliculas() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .get("https://angpelicula.herokuapp.com/api/actor", header)
        .then((res) => {
          //console.log(res);
          this.peliculas = res.data.actores;
          this.$store.commit("setActor", res.data.actores);
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
    informa() {
      this.mostrar = 2;
      this.mostrar2 = 0;
    },
    guardar() {
     
      this.dialog = false;
      this.sheet = !this.sheet;

      this.re = {
        idactor: this.pe._id,
        rol: this.pe.rol,
        personaje: this.pe.personaje,
        datosactor: this.pe,
      };
      this.$store.commit("setReparto", this.re);
      //console.log("reparto", this.reparto);
      this.rol="";
      this.personaje=""
     
    },
    regresar() {
      this.$router.push("/nuevaPe");
    },
    actor(p) {
      this.$store.commit("setDetalleActor", p);
      this.$router.push("/detalleActor");
    },

    agregar(p){
      //console.log(p);
      this.pe=p
      this.dialog=true
    }
  },
  created() {
    this.traerpeliculas();
  },
};
</script> 
<style>
#alerta{
  background: rgb(238, 223, 223);
}
</style>