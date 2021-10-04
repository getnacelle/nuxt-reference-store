<template>
  <section class="py-12 px-4 sm:py-16 lg:py-20">
    <div class="max-w-3xl mx-auto">
      <div
        v-if="success"
        class="flex bg-green-50 mx-auto py-5 px-5 border border-2 border-green-300 rounded-lg sm:px-6 lg:px-7"
      >
        <span
          class="text-green-500 mr-4 h-6 w-6"
          v-html="require(`~/assets/svgs/success.svg?raw`)"
        />
        {{ text.success }}
      </div>
      <form
        v-if="!success"
        class="grid grid-cols-1 gap-y-6"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label for="full-name" class="sr-only">{{ text.name }}</label>
          <input
            v-model="formModel.name"
            type="text"
            name="full-name"
            id="full-name"
            autocomplete="name"
            required
            class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            :placeholder="`${text.name}*`"
          />
        </div>
        <div>
          <label for="email" class="sr-only">{{ text.email }}</label>
          <input
            v-model="formModel.email"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            :placeholder="`${text.email}*`"
          />
        </div>
        <div>
          <label for="phone" class="sr-only">{{ text.phone }}</label>
          <input
            v-model="formModel.phone"
            type="text"
            name="phone"
            id="phone"
            autocomplete="tel"
            required
            class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            :placeholder="`${text.phone}*`"
          />
        </div>
        <div>
          <label for="message" class="sr-only">{{ text.message }}</label>
          <textarea
            v-model="formModel.message"
            id="message"
            name="message"
            rows="4"
            required
            class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            :placeholder="`${text.message}*`"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ text.button }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { ref, computed } from "@nuxtjs/composition-api";

export default {
  name: "ContactForm",
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const formModel = ref({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    const success = ref(false);

    const text = computed(() => ({
      name: props?.content?.name || "Full Name",
      email: props?.content?.email || "Full Name",
      phone: props?.content?.phone || "Full Name",
      message: props?.content?.message || "Full Name",
      button: props?.content?.button || "Submit",
      success:
        props?.content?.success ||
        "Thanks for contacting us! We will be in touch shortly."
    }));

    const handleSubmit = () => (success.value = true);

    return { formModel, success, text, handleSubmit };
  }
};
</script>
