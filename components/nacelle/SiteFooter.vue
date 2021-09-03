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
import { defineComponent, ref, computed } from '@vue/composition-api'
import { defaultLocales } from '../../tests/mocks/defaultObjects'
import useSpaceProvider from '~/composables/useSpaceProvider'

export default defineComponent({
  setup() {
    const { name, getLocalizedLinks } = useSpaceProvider()
    const aboutMenu = computed(() => getLocalizedLinks('about'))
    const shopMenu = computed(() => getLocalizedLinks('shop'))
    const accountMenu = computed(() => getLocalizedLinks('account'))
    const currentYear = computed(() => new Date().getFullYear())
    const localeList = ref(defaultLocales.locales)
    return {
      name,
      aboutMenu,
      shopMenu,
      accountMenu,
      currentYear,
      localeList
    }
  }
})
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
