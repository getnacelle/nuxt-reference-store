<template>
  <div class="interface-icon nacelle">
    <router-link v-if="path" :to="path">
      <img class="icon" :src="iconSrc" />
    </router-link>
    <img v-else class="icon" :src="iconSrc" @click="handleIconMethod" />
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconMethod: {
      type: String,
      default: ''
    },
    iconMethodType: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    customIcon: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconSrc() {
      switch (this.iconName) {
        case 'cart':
          return 'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-cart-icon.svg'
        case 'account':
          return 'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-account-icon.svg'
        default:
          return ''
      }
    }
  },
  methods: {
    handleIconMethod() {
      if (this.iconMethod) {
        if (this.iconMethodType === 'mutation') {
          this.$store.commit(this.iconMethod)
        } else if (this.iconMethodType === 'action') {
          this.$store.commit(this.iconMethod)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  height: 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
}
</style>
