<template>
  <span>{{ formattedPrice }}</span>
</template>

<script>
export default {
  props: {
    price: {
      type: [String, Number],
      required: true
    },
    currencyCode: {
      type: String,
      required: true
    },
    locale: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedPrice: function () {
      return Intl.NumberFormat(this.locale, {
        style: 'currency',
        currency: this.currencyCode
      }).format(this.price);
    }
  }
}
</script>
