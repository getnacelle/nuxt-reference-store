import NacelleSanityPreviewConnector from "@nacelle/sanity-preview-connector";

export const previews = ({ sdk, config, connector }) => {
  if (sdk && config && connector) {
    let previewConnector = null;
    switch (connector) {
      case "sanity":
        console.log("preview me up");
        previewConnector = new NacelleSanityPreviewConnector({
          sanityConfig: config.sanity
        });
        break;
    }
    if (previewConnector) {
      sdk.data.update({ connector: previewConnector });
    }
  }
  return sdk;
};
