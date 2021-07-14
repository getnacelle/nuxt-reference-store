<template>
  <div class="media-select-view columns is-multiline nacelle">
    <div class="media-viewer column is-12">
      <transition name="fade" mode="out-in">
        <template v-if="selectedMedia">
          <product-video
            v-if="selectedMedia.type === 'video'"
            :key="selectedMedia.src"
            :source="selectedMedia.src"
          />
          <nacelle-image
            v-else
            :key="selectedMedia.src"
            :src="selectedMedia.src"
            :width="featuredMediaWidth"
            :lazy="false"
          />
        </template>
      </transition>
    </div>
    <div class="media-select column is-12">
      <div class="columns is-mobile">
        <div v-for="item in media" :key="item.id" class="column is-one-fifth">
          <nacelle-image
            :src="item.thumbnailSrc"
            :width="150"
            :height="150"
            :lazy="false"
            class="media-item"
            @load="imgLoaded = true"
            @click.native="setSelected(item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Array,
      required: true
    },
    featuredMedia: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedMedia: this.featuredMedia
    }
  },
  computed: {
    featuredMediaWidth() {
      return this.selectedMedia?.width
    }
  },
  methods: {
    setSelected(item) {
      const mediaViewer = this.$el.querySelector('.media-viewer')
      mediaViewer.style.height = `${mediaViewer.offsetHeight}px`
      this.selectedMedia = item
    },
    afterEnter() {
      const mediaViewer = this.$el.querySelector('.media-viewer')
      mediaViewer.style.height = null
    }
  }
}
</script>

<style lang="scss" scoped>
.media-viewer {
  margin-bottom: 2rem;
}

.media-item {
  cursor: pointer;
}
</style>
