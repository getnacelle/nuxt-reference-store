<template>
  <div class="hidden lg:ml-8 lg:block lg:self-stretch" @click.stop>
    <div class="h-full flex space-x-8">
      <div
        v-for="(navigationItem, index) in navigation"
        :key="index"
        class="flex"
      >
        <div class="relative flex">
          <button
            v-if="navigationItem.mega"
            type="button"
            class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
            aria-expanded="false"
            @click="setActiveIndex(index)"
          >
            {{ navigationItem.text }}
          </button>
          <nuxt-link
            v-else-if="navigationItem.url"
            :to="navigationItem.url"
            class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
          >
            {{ navigationItem.text }}
          </nuxt-link>
        </div>
        <header-mega
          v-if="navigationItem.mega"
          :mega="navigationItem.mega"
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
  onMounted,
  onBeforeUnmount,
  useContext
} from "@nuxtjs/composition-api";
import headerData from "~/data/header";
import HeaderMega from "./HeaderMega.vue";

export default {
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
      navigation: headerData.navigation,
      activeIndex,
      setActiveIndex
    };
  }
};
</script>
