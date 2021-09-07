<template>
  <div class="collection-details">
    <div class="collection-details__block">
      <h3 v-if="collection && collection.handle">
        <strong>Current Collection:</strong>
        <span>{{ collection.handle }}</span>
      </h3>
      <h4 v-if="collection && collection.handle">
        <strong>Collection Products:</strong>
        <span v-for="product in collection.products" :key="product.handle">
          {{ product.handle }}
        </span>
      </h4>
      <em>** Will be empty if collections have been cleared **</em>
      <div
        v-if="collection && collection.handle"
        class="collection-details__actions"
      >
        <button @click="handleLoadCollectionProducts(collection.handle)">
          Load Collection Products
        </button>
      </div>
    </div>
    <div class="collection-details__block">
      <h3 v-if="collections">
        <strong>Provided Collections:</strong>
        <span v-for="collection in collections" :key="collection.handle">
          {{ collection.handle }}
        </span>
      </h3>
      <div class="collection-details__actions">
        <button @click="handleAddCollections(['clothing', 'womens', 'mens'])">
          Add Collections ['clothes', 'womens', 'mens']
        </button>
        <button @click="handleRemoveCollections(['womens'])">
          Remove Collections ['womens']
        </button>
        <button @click="handleRemoveCollections(null)">
          Clear Collections
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import useCollectionProvider from '~/composables/useCollectionProvider'
export default defineComponent({
  props: {
    handle: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const {
      collections,
      addCollections,
      removeCollections,
      getCollections,
      loadCollectionProducts
    } = useCollectionProvider()
    const collection = computed(
      () => getCollections({ handles: [props.handle] })[0]
    )

    const handleLoadCollectionProducts = (handle) => {
      loadCollectionProducts({ handle })
    }

    const handleAddCollections = (handles) => {
      addCollections({ handles, method: 'append' })
    }
    const handleRemoveCollections = (handles) => {
      removeCollections({ handles })
    }

    return {
      collection,
      collections,
      handleLoadCollectionProducts,
      handleAddCollections,
      handleRemoveCollections
    }
  }
})
</script>

<style lang="scss" scoped>
.collection-details {
  width: calc(100% - 40px);
  max-width: 700px;
  margin: 40px auto;
  text-align: center;
}
.collection-details__block {
  margin-bottom: 50px;
  h3 {
    font-size: 22px;
    span {
      margin-left: 4px;
    }
  }
  h4 {
    font-size: 18px;
    span {
      margin-left: 4px;
    }
  }
  em {
    font-size: 12px;
  }
}
.collection-details__actions {
  margin-top: 20px;
}
</style>
