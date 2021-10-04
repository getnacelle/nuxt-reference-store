<template>
  <div class="bg-white">
    <div class="relative bg-gray-900">
      <div v-if="section.image && section.image.src" aria-hidden="true" class="absolute inset-0 overflow-hidden">
        <img :src="section.image.src" :alt="section.image.alt" class="w-full h-full object-center object-cover">
      </div>
      <div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50"></div>

      <div class="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
        <h1 v-if="section.heading" class="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">{{ section.heading }}</h1>
        <p v-if="section.text" class="mt-4 text-xl text-white">{{ section.text }}</p>
        <nuxt-link v-if="section.cta && section.cta.label && section.cta.url" :to="section.cta.url" class="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100">{{ section.cta.label }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
