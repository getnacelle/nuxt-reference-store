<template>
  <div class="page page-account">
    <section class="section section-header">
      <h1>
        Account
        <span class="logout-link">
          <a @click="logout">logout</a>
        </span>
      </h1>
      <ul v-if="userErrors.length">
        <li>Error:</li>
        <li v-for="(error, index) in userErrors" :key="index" class="error">
          {{ error.message }}
        </li>
      </ul>
    </section>

    <section class="section section-orders">
      <h2>Order History</h2>
      <orders />
    </section>

    <section class="section section-account">
      <h2>Account Details</h2>

      <div v-if="defaultAddress">
        <ul>
          <li>{{ defaultAddress.name }}</li>
          <li v-for="(item, index) in defaultAddress.formatted" :key="index">
            {{ item }}
          </li>
        </ul>

        <nuxt-link class="button" to="/account/addresses"
          >Addresses ({{ addresses.length }})</nuxt-link
        >
      </div>
      <div v-else>
        <nuxt-link class="button" to="/account/addresses"
          >Add An Address</nuxt-link
        >
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Orders from '~/components/account/Orders'
export default {
  components: {
    Orders
  },
  middleware: 'authenticated',
  data() {
    return {}
  },
  head: {
    script: [{ src: '/account-head.js' }]
  },
  watch: {
    customerAccessToken(val) {
      if (val === null) {
        this.$router.push('/')
      }
    }
  },
  mounted() {
    if (this.customerAccessToken) {
      this.$store.dispatch('account/fetchCustomer')
      this.$store.dispatch('account/fetchOrders')
      this.$store.dispatch('account/fetchDefaultAddress')
      this.$store.dispatch('account/fetchAddresses')
    }
  },
  computed: {
    ...mapState('account', [
      'customerAccessToken',
      'userErrors',
      'orders',
      'defaultAddress',
      'addresses'
    ]),
    action() {
      // Not being used.
      return `https://${this.$nacelle.myshopifyDomain}/account/logout`
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('account/logout')
      // TODO: logout on shopify utilizing action
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
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
