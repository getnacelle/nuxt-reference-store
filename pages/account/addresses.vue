<template>
  <div class="page page-addresses">
    <section class="section section-header">
      <h1>
        Addresses
        <span class="logout-link"
          ><nuxt-link to="/account">Return to Account Details</nuxt-link></span
        >
      </h1>
      <ul v-if="userErrors.length">
        <li>Error:</li>
        <li v-for="(error, index) in userErrors" :key="index" class="error">
          {{ error.message }}
        </li>
      </ul>

      <button class="button" @click.prevent="toggleEdit">
        {{ isEditing ? 'Cancel' : 'Add A New Address' }}
      </button>
      <div v-if="isEditing" class="create-form">
        <address-form action="create" />
      </div>
    </section>

    <section v-if="addresses.length" class="section section-addresses">
      <ul v-if="addresses.length">
        <address-item
          v-for="(address, index) in addresses"
          :key="index"
          :address="address"
          :show-delete="addresses.length > 1"
          :is-default-address="isDefault(address.id, defaultAddress.id)"
        />
      </ul>
      <div v-else><h5>You don't have any addresses yet.</h5></div>
    </section>

    <section class="section section-account"></section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddressItem from '~/components/account/AddressItem'
import AddressForm from '~/components/account/AddressForm'
export default {
  components: {
    AddressItem,
    AddressForm
  },
  middleware: 'authenticated',
  data() {
    return {
      isEditing: false
    }
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
      this.$store.dispatch('account/fetchDefaultAddress')
      this.$store.dispatch('account/fetchAddresses')
    }
  },
  computed: {
    ...mapState('account', [
      'customerAccessToken',
      'userErrors',
      'defaultAddress',
      'addresses'
    ])
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing
    },
    decodeBase64AddressId(encodedId) {
      const decodedId = Buffer.from(encodedId, 'base64').toString('ascii')
      return decodedId.split('gid://shopify/MailingAddress/')[1].split('?')[0]
    },
    isDefault(id, defaultId) {
      return (
        this.decodeBase64AddressId(id) === this.decodeBase64AddressId(defaultId)
      )
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
