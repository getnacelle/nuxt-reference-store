<template>
  <div class="absolute flex lg:relative">
    <nuxt-link to="/">
      <span class="sr-only">Workflow</span>
      <img
        class="h-8 w-8"
        src="/workflow-mark.svg?color=indigo&shade=600"
        alt=""
        height="32"
        width="32"
      />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "HeaderLogo"
};
</script>
