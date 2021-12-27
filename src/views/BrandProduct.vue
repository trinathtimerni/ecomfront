<template>

     <v-container>
       <v-row>
         <div class="category-title">
            <div class="category-content">
              <span role="text">
                {{this.$route.params.id}}
              </span>
              <span>({{this.brand_products.length}})</span>
            </div>
         </div>
         <brand-product-sidebar />
         <brand-product-view />
       </v-row>
       </v-container>
</template>
<script>
import {mapState} from "vuex"
import BrandProductSidebar from '../components/BrandProductSidebar'
import BrandProductView from '../components/BrandProductView'
export default {
  name: 'BrandProduct',
  components: {
    BrandProductSidebar,
    BrandProductView
  },
  data: () => ({
     
  }),
  computed: {
    ...mapState("product", ["brand_products"]),
  },
}

</script>

<style>
.category-title{
    text-align: center;
    border-bottom: 1px solid #d8d8d8;
    padding: 31px 16px 29px;
    margin: 0 -16px;
}
.category-content{
  color: #141414;
    margin-top: 0;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1.07px;
    line-height: 20px;
    text-transform: uppercase;
    margin-bottom: 0;
}
</style>