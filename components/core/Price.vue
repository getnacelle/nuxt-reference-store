<template>
  <span>{{ formattedPrice }}</span>
</template>

<script>
export default {
  props: {
    price: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedPrice: function () {
      return Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
      }).format(this.price);
    }
  }
}
</script>
