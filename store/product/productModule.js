import { get } from 'idb-keyval'
import flattenDeep from 'lodash/flattenDeep'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'

const findSelectedVariant = (product, options) => {
  if (options.length === 0) {
    return product.variants[0]
  } else {
    return product.variants.find((variant) => {
      return options.every((option) => {
        return variant.selectedOptions.some(
          (variantOption) =>
            JSON.stringify(variantOption) === JSON.stringify(option)
        )
      })
    })
  }
}

export default () => {
  return {
    state: () => {
      return {
        product: null,
        options: [],
        selectedOptions: [],
        selectedVariant: null
      }
    },
    actions: {
      async fetchProduct({ state, dispatch }, handle) {
        const namespace = `product/${handle}`
        let product = state.product

        // scenarios & product states:
        // 1 - landing page (statically generated) -> product already loaded in vuex; later need to set in idb
        // 2 - non-landing (client-side rendered)
        //   a. if product is in vuex (loaded) -> do nothing, continue
        //   b. else if product not in vuex BUT in idb -> get from idb, load in vuex
        //   c. else if product not in vuex NOR in idb -> get from $nacelle, then set in idb

        if (!product) {
          if (process.client) {
            const isIOS =
              [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
              ].includes(navigator.platform) ||
              (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
            if (!isIOS) {
              product = await get(namespace)
            }
            if (product) {
              // product was found in indexedDB
              dispatch('setupProduct', product)
            } else {
              // not in indexedDB, load product with $nacelle client-side
              product = await this.$nacelle.data.product({ handle })
              dispatch('setupProduct', product)
              dispatch('storeProduct', product)
            }
          } else {
            // load product with $nacelle server-side
            product = await this.$nacelle.data.product({ handle })
            dispatch('setupProduct', product)
          }
        } else {
          // product still in vuex
        }
        return product
      },
      setupProduct({ commit }, product) {
        commit('setProduct', product)
        commit('setOptions')

        // set default selected variant
        commit('setDefaultSelectedVariant')
      },
      async storeProduct({ dispatch }, product) {
        const namespace = `product/${product.handle}`
        const isStored = await get(namespace)
        if (isStored) {
          // already stored in indexedDB
          return
        }
        // >> single worker <<
        const productWorker = await dispatch('getIndexedDbWorker', null, {
          root: true
        })
        productWorker.postMessage({
          action: 'set',
          key: namespace,
          value: product
        })
        productWorker.onmessage = () => {
          productWorker.terminate()
        }

        // >> individual workers <<
        // const productWorker = new Worker('/worker/indexedDb.js')
        // productWorker.postMessage({ action: 'set', key: namespace, value: product })
        // productWorker.onmessage = () => {
        //   productWorker.terminate()
        // }
      },
      setSelected({ state, commit }, selectedOption) {
        commit('setSelected', selectedOption)
        commit(
          'setSelectedVariant',
          findSelectedVariant(state.product, state.selectedOptions)
        )
      }
    },
    mutations: {
      setProduct: (state, product) => {
        state.product = product
      },
      unloadProduct: (state) => {
        state.product = null
      },
      setOptions: (state) => {
        const nestedOptions = state.product.variants.map((variant) => {
          if (variant.selectedOptions) {
            return variant.selectedOptions.map((option) => {
              if (option.name === 'Color') {
                return {
                  name: option.name,
                  value: option.value,
                  swatchSrc: variant.swatchSrc
                }
              }

              return option
            })
          }

          return []
        })
        const flattenedOptions = flattenDeep(nestedOptions)

        const optionNames = [
          ...new Set(flattenedOptions.map((option) => option.name))
        ]
        const optionValuesByName = optionNames.map((name) => {
          const values = uniqWith(
            flattenedOptions
              .filter((option) => option.name === name)
              .map((option) => {
                if (option.swatchSrc) {
                  return { value: option.value, swatchSrc: option.swatchSrc }
                } else {
                  return { value: option.value }
                }
              }),
            isEqual
          )

          return {
            name,
            values
          }
        })

        state.options = optionValuesByName
      },
      setDefaultSelectedVariant: (state) => {
        state.selectedVariant = state.product.variants[0]
      },
      setSelectedVariant: (state, selectedVariant) => {
        state.selectedVariant = selectedVariant
      },
      setSelected: (state, selectedOption) => {
        if (state.selectedOptions.length === 0) {
          state.selectedOptions.push(selectedOption)
        } else {
          const index = state.selectedOptions.findIndex(
            (item) => item.name === selectedOption.name
          )
          if (index === -1) {
            state.selectedOptions.push(selectedOption)
            return
          }

          state.selectedOptions.splice(index, 1, selectedOption)

          // - - -
          // after updating `selectedOptions` test if a variant matches
          const selectedVariant = findSelectedVariant(
            state.product,
            state.selectedOptions
          )

          // if matching variant is not found
          // then set `selectedOptions` to the first variant found with `selectedOption`
          if (!selectedVariant) {
            const matchingVariant = findSelectedVariant(state.product, [
              selectedOption
            ])
            state.selectedOptions = matchingVariant.selectedOptions.map(
              ({ name, value }) => ({ name, value })
            )
          }
        }
      }
    },
    namespaced: true
  }
}
