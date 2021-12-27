<template>
  <v-container>
       <v-row>
         <div class="category-title">
            <div class="category-content">
              <span role="text">
                {{this.$route.params.id}}
              </span>
            </div>
         </div>
         <category-view-sidebar />
         <category-view />
       </v-row>
    </v-container>
</template>

<script>
import CategoryViewSidebar from '../components/CategoryViewSidebar'
import CategoryView from '../components/categoryview'
import {mapState} from "vuex"
export default {
    name: "CategoryViewPage",
    components: {
        CategoryViewSidebar,CategoryView
    },
    data: () => ({
     
  }),
  computed: {
    // ...mapState("category", ["category"]),
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