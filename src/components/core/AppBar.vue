<template>
  <div>
    <div class="header_main">
      <v-container class="py-0">
        <b-navbar toggleable="lg" type="dark">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="navbar" style="min-width: 100%">
              <div class="dropdown" style="position: relative; min-width: 100%">
                <li class="d-flex flex-row justify-content-between">
                  <ul
                    class="dropbtn dropit px-3 py-2 hover_item"
                    v-for="(category, index) in categories"
                    :key="index"
                    @mouseover="toggleCategory(index); activeOverlay = true"
                    @mouseleave="activeOverlay = false"
                    @click="toCategory(category)"
                    style="font-weight: 300; list-style-type: none; font-size: 15px"
                  >
                    {{ category.name }}
                  </ul>
                </li>
                <div
                  style="min-width: 100%; background-color: white; z-index: 100; position: absolute; font-size: 13px; top:58px; border-top:1px solid #ddd"
                  class="d-flex flex-row flex-wrap"
                  @mouseover="activeOverlay = true"
                  @mouseleave="activeOverlay = false"
                >
                
                  <div
                    v-for="(sub_category, index) in temp_category"
                    :key="index"
                    class="px-3 col-md-3 py-4 dropdown-content"
                    style="min-height: 20px; font-weight: 500;"
                  >
                    <div style="margin-bottom: -10px">{{ sub_category.name }}</div>
                    <hr />
                    <div class="d-flex flex-column" style="margin-top: -10px;">
                      <div
                        v-for="(sub_sub_category, index) in sub_category.child_category"
                        :key="index" @click="getCategoryProduct(sub_sub_category)"
                        style="font-weight: 200;"
                        class="variant-change"
                      >{{ sub_sub_category.name }}</div>
                    </div>
                </div>                
                </div>
              </div>
              <!-- <b-btn @click="test()">asdf</b-btn> -->
              <!-- <b-nav-item href="#">Link</b-nav-item>-->
            </b-navbar-nav>
            <div v-if="activeOverlay" class="overlay"></div>
            <!-- Right aligned nav items -->
          </b-collapse>
        </b-navbar>
      </v-container>
    </div>
  </div>
</template>

<script>
// Utilities
import { mapMutations,mapState,mapActions } from "vuex";

export default {
  name: "CoreAppBar",
  data: () => ({
    activeOverlay: false,
    drawer: false,
    load: false,
    group: "",
    // categories: [],
    new_column_flag: false,
    temp_category: [],
    apiArg: {
          child_category_id: '',
        }
  }),
  async created(){
    this.getCategories()
  },
  computed: {
    ...mapState("category", ["categories"])
  },
  methods: {
    ...mapActions("category",["getCategories"]),
    ...mapMutations(["toggleDrawer"]),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href.endsWith("!") ? 0 : item.href);
    },
    toggleCategory(index) {
      this.temp_category = this.categories[index].sub_category;
    },
    
    async getCategoryProduct(category)
    {
      this.load = true
        this.apiArg.child_category_id = category.slug
        await this.$store.dispatch("product/getCategoryProducts",this.apiArg).then((res) => {
           this.$store
        .dispatch("category/getCategoryDelivery",category.slug)
          this.$store
        .dispatch("category/getCategoryBrands",category.slug)
          this.$store
        .dispatch("category/getCategoryColors",category.slug)
        console.log("category_product",res.data)
        let latest_products = res.data
            if (latest_products.length == 0) {
          return 
        }
        let max_obj = latest_products.reduce((a,b) => Number(a.price) > Number(b.price) ? a : b)    
        let min_obj = latest_products.reduce((a,b) => Number(a.price) < Number(b.price) ? a : b)    
        let length = res.data.length
        let range = 0
        if(length > 20){
          range = 5;
        }
        else if(length > 10){
          range = 3;
        }
        else if(length > 5){
          range = 2;
        }
        else{
          range = 1
        }
        let max = max_obj.price
        let min = min_obj.price
        // this.range = Math.ceil(max_obj.price / 100);
        console.log("max",max,range)
        let data = {
          max: max,
          min: min,
          range: range
        }
        this.$store
        .dispatch("category/getCategoryPrice",data)
          // this.load = false
          this.$router.push({ name: "CategoryProduct", params: { id: category.slug}});
          console.log(res.data);
        })
        .catch(() => {});
    },
    async toCategory(category)
    {
      console.log("main category", category)
      this.load = true
      await this.$store.dispatch("category/getCategory",category.slug).then((res) => {
        this.$store.dispatch("category/getCatBrands",category.slug)
        this.load = false
        this.$router.push({ name: "CategoryViewPage", params: { id: category.slug}});
      })
        .catch(() => {});
    }
  },
  async categoryData(){
    await this.$store.dispatch("category/getCategories");
    this.categories = this.$store.getters['category/categories']
  }
};
</script>


<style scoped>
.variant-change{
  cursor: pointer;
}
.variant-change:hover{
  color: #8585c7
}

.overlay {
  position: fixed;
  top:154px;
  left:0;
  right:0;
  bottom:0;
  background-color: rgba(0,0,0,.5);
  visibility: visible;
  color: white;
  text-align:center;
  z-index: 2;
}

.hover_item {
    position: relative;
    display: inline-block;
}
li.d-flex.flex-row.justify-content-between {
    position: relative;
    padding: 10px 0px;
}

.hover_item:hover:after{
  opacity: 1;
    visibility:visible;
}

.hover_item:after {
    content: '';
    position: absolute;
    bottom: -11px;
    left: 0px;
    width: 100%;
    height: 1px;
    background: #000;
    opacity: 0;
    visibility: hidden;
    z-index: 999999;
}
/* Dropdown Button */
.dropbtn {
  /* background-color: #04aa6d;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none; */
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  /* position: absolute; */
  background-color: #fff;
  min-width: 160px;
  /* box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); */
  z-index: 2;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  /* background-color: #3e8e41; */
}
</style>