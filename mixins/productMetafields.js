export default {
  computed: {
    metafieldsObj() {
      if (this.product && this.product.metafields) {
        return this.product.metafields.reduce((obj, metafield) => {
          const { namespace, key, value } = metafield

          if (obj[namespace]) {
            obj[namespace][key] = value
          } else {
            obj[namespace] = {}
            obj[namespace][key] = value
          }

          return obj
        }, {})
      }

      return {}
    }
  },
  methods: {
    getMetafield(namespace, key) {
      const metafield = this.product.metafields.find(
        (field) => field.namespace === namespace && field.key === key
      )

      if (metafield) {
        return metafield.value
      }

      return undefined
    }
  }
}
