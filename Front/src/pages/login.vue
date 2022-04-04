<template>
  <q-page class="flex flex-center">
    <div class="column flex-center content-center">
      <h3 style="font-size:30px;">Inicio de sesión</h3>
      <div class="col-12 col-md-auto q-my-md" style="background-color: #ff000040; border-radius: 15px;">
        <q-input
        class="q-ma-md q-pa-md"
        label="Nombre de usuario"
        v-model="storeItems.usuario"
        ></q-input>
        <q-input
        class="q-ma-md q-pa-md"
        label="Contraseña"
        v-model="storeItems.pass"
        ></q-input>
      </div>
      <div class="col-12 col-md-auto">
        <q-btn class="q-px-sm q-mx-sm" color="purple" label="Iniciar sesión" @click="globalValidate('guardar')"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { globalFunctions } from 'boot/mixins.js'

export default {
  name: 'PageLogin',
  data: function () {
    return {
      urlApi: '/login',
      storeItems: {
        usuraio: '',
        pass: ''
      }
    }
  },
  mixins: [globalFunctions],
  methods: {
  }
}
</script>
