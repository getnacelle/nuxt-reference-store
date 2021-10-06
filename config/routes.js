import fetch from "isomorphic-unfetch";

export default async () => {
  const { data } = await fetch(process.env.NACELLE_ENDPOINT, {
    method: "POST",
    headers: {
      "x-nacelle-space-token": process.env.NACELLE_GRAPHQL_TOKEN,
      "x-nacelle-space-id": process.env.NACELLE_SPACE_ID
    },
    body: JSON.stringify({
      query: `
        {
          products: getProducts {
            items {
              handle
            }
          }
          collections: getCollections {
            items {
              handle
            }
          }
          content: getContent {
            items {
              handle
              type
            }
          }
        }
      `
    })
  }).then(response => response.json());

  return [
    // ...data.products.items.map(item => {
    //   return `/products/${item.handle}`;
    // }),
    // ...data.collections.items.map(item => {
    //   return `/collections/${item.handle}`;
    // }),
    // ...data.content.items
    //   .filter(({ type }) => type === "page" && type !== "article")
    //   .map(({ type, handle }) => {
    //     return type === "page" ? `/pages/${handle}` : `/blog/${handle}`;
    //   })
  ];
};
