import {
  onGlobalSetup,
  useContext,
  useAsync,
  provide
} from "@nuxtjs/composition-api";
import { useSdk } from "@nacelle/vue";
import LRU from "lru-cache";
import { delay } from "~/utils";

const cache = new LRU({ max: 50, max_age: 3000000 });
let routeCount = 0;

export default () => {
  onGlobalSetup(() => {
    const { $config } = useContext();
    const sdk = useSdk({ config: $config.nacelle });

    let initialSpace = useAsync(async () => {
      let space = await cache.get("space");
      routeCount += 1;
      if (!space && routeCount > 1) {
        await delay(500);
        space = await cache.get("space");
      }
      if (!space) space = await sdk.data.space();
      if (space) await cache.set("space", space);
      return space;
    });

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
