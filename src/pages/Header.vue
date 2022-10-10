<template>
  <div>
    <v-app-bar color="#B71C1C">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = true"
        
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text mb-2">Peliculas</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn icon v-if="$store.state.token!=''" to="/favoritos" >
        <v-icon class="white--text">mdi-heart</v-icon>
      </v-btn>

      <v-btn class="white--text" v-if="$store.state.token!=''"  to="/helo" icon> Inicio </v-btn>
    <br>
    
      <div class="my-6" >
        <v-btn  v-if="$store.state.token!=''" class="white--text" @click="salir()" color="#B71C1C"  >
          <v-icon color="white" >mdi-logout</v-icon>SALIR
        </v-btn>
      </div>
      
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
        <v-list-item v-if="$store.state.token!=''"  to="/perfil">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cuenta</v-list-item-title>
          </v-list-item>
          <v-list-item to="/helo">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Categorias</v-list-item-title>
          </v-list-item>

          <v-list-item to="/" v-if="$store.state.token==''">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Iniciar Sesión</v-list-item-title>
          </v-list-item>
          <v-list-item to="/favoritos">
            <v-list-item-icon>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Favoritos</v-list-item-title>
          </v-list-item>

          <v-list-item to="/informacion">
            <v-list-item-icon>
              <v-icon> mdi-dialpad</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Listar Peliculas</v-list-item-title>
          </v-list-item>
           <v-list-item to="/listarA">
            <v-list-item-icon>
              <v-icon> mdi-dialpad</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Listar Actores</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-list-group v-if="$store.state.datos.rol==='admi'" :value="true" prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>Añadir</v-list-item-title>
          </template>
          <v-list-item link to="/nuevaPe">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Añadir Peliculas</v-list-item-title>
            
          </v-list-item >
          <v-list-item link to="/agregaractor">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Añadir Actor</v-list-item-title>

            
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "PageHeader",
  data() {
    return {
    drawer: false,
    group: null,
    token: this.$store.state.token,
  }},
  methods: {
    salir(){
      this.$store.state.token="";
      this.$router.push("/");
    }
  }
};
</script>
<style>
#bo{
  width: 130%;
  height: 130%;
}
</style>

