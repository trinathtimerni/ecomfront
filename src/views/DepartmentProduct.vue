<template>

     <v-container>
       <v-row>
         <div class="category-title">
            <div class="category-content">
              <span role="text">
                {{this.$route.params.id}}
              </span>
              <span>({{this.department_products.length}})</span>
            </div>
         </div>
         <department-product-sidebar />
         <department-product-view />
       </v-row>
       </v-container>
</template>
<script>
import {mapState} from "vuex"
import DepartmentProductSidebar from '../components/DepartmentProductSidebar'
import DepartmentProductView from '../components/DepartmentProductView'
export default {
  name: 'DeparmentProduct',
  components: {
    DepartmentProductSidebar,
    DepartmentProductView
  },
  data: () => ({
     
  }),
  computed: {
    ...mapState("product", ["department_products"]),
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