<template >
  <v-container fluid style="height: 92%" >
    <v-row>
      <v-col cols-lg="2" justify="center"> 
          <v-img
          src="./login1.png"
          aspect-ratio="1.7"
          :height="height"
          :width="width"
          contain
        ></v-img>
      </v-col>
      <v-col cols="5">
        <v-col
        contain
          id="cuadro"
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
          <br />
          <br />
          <br />
          <v-icon class="font-weight-black black--text">mdi-account</v-icon>
          <v-toolbar-title class="font-weight-black black--text">
            Iniciar Sesion
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="correo"
            :counter="20"
            :rules="correoRules"
            label="Correo"
            required
            background-color="grey lighten-3"
            class="font-weight-bold black--text"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            hint="Almenos 8 caracteres"
            counter
            @click:append="show1 = !show1"
            background-color="grey lighten-3"
            class="font-weight-bold black--text"
          ></v-text-field>

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
            {{ alertas.msg }}
          </v-alert>
          <v-btn
            block
            color="#4FC3F7"
            elevation="8"
            x-large
            x-small
            class="mr-4 justify-center white--text"
            @click="login()"
          >
            Guardar</v-btn
          >
          <br />

          <v-btn
            outlined
            color="#43A047"
            block
            elevation="5"
            x-large
            x-small
            class="mr-6"
            to="/registro"
          >
            Registro
          </v-btn>
          <br>
          <br>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "PageLogin",
  data() {
    return {
      height:700,
      width: 700,
      alert: false,
      alert1: false,
      alerta: [],
      alertas: [],
      valid: true,
      correo: "",
      correoRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
      ],

      select: null,
      checkbox: false,
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Es requerido.",
        min: (v) => v.length >= 8 || "Minimo 8 characteres",
      },
    };
  },

  methods: {
    login() {
      axios
        .post("https://angiepelicula.herokuapp.com/api/usuario/login1", {
          email: this.correo,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.$store.dispatch("setToken", res.data.token);
          this.$store.dispatch("setDatos", res.data.usuario);

          this.$router.push("/informacion");
        })
        .catch((err) => {
          if (err.response.data.msg === "Usuario / Password no son correctos") {
            this.alert1 = true;
            this.alertas = err.response.data;
          } else{
          this.alert = true;
          console.log(err);
          
          

          console.log("revisar", this.alerta);
          this.alerta = err.response.data.errors;
          console.log(err.response.data.errors[0].msg);
          }
          
        });
    },
  },
};
</script>
<style>
#imagen {
  width: 70%;
  height: 350px;
  border: solid 3px #000000 !important;
}
#fondo {
  background-image: url(https://img.freepik.com/vector-premium/cartel-neon-cine_110464-145.jpg?w=1000);
  border: solid 3px #000000 !important;

  max-height:"150";
  max-width:"250"
  /* filter: brightness(50%); */
}
#cuadro {
  background: white;
 
  justify-content: center;
  text-justify: center;
  border: solid 3px #ba2121 !important;
}
#borde {
  border: solid 3px #000000 !important;
}
</style>