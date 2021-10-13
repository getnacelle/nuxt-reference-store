import NacelleClient from "@nacelle/client-js-sdk/dist/client-js-sdk.esm";
import generateSiteData from "./data/generateSiteData";
import writeData from "./utils/writeData";
import createSearchDataObject from "./utils/createSearchDataObject";
import transformProductData from "./utils/transformProductData";

const path = require("path");

module.exports = async function() {
  const client = new NacelleClient({
    id: this.options.publicRuntimeConfig.nacelle.id,
    token: this.options.publicRuntimeConfig.nacelle.token,
    locale: this.options.publicRuntimeConfig.nacelle.locale,
    nacelleEndpoint: this.options.publicRuntimeConfig.nacelle.nacelleEndpoint,
    useStatic: false
  });

  // generate search.json in static dir
  const routeConfig = {};
  const buildDir = this.options.srcDir;
  const staticDir = path.resolve(buildDir, "./static/data");
  const searchDataTypes = [];

  this.nuxt.hook("build:before", async () => {
    try {
      const items = await generateSiteData({
        routeConfig,
        client
      });
      const searchDataObject = createSearchDataObject({
        items,
        searchDataTypes
      });
      if (searchDataObject.product) {
        searchDataObject.product = transformProductData(
          searchDataObject.product
        );
      }

      writeData(`${staticDir}/search.json`, searchDataObject);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Error generating static data files. Aborting build.\n\n${error}`
      );
    }
  });
};
