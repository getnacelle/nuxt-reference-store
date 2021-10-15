import {
  onGlobalSetup,
  useContext,
  useAsync,
  provide
} from "@nuxtjs/composition-api";
import { useSdk } from "@nacelle/vue";
import LRU from "lru-cache";
import { delay, previews } from "~/utils";

const cache = new LRU({ max: 50, max_age: 3000000 });
let routeCount = 0;

export default () => {
  onGlobalSetup(() => {
    const { $config } = useContext();
    let nacelleSdk = useSdk({ config: $config.nacelle });

    if ($config.app?.contentMode === "preview") {
      const connector = $config.app?.contentSource;
      nacelleSdk = previews({
        sdk: nacelleSdk,
        config: $config[connector],
        connector
      });
    }

    let initialSpace = useAsync(async () => {
      let space = await cache.get("space");
      routeCount += 1;
      if (!space && routeCount > 1) {
        await delay(500);
        space = await cache.get("space");
      }
      if (!space) space = await nacelleSdk.data.space();
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
    provide("nacelleSdk", nacelleSdk);
    provide("initialSpace", initialSpace);
    provide("getMetatag", getMetatag);
  });
};
