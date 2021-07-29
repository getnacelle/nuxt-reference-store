<template>
  <div class="page page-recover">
    <section class="section section-header">
      <h1>Reset Your Password</h1>
    </section>

    <section class="section section-recover">
      <recover-form />

      <nuxt-link :to="`/account/login`" class="breadcrumb"> Login </nuxt-link>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RecoverForm from '~/components/account/RecoverForm'
export default {
  components: {
    RecoverForm
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
