<template>
  <form
    ref="form"
    method="post"
    accept-charset="UTF-8"
    novalidate="novalidate"
    @submit.prevent="submitForm"
  >
    <input type="hidden" name="form_type" value="recover_customer_password" />
    <input type="hidden" name="utf8" value="✓" />
    <input type="hidden" name="return_url" value="/account" />
    <input
      v-model="form.email"
      type="text"
      name="customer[email]"
      placeholder="email"
      autocomplete="email"
    />
    <button class="button">Recover</button>

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
        email: ''
      }
    }
  },
  computed: {
    ...mapState('account', ['userErrors'])
  },
  methods: {
    ...mapActions('account', ['recover']),
    async submitForm() {
      const { email } = this.form
      await this.recover({ email })
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
