<template>
    <Layout>
        <h1>{{ $page.product.title}}</h1>
        <img :src="`http://localhost:1337${$page.product.image}`">
        <p>{{$page.product.description}}</p>
    </Layout>
</template>

<page-query>
query  {
  product(id: "5") {
    id
    title
    description
    created_at
    image
  }
}

</page-query>

<script>
export default {
    metaInfo() {
        return {
            title: this.$page.product.title
        }
    }
}
</script>