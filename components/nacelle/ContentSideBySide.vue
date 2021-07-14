<template>
  <section class="sbs nacelle">
    <div class="columns" :class="columnClasses">
      <nacelle-image
        :src="imageUrl"
        :alt="alt"
        :width="800"
        :height="800"
        class="column is-half sbs-image"
      />
      <div
        class="column is-half sbs-copy"
        :style="backgroundColor ? `background-color: ${backgroundColor}` : null"
      >
        <slot name="body" :title="title" :contentHtml="contentHtml">
          <div class="has-text-centered">
            <component :is="titleTag" class="title">{{ title }}</component>
            <div class="content" v-html="contentHtml" />
          </div>
        </slot>
        <slot
          name="cta"
          :ctaUrl="ctaUrl"
          :ctaText="ctaText"
          :ctaHandler="ctaHandler"
        >
          <p v-if="ctaText.length > 0" class="has-text-centered">
            <cta-button :to="ctaUrl" @clicked="ctaHandler">
              {{ ctaText }}
            </cta-button>
          </p>
        </slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    featuredMedia: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    contentHtml: {
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
    reverseDesktop: {
      type: Boolean,
      default: false
    },
    reverseMobile: {
      type: Boolean,
      default: false
    },
    titleTag: {
      type: String,
      default: 'h3'
    }
  },
  computed: {
    imageUrl() {
      return this.featuredMedia?.fields?.file?.url
    },
    columnClasses() {
      const desktopReverse = this.reverseDesktop ? 'is-column-reverse' : ''
      const mobileReverse = this.reverseMobile ? 'is-mobile-column-reverse' : ''

      return `${desktopReverse} ${mobileReverse}`
    }
  }
}
</script>

<style lang="scss" scoped>
.sbs .columns {
  margin-top: 0;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }

  @media screen and (min-width: 769px) {
    min-height: 400px;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.sbs .columns.is-column-reverse {
  @media screen and (min-width: 769px) {
    flex-direction: row-reverse;
  }
}

.sbs .columns.is-mobile-column-reverse {
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
  }
}

.column.sbs-image {
  position: relative;
  padding: 0;

  & ::v-deep img {
    display: block;
    width: 100%;

    @media screen and (min-width: 769px) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.sbs-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 3rem;
}
</style>
