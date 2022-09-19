<template>
  <v-app>
    <v-main>
      <Header/>
      <Footer/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./pages/Header.vue";

import Footer from "./pages/Footer.vue";
export default {
  name: "App",

  components: {
    Header,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
