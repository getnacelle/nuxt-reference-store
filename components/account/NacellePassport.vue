<template>
  <div>
    <a :href="facebook.url" class="button">{{ facebook.text }}</a>
    <br />
    <a :href="google.url" class="button">{{ google.text }}</a>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      facebook: {
        url: '/',
        text: 'Login with Facebook'
      },
      google: {
        url: '/',
        text: 'Login with Google'
      }
    }
  },
  created() {
    this.endpoint =
      process.env.NODE_ENV === `development` ? `/.netlify/functions` : `/api`
  },
  async mounted() {
    this.facebook.url = this.authUrl('facebook')
    this.google.url = this.authUrl('google')
    const ncl = await this.$cookies.get('ncl')
    if (ncl) {
      try {
        // eslint-disable-next-line no-unused-vars
        const { email, jwt, strategy, accessToken, expiresAt } = ncl
        await axios.get(`${this.endpoint}/auth/status`, {
          withCredentials: true
        })
        this[strategy].text = this[strategy].text.replace('Login', 'Logged')
        this[strategy].url = '#'
        if (accessToken) {
          await this.$store.dispatch(
            'account/renewCustomerAccessToken',
            accessToken
          )
          this.$router.push('/account')
        }
      } catch (error) {
        console.error('error', error)
        this.$cookies.remove('ncl_email')
        this.$cookies.remove('ncl_strategy')
      }
    }
  },
  methods: {
    authUrl(strategy) {
      if (process.browser) {
        return `${this.endpoint}/auth/${strategy}?returnTo=${encodeURIComponent(
          window.location.href
        )}`
      } else {
        return '/'
      }
    }
  }
}
</script>
