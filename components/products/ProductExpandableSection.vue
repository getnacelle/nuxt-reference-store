<template>
  <div v-if="features">
    <h3>
      <button type="button" @click="expanded = !expanded" class="group relative w-full py-6 flex justify-between items-center text-left" aria-controls="disclosure-1" :aria-expanded="expanded">
        <span :class="`${expanded ? 'text-indigo-600' : 'text-gray-900'} text-sm font-medium`">
          Features
        </span>
        <span class="ml-6 flex items-center">
          <svg v-if="expanded" class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
          </svg>
          <svg v-else class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </span>
      </button>
    </h3>
    <div v-show="expanded" class="pb-6 prose prose-sm" id="disclosure-1">
      <ul role="list">
        <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  props: {
    features: {
      type: Array,
      required: true
    }
  },
  setup() {
    const expanded = ref(false);
    return { expanded };
  }
}
</script>
