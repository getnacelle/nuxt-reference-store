<template>
  <select v-model="locale">
    <option v-for="(lcl, index) in localeList" :key="index" :value="lcl">
      {{ lcl.flag }} - {{ lcl.currency }} - {{ lcl.displayLanguage }}
    </option>
  </select>
</template>

<script>
import { mapMutations } from 'vuex'
const defaultLocale = {
  country: 'US',
  currency: 'USD',
  displayCountry: 'United States of America',
  displayCountryLocalized: 'United States',
  displayLanguage: 'English',
  flag: '🇺🇸',
  language: 'en',
  locale: 'en-US',
  symbol: '$'
}

export default {
  props: {
    localeList: {
      type: Array,
      default() {
        return [defaultLocale]
      }
    }
  },
  data() {
    return {
      locale: defaultLocale
    }
  },
  watch: {
    locale(value, previousValue) {
      if (previousValue.locale !== value.locale) {
        this.setLocale(value)
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setLocale'])
  }
}
</script>

<style lang="scss" scoped>
select {
  margin: 5px;
  padding: 2.5px;
}
</style>
