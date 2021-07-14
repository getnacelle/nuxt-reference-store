<template>
  <header>
    <slot name="tags" :tags="tags">
      <h5 v-if="hasTags" class="article-tags">{{ tags.join(', ') }}</h5>
    </slot>
    <slot name="title" :title="title">
      <h1 class="article-title title is-3">{{ title }}</h1>
    </slot>
    <slot name="author" :author="author">
      <p class="article-author">
        <span v-if="author.firstName">{{ author.firstName }}</span>
        <span v-if="author.lastName">{{ author.lastName }}</span>
      </p>
    </slot>
    <slot name="date" :date="absoluteDate">
      <p class="article-published">Published on {{ absoluteDate }}</p>
    </slot>
    <slot></slot>
  </header>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    author: {
      type: Object,
      default: () => {
        return {
          firstName: '',
          lastName: ''
        }
      }
    },
    tags: {
      type: Array,
      default: () => []
    },
    publishDate: {
      type: Number,
      default: -1
    }
  },
  computed: {
    hasTags() {
      return this.tags && this.tags.length > 0
    },
    absoluteDate() {
      if (this.publishDate > -1) {
        // see docs for `format` function: https://date-fns.org/v2.17.0/docs/format
        return format(new Date(this.publishDate * 1000), 'PPP')
      }

      return ''
    }
  }
}
</script>

<style></style>
