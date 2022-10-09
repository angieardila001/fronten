<template>
  <v-container>
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
      <v-btn to="/" class="mt-6" text color="red">Ir A Iniciar Sesion</v-btn>
    </v-alert>
    <v-col>
      <v-card class="mx-auto" max-width="1000" tile>
        <v-img
          height="200"
          src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
        ></v-img>
        <v-row style="margin: 2.5%; position: absolute; top: 130px">
          <v-list-item class="pt-5">
            <v-badge>
              <v-avatar id="bordi2" size="100">
                <v-img :src="foto"></v-img>
              </v-avatar>
            </v-badge>
            <v-list-item-content>
              <v-list-item-title class="title" style="margin-top: 10px"
                >{{ nombre }} {{ apellido }}</v-list-item-title
              >
              <v-list-item-subtitle>{{ rol }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-row>
      </v-card>
    </v-col>

    <v-row justify="center" class="mt-16 pt-6">
      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(message, i) in messages"
          :key="i"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="36px">
                  <img
                    id="bordi2"
                    v-if="message.avatar"
                    alt="Avatar"
                    :src="foto"
                  />
                  <v-icon
                    v-else
                    :color="message.color"
                    v-text="message.icon"
                  ></v-icon>
                </v-avatar>
              </v-col>

              <v-col class="hidden-xs-only" sm="5" md="3">
                <strong v-html="message.name"></strong>
                <span v-if="message.total" class="grey--text">
                  &nbsp;({{ message.total }})
                </span>
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content v-if="message.name==='Información Usuario'">
            <v-divider></v-divider>
            <v-card-text>
              <h3>Rol:</h3>
              <input id="bordi2" type="text" v-model="rol" />
              <h3>Nombre:</h3>
              <input id="bordi2" type="text" v-model="nombre" />
              <h3>Apellido:</h3>
              <input id="bordi2" type="text" v-model="apellido" />
              <h3>Email:</h3>
              <input id="bordi2" type="text" v-model="email" />
             
              <br>
              <v-btn color="#76FF03" @click="editar()">
                <v-icon>mdi-pencil</v-icon> Editar</v-btn
              ><br />
              <br>
              <br>
              <input type="file" @change="subir"
            /></v-card-text>
          </v-expansion-panel-content>
         
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-bottom-sheet v-model="sheet">
      <v-sheet justify="center" class="text-center" height="600px">
        <div class="py-3">Se edito exitosamente</div>
        <v-btn
          to="/perfil"
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >
          Seguir viendo mi perfil
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "PagesPerfil",
  data() {
    return {
      height: 500,
      width: 500,
      sheet: false,
      alert: false,
      alert1: false,
      alerta: [],
      alertas: [],
      rol: this.$store.state.datos.rol,
      nombre: this.$store.state.datos.nombre,
      apellido: this.$store.state.datos.apellido,
      email: this.$store.state.datos.email,
      password: this.$store.state.datos.password,
      foto: this.$store.state.datos.foto,
      usuarios: [],
      messages: [
        {
          color: "green",
          icon: "mdi-account",
          name: "Información Usuario",
          
          
        },
      
      ],
    };
  },

  methods: {
    traerpeliculas() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .get(
          `https://angpelicula.herokuapp.com/api/usuario/idusuario/${this.$store.state.datos._id}`,
          header
        )
        .then((res) => {
          console.log(res);
          this.usuarios = res.data.usuarios;
          console.log("usuaeio", this.usuarios);
        })
        .catch((err) => {
          if (err.response.data.msg === "No hay token en la peticion") {
            this.alert1 = true;
          } else {
            console.log(err);
          }
        });
    },
    editar() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .put(
          `https://angpelicula.herokuapp.com/api/usuario/${this.$store.state.datos._id}`,
          {
            rol: this.rol,
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            password: this.password,
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

    subir(e) {
      this.img = e.target.files[0];
      console.log(this.img);
      let fd = new FormData();
      fd.append("archivo", this.img);
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(fd);
      axios
        .post(
          `https://angpelicula.herokuapp.com/api/usuario/uploadcloud/${this.$store.state.datos._id}`,
          fd,
          header
        )
        .then((response) => {
          console.log(response.data.url);
          this.sheet = !this.sheet;
        })
        .catch((error) => {
          console.log(error);
          this.alert = true;
          console.log(error);

          this.alertas = error.response.data;

          console.log("revisar", this.alerta);
          this.alerta = error.response.data.errors;
          console.log(error.response.data.errors[0].msg);
        });
    },
    info() {
      this.$router.push("/perfil");
    },
  },
  created() {
    this.traerpeliculas();
  },
};
</script>
<style>
#bordi1 {
  border: solid 3px #ba2121 !important;
}
#bordi2 {
  border: solid 1px #060404 !important;
}
#contenido {
  justify-content: center;
  background: white;

  text-justify: center;
  border: solid 3px #ba2121 !important;
}
</style>