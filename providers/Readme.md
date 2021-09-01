# Nuxt Providers

## Product Provider
Provider component for managing state of products.

### Props
Provider accepts 2 props.

1. config (required)
Object containing all necessary configurations.  Right now it only utilizes the following keys: `nacelleId`, `nacelleToken`, `nacelleEndpoint`.

2. products (optional)
Array of products used to set the products provided.  Note: if this prop changes the provided products will be reset.


### Injected Values

1. products
Array of products being provided.  This includes additional fields such as options and selectedVariant.

### Injected Functions

1. setProducts
Function used to reset the list of provided products. Requires a single parameter containing an array of `product` objects to provide.

2. addProducts
Function used to add to the list of provided products. Requires a single parameter containing an array of `product` objects to add to provider.

3. fetchProducts
Function used to fetch products. 
Requires a single parameter containing an array of product `handles` to fetch.  Accepts an optional second parameter which is a string determining how products fetched should be provided.  Valid options are `add`, which runs `addProducts` and `set`, which runs `setProducts`. 

4. removeProducts
Function used to remove to the list of provided products.  Requires a single parameter containing an array of product `handles` to remove from provider.

5. clearProducts
Function used to clear the list of provided products.

6. setSelectedVariant
Function used to update a particular products selected variant.  Requires two parameters. First parameter is the `product` object to update.  Second parameter is the `options` used to determine what selected variant to set.

7. getProducts
Function used to return a subset of the provided products.  Accepts an optional parameter of `handles` to retrieve.  If omitted it will return all products.

### Demo
A demo has been setup for initial testing.  To view it visit `/products/_anyHandle`.