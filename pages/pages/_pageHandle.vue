<template>
  <div class="page">
    <page-content v-if="!$fetchState.pending" :page="page" />
    <nacelle-page-placeholder
      v-if="this.$fetchState.pending === false && page === null"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    const { pageHandle: handle } = this.$route.params
    this.page = await this.$nacelle.data.page({ handle }).catch(() => {
      console.warn(`No page with handle: '${handle}' found`)
      return null
    })
  }
}
</script>
