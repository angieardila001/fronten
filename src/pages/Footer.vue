<template>
  
    <v-footer padless app>
      <v-col class="text-center red darken-1" cols="12">
        {{ new Date().getFullYear() }} — <strong>SENA</strong>
      </v-col>
    </v-footer>
 
  
</template>

<script>
export default {
  name: "pageFooter",
  data: () => ({}),
};
</script>