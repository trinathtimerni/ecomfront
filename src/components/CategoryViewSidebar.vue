<template>
  <div class="col-lg-2 px-3">
          <ul class="sidebar_nav" v-if="category.length > 0">
              <li class="mb-3">
                  <h4 class="sidebar_title">Brands We Love</h4>
                  <ul v-if="cat_brands.length > 0">
                      <li v-for="(cat_brand, index) in cat_brands" :key="index">{{cat_brand.name}}</li>
                  </ul>
              </li>
              <li class="mb-3" v-for="(subcategory, index) in category[0].sub_category" :key="index">
                  <h4 class="sidebar_title">{{subcategory.name}}</h4>
                  <ul v-if="subcategory.child_category">
                      <li v-for="(childcategory,sl) in subcategory.child_category" :key="sl" @click="getCategoryProduct(childcategory)">
                          {{childcategory.name}}
                      </li>
                  </ul>
              </li>
          </ul>
  </div>
</template>

<script>
import {mapActions,mapState} from "vuex"
export default {
    name: "CategoryViewSidebar",
    data : () => ({
        brands: [],
        apiArg: {
            child_category_id: ""
        }
    }),
    async created(){
        this.getCategories()
        this.getSubCategory()
        this.getCatBrands()
    },
    computed:{
        ...mapState("category",["categories"]),
        ...mapState("category",["category"]),
        ...mapState("category",["cat_brands"])
    },
    methods: {
        ...mapActions("category",["getCategories"]),
        getSubCategory(){
            console.log("categories",this.categories)
            let category_id = this.$route.params.id
            this.$store
        .dispatch("category/getCategory",category_id)
        .then(() => {
            console.log("test")
        })
        .catch(() => {});
        console.log(this.category[0])
        },
        getCatBrands(){
            let category_id = this.$route.params.id
            console.log("for cat brands", category_id)
           this.$store
        .dispatch("category/getCatBrands",category_id)
        .then(() => {})
        .catch(() => {});
        }
        // async getCategoryProduct(category)
        // {
        // this.load = true
        //     this.apiArg.child_category_id = category.slug
        //     await this.$store.dispatch("product/getCategoryProducts",this.apiArg).then((res) => {
        //     this.load = false
        //     this.$router.push({ name: "CategoryProduct", params: { id: category.slug}});

        //     console.log(res.data);
        //     })
        //     .catch(() => {});
        // }
    }
}
</script>

<style>
.sidebar_nav {
    list-style: none;
    margin: 0;
    padding: 0;
}
.sidebar_title{
    color: #141414;
    font-size: 16px;
    letter-spacing: normal;
    margin: 0;
    padding: 8px 0;
    font-weight: 400;
    line-height: 1.25;
}
</style>