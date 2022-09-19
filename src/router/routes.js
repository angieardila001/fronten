
import helo from "../components/HelloWorld.vue"
import login from "../components/login.vue"
import registro from "../components/registro.vue"
import informacion from "../components/informacion.vue"
import pelicula from "../components/detallePe.vue"
import listarA from "../components/listarActor.vue"
import nuevaPe from "../components/nuevaPe.vue"
import agregar from "../components/Agregar.vue"
import detalleActor from "../components/detalleActor.vue"
import editarPelicula from "../components/editarPelicula.vue"
import perfil from "../components/perfilusu.vue"
import favoritos from "../components/favoritos.vue"
export const routes= [
  {path: "/",component: login} ,
  {path: "/helo",component: helo},
  {path: "/registro",component: registro},
  {path: "/informacion",component: informacion},
  {path: "/pelicula",component: pelicula},
  {path: "/listarA",component: listarA},
  {path: "/nuevaPe",component: nuevaPe},
  {path: "/agregaractor",component:agregar},
  {path: "/detalleActor",component:detalleActor},
  {path: "/editarPelicula",component:editarPelicula},
  {path: "/perfil",component:perfil},
  {path: "/favoritos",component:favoritos},
]
