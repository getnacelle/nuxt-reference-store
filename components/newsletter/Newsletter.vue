<template>
  <div v-if="content" class="bg-gray-800">
    <div
      class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center"
    >
      <div class="lg:w-0 lg:flex-1">
        <h2
          v-if="content.fields.heading"
          class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          {{ content.fields.heading }}
        </h2>
        <p
          v-if="content.fields.text"
          class="mt-3 max-w-3xl text-lg leading-6 text-gray-300"
        >
          {{ content.fields.text }}
        </p>
      </div>
      <div class="mt-8 lg:mt-0 lg:ml-8">
        <div
          v-if="success"
          class="flex bg-green-50 mx-auto py-4 px-4 border border-2 border-green-300 rounded-lg sm:px-5 lg:px-6"
        >
          <span
            class="text-green-500 mr-4 h-6 w-6"
            v-html="require(`~/assets/svgs/success.svg?raw`)"
          />
          {{ content.fields.success }}
        </div>
        <form v-if="!success" class="sm:flex" @submit.prevent="handleSubmit">
          <label for="email-address" class="sr-only">{{ content.input }}</label>
          <input
            type="email"
            autocomplete="email"
            required
            class="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
            :placeholder="content.fields.input"
          />
          <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              {{ content.fields.button }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, useContext } from "@nuxtjs/composition-api";

export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formModel = ref({
      email: ""
    });
    const success = ref(false);
    const { route } = useContext();

    const handleSubmit = () => (success.value = true);

    watch(route, () => {
      success.value = false;
    });

    return {
      formModel,
      success,
      handleSubmit
    };
  }
};
</script>
