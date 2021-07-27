<template>
  <div class="page page-login">
    <section class="section section-header">
      <h1>Login</h1>
    </section>

    <section class="section section-login">
      <login-form />
      <!-- Social Login -->
      <nuxt-link :to="`/account/recover`" class="breadcrumb">
        Forgot your password?
      </nuxt-link>
      <nuxt-link :to="`/account/register`" class="breadcrumb">
        Create Account
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import NacellePassport from '~/components/account/NacellePassport'
import LoginForm from '~/components/account/LoginForm'
export default {
  components: {
    // NacellePassport,
    LoginForm
  },
  middleware: 'notAuthenticated',
  data() {
    return {}
  },
  async mounted() {},
  computed: {
    ...mapState('account', ['customerAccessToken', 'userErrors'])
  },
  methods: {}
}
</script>

<style scoped></style>
