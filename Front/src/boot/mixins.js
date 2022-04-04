const axios = require('axios')

export const globalFunctions = {
  methods: {
    globalValidate (text, id = null, noValidate = 0) {
      this.$q.dialog({
        message: '¿ Quieres ' + text + ' este item ? ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (text === 'guardar') {
          this.guardarItem(noValidate)
        } else if (text === 'eliminar') {
          this.eliminiarItem(id)
        } else if (text === 'editar') {
          this.editarItem(id)
        }
      }).onCancel(() => {
        this.$q.notify('Cancelado...')
      }).onDismiss(() => {
      })
    },
    async globalGetItemInfo () {
      try {
        let data = await axios.get(this.$store.state.blogStore.url + this.urlApi)
        this.datos = data
      } catch (error) {

      } finally {}
    },
    async guardarItem (noValidate) {
      // this.$q.loading.show()
      let app = this
      let itemNull = 0
      for (const prop in app.storeItems) {
        if (typeof app.storeItems[prop] === null)  {
          // this.$q.notify({color: 'negative', message: 'El campo ' + prop + ' debe tener algún valor.'})
          itemNull = 1
        }
      }
      if (itemNull !== 1) {
        // this.$q.notify({color: 'warning', message: 'Guardando item.....'})
        let data = await axios.post(this.$store.state.blogStore.url + this.urlApi, this.storeItems)
        if (data.data === 1) {
          if (noValidate === 0) {
            // this.$q.notify({ color: 'positive', message: 'Registro satisfactorio'})
          } else if (noValidate === 1) {
            // this.$q.notify({ color: 'positive', message: 'Publicación guardada' })
          }
        } else if (data.data !== 1) {
          if (noValidate === 0) {
            // this.$q.notify({ color: 'negative', message: 'Error no se pudo registrar' })
          } else if (noVAlidate === 1) {
            // this.$q.notify({ color: 'negative', message: 'No se pudo guardar' })
          }
        }
      }
    },
    eliminiarItem () {

    },
    editarItem () {

    }
  }
}

