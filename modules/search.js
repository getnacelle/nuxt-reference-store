import generateSiteData from "./data/generateSiteData";
import writeData from "./utils/writeData";
import createSearchDataObject from "./utils/createSearchDataObject";
import transformProductData from "./utils/transformProductData";

const path = require("path");

module.exports = async function() {
  // generate search.json in static dir
  const routeConfig = this.options.nacelle.routeConfig || {};
  const buildDir = this.options.srcDir;
  const staticDir = path.resolve(buildDir, "./static/data");
  const searchDataTypes = this.options.nacelle.searchDataTypes || [];

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
