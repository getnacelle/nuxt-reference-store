import {
  onGlobalSetup,
  useContext,
  useAsync,
  useMeta,
  provide,
  reactive
} from "@nuxtjs/composition-api";
import { useSdk } from "@nacelle/vue";
import LRU from "lru-cache";
import { delay } from "~/utils";

const cache = new LRU({ max: 50, max_age: 3000000 });
let routeCount = 0;

export default ({ $nacelleSdk }) => {
  onGlobalSetup(() => {
    const { $config } = useContext();

    if ($config.app?.contentMode === "preview") {
      const connector = $config.app?.contentSource;
      setupPreview({
        sdk: $nacelleSdk,
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
      if (!space) space = await $nacelleSdk.data.space();
      if (space) await cache.set("space", space);
      return space;
    });

    /**
     * Get metatags from metafields
     * @param {String} tag
     * @returns {Object|null}
     */
    const getMetatag = tag => {
      if (initialSpace.value?.metafields) {
        return initialSpace.value.metafields.find(
          field => field.namespace === "metatag" && field.key === tag
        );
      }
      return null;
    };

    useMeta(() => {
      const properties = {};
      const meta = [];
      const title = getMetatag("title");
      const description = getMetatag("description");

      if (title) {
        properties.title = title.value;
        meta.push({
          hid: "og:title",
          property: "og:title",
          content: title.value
        });
        meta.push({
          // Control title used in social shares, e.g. Slack link previews
          hid: "apple-mobile-web-app-title",
          property: "apple-mobile-web-app-title",
          content: title.value
        });
        meta.push({
          hid: "og:site_name",
          property: "og:site_name",
          content: title.value
        });
      }

      if (description) {
        meta.push({
          hid: "description",
          name: "description",
          content: description.value
        });
        meta.push({
          hid: "og:description",
          property: "og:description",
          content: description.value
        });
      }
      return {
        ...properties,
        meta
      };
    });

    provide("initialSpace", initialSpace);
    provide("getMetatag", getMetatag);
  });
};
