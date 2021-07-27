<template>
  <div class="page page-activate">
    <section class="section section-header">
      <h1>Activate Account</h1>
    </section>

    <section class="section section-activate">
      <form
        ref="form"
        method="post"
        accept-charset="UTF-8"
        novalidate="novalidate"
        @submit.prevent="submitForm"
      >
        <input
          type="hidden"
          name="form_type"
          value="activate_customer_password"
        />
        <input type="hidden" name="utf8" value="✓" />
        <input type="hidden" name="return_url" value="/account" />
        <input v-model="form.activateToken" type="hidden" name="token" />
        <input v-model="form.customerId" type="hidden" name="id" />
        <input
          v-model="form.password"
          type="password"
          name="customer[password]"
          placeholder="password"
        />
        <button class="button">Activate Account</button>

        <ul v-if="userErrors.length">
          <li>Error:</li>
          <li v-for="(error, index) in userErrors" :key="index" class="error">
            {{ error.message }}
          </li>
        </ul>
      </form>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      form: {
        password: '',
        activateToken: '',
        customerId: ''
      }
    }
  },
  head: {
    script: [{ src: '/email-referrer-head-check.js' }]
  },
  mounted() {
    // TODO Guard Route if activateToken and customerId are not available
    this.form.activateToken = this.$route.query.token
    this.form.customerId = this.$route.query.id
  },
  computed: {
    ...mapState('account', ['customerAccessToken', 'userErrors'])
  },
  methods: {
    ...mapActions('account', ['activate']),
    async submitForm() {
      const { password, activateToken, customerId } = this.form
      await this.activate({ password, activateToken, customerId })
      // TODO: handle success
      this.$router.push('/account/login')
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
