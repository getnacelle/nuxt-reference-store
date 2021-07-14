<template>
  <button class="button nacelle" @click="removeLineItem(lineId)">
    <slot>Remove</slot>
  </button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    lineId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions('cart', ['removeLineItem'])
  }
}
</script>

<style></style>
