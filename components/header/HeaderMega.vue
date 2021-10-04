<template>
  <transition name="fade">
    <div
      v-show="active"
      class="absolute top-full inset-x-0 border-t border-gray-200 text-sm text-gray-500 transition ease-out duration-200"
    >
      <div
        class="absolute inset-0 top-1/2 bg-white shadow"
        aria-hidden="true"
      />
      <div class="relative bg-white">
        <div class="max-w-7xl mx-auto px-8">
          <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
            <div class="col-start-2 grid grid-cols-2 gap-x-8">
              <nuxt-link
                v-for="(callout, index1) in mega.callouts"
                :key="index1"
                :to="callout.url"
                class="group relative text-base sm:text-sm"
              >
                <div
                  class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75"
                >
                  <nuxt-img
                    :src="callout.image.src"
                    :alt="callout.image.alt"
                    class="object-center object-cover"
                  />
                </div>
                <div class="mt-6 block font-medium text-gray-900">
                  <span class="absolute z-10 inset-0" aria-hidden="true"></span>
                  {{ callout.text }}
                </div>
                <p aria-hidden="true" class="mt-1">Shop now</p>
              </nuxt-link>
            </div>
            <div class="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
              <div v-for="(menu, index) in mega.menus" :key="index">
                <p class="font-medium text-gray-900">
                  {{ menu.text }}
                </p>
                <ul
                  role="list"
                  :aria-labelledby="`${menu.text}-heading`"
                  class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                >
                  <li
                    v-for="(item, index1) in menu.items"
                    :key="index1"
                    class="flex"
                  >
                    <nuxt-link :to="item.url" class="hover:text-gray-800">
                      {{ item.text }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    mega: {
      type: Object,
      default: () => ({})
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
