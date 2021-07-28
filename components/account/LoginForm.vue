<template>
  <form
    ref="form"
    method="post"
    accept-charset="UTF-8"
    novalidate="novalidate"
    @submit.prevent="submitForm"
  >
    <input type="hidden" name="form_type" value="customer_login" />
    <input type="hidden" name="utf8" value="✓" />
    <input type="hidden" name="return_url" value="/account" />
    <input
      v-model="form.email"
      type="text"
      name="customer[email]"
      placeholder="email"
    />
    <input
      v-model="form.password"
      type="password"
      name="customer[password]"
      placeholder="password"
    />
    <button class="button">Login</button>

    <ul v-if="userErrors.length">
      <li>Error:</li>
      <li v-for="(error, index) in userErrors" :key="index" class="error">
        {{ error.message }}
      </li>
    </ul>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('account', ['userErrors'])
  },
  methods: {
    ...mapActions('account', ['login']),
    submitForm() {
      const { email, password } = this.form

      this.login({ email, password }).then(() =>
        this.$router.replace('/account')
      )
    }
  }
}
</script>
