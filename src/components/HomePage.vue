<template>
  <div class="container">
  <div class="mt-md-4 mt-sm-0 row">
    <div class="col-lg-3">
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
    </div>
        <div class="col-lg-9 mt-4">
    
    <div class="right-side" v-if="products && products.length > 0">
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
          
            <div>
               <button type="submit" class="add-to-cart quick-view2  btn" :loading="loading" :disabled="loading" v-if="!CheckCart(product.id)"  @click="AddCart(product)" style="color: #000; border:2px solid #000">+ Add To Cart</button>
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
  </div>
  </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex"

export default {
  data: () => ({
    items: [{id: 1, value:'Price Low to High'},
    {id: 2, value:'Price High to Low'},
    ],
    baseEnvLocal: baseEnv,
    productsort: "",
  }),
  async created(){
    this.GetProducts();
  },
  computed: {
      ...mapState("product", ["products"]),
      ...mapState("cart", ["carts"]),
  },
  methods: {
    ...mapActions("product",["GetProducts"]),
    ...mapActions("cart", ["getCarts"]),
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
      // this.loading = true
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
          // this.loading = false
          localStorage.setItem("guest_id",this.guest_id)
          this.getCarts();
        })
        .catch(() => {
          // this.loading = false
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
        this.carts.length > 0 ? this.carts.find((item) => item.pro_id == productId) != undefined : false
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
      
      else{

      }
    }
  }
};
</script>

<style>
ul {
  list-style: outside none none;
  margin: 0;
  padding: 0;
}
img {
  max-width: 100%;
}
.filter-btn{
    border: 0;
    background: #f2f2f2;
    padding: 2px;
    display: -moz-inline-box;
    display: inline-flex;
    position: relative;
    flex-shrink: 0;
    width: 140px;
}
.filter-btn-content{
    display: block;
    font-size: 16px;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    width: 50%;
    color:#000;
    font-weight: 700;
}
.color-item.active {
    border: 1px solid #000;
}
.stock-title{
  color:black;
}
.color-side{
  width: 27px; 
  height:27px; 
  border-radius: 50%;
}
p {
  font-weight: normal;
  margin-bottom: 0;
  font-size: 16px;
  line-height: 1.5;
}
.stock-item{
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 16px 4px;
  text-decoration: none;
  color:#000;
}
.btn {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  background: #fff;
  text-align: center;
  outline: none;
  margin-top: 1.4rem;
  font-size: 18px;
  border: none;
  transition: .3s;
  border-radius: 50px;
  font-weight: 500;
}
.underline {
  text-decoration: underline;
}
.content-top-space {
  margin-top: 45px;
}

.box_shadow {
  border-radius: 5px;
  box-shadow: 0px 0px 8px 1px #0404040d;
  background: #fff;
}
.pt-top-100{
  padding-top: 100px;
}
.pb-top-100{
  padding-bottom: 100px;
}
.section-padding{
  padding-top: 60px;
}
.section-heading{
    font-size: 40px;
    font-weight: 700;
    line-height:1.5;
    color: #0910E2;
    text-align: center;
    padding-bottom: 30px;
    text-transform: uppercase;
}


@media only screen and (max-width: 348px)  {
  .right-side {
    grid-template-columns: repeat(1, minmax(0, 1fr))!important;
  }
  .quick-view2{
    font-size:12px!important;
  }
  .product-title h6{
    font-size:14px!important;
  }
  .product-title p{
    font-size:13px!important;
  }
  .product-title .content{
    min-height: 80px;
  }
}
@media only screen and (max-width: 480px)  {
  .right-side {
    grid-template-columns: repeat(2, minmax(0, 1fr))!important;
    gap: 2vw!important;
  }
  .product-title .content{
    min-height: 80px;
  }
  .product-title h6{
    font-size:14px!important;
  }
  .product-title p{
    font-size:13px!important;
  }
  .quick-view2{
    font-size:12px!important;
  }
}
@media only screen and (min-width: 480px) and (max-width: 768px)  {
  .right-side {
    grid-template-columns: repeat(2, minmax(0, 1fr))!important;
  }
}
#sidebar{
  border-right:1px solid #eee;
}
#sidebar h3{
  color:#262626;
  text-transform:uppercase;
  font-size:14px;
  font-weight:700;
  padding:35px 0 10px 0;
  letter-spacing:1px;
  clear:both;
}
#cart{padding:0px;}
#cart .empty{
  font-style:italic;
  color:#a0a3ab;
  font-size:14px;
  letter-spacing:1px; 
}
#sidebar .checklist{
  padding:0;
}

