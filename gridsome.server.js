// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/]
        })
      ])
    }
  })

  api.loadSource(async actions => {
    const { data } = await axios.get('http://localhost:1337/products')

    const collection = actions.addCollection({
      typeName: 'Product',
      path: '/products/:id'
    })

    for (const product of data) {
      collection.addNode({
        id: product.id,
        path: '/product/' + product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        created_at: product.created_at,
        image: product.image.url,
        thumbnail: product.image.formats.thumbnail.url,
        categories: product.categories[0].id
      })
    }
  })
}
