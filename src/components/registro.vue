<template>
  <v-container fluid
  id="fondo2"
  
    lazy-validation
  >
    <v-row justify="center">
      <v-col cols="12" md="8"  class="pa-6"  >
        <div id="borde" contain
     
        
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
          ">
          <v-icon class="font-weight-black black--text">mdi-account</v-icon>
          <v-toolbar-title class="font-weight-black black--text">
            Registro
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
         <v-text-field
          v-model="rol"
          :counter="25"
          :rules="rolRules"
          background-color="grey lighten-2"
         class="font-weight-bold black--text"
          label="Rol"
          required
        ></v-text-field>
        <v-text-field
          v-model="nombre"
          :counter="25"
          :rules="nombreRules"
          label="Nombre"
          background-color="grey lighten-2"
         class="font-weight-bold black--text"
          required
        ></v-text-field>

        <v-text-field
          v-model="apellido"
          :counter="25"
          :rules="apellidoRules"
         background-color="grey lighten-2"
         class="font-weight-bold black--text"
          label="Apellido"
          required
        ></v-text-field>

     

        <v-text-field
          v-model="email"
          :rules="emailRules"
          background-color="grey lighten-2"
         class="font-weight-bold black--text"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
            v-model="contraseña"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            hint="Almenos 8 caracteres"
            counter
            background-color="grey lighten-2"
         class="font-weight-bold black--text"
            @click:append="show1 = !show1"
          ></v-text-field>

         <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="login()"
        >
          Guardar
        </v-btn>
      <v-btn  to="/login" icon>
        Atras
      </v-btn>
      </div>
     <v-bottom-sheet v-model="sheet">
      <v-sheet
       justify=center
        class="text-center"
        height="600px"
      >
        <div class="py-3">
         Registro exitoso, Felicitaciones ya puedes ver nuestras Fabulosas peliculas.
         Por favor ir a Iniciar Sesión
        </div>
        <v-btn
          to="/"
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >
        Iniciar Sesion
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
    name:"PageRegistro",
      data: () => ({
      sheet: false,
      alert: false,
      alert1: false,
      alerta: [],
      alertas: [],
      valid: true,
      rol: "",
      rolRules: [
        v => !!v || 'Rol es requerido',
        v => (v && v.length <= 40) || 'El rol tiene que ser maximo 40 caracteres',
      ],
      nombre: '',
      nombreRules: [
        v => !!v || 'Nombre es requerido',
        v => (v && v.length <= 40) || 'El nombre tiene que ser maximo 40 caracteres',
      ],
      apellido:'',
      apellidoRules: [
        v => !!v || 'Apellido es requerido',
        v => (v && v.length <= 40) || 'El Apellido tiene que ser maximo 20 caracteres',
      ],
      
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail debe ser valido',
      ],
      select: null,
      checkbox: false,
        show1: false,
        contraseña: '',
        rules: {
          required: value => !!value || 'Es requerido.',
          min: v => v.length >= 8 || 'Minimo 8 characteres',
        },
    }),

    methods: {
    login() {
 
      axios.post("https://angpelicula.herokuapp.com/api/usuario/post", {rol:this.rol,nombre:this.nombre,apellido:this.apellido,email:this.email, password:this.contraseña})
      .then(res=>{res
        //console.log(res);
        this.sheet = !this.sheet
      })
      .catch(err =>{
        this.alert = true;
        //console.log(err);
          this.alert1 = true;
          this.alertas = err.response.data;

          //console.log("revisar", this.alerta);
          this.alerta = err.response.data.errors;
          //console.log(err.response.data.errors[0].msg);
      })
    },
    
    },
  }
</script>
<style >
#borde{
   border: solid 3px #ba2121 !important;
}
#fondo2{
  background: rgb(214, 194, 194);
}
</style>