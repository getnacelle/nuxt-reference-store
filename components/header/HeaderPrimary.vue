<template>
  <div
    v-if="content"
    class="hidden lg:ml-8 lg:block lg:self-stretch"
    @click.stop
  >
    <div class="h-full flex space-x-8">
      <div
        v-for="(navigationItem, index) in content.navigation"
        :key="index"
        class="flex"
      >
        <div class="relative flex">
          <button
            v-if="navigationItem._type === 'mega'"
            type="button"
            class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
            aria-expanded="false"
            @click="setActiveIndex(index)"
          >
            {{ navigationItem.text }}
          </button>
          <nuxt-link
            v-else-if="navigationItem._type === 'link'"
            :to="navigationItem.url"
            class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
          >
            {{ navigationItem.text }}
          </nuxt-link>
        </div>
        <header-mega
          v-if="navigationItem._type === 'mega'"
          :content="navigationItem"
          :active="activeIndex === index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  watch,
  inject,
  onMounted,
  onBeforeUnmount,
  useContext
} from "@nuxtjs/composition-api";
import HeaderMega from "./HeaderMega.vue";

export default {
  name: "HeaderPrimary",
  components: { HeaderMega },
  setup() {
    let activeIndex = ref(null);
    const { route } = useContext();

    const setActiveIndex = value => {
      if (activeIndex.value === value) activeIndex.value = null;
      else activeIndex.value = value;
    };
    const handleBodyClick = () => setActiveIndex(null);

    onMounted(() => {
      document.body.addEventListener("click", handleBodyClick);
    });

    onBeforeUnmount(() => {
      document.body.removeEventListener("click", handleBodyClick);
    });

    watch(route, () => {
      activeIndex.value = null;
    });

    return {
      content: inject("primary"),
      activeIndex,
      setActiveIndex
    };
  }
};
</script>
