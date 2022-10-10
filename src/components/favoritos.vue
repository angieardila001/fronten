 <template>
  <v-container>
    <v-row>
      <v-col cols="3" v-for="(p, i) in favoritos1" :key="i">

        <v-card class="mx-auto" max-width="344" @click="informa(p)">
          <v-img :src="p.idpelicula.poster" height="250px"></v-img>

          <v-card-title> {{ p.idpelicula.titulo }} </v-card-title>

          <v-card-subtitle> {{ p.idpelicula.categoria }} </v-card-subtitle>
        </v-card>
      </v-col>
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

      
      favoritos1: [],
    };
  },
  methods: {
    traerfavoritos() {
      let header = { headers: { "x-token": this.$store.state.token } };
console.log("id",this.$store.state.datos._id);
      axios
        .get(
          
          `https://angpelicula.herokuapp.com/api/favorito/listar/${this.$store.state.datos._id}`,
          header
        )
        .then((res) => {
          //console.log(res);
          this.favoritos1 = res.data.favorito;
          //console.log("fa",this.favoritos1);
        })
       /*  .catch((err) => {
          console.log(err);
        }); */
      },

    añadir() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .post(
          `https://angpelicula.herokuapp.com/api/favorito`,
          {
            idusuario: this.$store.state.datos._id,
            idpelicula: this.$store.state.pelicula._id,
          },
          header
        )
        .then((res) => {
          //console.log(res);
          this.favoritos = res.data.favoritos;
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
  },
  created() {
    this.traerfavoritos();
  },
};
</script> 
<style>
</style>