<template>
  <search-provider :searchData="content.searchData">
    <site-header :content="content.header" />
    <cart :content="content.cart" />
    <slot />
    <site-newsletter :content="content.newsletter" />
    <site-footer :content="content.footer" />
    <site-nav :content="content.header" />
  </search-provider>
</template>

<script>
import { inject, ref, useFetch } from "@nuxtjs/composition-api";
import { SearchProvider } from "@nacelle/vue";
import SiteHeader from "~/components/header/Header.vue";
import SiteNewsletter from "~/components/newsletter/Newsletter.vue";
import SiteFooter from "~/components/footer/Footer.vue";
import SiteNav from "~/components/nav/Nav.vue";
import Cart from "~/components/cart/Cart.vue";
export default {
  name: "ContentHolder",
  components: {
    SearchProvider,
    SiteHeader,
    SiteNewsletter,
    SiteFooter,
    SiteNav,
    Cart,
  },
  setup() {
    const content = ref(null);
    const nacelleSdk = inject("nacelleSdk");

    useFetch(async () => {
      const [header, footer, newsletter, cart, searchData] = await Promise.all([
        nacelleSdk.data.content({
          handle: "component-header",
          type: "componentHeader",
        }),
        nacelleSdk.data.content({
          handle: "component-footer",
          type: "componentFooter",
        }),
        nacelleSdk.data.content({
          handle: "component-newsletter",
          type: "componentNewsletter",
        }),
        nacelleSdk.data.content({
          handle: "component-cart",
          type: "componentCart",
        }),
        nacelleSdk.data.allProducts(),
      ]);
      content.value = { header, footer, newsletter, cart, searchData };
    });

    return { content };
  },
};
</script>
