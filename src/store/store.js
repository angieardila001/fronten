import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);

export const store =new Vuex.Store({

    state:{
        token:"",
        datos:{},
        pelicula:{},
        actor:{},
        reparto:[],
        detalleActor:{},
        favoritos:{},
        todos:""

    },

    mutations:{
        setToken(state,value){
            state.token=value
        },
        setDatos(state,value){
            state.datos=value
        },
        setPelicula(state,value){
            state.pelicula=value
        },
        setActor(state,value){
            state.actor=value
        },
        setReparto(state,value){
            state.reparto.push(value)
        },
        setDetalleActor(state,value){
            state.detalleActor=value
        },
        setFavoritos(state,value){
            state.favoritos=value
        },
        setTodos(state,value){
            state.todos=value
        },
    },

    actions:{
        setToken(context,value){
            context.commit("setToken",value)
        },
        setDatos(context,value){
            context.commit("setDatos",value)
        },
        setPelicula(context,value){
            context.commit("setPelicula",value)
        },
        setActor(context,value){
            context.commit("setActor",value)
        },
        setReparto(context,value){
            context.commit("setReparto",value)
        },
        setDetalleActor(context,value){
            context.commit("setDetalleActor",value)
        },
        setFavoritos(context,value){
            context.commit("setFavoritos",value)
        },
        setTodos(context,value){
            context.commit("setTodos",value)
        },
    }

})