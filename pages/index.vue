<template>
  <main>
    <div v-for="(section, index) in page.sections" :key="index">
      <component :is="section.type" :section="section" />
    </div>
  </main>
</template>

<script>
import Hero from "~/components/content/Hero.vue";
import { ref, useFetch } from "@nuxtjs/composition-api";
// import { useSpaceProvider } from "@nacelle/vue";

const content = {
  homepage: {
    sections: [
      {
        type: "hero",
        image: {
          src: "https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg",
          alt: "hero image"
        },
        heading: "New arrivals are here",
        text: "The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release while they're still in stock.",
        cta: {
          label: "Shop New Arrivals",
          url: "/"
        }
      }
    ]
  }
};

export default {
  components: {
    Hero
  },
  setup() {
    // const { nacelleSdk } = useSpaceProvider();
    const page = ref({});
    const { fetchState } = useFetch(async () => {
      // page.value = await nacelleSdk.data.page({ handle: "homepage" });
      page.value = content["homepage"];
    });
    return { page, fetchState };
  }
}
</script>
