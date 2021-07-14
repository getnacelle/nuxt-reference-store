<template>
  <div class="main-nav nacelle" role="navigation" aria-label="main navigation">
    <div class="main-nav-left">
      <main-nav-burger />
    </div>

    <div class="main-nav-brand">
      <slot name="brand">
        <router-link to="/">
          <img :src="logoSrc" :width="logoWidth" :alt="logoAlt" />
        </router-link>
      </slot>
    </div>

    <div class="main-nav-right">
      <div class="main-nav-menu">
        <slot name="menu">
          <!-- menu items -->
        </slot>
      </div>
      <main-nav-cart />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    logoSrc: {
      type: String,
      default:
        'https://nacelle-assets.s3-us-west-2.amazonaws.com/nacelle-logo-dark.png'
    },
    logoWidth: {
      type: Number,
      default: 112
    },
    logoAlt: {
      type: String,
      default: ''
    },
    menu: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped></style>
