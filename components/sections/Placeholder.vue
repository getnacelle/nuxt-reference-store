<template>
  <section v-if="section" class="relative block bg-white px-4 py-16">
    <div
      class="bg-red-50 max-w-3xl mx-auto border-4 border-red-300 border-dashed rounded-lg p-12 text-center"
    >
      <span
        class="flex mx-auto text-red-500 mb-4 h-12 w-12"
        v-html="require(`~/assets/svgs/empty.svg?raw`)"
      />
      <h1
        class="text-1xl leading-10 font-extrabold tracking-tight text-gray-900 text-center sm:text-2xl sm:leading-none lg:text-3xl"
      >
        Empty Component
      </h1>
      <p
        class="mt-6 mx-auto text-l leading-8 text-gray-500 text-center lg:text-xl lg:leading-8"
      >
        The component
        <span class="text-red-600 font-medium">{{ section }}.vue</span> was not
        found. To get started create this component in your CMS.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Placeholder",
  props: {
    section: {
      type: String,
      required: true
    }
  }
};
</script>
