<template>
  <section v-if="content" class="relative overflow-hidden">
    <div aria-hidden="true" class="absolute inset-0">
      <div
        v-if="content.image"
        class="absolute inset-0 max-w-7xl mx-auto overflow-hidden xl:px-8"
      >
        <nuxt-img
          :src="content.image.file.asset.url"
          :alt="content.image.alt"
          :width="1200"
          class="w-full h-full object-center object-cover"
        />
      </div>
      <div class="absolute inset-0 bg-white bg-opacity-75"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-white via-white"></div>
    </div>
    <div
      class="relative max-w-7xl mx-auto py-32 px-4 flex flex-col items-center text-center sm:px-6 lg:px-8"
    >
      <div class="max-w-2xl mx-auto lg:max-w-none">
        <h2
          v-if="content.heading"
          class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
        >
          {{ content.heading }}
        </h2>
        <p
          v-if="content.text"
          class="mt-4 max-w-xl mx-auto text-xl text-gray-600"
        >
          {{ content.text }}
        </p>
        <nuxt-link
          v-if="content.link"
          :to="content.link.url"
          class="mt-6 inline-block w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-gray-800 sm:w-auto"
        >
          {{ content.link.text }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CtaStrip",
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
