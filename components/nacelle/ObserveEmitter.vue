<template>
  <div ref="observee" class="observe-emitter" />
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          root: null,
          rootMargin: '600px',
          threshold: 0.1
        }
      }
    }
  },
  data() {
    return {
      observer: null
    }
  },
  mounted() {
    this.initObserver()
  },
  methods: {
    initObserver() {
      if (this.$refs.observee) {
        this.observer = new IntersectionObserver(
          this.onObserverChange,
          this.options
        )

        this.observer.observe(this.$refs.observee)
      }
    },
    onObserverChange(changes) {
      if (changes[0].isIntersecting) {
        this.$emit('observe')
      }
    }
  }
}
</script>
