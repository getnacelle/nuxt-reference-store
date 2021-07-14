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
