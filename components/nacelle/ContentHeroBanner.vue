<template>
  <section :class="bannerClasses">
    <slot
      name="background"
      v-bind="{ mobileBackgroundImgUrl, imageUrl, backgroundAltTag }"
    >
      <nacelle-image
        :src="imageUrl"
        :mobile-src="mobileSrc"
        :alt="backgroundAltTag"
        layout="responsive"
        class="hero-background"
      />
    </slot>
    <div class="hero-body">
      <div class="container">
        <div class="hero-body-inner">
          <slot name="body" v-bind="{ textColor, title, subtitle }">
            <h1 class="title">
              {{ title }}
            </h1>
            <h3
              :style="textColor ? `color: ${textColor}` : ''"
              class="subtitle"
            >
              {{ subtitle }}
            </h3>
          </slot>
          <slot name="cta" v-bind="{ ctaUrl, ctaText, ctaHandler }">
            <p v-if="ctaText.length > 0">
              <cta-button :to="ctaUrl" @clicked="ctaHandler">{{
                ctaText
              }}</cta-button>
            </p>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    featuredMedia: {
      type: Object,
      default: () => ({})
    },
    alignment: {
      type: String,
      default: 'center'
    },
    size: {
      type: String,
      default: 'medium'
    },
    mobileFullHeight: {
      type: Boolean,
      default: false
    },
    mobileCrop: {
      type: Boolean,
      default: true
    },
    mobileBackgroundImgUrl: {
      type: String,
      default: ''
    },
    backgroundAltTag: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    ctaText: {
      type: String,
      default: ''
    },
    ctaUrl: {
      type: String,
      default: ''
    },
    ctaHandler: {
      type: Function,
      default: () => {}
    },
    textColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    bannerClasses() {
      return [
        'hero',
        'nacelle',
        { [`is-medium`]: this.size === 'medium' },
        { [`is-large`]: this.size === 'large' },
        { [`is-fullheight`]: this.size === 'fullheight' },
        { [`is-align-center`]: this.alignment === 'center' },
        { [`is-align-right`]: this.alignment === 'right' },
        { [`is-mobile-fullheight`]: this.mobileFullHeight }
      ]
    },
    imageUrl() {
      return this.featuredMedia?.fields?.file?.url
    },
    mobileSrc() {
      return this.mobileBackgroundImgUrl || this.imageUrl
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: white;
  font-size: 48pt !important;
  text-transform: uppercase;
}
.hero {
  position: relative;
  margin-bottom: 2rem;

  &.is-mobile-fullheight {
    @media screen and (max-width: 768px) {
      height: 100vh;
    }
  }
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;

  & ::v-deep img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
}

.is-mobile-fullheight .hero-body {
  display: flex;
  align-items: center;
}

.is-align-center .hero-body .container {
  display: flex;
  justify-content: center;
  text-align: center;
}

.is-align-right .hero-body .container {
  display: flex;
  justify-content: flex-end;
  text-align: right;
}

.hero-body-inner {
  max-width: 650px;
}
</style>
