<!--
/****
/* Customize your Nacelle content by taking advantage
/* of named slots. For more details, refer to:
/*
/* https://docs.getnacelle.com/nuxt/pages.html#customizing-homepage-content-output
/****
-->
<template>
  <div class="article-page">
    <article class="article">
      <div class="article-hero">
        <transition name="fade">
          <nacelle-image
            v-if="
              article &&
              article.featuredMedia.file &&
              article.featuredMedia.file.url
            "
            :src="article.featuredMedia.file.url"
            :width="400"
          />
        </transition>
      </div>
      <div class="container">
        <transition name="fadeDelay">
          <div v-if="article" class="columns is-centered is-multiline">
            <div class="article-header column is-6 has-text-centered">
              <!--
                /****
                /* -- Edit Blog Article Header --
                /* |       Available slots:      |
                /*
                /* name: "tags", data: "tags"
                /* name: "title", data: "title"
                /* name: "author", data: "author"
                /* name: "date", data: "date"
                /****
              -->
              <blog-article-header
                :title="article.title"
                :author="article.author"
                :tags="article.tags"
                :publish-date="article.publishDate"
              >
                <!-- Extra HTML markup can also be added below the default header content -->
              </blog-article-header>
            </div>
            <div class="column is-9 content">
              <blog-article-content :article="article">
                <!-- Extra HTML added after content -->
                <nuxt-link
                  :to="`/${$route.params.blogHandle}/`"
                  class="breadcrumb"
                  >Back to Blog</nuxt-link
                >
              </blog-article-content>
            </div>
          </div>
        </transition>
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      article: null
    }
  },
  async fetch() {
    this.article = await this.$nacelle.data.article({
      handle: this.$route.params.articleHandle
    })
  },
  head() {
    if (this.article) {
      const properties = {}
      const meta = []
      const title = this.getMetatag('title')

      if (this.article.title) {
        let fullTitle = this.article.title

        if (title) {
          fullTitle = `${fullTitle} | ${title.value}`
        }

        properties.title = fullTitle
        meta.push({
          hid: 'og:title',
          property: 'og:title',
          content: fullTitle
        })
      }

      if (this.article.description) {
        meta.push({
          hid: 'description',
          name: 'description',
          content: this.article.description
        })
        meta.push({
          hid: 'og:description',
          property: 'og:description',
          content: this.article.description
        })
      }

      if (this.article.featuredMedia) {
        meta.push({
          hid: 'og:image',
          property: 'og:image',
          content: this.article.featuredMedia.src
        })
      }

      meta.push({
        hid: 'og:type',
        property: 'og:type',
        content: 'article'
      })

      return {
        ...properties,
        meta
      }
    }
  },
  computed: {
    ...mapGetters('space', ['getMetatag'])
  },
  mounted() {
    this.articleView({ article: this.article })
  },
  methods: {
    ...mapActions('events', ['articleView'])
  }
}
</script>

<style lang="scss" scoped>
.article-hero {
  height: 300px;
  background: #f5f5f5;

  @media screen and (min-width: 769px) {
    height: 400px;
  }

  ::v-deep .featured-media {
    width: 100%;
    height: 100%;

    figure,
    img {
      width: 100%;
      height: 100%;
    }

    img {
      object-fit: cover;
    }
  }
}

.article .container {
  position: relative;
  margin-top: -3rem;
  padding: 2rem;
  padding-bottom: 5rem;
  background-color: #ffffff;
  border: 1px solid #f5f5f5;
  max-width: 1024px;
}

.article-tags {
  margin-bottom: 1em;
}

.article-body .content {
  position: relative;
}

.fade-enter-active {
  transition: opacity 0.25s;
}
.fade-enter {
  opacity: 0;
}

.fadeDelay-enter-active {
  transition: opacity 0.55s 0.25s;
}
.fadeDelay-enter {
  opacity: 0;
}
</style>
