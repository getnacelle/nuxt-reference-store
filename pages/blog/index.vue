<template>
  <div class="page">
    <page-content :page="page" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      page: null,
      blog: null
    }
  },
  async fetch() {
    const { name: handle } = this.$route
    this.page = await this.$nacelle.data
      .page({ handle })
      .catch(() => console.warn(`No page with handle: '${handle}' found`))
    this.blog = await this.$nacelle.data
      .blog({ handle })
      .catch(() => console.warn(`No blog with handle: '${handle}' found`))
  },
  mounted() {
    this.blogView({ blog: this.blog })
  },
  methods: {
    ...mapActions('events', ['blogView'])
  }
}
</script>
