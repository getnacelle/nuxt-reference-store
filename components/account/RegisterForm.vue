<template>
  <form
    ref="form"
    method="post"
    accept-charset="UTF-8"
    novalidate="novalidate"
    @submit.prevent="submitForm"
  >
    <input type="hidden" name="form_type" value="create_customer" />
    <input type="hidden" name="utf8" value="✓" />
    <input type="hidden" name="return_url" value="/account" />
    <input
      v-model="form.firstName"
      type="text"
      name="customer[first_name]"
      placeholder="First Name"
      autocomplete="given-name"
    />
    <input
      v-model="form.lastName"
      type="text"
      name="customer[last_name]"
      placeholder="Last Name"
      autocomplete="family-name"
    />
    <input
      v-model="form.email"
      type="text"
      name="customer[email]"
      placeholder="email"
      autocomplete="email"
    />
    <input
      v-model="form.password"
      type="password"
      name="customer[password]"
      placeholder="password"
    />
    <button class="button">Create</button>

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
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('account', ['customerAccessToken', 'userErrors'])
  },
  methods: {
    ...mapActions('account', ['register']),
    async submitForm() {
      const { firstName, lastName, email, password } = this.form
      await this.register({ firstName, lastName, email, password })

      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.hidden-label {
  height: 0;
  width: 0;
  opacity: 0;
  display: inline-block;
}
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
th,
td {
  text-align: left;
  border: 1px solid #e8e9eb;
  padding: 10px 14px;
}
.logout-link {
  margin: 0 10px;
  font-size: 9px;
}
.error {
  color: #8f1212;
}
</style>
