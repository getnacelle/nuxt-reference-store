<template>
  <div>
    <table v-if="orders && orders.length">
      <thead>
        <tr>
          <th scope="col" width="100">Order</th>
          <th scope="col" width="300">Date</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <th data-label="Order" scope="row">
            <a
              :href="orderStatusUrl(order.order_status_url)"
              class="button"
              :aria-label="`Order number ${order.name}`"
              >{{ order.name }}</a
            >
          </th>
          <td data-label="Date">
            <time :datetime="order.processed_at">{{ order.processed_at }}</time>
          </td>
          <td data-label="Total">
            {{ order.total_price }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else-if="fetchingOrders">Fetching orders...</div>
    <div v-else>
      <h5>You haven't placed any orders yet.</h5>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('account', ['orders', 'fetchingOrders'])
  },
  methods: {
    orderStatusUrl(url) {
      const domain = this.$store.state.space.domain
      const urlArray = url.split('//').pop().split('/')
      urlArray.shift()
      return `${domain}${urlArray.join('/')}`
    }
  }
}
</script>
