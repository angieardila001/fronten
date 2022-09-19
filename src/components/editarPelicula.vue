<template>
  <div>
    <v-row justify="center">
      <v-col cols-lg="4" justify="center" class="pa-7">
        <v-img
          id="borde1"
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
          <h3 class="black--text">Titulo</h3>
          <input id="bordi" type="text" v-model="titulo" />
          <h3 class="black--text">Subtitulo</h3>
          <input id="bordi" type="text" v-model="subtitulo" />
          <h3 class="black--text">Sinopsis</h3>
          <input id="bordi" type="text" v-model="sinopsis" />
          <h3 class="black--text">Duracion</h3>
          <input id="bordi" type="text" v-model="duracion" />
          <h3 class="black--text">Fecha Publicacion</h3>
          <input id="bordi" type="text" v-model="fechaPublicacion" />
          <h3 class="black--text">Categoria</h3>
          <input id="bordi" type="text" v-model="categoria" />
          <h3 class="black--text">Creador</h3>
          <input id="bordi" type="text" v-model="creador" />
          <br />
          <input class="black--text" type="file" @change="subir" />
          <br />
          <v-btn @click="login()">Editar</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "PageEditarPelicula",
  data() {
    return {
      height: 700,
      width: 600,
      titulo: this.$store.state.pelicula.titulo,
      subtitulo: this.$store.state.pelicula.subtitulo,
      sinopsis: this.$store.state.pelicula.sinopsis,
      duracion: this.$store.state.pelicula.duracion,
      fechaPublicacion: this.$store.state.pelicula.fechaPublicacion,
      categoria: this.$store.state.pelicula.categoria,
      creador: this.$store.state.pelicula.creador,
      img:""
    };
  },

  methods: {
    login() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .put(
          `https://angiepelicula.herokuapp.com/api/pelicula/${this.$store.state.pelicula._id}`,
          {
            titulo: this.titulo,
            subtitulo: this.subtitulo,
            sinopsis: this.sinopsis,
            duracion: this.duracion,
            fechaPublicacion: this.fechaPublicacion,
            categoria: this.categoria,
            creador: this.creador,

            reparto: this.$store.state.reparto,
          },
          header
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    subir(e) {
      this.img = e.target.files[0];
      console.log(this.img);
      let fd = new FormData();
      fd.append("archivo", this.img);
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(fd);
      axios
        .put(
          `https://angiepelicula.herokuapp.com/api/pelicula/${this.$store.state.pelicula._id}`,
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
  border: solid 2px #000000 !important;
}
#borde1 {
  background: white;

  justify-content: center;
  text-justify: center;
  border: solid 2px #aa2626 !important;
}
</style>