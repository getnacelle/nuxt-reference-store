<template>
  <div class="global-header" :class="{ 'is-sticky': isSticky }">
    <!-- Main Nav -->
    <div class="main-nav" role="navigation" aria-label="main navigation">
      <div class="main-nav-left">
        <main-nav-burger />
      </div>

      <div class="main-nav-brand">
        <nuxt-link to="/">
          <strong>{{ name }}</strong>
        </nuxt-link>
      </div>

      <div class="main-nav-right">
        <div class="main-nav-menu">
          <nuxt-link
            v-for="(link, index) in mainMenu"
            :key="index"
            :to="link.to"
            exact-active-class="is-active"
            class="main-nav-item"
            @click.native="disableMenu"
          >
            {{ link.title }}
          </nuxt-link>
        </div>
        <div>
          <search-box
            v-bind="{ searchQuery: globalQuery }"
            class="is-hidden-mobile"
          />
          <search-autocomplete />
        </div>
        <main-nav-wishlist path="/wishlist">
          <template #icon>
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
          </template>
        </main-nav-wishlist>
        <main-nav-cart />
      </div>
    </div>

    <!-- Mobile Nav -->
    <transition name="slide">
      <div v-if="menuVisible" class="nav-flyout">
        <div class="nav-flyout-header">
          <router-link class="navbar-item" to="/">
            <strong>{{ name }}</strong>
          </router-link>
          <button class="nav-flyout-close" @click="toggleShowMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              class="icon"
              role="img"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
              />
            </svg>
            <span class="is-sr-only">Close</span>
          </button>
        </div>
        <div class="nav-flyout-body">
          <slot name="flyout-menu">
            <search-box
              v-bind="{ searchQuery: globalQuery }"
              class="is-hidden-tablet"
            />
            <nuxt-link
              v-for="(link, index) in mobileMenu"
              :key="index"
              :to="link.to"
              active-class="is-active"
              class="main-nav-item"
              @click.native="disableMenu"
            >
              {{ link.title }}
            </nuxt-link>
          </slot>
        </div>
      </div>
    </transition>

    <!-- Cart Flyout -->
    <cart />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    isSticky: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState('space', ['id', 'name', 'linklists']),
    ...mapState('menu', ['menuVisible']),
    ...mapState('search', ['globalQuery']),
    ...mapGetters('space', ['getLocalizedLinks']),
    mainMenu() {
      return this.getLocalizedLinks('main-menu')
    },
    mobileMenu() {
      return this.getLocalizedLinks('mobile-menu')
    }
  },
  methods: {
    ...mapMutations('menu', ['disableMenu', 'toggleShowMenu'])
  }
}
</script>

<style lang="scss" scoped>
div.global-header {
  display: contents;
}
</style>
