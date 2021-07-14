<template>
  <div class="article-body">
    <div ref="content" class="content" />
    <pre>{{ JSON.stringify(article, null, 2) }}</pre>

    <product-shop-look
      v-for="(shopImage, index) in shopImages"
      :key="index"
      :image-src="shopImage.src"
      :products="shopImage.products"
      :button-text="shopLookButtonText"
      @ready="(node) => moveImage(shopImage.node, node)"
    >
      <template #product-card="{ product }">
        <slot name="product-card" :product="product" />
      </template>
    </product-shop-look>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      }
    },
    products: {
      type: Array,
      default: () => {
        return []
      }
    },
    shopLookButtonText: {
      type: String,
      default: 'Shop the look'
    }
  },
  data() {
    return {
      shopImages: []
    }
  },
  computed: {
    hasProducts() {
      return this.products && this.products.length > 0
    }
  },
  watch: {
    products(_newVal, _oldVal) {
      this.$nextTick(() => {
        this.updateImages()
      })
    }
  },
  methods: {
    updateImages() {
      this.shopImages = []
      const images = [...this.$el.querySelectorAll('.article-body img')]

      images.forEach((image) => {
        const handles = image.alt.split(',')
        const products = this.products.filter(({ handle }) =>
          handles.includes(handle)
        )

        if (products.length > 0) {
          this.shopImages.push({
            node: image,
            src: image.src,
            products
          })
        }
      })
    },
    moveImage(imageNode, shopLookNode) {
      imageNode.parentNode.insertBefore(shopLookNode, imageNode)
      imageNode.style.display = 'none'
    }
  }
}
</script>

<style></style>
