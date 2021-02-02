<template>
  <Layout v-slot="{ searchText }">
          <v-tabs v-model="tab" grow>
            <v-tab>All products</v-tab>
            <v-tab>Back</v-tab>
            <v-tab>Front</v-tab>
            <v-tab>Container</v-tab>
            <v-tab>Database</v-tab>
          </v-tabs>
          <v-row class="justify-space-around">
            <v-card
              v-for="edge in getProducts(searchText)"
              :key="edge.node.id"
              width="280"
              class="mt-5"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="`http://localhost:1337${edge.node.thumbnail}`"
              >
              </v-img>
              <v-card-title>{{ edge.node.title }} </v-card-title>

              <v-card-subtitle class="pb-0">
                {{ formatDate(edge.node.created_at) }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn @click="$router.push(`/product/${edge.node.id}`)" color="orange" text> More Info </v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
  </Layout>
</template>

<page-query>
query {
  products: allProduct {
    edges {
      node {
        id
        title
        description
        created_at
        thumbnail
        image
        created_at
        categories
      }
    }
  }
}
</page-query>


<script>
import moment from 'moment'
export default {
  metaInfo: {
    title: "Hello, world!",
  },
  data() {
    return {
      tab: 0,
      products: [],
    };
  },
  mounted() {
    this.products = this.$page.products.edges;
  },
  watch: {
    tab(val) {
      if (this.tab === 0) {
        this.showAllProducts();
      } else {
        this.showProductsByType(val);
      }
    },
  },
  methods: {
    showAllProducts() {
      this.products = this.$page.products.edges;
    },
    showProductsByType(val) {
      this.products = this.$page.products.edges.filter((edge) => {
        return edge.node.categories === val;
      })
    },
    formatDate(created_at) {
      return moment(created_at).format('MMMM Do YYYY, h:mm a')
    },
    getProducts(searchText){
return this.products.filter((edge) => {
  return edge.node.title.toLowerCase().includes(searchText.toLowerCase())
})
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
