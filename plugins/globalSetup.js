import { onGlobalSetup, useContext, provide } from "@nuxtjs/composition-api";
import { useSdk } from "@nacelle/vue";
import LRU from "lru-cache";
import { delay } from "~/utils";

const cache = new LRU({ max: 50, max_age: 3000000 });
let routeCount = 0;

export default () => {
  onGlobalSetup(async () => {
    const { $config } = useContext();
    const sdk = useSdk({ config: $config.nacelle });

    let initialSpace = await cache.get("initialSpace");
    routeCount += 1;
    if (!initialSpace && routeCount > 1) {
      await delay(500);
      initialSpace = await cache.get("initialSpace");
    }
    if (!initialSpace) initialSpace = await sdk.data.space();
    if (initialSpace) await cache.set("initialSpace", initialSpace);

    /**
     * Get metatags from metafields
     * @param {String} tag
     * @returns {Object|null}
     */
    const getMetatag = tag => {
      if (initialSpace.metafields) {
        return initialSpace.metafields.find(
          field => field.namespace === "metatag" && field.key === tag
        );
      }
      return null;
    };
    provide("sdk", sdk);
    provide("initialSpace", initialSpace);
    provide("getMetatag", getMetatag);
  });
};
