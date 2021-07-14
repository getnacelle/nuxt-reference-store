<template>
  <div class="site-footer">
    <div class="container">
      <div class="column is-6 is-offset-3 logo has-text-centered">
        <nuxt-link to="/">
          <strong>{{ name }}</strong>
        </nuxt-link>

        <locale-selector :locale-list="localeList" />
      </div>
      <div class="column is-12 has-text-centered">© {{ currentYear }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { defaultLocales } from '../../tests/mocks/defaultObjects'

export default {
  data() {
    return {
      localeList: defaultLocales.locales
    }
  },
  computed: {
    ...mapState('space', ['id', 'name', 'linklists']),
    ...mapGetters('space', ['getLocalizedLinks']),

    aboutMenu() {
      return this.getLocalizedLinks('about')
    },
    shopMenu() {
      return this.getLocalizedLinks('shop')
    },
    accountMenu() {
      return this.getLocalizedLinks('account')
    },
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.site-footer {
  padding-top: 2rem;
}

.logo {
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    align-content: center;
  }
}

img {
  max-width: 50%;
  align-self: center;
}

.title {
  margin-bottom: 0.5em;
}

a {
  color: #3b3b3b;
  letter-spacing: 0.016875rem;
}
</style>
