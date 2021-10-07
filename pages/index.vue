<template>
  <main>
    <div v-for="(section, index) in page.sections" :key="index">
      <component :is="section.type" :section="section" />
    </div>
  </main>
</template>

<script>
import Hero from "~/components/sections/Hero.vue";
import SideBySide from "~/components/sections/SideBySide.vue";
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
      },
      {
        type: "sideBySide",
        layout: "image-left",
        image: {
          src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
          alt: "side by side image"
        },
        heading: "Our Process",
        subheading: "Work with us",
        text: "Semper curabitur ullamcorper posuere nunc sed. Ornare iaculis bibendum malesuada faucibus lacinia porttitor. Pulvinar laoreet sagittis viverra duis. In venenatis sem arcu pretium pharetra at. Lectus viverra dui tellus ornare pharetra.",
        cta: {
          label: "Get Started",
          url: "/",
        },
      },
      {
        type: "sideBySide",
        layout: "image-right",
        image: {
          src: "https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg",
          alt: "side by side image"
        },
        heading: "New Arrivals Are Here",
        subheading: "",
        text: "The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release while they're still in stock.",
        cta: {
          label: "Shop New Arrvials",
          url: "/",
        },
      },
    ]
  }
};

export default {
  components: {
    Hero,
    SideBySide
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
