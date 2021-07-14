<template>
  <div aria-hidden="true"></div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import { decode } from 'js-base64'
export default {
  computed: {
    ...mapState('events', ['log']),
    ...mapState(['facebookCatalogID']),
    ...mapGetters('cart', ['quantityTotal']),
    ...mapState('cart', ['lineItems']),

    productIDs() {
      const productIDs = this.lineItems.map((item) => {
        return this.decodeBase64VariantId(item.id)
      })
      return productIDs
    },
    logEntry() {
      return this.log[this.log.length - 1]
    },
    fbq() {
      return process.client ? window.fbq : undefined
    },
    ga() {
      return process.client ? window.ga : undefined
    }
  },

  watch: {
    log() {
      if (process.client) {
        switch (this.logEntry.eventType) {
          case 'PAGE_VIEW':
            this.facebookPageView()
            this.googleAnalyticsPageView()
            break
          case 'PRODUCT_VIEW':
            this.facebookProductView()
            this.googleAnalyticsProductView()
            break
          case 'PRODUCT_SELECT':
            this.googleAnalyticsProductSelect()
            break
          case 'COLLECTION_VIEW':
            this.googleAnalyticsCollectionView()
            break
          case 'ADD_TO_CART':
            this.facebookAddToCart()
            this.googleAnalyticsAddToCart()
            break
          case 'REMOVE_FROM_CART':
            this.googleAnalyticsRemoveFromCart()
            break

          case 'CHECKOUT_INIT':
            this.facebookCheckoutInitiate()
            this.googleCheckoutInitiate()
            break
        }
      }
    }
  },
  methods: {
    decodeBase64ProductId(encodedId) {
      const variantIdBase64 = encodedId.split('::')[0]
      const variantIdString = decode(variantIdBase64)
      const variantId = variantIdString.split('gid://shopify/Product/')[1]

      return variantId
    },
    decodeBase64CollecionId(encodedId) {
      const collectionIdBase64 = encodedId.split('::')[0]
      const collectionIdString = decode(collectionIdBase64)
      const collectionId = collectionIdString.split(
        'gid://shopify/Collection/'
      )[1]
      return collectionId
    },
    decodeBase64VariantId(encodedId) {
      const variantIdBase64 = encodedId.split('::')[0]
      const variantIdString = decode(variantIdBase64)
      const variantId = variantIdString.split(
        'gid://shopify/ProductVariant/'
      )[1]

      return variantId
    },
    /// / PAGE VIEW METHODS /////////////////////////////////
    facebookPageView() {
      if (typeof this.fbq !== 'undefined') {
        this.fbq('track', 'PageView')
      }
    },
    googleAnalyticsPageView() {
      if (typeof this.ga !== 'undefined') {
        this.ga('send', 'pageview', this.logEntry.path)
      }
    },

    /// / PRODUCT VIEW METHODS //////////////////////////////
    facebookProductView() {
      if (typeof this.fbq !== 'undefined') {
        this.fbq('track', 'ViewContent', {
          content_ids: this.decodeBase64ProductId(this.logEntry.product.id),
          content_name: this.logEntry.product.title,
          content_type: 'product',
          product_catalog_id: this.facebookCatalogID
        })
      }
    },
    googleAnalyticsProductView() {
      if (typeof this.ga !== 'undefined') {
        this.ga('send', 'pageview')
        this.ga('send', 'event', 'view_item', {
          currency: this.logEntry.user.locale.currency,
          items: [
            {
              item_id: this.decodeBase64ProductId(
                this.logEntry.product.pimSyncSourceProductId
              ),
              item_name: this.logEntry.product.title,
              item_variant: this.logEntry.selectedVariant.title,
              price: this.logEntry.selectedVariant.price,
              currency: this.logEntry.user.locale.currency
            }
          ],
          value: this.logEntry.selectedVariant.price
        })
      }
    },

    /// / PRODUCT SELECT METHODS ///////////////////////////////

    googleAnalyticsProductSelect() {
      if (typeof this.ga !== 'undefined') {
        this.ga('send', 'event', 'select_item', {
          items: [
            {
              item_name: this.logEntry.product.title,
              price: this.logEntry.product.minPrice,
              currency: this.logEntry.user.locale.currency
            }
          ]
        })
      }
    },

    /// / COLLECTION VIEW METHODS ///////////////////////////////

    googleAnalyticsCollectionView() {
      if (typeof this.ga !== 'undefined') {
        this.ga('send', 'event', 'view_item_list', {
          item_list_name: this.logEntry.collection.title,
          item_list_id: this.decodeBase64CollecionId(
            this.logEntry.collection.id
          )
        })
      }
    },

    /// / ADD TO CART METHODS ///////////////////////////////
    facebookAddToCart() {
      if (typeof this.fbq !== 'undefined') {
        this.fbq('track', 'AddToCart', {
          content_ids: this.decodeBase64VariantId(
            this.logEntry.product.variant.id
          ),
          content_name: this.logEntry.product.variant.title,
          content_type: 'product',
          value: this.logEntry.product.variant.price,
          currency: 'USD',
          product_catalog_id: this.facebookCatalogID
        })
      }
    },
    googleAnalyticsAddToCart() {
      if (typeof this.ga !== 'undefined') {
        this.ga('send', 'event', 'add_to_cart', {
          currency: this.logEntry.user.locale.currency,
          items: [
            {
              item_id: this.decodeBase64ProductId(
                this.logEntry.product.variant.id
              ),
              item_name: this.logEntry.product.title,
              item_variant: this.logEntry.product.variant.title,
              price: this.logEntry.product.variant.price,
              currency: this.logEntry.user.locale.currency,
              quantity: this.logEntry.product.quantity
            }
          ],
          value: this.logEntry.product.variant.price
        })
        this.ga('send', 'event', 'UX', 'click', 'add to cart')
      }
    },

    /// / REMOVE FROM CART METHODS ///////////////////////////////
    googleAnalyticsRemoveFromCart() {
      if (typeof this.ga !== 'undefined') {
        this.ga('send', 'event', 'remove_from_cart', {
          currency: this.logEntry.user.locale.currency,
          items: [
            {
              item_id: this.decodeBase64ProductId(
                this.logEntry.product.variant.id
              ),
              item_name: this.logEntry.product.title,
              item_variant: this.logEntry.product.variant.title,
              price: this.logEntry.product.variant.price,
              currency: this.logEntry.user.locale.currency,
              quantity: this.logEntry.product.quantity
            }
          ],
          value: this.logEntry.product.variant.price
        })

        this.ga('send', 'event', 'UX', 'click', 'remove from cart')
      }
    },

    /// / CHECKOUT INITIATION METHODS ///////////////////////////////
    facebookCheckoutInitiate() {
      if (typeof this.fbq !== 'undefined') {
        this.fbq('track', 'InitiateCheckout', {
          content_ids: this.productIDs.map((id) => {
            return this.decodeBase64ProductId(id)
          }),
          content_type: 'product',
          num_items: this.quantityTotal,
          product_catalog_id: this.facebookCatalogID
        })
      }
    },
    googleCheckoutInitiate() {
      if (typeof this.ga !== 'undefined') {
        this.ga('send', 'event', 'begin_checkout', {
          currency: this.logEntry.user.locale.currency,
          items: this.lineItems.map((product) => {
            return {
              item_id: this.decodeBase64ProductId(product.variant.id),
              item_name: product.title,
              item_variant: product.variant.title,
              price: product.variant.price,
              currency: this.logEntry.user.locale.currency,
              quantity: product.quantity
            }
          }),
          value: this.lineItems.reduce(
            (val, product) => val + parseFloat(product.variant.price),
            0
          )
        })
      }
    }
  }
}
</script>
