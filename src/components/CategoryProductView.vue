<template>
  <div class="col-lg-9 mt-4">
    <div class="sort-select">
            <v-select dense
          :items="items"
          :item-value="item => item.id"
          :item-text="item => item.value"
          v-model="productsort"
          @change="productOrdering()"
          label="Sort: Relevance"
          outlined
        ></v-select>
          </div>
    <div class="right-side">
      <div
        class="product-grid"
        v-for="(product, index) in products"
        :key="index"
      >
        <!-- <h6 class="best-saller">Best Saller</h6> -->
        <div class="product-image">
          <div class="relative">
          <a href="#">
            <img
              class="pic-1 absolute"
              @click="productDetails(product)"
              :src="`${baseEnvLocal}${product.main_image}`"
            />
          </a>
          </div>
          <div class="product-content">
            <div @click="quickview(product)">
              <a class="add-to-cart quick-view1 btn">Quick View</a>
            </div>
            <div>
               <button type="submit" class="add-to-cart quick-view2  btn" :loading="loading" :disabled="loading" v-if="!CheckCart(product.id)"  @click="AddCart(product)" style="color: #fff">+ Add To Cart</button>
            </div>
          </div>
        </div>
        <div class="product-bottom">
          <div class="product-title">
            <div class="categories-border content">
              <h6>ANYDAY</h6>
              <p style="font-weight:300" class="mb-n1">{{ product.name }}</p>
            </div>
            <div class="price categories-border">
              <p class="mb-n1" style="font-weight: 500">${{ product.price }}</p>
            </div>
            <ul class="rating categories-border">
              <li class="fa fa-star"></li>
              <li class="fa fa-star"></li>
              <li class="fa fa-star"></li>
              <li class="fa fa-star"></li>
              <li class="fa fa-star disable"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="quickViewModal" max-height="500" max-width="800">
      <v-card>
        <v-card-title class="pt-2 pb-0">
          <v-spacer></v-spacer>
        <span class="text-h6">
          Quick View
        </span>
           <v-spacer></v-spacer>
          <v-icon
            color="black"
            style="background-color:#fff"
            text
            @click="quickViewModal = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        
        <v-divider class="mt-0"></v-divider>
        <v-card-text>
        <div class="d-flex flex-row flex-row-reverse">
          <div class="col-md-6 px-6 py-2">
            <div class="quick-product">
              {{ quick_product.name }}
            </div>
            <div
              style="font-size: 18px"
              class="pt-6 d-flex flex-row justify-content-between"
            >
              <div>${{ quick_product.price }}</div>
              <div>5star</div>
            </div>
            <div class="pl-4 py-3 mt-4" style="background-color: #f2f2f2">
              <div>Best Seller</div>
              <div style="font-size: 14px; font-weight: 300">
                John Lewis & Partners Amazon Twist Front Bandeau Swimsuit,
                Navy/Multi
              </div>
            </div>
            <div
              class="py-3"
              style="color: #ff0000dd; font-weight: 300; font-size: 18px"
            >
              Reduced to clear
            </div>
            <div class="py-1" style="font-weight: 400; font-size: 15px">
              Free standard delivery over £50
            </div>
            <div
              class="py-1 pb-2"
              style="
                font-weight: 300;
                font-size: 15px;
                text-decoration: underline;
              " @click="productDetails(quick_product)"
            >
              View full product information
            </div>
            <div
              class="py-1 pb-2"
              style="
                font-weight: 300;
                font-size: 15px;
                border-bottom: 1px solid #ddd;
              "
            ></div>

            <div>
              <ul class="size-wrapper">
                    <li class="size-item">
                      <div class="size-btn py-2">XXL</div>
                    </li>
                    <li class="size-item">
                      <div class="size-btn py-2">XL</div>
                    </li>
                    <li class="size-item">
                      <div class="size-btn py-2">L</div>
                    </li>
                    <li class="size-item">
                      <div class="size-btn py-2">M</div>
                    </li>
                    <li class="size-item">
                      <div class="size-btn py-2">S</div>
                    </li>
                  </ul>
            </div>

            <div class="add-to-busket">
                <button
                  class="add-to-busket busket-list"
                  style="border-radius: 0px"
                >
                  Add to your basket
                </button>
                <button
                  style="border-radius: 0px;"
                  class="add-to-busket wish-list mt-n4"
                >
                  <i class="far fa-heart"></i> Add to wish-list
                </button>
              </div>
          </div>
          <div class="col-md-6 px-0 py-0 mt-n4">
            <slick ref="slick" class="slider-nav"
            :options="slickOptions" v-if="color_images.length">
              <div v-for="(images, index) in color_images" :key="index" class="basket-left-text">
                <img
                  :src="`${baseEnvLocal}${images.image}`"
                />
               <!-- <inner-image-zoom
              :src="`${baseEnvLocal}${quick_product.main_image}`"
              :zoomSrc="`${baseEnvLocal}${quick_product.main_image}`"
              zoomType="hover"
            /> -->
            </div>
            </slick>
            <slick ref="slick1" class="slider-for"
            :options="slickOptions1" v-if="color_images.length">
              <div v-for="(images, index) in color_images" :key="index" class="basket-left-text">
                <img
                  :src="`${baseEnvLocal}${images.image}`"
                />
               <!-- <inner-image-zoom
              :src="`${baseEnvLocal}${quick_product.main_image}`"
              :zoomSrc="`${baseEnvLocal}${quick_product.main_image}`"
              zoomType="hover"
            /> -->
            </div>
            </slick>
          </div>
        </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InnerImageZoom from "vue-inner-image-zoom";
