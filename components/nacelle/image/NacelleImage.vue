<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
      intersection: { rootMargin }
    }"
    :class="[
      loading ? 'image-skeleton loading' : 'loaded',
      visibility ? 'is-visible' : 'not-visible',
      validImage ? 'is-valid' : 'not-valid',
      layout
    ]"
    class="nacelle-image"
  >
    <picture v-if="visibility">
      <template v-if="validImage">
        <template v-if="layout === 'responsive'">
          <source
            v-for="(responsiveSource, index) in responsiveSources"
            :key="index"
            v-bind="responsiveSource"
          />
        </template>
        <template v-else>
          <source
            :srcset="optimizeSource({ ...optimizeOptions, format: 'webp' })"
            type="image/webp"
          />
          <source
            :srcset="optimizeSource({ ...optimizeOptions, format: 'jpg' })"
            type="image/jpeg"
          />
        </template>
        <img
          v-bind="{ src, alt, width, height }"
          @load="onLoad"
          @error="fallback"
        />
      </template>
      <img
        v-else
        v-bind="{ src: blankImage, alt, width, height }"
        class="blank-image"
      />
    </picture>
  </div>
</template>

<script>
import { ObserveVisibility } from 'vue-observe-visibility'
import optimizeSource from './optimizeSource'
import delay from '~/utils/delay'

export default {
  directives: {
    ObserveVisibility
  },
  props: {
    src: {
      type: String,
      default:
        '//nacelle-assets.s3-us-west-2.amazonaws.com/default-product-image.svg'
    },
    mobileSrc: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    alt: {
      type: String,
      default: 'Featured Product Image'
    },
    cropDirection: {
      type: String,
      default: 'center'
    },
    layout: {
      type: String,
      default: 'fill',
      validator(val) {
        return ['fill', 'responsive', 'intrinsic'].includes(val)
      }
    },
    lazy: {
      type: Boolean,
      default: true
    },
    mobileCrop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      loading: true,
      validImage: true,
      rootMargin: '0px',
      blankImage:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 5'%3E%3C/svg%3E"
    }
  },
  computed: {
    visibility() {
      return this.lazy ? this.visible : true
    },
    optimizeOptions() {
      return {
        url: this.src,
        width: this.width,
        height: this.height
      }
    },
    responsiveSources() {
      if (!this.layout === 'responsive') {
        return []
      }
      const formats = [
        { format: 'webp', type: 'image/webp' },
        { format: 'pjpg', type: 'image/jpeg' }
      ]
      const breakpoints = [
        {
          media: '(max-width: 768px)',
          width: 768,
          crop: this.mobileCrop,
          src: this.mobileSrc || this.src
        },
        {
          media: '(min-width: 769px) and (max-width: 1023px)',
          width: 1023,
          crop: this.mobileCrop
        },
        {
          media: '(min-width: 1023px) and (max-width: 1215px)',
          width: 1215
        },
        {
          media: '(min-width: 1216px) and (max-width: 1407px)',
          width: 1407
        },
        {
          media: '(min-width: 1408px)',
          width: 1408
        }
      ]

      const sources = breakpoints.reduce((acc, { media, width, crop, src }) => {
        const breakpointFormat = formats.map(({ format, type }) => {
          return {
            media,
            type,
            srcset: optimizeSource({
              url: src || this.src,
              width,
              format,
              crop
            })
          }
        })
        return [...acc, ...breakpointFormat]
      }, [])

      return sources
    }
  },
  async mounted() {
    // NOTE: use a delay before setting the desired rootMargin.
    // This prevent images from getting loaded while page elements are still rendering.
    await delay(250)
    this.rootMargin = '500px'
  },
  methods: {
    optimizeSource,

    fallback() {
      this.validImage = false
    },
    onLoad() {
      this.loading = false
      this.$emit('load')
    },
    visibilityChanged(isVisible) {
      this.visible = isVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.nacelle-image {
  &.fill img,
  &.responsive img {
    width: 100%;
  }
}
.loaded img {
  animation: fadein 0.25s ease-in;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

$color-gray: #aaa;
$color-gray-light: #fff;
.image-skeleton {
  position: relative;
  background-color: rgba($color-gray, 0.25);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;

    background-image: linear-gradient(
      100deg,
      rgba($color-gray-light, 0) 9%,
      rgba($color-gray-light, 0.25) 50%,
      rgba($color-gray-light, 0) 91%
    );

    background-size: 67% 100%;
    background-position: -200% 0;
    background-repeat: no-repeat;
    animation: loading 1.4s infinite;
  }
}
@keyframes loading {
  to {
    background-position: 300% 0;
  }
}
.blank-image {
  background-color: rgba($color-gray, 0.25);
}
</style>
