<template>
  <button class="main-nav-cart nacelle" @click="toggleCart">
    <slot name="icon">
      <svg
        aria-hidden="true"
        focusable="false"
        class="icon"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path
          fill="currentColor"
          d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
        />
      </svg>
    </slot>
    <span class="is-sr-only">Cart</span>
    <span v-if="quantityTotal > 0" class="cart-count">
      {{ quantityTotal }}
    </span>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['quantityTotal'])
  },
  methods: {
    ...mapMutations('cart', ['toggleCart'])
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 2em;
  height: 2em;
}

.main-nav-cart {
  position: relative;
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;
  text-align: right;
  color: #3b3b3b;
}

.main-nav-cart.nacelle:hover,
.main-nav-cart.nacelle:focus {
  opacity: 0.8;
}

.main-nav-cart.nacelle .cart-count {
  background-color: #3b3b3b;
  color: #fff;
  border: 2px solid #fff;
  font-weight: 600;
  width: 1.75em;
  height: 1.75em;
  -webkit-transform: translate3d(2px, -4px, 0);
  transform: translate3d(2px, -4px, 0);
}

.cart-count {
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
