<template>
  <q-page class="flex flex-center">
    <div class="column flex-center content-center">
      <h3 style="font-size:30px;">Registro de usuario</h3>
      <q-form  class="row col-12 q-col-gutter-md flex-center content-center" autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
        <div class="row justify-center q-ma-md" style="background-color: #ff000040; border-radius: 15px;">
          
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
          
            <q-input
            class="q-ma-md q-pa-md"
            label="Confirmar Contraseña"
            v-model="storeItems.password_confirmation"
            ></q-input>
          
            <q-input
            class="q-ma-md q-pa-md"
            label="Edad"
            v-model="storeItems.edad"
            type="number"
            ></q-input>
          
            <q-input
            class="q-ma-md q-pa-md"
            label="Rol"
            v-model="storeItems.rol"
            ></q-input>
        </div>
        <div class="col-12 col-md-auto">
          <q-btn class="q-px-sm q-mx-sm" color="purple" label="Registrar" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { globalFunctions } from 'boot/mixins.js'

export default {
  name: 'PageRegistro',
  data: function () {
    return {
      urlApi: 'api/auth/register',
      storeItems: {
      },
      usuario: '',
      pass: '',
      nombre: '',
      edad: '',
      rol: '',
      error: '',
      errors: {},
      has_error: false,
      success: false
    }
  },
  methods: {
    register () {
          var app = this
          this.$auth.register({
            data: {
              name: app.storeItems.usuario,
              email: app.storeItems.usuario + '@blog.com',
              password: app.storeItems.pass,
              password_confirmation: app.storeItems.password_confirmation,
              role: app.storeItems.rol,
              edad: app.storeItems.edad
            },
            success: function () {
              app.success = true
              app.storeItems.usuario = ''
              app.storeItems.email = ''
              app.storeItems.rol = null
              app.storeItems.pass = ''
              app.storeItems.password_confirmation = ''
              console.log('usuario creado')
            },
            error: function (res) {
              console.log(res.response.data.errors)
              app.has_error = true
              app.error = res.response.data.error
              app.errors = res.response.data.errors || {}
            }
          })
        }
  },
  mixins: [globalFunctions]
}
</script>
