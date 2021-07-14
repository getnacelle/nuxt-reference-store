<template>
  <div class="quantity-updater no-select nacelle">
    <input
      :value="quantity"
      class="quantity-input"
      type="text"
      @input="update(Number($event.target.value))"
    />
    <div class="switches">
      <div
        class="increment switch"
        @mousedown="start(increment)"
        @touchstart.prevent="start(increment)"
        @touchend.prevent="stop"
      >
        <span>+</span>
      </div>
      <div
        class="decrement switch"
        @mousedown="start(decrement)"
        @touchstart.prevent="start(decrement)"
        @touchend.prevent="stop"
      >
        <span>-</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const timeInterval = 100

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    quantity: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data: () => {
    return {
      interval: null,
      startTime: null,
      handler: Function
    }
  },
  methods: {
    ...mapActions('cart', ['incrementLineItem', 'decrementLineItem']),
    /**
     *  Allows us to await a setTimeout by return a Promise
     * @param milliseconds - ms argument for setTimeout
     */
    wait(milliseconds) {
      return new Promise((resolve, reject) => setTimeout(resolve, milliseconds))
    },
    /**
     *  Emits quantity update for sync modifier on parent.
     * @param quantity - new quantity value
     */
    update(quantity) {
      this.$emit('update:quantity', quantity)
    },
    /**
     *  Increase quantity. Type coersion prevents string concatenation.
     */
    increment() {
      if (this.item) {
        this.incrementLineItem(this.item.id)
      } else {
        this.update(Number(this.quantity) + 1)
      }
    },
    /**
     *  Decrease quantity. Prevents negative number.
     */
    decrement() {
      if (this.quantity > 0) {
        if (this.item) {
          this.decrementLineItem(this.item.id)
        } else {
          this.update(this.quantity - 1)
        }
      }
    },
    /**
     *  Start a repetitive call to increment and decrement method after a timeInterval on mousedown event and will stop on mouseup event on controls
     * @param handler - increment or decrement method
     */
    async start(handler) {
      document.addEventListener('mouseup', this.stop)
      this.startTime = new Date()
      this.handler = handler
      await this.wait(500)
      clearInterval(this.interval)
      if (this.startTime) {
        this.interval = setInterval(handler, timeInterval)
      }
    },
    /**
     * clear interval on mouseup event and remove the listener
     * @param evt - event to be removed
     */
    stop(evt) {
      document.removeEventListener(evt.type, this.stop)
      this.handler()
      clearInterval(this.interval)
      this.interval = null
      this.handler = null
      this.startTime = null
    }
  }
}
</script>

<style lang="scss" scoped>
.quantity-updater {
  display: flex;
  line-height: 1;
  width: 5rem;
  height: 2.25rem;
  text-align: center;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}

.quantity-input {
  width: 3rem;
  line-height: 2rem;
  border: none;
  padding-left: 5px;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
}

.switches {
  width: 2rem;
  font-size: 14pt;
  border-left: 1px solid #dbdbdb;
}

.switch {
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:first-child {
    border-bottom: 1px solid #dbdbdb;
  }

  &:hover {
    background: #f5f5f5;
  }
}
</style>
