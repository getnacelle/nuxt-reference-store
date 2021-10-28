import { createSanityPreviewConnector } from "../../../preview-connectors/sanity";

export const setupPreview = ({ sdk, config, connector }) => {
  if (sdk && config && connector) {
    let previewConnector = null;
    switch (connector) {
      case "sanity":
        previewConnector = createSanityPreviewConnector(sdk, {
          sanityConfig: config
        });
        break;
    }
    if (previewConnector) {
      sdk.data.update({ connector: previewConnector });
    }
  }
  return sdk;
};
