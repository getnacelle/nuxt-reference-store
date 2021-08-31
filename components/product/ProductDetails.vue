<template>
  <div v-if="product">
    <v-carousel>
      <v-carousel-item>Slide 1</v-carousel-item>
      <v-carousel-item>Slide 2</v-carousel-item>
      <v-carousel-item>Slide 3</v-carousel-item>
    </v-carousel>
    <div>Form Here</div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { VCarousel, VCarouselItem } from 'vuetify/lib'
import useNacelleProducts from '~/composables/useNacelleProducts'

export default defineComponent({
  components: { VCarousel, VCarouselItem },
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
