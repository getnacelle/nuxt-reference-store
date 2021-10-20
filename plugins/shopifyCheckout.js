import createShopifyCheckoutClient from "@nacelle/shopify-checkout";

export default function({ $config }, inject) {
  inject("shopifyCheckout", createShopifyCheckoutClient($config.shopify));
}
