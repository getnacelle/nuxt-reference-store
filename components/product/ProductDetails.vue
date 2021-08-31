<template>
  <v-container v-if="product" class="product-details">
    <v-carousel>
      <v-carousel-item>Slide 1</v-carousel-item>
      <v-carousel-item>Slide 2</v-carousel-item>
      <v-carousel-item>Slide 3</v-carousel-item>
    </v-carousel>
    <div>Form Here</div>
  </v-container>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { VContainer, VCarousel, VCarouselItem } from 'vuetify/lib'
import useNacelleProducts from '~/composables/useNacelleProducts'

export default defineComponent({
  components: { VContainer, VCarousel, VCarouselItem },
  props: {
    handle: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const { nacelleProductsByHandles } = useNacelleProducts()
    const product = nacelleProductsByHandles([props.handle])[0]
    return { product }
  }
})
</script>

<style lang="scss" scoped>
.product-details {
  display: flex;
  gap: 40px;
}
</style>
