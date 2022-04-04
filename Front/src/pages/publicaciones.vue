<template>
  <q-page class="flex flex-start content-between">
    <div class="row q-ma-md q-pa-md" style="width:900px; background-color: #4CC6F740; border-radius: 15px;"
    v-if="localStorage.user === undefined">
      <div class="col-12">
        <div class="col-2">
          <q-input
          class="q-ma-sm q-pa-xs"
          label="Titulo"
          v-model="storeItems.titulo"
          ></q-input>
        </div>
        <div class="col-2">
          <q-input
          class="q-ma-sm q-pa-xs"
          label="Email"
          v-model="storeItems.email"
          ></q-input>
        </div>
        <div class="col-2">
          <q-input
          class="q-ma-sm q-pa-xs"
          label="Imagen url"
          v-model="storeItems.imagen"
          ></q-input>
        </div>
      </div>
      <div class="row justify-center " style="width:900px;">
        <div class="q-pa-md col-12" style="max-width: 800px">
          <q-input
            v-model="storeItems.text"
            filled
            type="textarea"
          />
        </div>
      </div>
      <div class="col-12 col-md-auto">
        <q-btn class="q-px-sm q-mx-sm" color="purple" label="Guardar publicación" @click="globalValidate('guardar', 1)"></q-btn>
      </div>
    </div>
    <div class="row q-ma-md q-pa-md" style="width:900px; background-color: #ff000040; border-radius: 15px;">
      <div class="col-12" style="height:60px">
        <div class="col-8">
          <p class="text-primary" style="font-size: 15px;"><b>{{datos.titulo}}</b></p>
        </div>
        <div class="col-4">
          <p class="text-primary"><b>{{datos.fecha}}</b></p>
        </div>
      </div>
      <div class="row justify-between" style="width:900px;">
        <div class="col-4" style="max-width: 200px">
          <img :src="datos.imagen">
        </div>
        <div class="q-pa-md col-8" style="max-width: 600px; max-height: 400px">
          <p>{{datos.text}}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { globalFunctions } from 'boot/mixins.js'

export default {
  name: 'PagePublicaciones',
  data: function () {
    return {
      urlApi: '',
      storeItems: {},
      datos: {
        imagen: '~assets/noImage.png',
        text: ''
      },
      mixins: [globalFunctions],
      localStorage: localStorage
    }
  },

}
</script>
