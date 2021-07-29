<template>
  <div class="page page-register">
    <section class="section section-header">
      <h1>Register</h1>
    </section>

    <section class="section section-register">
      <register-form />

      <nuxt-link :to="`/account/recover`" class="breadcrumb">
        Forgot your password?
      </nuxt-link>
      <nuxt-link :to="`/account/login`" class="breadcrumb"> Login </nuxt-link>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RegisterForm from '~/components/account/RegisterForm'
export default {
  components: {
    RegisterForm
  },
  middleware: 'notAuthenticated',
  data() {
    return {}
  },
  computed: {
    ...mapState('account', ['customerAccessToken', 'userErrors'])
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
