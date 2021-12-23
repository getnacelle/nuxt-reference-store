import NacelleSDK from "@nacelle/client-js-sdk";

export default function(context, inject) {
  inject(
    "nacelleSdk",
    new NacelleSDK({
      ...context.$config.nacelle,
      useStatic: false
    })
  );
}
