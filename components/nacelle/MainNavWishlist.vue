<template>
  <nuxt-link :to="path">
    <button class="main-nav-wishlist nacelle">
      <slot name="icon">
        <svg
          class="icon"
          width="100%"
          height="100%"
          viewBox="0 0 512 469"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          xmlns:serif="http://www.serif.com/"
          style="
            fill-rule: evenodd;
            clip-rule: evenodd;
            stroke-linejoin: round;
            stroke-miterlimit: 2;
          "
        >
          <path
            d="M471.383,55.578c-26.504,-28.746 -62.871,-44.578 -102.41,-44.578c-29.555,0 -56.621,9.344 -80.45,27.77c-12.023,9.3 -22.918,20.679 -32.523,33.96c-9.602,-13.277 -20.5,-24.66 -32.527,-33.96c-23.825,-18.426 -50.891,-27.77 -80.446,-27.77c-39.539,0 -75.91,15.832 -102.414,44.578c-26.187,28.41 -40.613,67.223 -40.613,109.293c0,43.301 16.137,82.938 50.781,124.742c30.992,37.395 75.535,75.356 127.117,119.313c17.614,15.012 37.579,32.027 58.309,50.152c5.477,4.797 12.504,7.438 19.793,7.438c7.285,0 14.316,-2.641 19.785,-7.43c20.731,-18.129 40.707,-35.152 58.328,-50.172c51.574,-43.949 96.117,-81.906 127.11,-119.305c34.644,-41.8 50.777,-81.437 50.777,-124.742c0,-42.066 -14.426,-80.879 -40.617,-109.289Z"
            style="fill-rule: nonzero"
          />
        </svg>
      </slot>
      <span class="is-sr-only">Wishlist</span>
      <span v-if="quantityTotal > 0" class="wishlist-count">
        {{ quantityTotal }}
      </span>
    </button>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    path: {
      type: String,
      default: '/wishlist'
    }
  },
  computed: {
    ...mapGetters('wishlist', ['quantityTotal'])
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.main-nav-wishlist {
  position: relative;
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;
}
.icon {
  width: 2em;
  height: 2em;
}
.wishlist-count {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5em;
  height: 1.5em;
  line-height: 1.5;
  background-color: #ffffff;
  border: 1px solid currentColor;
  border-radius: 50%;
}
</style>
