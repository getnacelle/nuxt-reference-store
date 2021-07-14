<template>
  <button
    role="button"
    class="burger nacelle"
    aria-label="menu"
    :class="{ 'is-active': menuVisible }"
    @click="toggleShowMenu"
  >
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </button>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('menu', ['menuVisible'])
  },
  methods: {
    ...mapMutations('menu', ['toggleShowMenu'])
  }
}
</script>

<style lang="scss" scoped>
.burger {
  position: relative;
  display: block;
  height: 3.25rem;
  width: 3.25rem;
  color: #4a4a4a;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: 0;
}

.burger span {
  position: absolute;
  left: calc(50% - 8px);
  display: block;
  background-color: currentColor;
  height: 1px;
  width: 16px;
  transform-origin: center;
  transition-duration: 86ms;
  transition-property: background-color, opacity, transform;
  transition-timing-function: ease-out;

  &:nth-child(1) {
    top: calc(50% - 6px);
  }

  &:nth-child(2) {
    top: calc(50% - 1px);
  }

  &:nth-child(3) {
    top: calc(50% + 4px);
  }
}

.burger.is-active span {
  &:nth-child(1) {
    transform: translateY(5px) rotate(45deg);
  }

  &:nth-child(2) {
    opacity: 0;
  }

  &:nth-child(3) {
    transform: translateY(-5px) rotate(-45deg);
  }
}
</style>
