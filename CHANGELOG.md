## [1.0.5](https://github.com/getnacelle/nacelle-nuxt-starter/compare/v1.0.1...v1.0.5) (2020-09-01)

### Changed

- Minor bug fixes
- Updated product option swatches to use easily configurable local or remote url paths

## [1.0.4](https://github.com/getnacelle/nacelle-nuxt-starter/compare/v1.0.1...v1.0.4) (2020-07-23)

### Changed

- Updated [@nacelle/nacelle-nuxt-module](https://www.npmjs.com/package/@nacelle/nacelle-nuxt-module) version.
- [`pages/shop.vue`] - Changed "Shop All" collection handle to `nacelle-gen-shop-all`.
- Refactored product details components and moved logic into newly created getters in `store/products.js`.

## [1.0.3](https://github.com/getnacelle/nacelle-nuxt-starter/compare/v1.0.1...v1.0.3) (2020-07-23)

### Changed

- Refactored `cart` Vuex store and split functionality into `cart` and `checkout` Vuex modules.

## [1.0.2](https://github.com/getnacelle/nacelle-nuxt-starter/compare/v1.0.1...v1.0.2) (2020-06-29)

### Changed

- **Contentful Content Schema** - pull `contentType` from `sys` rather than using a specific field.
- [`PageContent.vue`] - How we map Contentful and Shopify content sections has been simplified and reduced to a single method, `mapSection`.
- [`ContentHeroBanner.vue`] - Updated to use `imageUrl` prop instead of `backgroundImgUrl` to align with other content components.
- [`ContentSideBySide.vue`] - Updated to use `contentHtml` prop instead of `copy` to align with other content components.

## [1.0.1](https://github.com/getnacelle/nacelle-nuxt-starter/compare/v1.0.0...v1.0.1) (2020-06-23)

### Added

- Component for easily switching user's locale preference
- Added `isMultiLocale` boolean to `nacelle` object in `nuxt.config.js` which enables fallback data fetching locale specific data.

### Changed

- Updated mixins to fetch data when a user's locale preference changes
- Update versions of [nacelle-nuxt-module](https://www.npmjs.com/package/@nacelle/nacelle-nuxt-module) and [client-js-sdk](https://www.npmjs.com/package/@nacelle/client-js-sdk) dependency to enable fallback fetching default data if locale specific data does not exist.

## [1.0.0](https://github.com/getnacelle/nacelle-nuxt-starter/compare/v1.0.0...v1.0.0) (2020-06-18)

Initial Release