import slick from 'vue-slick';
import lodash from 'lodash';
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import { mapState,mapActions} from "vuex";
import 'slick-carousel/slick/slick.css';
export default {
    components: {
    "inner-image-zoom": InnerImageZoom,
    slick
  },
  data: () => ({
     zoomerOptions: {
      zoomFactor: 4,
      pane: "container",
      hoverDelay: 300,
      namespace: "inline-container",
      move_by_click: false,
      scroll_items: 7,
      choosed_thumb_border_color: "#dd2c00",
      scroller_position: "left"
  },
  slickOptions: {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  asNavFor: '.slider-for'
            // Any other options that can be got from plugin documentation
    },
    slickOptions1: {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: true,
                focusOnSelect: true,
                centerMode: true,
                arrows:false,
                asNavFor: '.slider-nav'
            // Any other options that can be got from plugin documentation
    },
    // products: [],
    quickViewModal: false,
    loading:false,
    quick_product: {},
    baseEnvLocal: baseEnv,
    color_images: [],
    filter_products: [],
    productsort: "",
    user_id: '',
    guest_id: '',
    items: [{id: 1, value:'Price Low to High'},
    {id: 2, value:'Price High to Low'},
    {id: 3, value:'Newness'},
    {id: 4, value:'Popularity'},
    {id: 5, value:'Rating'}
    ],
     apiArg: {
          child_category_id: '',
        }
  }),
  async created() {
      await this.categoryProduct();
      this.getCarts();
      // this.getFilterProducts();
  },
  computed: {
    ...mapState("product", ["products"]),
    ...mapState("cart", ["carts"]),
    // ...mapGetters({
    //   filter_products: 'product/products'
    // })
    // ...mapState("product", ["color_images"]),
  },
  methods: {
    ...mapActions("cart", ["getCarts"]),
    async categoryProduct() {
      this.$store
        .dispatch("product/getCategoryProducts", {
          child_category_id: this.$route.params.id,
        })
        .then(() => {
          // if(this.filter_products.length != this.products.length){
          //   this.filter_products = this.$store.state['product/products']
          // }
          
        })
        .catch(() => {});
    },
    // getFilterProducts()
    // {
    //   this.filter_products = this.products
    // },
    quickview(product)
    {
      this.color_images = []
      this.ProductGalleryImages(product)
      this.quick_product = product
      this.quickViewModal = true
    },
    async ProductGalleryImages(product) {
      axios.post('api/product/get_product_gallery_images',{
          product_id: product.id,
        })
      // this.$store
      //   .dispatch("product/getProductsGalleryImages", {
      //     product_id: product.id,
      //   })
        .then((response) => {
          this.color_images = response.data
        })
        .catch(() => {});
    },
    productDetails(product){
      this.$store
        .dispatch("product/getProductDetails", this.$route.params.id
        )
        .then(() => {
          this.$router.push({ name: "Product", params: { id: product.id}})
        })
        .catch(() => {});
      // this.$router.push('/product_info').catch(() => {});
      // this.$router.push({ name: "Product", params: { id: product.id}}).catch(() => {});
    },
    AddCart(item) {
      if(item.variation != null){
        this.quick_product = item
        this.quickViewModal = true
      }
      else{
      this.loading = true
      if (localStorage.getItem("auth_token") != null) {
        let user = JSON.parse(localStorage.getItem("user_data"));
        console.log(user)
        this.user_id = user.id;
      }
      else if(localStorage.getItem("guest_id") != null || localStorage.getItem("guest_id") != ''){
        this.guest_id = localStorage.getItem("guest_id");
      }
      else{
       var uuid = require("uuid");
        var r = uuid.v4();
        console.log("random number",r)
        this.guest_id = r;
      }
      let data = {
        product_id: item.id,
        guest_id: this.guest_id,
        user_id: this.user_id,
        price: item.price,
        quantity: 1,
      };
      this.$store
        .dispatch("cart/AddCart", data)
        .then(() => {
          this.loading = false
          localStorage.setItem("guest_id",this.guest_id)
          this.getCarts();
        })
        .catch(() => {
          this.loading = false
        });
      }
    },
    // Quantity(item) {
    //   var quantity = "";
    //   this.carts.map((element) => {
    //     if (element.pro_id === item.id) {
    //       quantity = element.quantity;
    //     }
    //   });
    //   return quantity;
    // },
    CheckCart(productId) {
      return (  
        this.carts.find((item) => item.pro_id == productId) != undefined
      );
    },
    productOrdering(){
      console.log(this.productsort)
      console.log(this.products)
      this.filter_products = this.products
      if(this.productsort == "2"){
        this.filter_products = _.orderBy(this.filter_products,'price','desc')
        this.$store.dispatch("product/updateSearchProducts",this.filter_products).then((
      )=>{}).catch({})
      }
      else if(this.productsort == "1"){
        this.filter_products = _.orderBy(this.filter_products,'price','asc')
        this.$store.dispatch("product/updateSearchProducts",this.filter_products).then((
      )=>{}).catch({})
      }
      else if(this.productsort == "3"){
        this.filter_products = _.orderBy(this.filter_products,'created_at','asc')
        this.$store.dispatch("product/updateSearchProducts",this.filter_products).then((
      )=>{}).catch({})
      }
      else if(this.productsort == "5"){
        this.filter_products = _.orderBy(this.filter_products,'review','asc')
        this.$store.dispatch("product/updateSearchProducts",this.filter_products).then((
      )=>{}).catch({})
      }
      else{

      }
    }
  },
};
</script>