.checklist ul li{ 
  font-size:14px;
  font-weight:400;
  list-style:none;
  padding: 7px 0 7px 23px;
}
.filter-btn-content:first-child::before{
    content: "";
    background:transparent;
    border: 1px solid #000;
    position: absolute;
    left: 2px;
    top: 2px;
    bottom: 2px;
    width: -moz-calc(50% - 2px);
    width: calc(100% - 2px);
    transform: translateX(0);
    transition: transform .2s linear,-webkit-transform .2s linear,-moz-transform .2s linear;
}
.checklist li span{
  float:left;
  width:11px;
  height:11px;
  margin-left:-23px;
  margin-top:4px;
  border: 1px solid #d1d3d7;
  position:relative;  
}
.v-expansion-panel::before {
    box-shadow: none!important;
}

.brand-list{
  border-top: 1px solid rgb(185, 182, 182);
}
.brand-list,.brand-header{
  background-color:#ffff!important;
  padding-top: 5px!important;;
  padding-bottom:5px!important;
}
.brand-header{
  font-weight:600!important;
}
.v-expansion-panel--active > .v-expansion-panel-header, .v-expansion-panel-header {
  min-height:0!important;
  padding: 16px 18px 10px 0px!important;
}
.v-expansion-panel-content__wrap{
  padding:0!important;
}
.sizes li span, .categories .sizes li{
  -webkit-transition: all 300ms ease-out;
     -moz-transition: all 300ms ease-out;
      -ms-transition: all 300ms ease-out;
       -o-transition: all 300ms ease-out;
          transition: all 300ms ease-out;
}
.checklist li a{
  color:#676a74;
  text-decoration:none; 
  -webkit-transition: all 300ms ease-out;
     -moz-transition: all 300ms ease-out;
      -ms-transition: all 300ms ease-out;
       -o-transition: all 300ms ease-out;
          transition: all 300ms ease-out;
}
.checklist li a:hover{  
  color:#222;
  -webkit-transition: all 300ms ease-out;
     -moz-transition: all 300ms ease-out;
      -ms-transition: all 300ms ease-out;
       -o-transition: all 300ms ease-out;
          transition: all 300ms ease-out;
}
.checklist a:hover span{  
  border-color:#a6aab3; 
}


.quick-view{
  position: relative;
}

.best-saller:hover .cart-hover{
visibility: visible;
top: 10px;

}

.brand-item{
    padding: 1px 8px 13px 0;
    margin: 0 0 0 4px;
    align-items:center;
}
.color-item{
  align-items: center;
  border: 1px solid rgb(182, 177, 177);
}
.cart-hover {
    position: relative;
    left: 0;
    visibility: hidden;
}
/* .brand-list li a{
  color: #000;
  font-family: "Avenir";
  font-size: 17px;
} */
.brand-list li a {
    color: #000;
    font-family: cursive;
    font-size: 15px;
    font-weight: 100;
    letter-spacing: 1px;
}
.hide-class {
  display: block;
}
@media screen and (max-width: 600px) {
  .hide-class {
    display: none;
  }
  .reducer{
    margin-top: -60px;
  }
}
.slick-prev:before,
.slick-next:before {
  color: #555 !important;
}
.slick-prev:before {
  content: "\F0141";
  font: normal normal normal 40px/1 "Material Design Icons";
  position: relative;
  left: 0px;
  top: 0px;
}
.slick-next:before {
  content: "\F0142";
  font: normal normal normal 40px/1 "Material Design Icons";
  position: relative;
  left: 0px;
  top: 0px;
}

.slick-prev,
.slick-next {
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 35%;
  display: block;
  width: 30px;
  height: 30px;
  padding: 0;
  transform: translate(0%, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
  background: transparent;
}
.department{
  font-family: 'Open Sans';
  font-size: 12px;
  font-weight: 200;
  color: rgb(99, 99, 99);
}
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
  background-color: #6b6b6b!important;
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