<style>
.product-grid {
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.product-title h6{
  font-size:15px;
  margin-bottom: 3px;
}
.product-title p{
  font-size:15px;
}
.quick-product{
  font-size:19px;
  font-weight:100;
  font-family: 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif;
}
.sort-select{
  width:25%;
}
@media only screen and (max-width: 480px)  {
  .sort-select {
    width:50%;
  }
}

.v-text-field--outlined.v-input--dense .v-label--active {
    opacity: 0;
}
.v-dialog > .v-card > .v-card__text {
    padding: 0 24px 0 20px;
}

.slick-prev, .slick-next {
    right: 0;
    background-color: white!important;
    border-radius: 50%;
}
.slick-next:before,.slick-prev:before {
  font-size:32px!important;
}

.slick-prev:before, .slick-next:before {
    color: #000 !important;
}
.slick-prev{
  left:0;
  z-index:999;
}
.v-dialog > .v-card > .v-card__text {
    padding: 4px!important;
}
.slick-current.slick-active.slick-center{
  border-bottom: 1px solid #000;
}

.slider-nav img{
  min-height: fit-content;
}
.product-grid .product-image {
  position: relative;
  transition: all 0.3s ease 0s;
}

.product-grid .product-image img {
    max-width: 100%;
    max-height: 209px;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.product-grid .product-image {
  position: relative;
  transition: all 0.3s ease 0s;
  overflow: hidden;
}

.product-grid .product-content {
  text-align: center;
  padding: 5px 10px;
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -100px;
  z-index: 1;
  transition: all 0.3s;
}

.product-grid:hover .product-content {
  bottom: 15px;
}

.product-grid .add-to-cart {
  display: inline-block;
    font-size: 13px;
    font-weight: 600;
    background: #000;
    padding: 6px 12px!important;
    margin: 4px auto;
    width: 80%;
    border-radius: inherit;
    width: 80%;
    height: auto!important;
}

.right-side {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1vw;
}
.categories-border {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 0px;
}
.add-to-cart.quick-view2:hover {
  background-color: #6b6b6b;
}
.add-to-cart.quick-view1:hover {
  border: 2px solid #000;
}
.add-to-cart.quick-view1 {
  background: #fff;
  border: 1px solid #000;
  color: #000;
}

/* correction */
.relative {
    background-color:transparent;
    height: 100%;
    padding-bottom: 100%;
    opacity: 1;
    position: relative;
    margin:10%;
}


.absolute {
    position: absolute;
}
</style>