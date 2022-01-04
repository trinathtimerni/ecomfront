<template>
  <div>
    <v-container>
      <v-navigation-drawer hide-overlay class="mobile_drawer" width="320" v-model="drawer" absolute right temporary>
      <div
        class="d-flex flex-row justify-content-between px-3 py-3"
        style="border-bottom: 1px solid #BBB"
      >
        <div>
          <h3 class="pt-2 category-drawer">Shop By Category</h3>
        </div>
      </div>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <div v-for="(category, index) in categories" :key="index">
            <v-list-item
              style="border-bottom: 1px solid #BBB; border-radius: 0px"
              class="d-flex flex-row justify-content-between"
              @click="activeSubDrawer(index)"
            >
              <v-list-item-title class="drawer-title"
                style="font-family: Poppins; font-weight: 300"
                @click="toggleNavigationLevelOne(category.name)"
              >{{ category.name }}</v-list-item-title>
              <v-icon @click="toggleNavigationLevelOne(category.name)" style="background-color: #FFFFFF00;">mdi-chevron-right</v-icon>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer hide-overlay width="320" class="mobile_drawer" v-model="sub_drawer" absolute right temporary>
      <div class="d-flex flex-row justify-content-between px-1 py-2"
      style="border-bottom: 1px solid #BBB"
      >
        <div class="d-flex">
          <v-icon
            @click="
              sub_drawer = false;
              sub_sub_drawer = false;
              drawer = true;
            "
            style="background-color: #FFFFFF00;"
          >mdi-chevron-left</v-icon>
          <div class="pt-2" style="font-family: 'Poppins'; font-size: 17px; font-weight: 300">{{ temp_navigation_title_level_one }}</div>
        </div>
      </div>
      
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <div>
          <h3 class="pt-2 ml-3 category-drawer">{{ temp_navigation_title_level_one }}</h3>
        </div>
          <div v-for="(category, index) in temp_sub_category" :key="index">
            <v-list-item
              style="border-bottom: 1px solid #BBB; border-radius: 0px"
              class="d-flex flex-row justify-content-between"
              @click="activeSubSubDrawer(category)"
            >
              <v-list-item-title class="drawer-title"
                style="font-family: Poppins; font-weight: 300"
                @click="toggleNavigationLevelTwo(category.name)"
              >{{ category.name }}</v-list-item-title>
              <v-icon @click="toggleNavigationLevelTwo(category.name)" style="background-color: #FFFFFF00;">mdi-chevron-right</v-icon>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer hide-overlay width="320" class="mobile_drawer" v-model="sub_sub_drawer" absolute right temporary>
      <div class="d-flex flex-row justify-content-between px-1 py-2"
        style="border-bottom: 1px solid #BBB"
      >
        <div class="d-flex">
          <v-icon
            @click="
              sub_sub_drawer = false;
              drawer = false;
              sub_drawer = true;
            "
            style="background-color: #FFFFFF00;"
          >mdi-chevron-left</v-icon>
          <div class="pt-2" style="font-family: 'Poppins'; font-size: 16px; font-weight: 300">{{ temp_navigation_title_level_two }}</div>
        </div>
      </div>
      
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <div>
          <h3 class="pt-2 ml-3 category-drawer">{{ temp_navigation_title_level_two }}</h3>
        </div>
          <div v-for="(category, index) in temp_sub_sub_category" :key="index">
            <v-list-item style="border-bottom: 1px solid #BBB; border-radius: 0px">
              <v-list-item-title class="drawer-title" style="font-family: Poppins; font-weight: 300" @click="getCategoryProduct(category)">{{ category.name }}</v-list-item-title>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
      <div class="p-15 topbar">
        <div class="topbar-logo">
          <div class="d-flex-wrapper">
            <div class="d-sm-logo">
              <a @click="toHome()">
                <img
                  height="50"
                  :src="require('@/assets/img/Final-logo.svg')"
                />
              </a>
            </div>
            <div class="user-tools d-sm-block d-md-none">
              <nav>
                <ul class="user-tab">
                  <li class="user-item">
                    <a @click="toAccount()">
                      <v-icon>mdi-account-outline</v-icon>
                    </a>
                  </li>
                  <li class="user-item">
                    <a href>
                      <v-icon>mdi-heart-outline</v-icon>
                    </a>
                  </li>
                  <li class="user-item">
                    <a @click="showCart = !showCart">
                      <v-icon>mdi-cart-outline</v-icon>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="d-sm-block d-md-none">
              <v-icon v-if="drawer != true && sub_drawer != true && sub_sub_drawer != true" style="background-color: #fff" @click="drawer = !drawer"
                >mdi-menu</v-icon
              >
              <v-icon v-if="drawer != false || sub_drawer !=false || sub_sub_drawer != false" style="background-color: #fff" @click="
              drawer = false;
              sub_drawer = false;
              sub_sub_drawer = false;
            "
                >mdi-close</v-icon
              >
            </div>
          </div>
        </div>
        <div class="search pt-2" v-bind:class="{'active' : search_item}">
          <v-text-field
            dense
            v-model="productSearch"
            append-icon="mdi-magnify"
            placeholder="search"
            @click="getSearchItem()"
            @input="getProduct()"
            outlined
            flat
            hide-details
            class=""
          ></v-text-field>
   <div class="search-list" v-if="search_content">
     <div class="search-main">
       <div class="search-keywords">
         <p class="title-keywords">Suggested Keywords</p>
         <ul v-if="search_products.keywords.length > 0">
            <li class="pl-4 pb-3" v-for="(keyword, sl) in search_products.keywords" :key="sl" @click="getCategoryProduct(keyword)">
              {{keyword.name}}
            </li>
         </ul>
       </div>
       <div class="search-product-list">
         <p class="search-title">Matching Product</p>
         <div v-if="search_products.products.length > 0">
           <a class="search-product-item" v-for="(product, index) in search_products.products.slice(0,4)" :key="index" @click="productDetails(product)">
             <div class="search-item-product">
               <img :src="`${baseEnvLocal}${product.main_image}`">
                <div class="search-product-info">
                  <div class="search-product-main">
                    <p class="search-product-title">
                        {{product.name}}
                    </p>
                    <span class="search-product-promo">
                      save $5 every spend 
                    </span>
                  </div>
                </div>
               <div class="search-product-price">
                 ${{product.price}}
               </div>
              </div>
           </a>
         </div>
         <div class="align-center">
         <button class="apply-btn" v-if="search_products.products.length > 4">View all Products ({{search_products.products.length}})</button>
         </div>
       </div>
       </div>
     </div>
        </div>
        <div class="user-tools d-none d-md-block">
          <nav>
            <ul class="user-tab">
              <li class="user-item" v-if="user == null">
                <a @click="toSignIn()">Sign In</a>
              </li>
              <li class="user-item" v-else @mouseover="Account = true"
                  >
                <a>Hello {{user.name}}</a>
              </li>
              <li class="user-item">
                <a @click="toAccount()">
                  <v-icon>mdi-account-outline</v-icon>
                </a>
              </li>
              <li class="user-item">
                <a href>
                  <v-icon>mdi-heart-outline</v-icon>
                </a>
              </li>
              <li
                style="cursor: pointer"
                @click="showCart = !showCart"
                class="user-item"
              >
                <a>
                  <v-icon>mdi-cart-outline</v-icon>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="account-menu-container" v-if="Account != false">
          <div class="account-menu" @mouseover="Account = true"
                  @mouseleave="Account = false">
            <div class="account-menu-header">
              <h5>My Account</h5>
            </div>
            <div class="account-menu-body">
              <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item @click="toAccount()"
              style="border-bottom: 1px solid #BBB; border-radius: 0px"
              class="d-flex flex-row justify-content-between"
            >
              <v-list-item-title class="account-title"
                style="font-family: Poppins; font-size:15px!important; font-weight: 300"> My Account
              </v-list-item-title>
            </v-list-item>
              <v-list-item
              style="border-bottom: 1px solid #BBB; border-radius: 0px"
              class="d-flex flex-row justify-content-between"
            >
              <v-list-item-title class="account-title"
                style="font-family: Poppins; font-size:15px!important; font-weight: 300"> Wishlist
              </v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout"
              style="border-bottom: 1px solid #BBB; border-radius: 0px"
              class="d-flex flex-row justify-content-between"
            >
              <v-list-item-title class="account-title"
                style="font-family: Poppins; font-size:15px!important; font-weight: 300"> Sign Out
              </v-list-item-title>
            </v-list-item>
        </v-list-item-group>
      </v-list>
            </div>
          </div>
      </div>
    </v-container>
    <v-scroll-x-reverse-transition>
      <div id="chat-panel" v-if="showCart">
        <div id="before-submission">
          <div id="chat-panel-top-section">
            <div id="chat-panel-header">
              <div class="d-flex flex-row justify-content-between">
                <p class="mbottom">Your Cart</p>
                <p>
                  <v-icon
                    style="background-color: #000!important"
                    color="white"
                    @click="showCart = false"
                    >mdi-close</v-icon
                  >
                </p>
              </div>
            </div>

            <div id="chat-panel-message" v-if="carts.length > 0">
              <div v-for="(cart, index) in carts" :key="index" class="check-item bl-b">
                <div style="min-width: 50px; margin-right: 5px">
                  <img :src="`${baseEnvLocal}${cart.product.main_image}`" alt="item" />
                </div>
                <div>
                  <div class="item-heading">
                    <div class="d-item-flex">
                      <p
                        class="w-70 mb-n3"
                        style="font-weight: 200; font-size: 14px"
                      >
                        {{cart.product.name}}
                      </p>
                      <a @click="removeCart(cart.id)" style="color: black" class="remove"
                        ><v-icon color="black">
                          mdi-trash-can-outline
                        </v-icon></a
                      >
                    </div>
                  </div>

                  <div class="amount mt-2">
                    <p>$ {{cart.price}}</p>
                  </div>

                  <div>
                    <p
                      class="mb-n2 mt-2"
                      style="font-weight: 600;"
                    >
                      Quantity:
                    </p>
                    <div class="d-item-flex">
                      <div class="d-flex">
                        <div class="input-group-btn" @click="decrementQuantity(cart)">
                          <div id="down" class="btn-up">
                            -
                          </div>
                        </div>
                        <div class="input-group-btn">
                          <input
                            readonly
                            type="text"
                            class="btn-up input-number"
                            v-model="cart.quantity"
                          />
                        </div>

                        <div class="input-group-btn" @click="incrementQuantity(cart)">
                          <div id="up" class="btn-up">
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                id="submitQuery"
                @click="
                  showCart = false;
                  toCart();
                "
                type="submit"
              >
                Checkout
              </button>
            </div>
            <div class="cart_empty p-5" v-if="carts.length <= 0">
              <p> Your Cart is Empty Now </p>
            </div>
          </div>
        </div>

        <div id="after-submission">
          <div id="chat-panel-top-section">
            <div id="chat-panel-header">
              <p id="chat-department">To : <span></span></p>
              <div class="chat-status-wraper">
                <p id="chat-status"></p>
              </div>
              <!-- <button id="chat-icon-close">x</button> -->
            </div>

            <div id="chat-panel-message">
              <div id="chat-conversation"></div>
            </div>
          </div>

          <div id="chat-input-panel">
            <input
              type="text"
              name=""
              id="chat-input"
              placeholder="Ask a question..."
            />
            <button
              id="chat-enter-icon"
              style="padding-top: 10px !important"
            ></button>
          </div>
        </div>
      </div>
    </v-scroll-x-reverse-transition>

    <div
      style="cursor: pointer"
      @click="showCart = !showCart"
      class="basket-button d-flex flex-column-reverse">
    <div class="total">
      <span class="mr-1"></span>
      <span>{{ carts.length > 0 ? carts.reduce((acc, item) => acc + item.price, 0) : 0}} Tk</span>
    </div>
    <div class="item-count">
      <v-icon class="ml-5">mdi-shopping</v-icon>
      <p class="basket-item">
        <span> {{carts.length}} ITEMS </span>
      </p>
    </div>
    </div>
  </div>
</template>

<script>
// Utilities
import { mapMutations, mapState, mapActions } from "vuex";
// Components
import Cart from "../../components/core/Cart.vue";

export default {
  name: "CoreTopBar",
  computed: {},
  components: {
    Cart,
  },
  data: () => ({
    showCart: false,
    Account: false,
    baseEnvLocal: baseEnv,
    productSearch: "",
    drawer: false,
    sub_drawer: false,
    sub_sub_drawer: false,
    temp_sub_category: [],
    temp_sub_sub_category: [],
    temp_navigation_title_level_one: "",
    temp_navigation_title_level_two: "",
    temp: {},
    apiArg: {},
    search_item:false,
    search_products: [],
    search_content: false,
    // user: [],
    temp_decrement: {},
    // CART DRAWER
    cart_items: [],
    cart_drawer: false,
  }),
  async created() {
    this.getCarts();
    this.getUser();
    this.getCategories();
  },
  computed: {
    ...mapState("cart", ["carts"]),
    ...mapState("homepage", ["user"]),
    ...mapState("category", ["categories"]),
  },
  methods: {
    // ...mapMutations(["toggleDrawer"]),
    ...mapActions("cart", ["getCarts"]),
    ...mapActions("homepage", ["getUser"]),
    ...mapActions("category",["getCategories"]),
    toCart() {
      this.$router.push("/checkout");
    },
    onClick(e, item) {
      e.stopPropagation();

      if (item.to || !item.href) return;

      this.$vuetify.goTo(item.href.endsWith("!") ? 0 : item.href);
    },
    toHome() {
      this.$router.push("/");
    },
    getSearchItem()
    {
      this.search_item = true
    },
    productDetails(product){
      this.search_content = false
      this.search_item = false
      this.search_products = []
      this.productSearch = ""
      this.$store
        .dispatch("product/getProductDetails", this.$route.params.id
        )
        .then(() => {
          this.$router.push({ name: "Product", params: { id: product.id}})
        })
        .catch(() => {});
    },
    getProduct()
    {
      let criteria = this.productSearch
      console.log(criteria)
      if(criteria != null){
        let data = {
          search: criteria
        }
        this.search_content = true
        axios.post("api/get_search_products",data).then(
          response => {
            console.log(response.data)
            this.search_products = response.data
            console.log("keywords",this.search_products.keywords.length)
          }
        )
      }
    },
    async getCategoryProduct(category)
    {
      this.search_content = false
      this.search_item = false
      this.search_products = []
      this.productSearch = ""
      this.load = true
        this.apiArg.child_category_id = category.slug
        await this.$store.dispatch("product/getCategoryProducts",this.apiArg).then((res) => {
          this.load = false
          this.$router.push({ name: "CategoryProduct", params: { id: category.slug}});

          console.log(res.data);
        })
        .catch(() => {});
    },
    async toCategory(category)
    {
      await this.$store.dispatch("category/getCategory",category.slug).then((res) => {
        this.$router.push({ name: "CategoryViewPage", params: { id: category.slug}});
      })
        .catch(() => {});
    },
    activeSubDrawer(index) {
      this.temp_sub_category = this.categories[index].sub_category;
      this.drawer = false;
      this.sub_drawer = true;
    },
    activeSubSubDrawer(category) {
      if (category.child_category.length != 0) {
        this.temp_sub_sub_category = category.child_category;
        this.drawer = false;
        this.sub_drawer = false;
        this.sub_sub_drawer = true;
      }
    },
    toggleNavigationLevelOne(name) {
      this.temp_navigation_title_level_one = name;
    },
    toggleNavigationLevelTwo(name) {
      this.temp_navigation_title_level_two = name;
    },
    toSignIn() {
      this.$router.push("/login");
    },
    toAccount() {
      this.$router.push("/account");
    },
     incrementQuantity(item) {
      this.carts.forEach((element) => {
        if (element.id == item.id) {
          this.temp = element;
        }
      });

      if (this.temp.product.quantity >= 0) {
        let cart_price = (this.temp.quantity + 1) * this.temp.product.price
        let data = {
          cart_id: this.temp.id,
          price: cart_price,
          product_id: this.temp.product.id,
          quantity: this.temp.quantity + 1,
        };

        this.$store.dispatch("cart/UpdateCart", data).then(this.getCarts());
      } else {
        return;
      }
    },
    decrementQuantity(item) {
      this.carts.forEach((element) => {
        if (element.id == item.id) {
          this.temp_decrement = element;
        }
      });
      if (this.temp_decrement.product.quantity <= 1) {
        return;
      }
      let cart_price = (this.temp_decrement.quantity - 1) * this.temp_decrement.product.price
      let data = {
        cart_id: this.temp_decrement.id,
        product_id: this.temp_decrement.product.id,
        price: cart_price,
        quantity: this.temp_decrement.quantity - 1,
      };

      this.$store.dispatch("cart/UpdateCart", data).then(this.getCarts());
    },
    removeCart(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("cart/DeleteCart", id)
          .then((res) => {
            this.message = res.data.message;
            this.getCarts();
          })
          .catch(() => {});
      }
    },
    logout: function() {
      this.Account = false;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("user_data");
      this.getUser();
      this.getCarts();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* search product style */
.search{
  position:relative;
}
.search-title{
  font-size: 16px!important;
    padding-bottom: 20px;
    color: #333;
    font-weight: 700;
}
.apply-btn{
  text-transform: none;
    max-width: 50%;
    font-size: 15px;
    background-color: #000;
}
.search-item-product{
  display: flex;
    flex-grow: 1;
    align-items: flex-start;
}
.search-list{
    top: 96%;
    position: absolute;
    width: 100%;
    left: 0;
    z-index: 1099;
}
.search-product-item img{
  width: 70px;
    display: inline-block;
    vertical-align: top;
    height: auto;
}
.search-product-info{
  flex-grow: 1;
}
.search-product-price{
  text-align:right;
}
.search-product-main{
    display: inline-block;
    vertical-align: top;
    padding-left: 10px;
}
.search-product-title{
  padding-bottom: 8px;
    padding-top: 2px;
    font-weight: 700;
    color: #333!important;
    font-size: 14px!important;
    line-height: 1.25;
}
.search-main{
  background-color: #fff;
    position: relative;
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    border: 1px solid #d0d0d0;
    border-top:none;
    left: -1px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}
.search-keywords{
    flex-grow: 1;
    padding: 20px 0;
}
.search-product-list{
  flex-grow: 4;
    -ms-flex-direction: column;
    flex-direction: column;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    border-left: 1px solid #d0d0d0;
    flex-basis: 0;
    padding: 20px;
    background-color: #fff;
}
.search-product-item{
  font-size: 0.875em;
    color: #4c4c4c;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-bottom: 15px;
}
.title-keywords{
  padding-left: 20px;
    padding-bottom: 12px;
    padding-right: 20px;
}

.btn-up {
  margin-top: 15px;
  max-height: 50px;
  max-width: 50px;
  padding: 5px;
}
.cart-wraper {
  background-color: red;
  height: 100px;
  width: 100px;
  position: fixed;
  z-index: 99999;
  top: 40vh;
  right: 0;
}

.item-count .v-icon{
  color: #fdd670;
  margin-top:4px;
  margin-bottom:4px;
}
/* account */
.account-menu-container{
    position: absolute;
    right: 17%;
    width: 320px;
    z-index: 106;
}
.account-menu{
    background: #fff;
    border: 1px solid #d8d8d8;
    position: relative;
    top: 2px;
}
.account-menu-header{
    align-items: center;
    display: -moz-box;
    display: flex;
    height: 64px;
    justify-content: center;
}
.account-menu:before{
  border-color: rgba(194,225,245,0) rgba(194,225,245,0) #d8d8d8!important;
    border-width: 11px!important;
    margin-left: -11px;
}
.account-menu:before,.account-menu:after{
  border: solid transparent;
    bottom: 100%;
    content: " ";
    height: 0;
    left: 147px;
    pointer-events: none;
    position: absolute;
    width: 0;
}
.account-menu:after{
    border-color: rgba(136,183,213,0) rgba(136,183,213,0) rgb(250, 247, 247)!important;
    border-width: 10px;
    margin-left: -10px;
}
.account-title{
  color: #141414;
    display: block;
    line-height: 24px;
    padding: 12px 48px 12px 16px;
    text-decoration: none;
    width: 100%;
    font-size: 1rem!important;
    letter-spacing: 1px!important;
}
.account-menu-body{
    border-top: 1px solid #d8d8d8;
    text-align: left;
}

/* end account */
.slide-enter-active {
  /* transition: right 300ms ease; */
  transition: all 400ms ease;
}

#chat-panel-message::-webkit-scrollbar {
  width: 8px;
  margin-left: 20px;
}
#chat-panel-message::-webkit-scrollbar-track {
  box-shadow: inset 0 0 8px #E5E5E5;
  border-radius: 5px;
}
#chat-panel-message::-webkit-scrollbar-thumb {
  background: #000;
  border-radius:5px;
}
#chat-panel-message::-webkit-scrollbar-thumb:hover {
  background: #000;
}

.slide-leave-active {
  /* transition: right 500ms cubic-bezier(1.0, 0.5, 0.8, 1.0); */
  transition: all 200ms ease;
}

.slide-enter,
.slide-leave-to {
  right: 0px;
  top: 194px;
}

.basket-item{
  color: #fdd670;
    margin-top: -2px;
    margin-bottom: 0;
    font-weight: 700;
    font-size: 12px;
    text-align: center;
    padding-top: 0;
}
.total{
  height: 25px;
    width: 100%;
    font-weight: 700;
    text-align: center;
    font-size: 13px;
    padding-top: 5px;
}

.item-count{
    height: 50px;
    background: #55584d;
    width: 100%;
}

.slide-enter-to,
.slide-leave {
  right: -360px;
  top: 194px;
}
.basket-button {
    opacity: .7;
    cursor: pointer;
    z-index:303;
    position: fixed;
    width: 65px;
    height: 75px;
    background: #f5fceb;
    right: 0;
    top: calc(110px + 30%);
    box-shadow: 0 0 16px -1px rgb(0 0 0 / 75%);
    display: none;
    transition: .1s ease-in-out;
}
@media screen and (min-width: 767px) {
  .search.active{
  width:66%!important;
  transition: .7s;
}
}

@media screen and (max-width: 480px) {
  .basket-button{
    position: fixed;
    z-index: 3;
    top: 84%;
    right: 0;
  }
  .search-main{
    flex-direction:column;
  }
}

#chat-icon {
  height: 60px;
  line-height: 60px;
  width: 60px;
  font-size: 2em;
  font-weight: bold;
  border-radius: 50%;
  background-color: white;
  color: white;
  border: 1px solid #ff7743;
  text-align: center;
  cursor: pointer;

  position: fixed;
  bottom: 5px;
  right: 10px;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);

  display: flex;
  justify-content: center;
  align-items: center;
}

#chat-icon .chat-image {
  height: 50%;
  width: 50%;
  border-radius: 50%;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xMzYsMjEwYy0yNC44MTQsMC00NSwyMC4xODYtNDUsNDV2MTIyYzAsMjQuODE0LDIwLjE4Niw0NSw0NSw0NWMyNC44MTQsMCw0NS0yMC4xODYsNDUtNDVWMjU1DQoJCQlDMTgxLDIzMC4xODYsMTYwLjgxNCwyMTAsMTM2LDIxMHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTYxLDI1NWMwLTQuMzI3LDAuNTcxLTguNTA3LDEuMjc4LTEyLjYzNEM0NC4yLDI0OC4yMDksMzEsMjY1LjAwMSwzMSwyODV2NjJjMCwxOS45OTksMTMuMiwzNi43OTEsMzEuMjc4LDQyLjYzNA0KCQkJQzYxLjU3MSwzODUuNTA3LDYxLDM4MS4zMjcsNjEsMzc3VjI1NXoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM3NiwyMTBjLTI0LjgxNCwwLTQ1LDIwLjE4Ni00NSw0NXYxMjJjMCwyNC44MTQsMjAuMTg2LDQ1LDQ1LDQ1YzQuNTEsMCw4Ljc4Mi0wLjg2OCwxMi44OTItMi4xMDgNCgkJCUMzODMuMzA4LDQzOC40MDEsMzY2LjMwNSw0NTIsMzQ2LDQ1MmgtNDcuNzYzYy02LjIxMy0xNy40MjItMjIuNzA3LTMwLTQyLjIzNy0zMGMtMjQuODE0LDAtNDUsMjAuMTg2LTQ1LDQ1DQoJCQljMCwyNC44MTQsMjAuMTg2LDQ1LDQ1LDQ1YzE5LjUzLDAsMzYuMDI0LTEyLjU3OCw0Mi4yMzctMzBIMzQ2YzQxLjM1MywwLDc1LTMzLjY0Nyw3NS03NXYtMzBWMjU1DQoJCQlDNDIxLDIzMC4xODYsNDAwLjgxNCwyMTAsMzc2LDIxMHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQ0OS43MjIsMjQyLjM2NkM0NTAuNDI5LDI0Ni40OTMsNDUxLDI1MC42NzMsNDUxLDI1NXYxMjJjMCw0LjMyNy0wLjU3MSw4LjUwNy0xLjI3OCwxMi42MzQNCgkJCUM0NjcuOCwzODMuNzkxLDQ4MSwzNjYuOTk5LDQ4MSwzNDd2LTYyQzQ4MSwyNjUuMDAxLDQ2Ny44LDI0OC4yMDksNDQ5LjcyMiwyNDIuMzY2eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjU2LDBDMTMxLjkyOCwwLDMxLDEwMC45MjgsMzEsMjI1djAuMzgzYzguOTM3LTYuNzY2LDE5LjI3Ny0xMS43MTcsMzAuNjg3LTEzLjkzNEM2OC42OTgsMTEwLjI1MSwxNTMuMDU0LDMwLDI1NiwzMA0KCQkJczE4Ny4zMDIsODAuMjUxLDE5NC4zMTMsMTgxLjQ0OGMxMS40MDksMi4yMTcsMjEuNzQ5LDcuMTY5LDMwLjY4NywxMy45MzRWMjI1QzQ4MSwxMDAuOTI4LDM4MC4wNzIsMCwyNTYsMHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==");
}

#chat-icon:focus {
  outline: none;
}

#chat-panel {
  top:20%;
  flex-direction: column;
  width: 375px;
  /* max-height: 500px; */
  justify-content: flex-end;
  background-color: transparent;
  filter: drop-shadow(4px 4px 4px #33333313);
  -webkit-overflow-y-scrolling: touch;
  position: fixed;
  right: 0;
  bottom: 60px;
  -webkit-tap-highlight-color: transparent;
  animation: chat_slide_up 400ms forwards;
  z-index: 310;
  display: block;
}


@media only screen and (max-width: 600px) {
  #chat-panel {
    bottom: 0px;
    top: 85px;
    width: 335px;
    position: absolute;
    z-index: 9;
    overflow-y: scroll;
  }

  #chat-panel .select-css {
    width: 307px !important;
  }
}

@media only screen and (max-width: 350px) {
  #chat-panel {
    top: 10px;
    bottom: 0px;
    width: 300px;
    overflow-y: scroll;
  }

  #chat-panel .select-css {
    width: 265px !important;
  }

  .basket-button {
    position: fixed;
    z-index: 3;
    bottom: 20px;
    right: 10px;
  }
}

#chat-panel #after-submission {
  height: 600px;
  display: none;
}

#chat-panel #before-submission{
    height: auto;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    min-height: 407px;
}

#chat-panel #before-submission #chat-panel-top-section {
  background-color: #f9f9f9;
  height: 100%;
  /* padding-top: 5px; */

  border-radius: 8px 8px 0px 0px;
  /* border: 2px solid #becfff; */
}

@keyframes chat_slide_up {
  0% {
    opacity: 0;
    transform: scale(0, 0);
    transform-origin: bottom right;
  }
  50% {
    transform: scale(1.03, 1.03);
    transform-origin: bottom right;
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
    transform-origin: bottom right;
  }
}

#chat-panel #chat-panel-top-section {
  background-color: #eceff1;
  height: 85%;
  border-radius: 8px 8px 0px 0px;
}

#chat-panel #chat-panel-header {
  padding: 15px 5px 0 32px;
  background-color: #000;
}

#chat-panel #after-submission #chat-panel-header {
  min-height: 100px;
  padding: 20px 32px;
  background-color: #000;
}

#chat-panel #chat-panel-header p {
  color: white;
}

#chat-panel #chat-icon-close,
#chat-panel #chat-icon-close1 {
  height: 30px;
  width: 30px;
  line-height: 30px;
  color: white;
  border: 1px solid white;
  border-radius: 50%;
  position: fixed;
  right: 28px;
}

#chat-panel #chat-panel-header #chat-icon-close:focus,
#chat-panel #chat-icon-close1:focus {
  outline: none;
}

#chat-panel #chat-panel-message {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  height: 400px;
  overflow-y:auto;
  padding-bottom: 10px;
  flex-direction: column;
}

#first-time {
  height: 90%;
  width: 100%;
  margin-top: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.v-navigation-drawer--close {
    display: none;
}

#chat-panel .select-css {
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: black;
  line-height: 1.3;
  padding-left: 5px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;

  text-indent: 5px;
  box-shadow: inset 2px 2px 4px 0px #33333313;
  filter: drop-shadow(4px 4px 4px #33333313);

  background-image: url("data:image/svg+xml,<svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'><path d='m0,6l12,12l12,-12l-24,0z'/><path fill='none' d='m0,0l24,0l0,24l-24,0l0,-24z'/></svg>");
}
#chat-panel .select-css::-ms-expand {
  display: none;
}
#chat-panel .select-css:hover {
  border-color: #888;
}

#chat-panel .select-css option {
  font-weight: normal;
}
#first-time #chat-subject {
  /* padding: 5px 10px;
    border: 1px solid black;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 98%; */
}

#first-time .input-box {
  padding: 10px 10px;
  width: 100%;
  height: 48px;
  background-color: white;
  color: #999999;
  border: 1px solid #d4d4d4;
}

@-moz-document url-prefix() {
  #first-time .input-box {
    margin-top: 5px;
  }

  #before-submission textarea {
    margin-top: 5px;
  }
}

/* #chat-panel #after-submit {
    height: 100%;
    width: 100%;
  } */

#chat-panel #after-submission .chat-status-wraper {
  /* background-color: white; */
  padding: 4px;
  border-radius: 1px;
}

#chat-panel #after-submission .chat-status-wraper p {
  font-size: 15px;
}

#chat-panel #after-submission #chat-header {
  height: 10%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding-left: 5px;
}

#chat-panel #after-submission #chat-conversation {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

#chat-panel #after-submission #chat-conversation .chat-text-wraper {
  /* margin-top: 2px; */
  /* margin-bottom: 50px; */
  /* width: 85%; */
}

#chat-panel #after-submission #chat-conversation .chat-text {
  padding: 6px 10px;
  border-radius: 6px 0 6px 0;
  position: relative;
  background: white;
  border: 2px solid rgba(100, 170, 0, 0.1);
  color: black;
  font-size: 12px;
  margin-top: 10px;
}

#chat-panel
  #after-submission
  #chat-conversation
  .chat-text-wraper
  .chat-text::after {
  content: "";
  position: absolute;
  border: 10px solid transparent;
  border-top: 10px solid white;
  border-left: none;
  bottom: -18px;
  left: 0px;
}

#chat-panel #after-submission #chat-conversation .right-chat-text-wraper {
  /* float: right; */
  /* width: 85%; */
}

#chat-panel
  #after-submission
  #chat-conversation
  .right-chat-text-wraper
  .chat-text::after {
  content: "";
  position: absolute;
  border: 10px solid transparent;
  border-top: 10px solid white;
  border-right: none;
  bottom: -18px;
  right: 0px;
}

#chat-panel #after-submission #chat-conversation .chat-user {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: black;
  margin-top: 5px;
}

/* //mobile drawer */
.mobile_drawer{
  top:85px!important;
  border-top:1px solid #ddd!important;
  box-shadow:none!important;
}

.category-drawer{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 18px;
  letter-spacing:1.01px;
  font-weight: 400px;
}

.drawer-title {
    font-size: 1rem!important;
    letter-spacing: 1px!important;
}
.v-icon.v-icon{
  font-size:24px!important;
}

/* end mobile drawer */
#chat-panel
  #after-submission
  #chat-conversation
  .right-chat-text-wraper
  .right-chat-user {
  float: right;
}

#chat-panel .chat-text p {
  margin-bottom: 0px;
}

#before-submission textarea {
  width: 100%;
  height: 135px;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 0px;
  background-color: white;
  font-size: 16px;
  resize: none;
  border: 1px solid #d4d4d4;
}

#before-submission textarea:focus,
#first-time .input-box:focus,
#chat-panel .select-css:focus {
  outline: none;
  border: 1px solid #becfff;
}

#before-submission #submitQuery {
  background-color: #000!important;
  border: none;
  overflow:unset!important;
  padding:15px;
  height:auto!important;
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  height: 48px;
  width: 200px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 0;
}

#before-submission #submitQuery:hover {
  opacity: 1;
}

#before-submission #submitQuery:focus {
  outline: none;
}

#chat-panel #chat-input-panel {
  background-color: #eceff1;
  margin-top: 5px;
  height: 20%;
  padding: 8px 0px 12px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

#chat-panel #chat-input {
  width: 85%;
  height: 50px;
  padding: 12px 15px;
  box-sizing: border-box;
  border: 1px solid #ff7743;
}

#chat-panel #chat-input:focus {
  outline: none;
}

#chat-panel #chat-input:focus {
  outline: none;
}

#chat-panel #chat-enter-icon {
  margin-top: 12px;
  height: 30px;
  width: 30px;
  /* background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC4xOTgiIGhlaWdodD0iMjIuMzM3IiB2aWV3Qm94PSIwIDAgMjQuMTk4IDIyLjMzNyI+DQogIDxwYXRoIGlkPSJJY29uX2lvbmljLW1kLXNlbmQiIGRhdGEtbmFtZT0iSWNvbiBpb25pYy1tZC1zZW5kIiBkPSJNMy4zNzUsMjYuODM3bDI0LjItMTEuMTY5TDMuMzc1LDQuNXY4LjY4N0wyMC43MSwxNS42NjksMy4zNzUsMTguMTVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMy4zNzUgLTQuNSkiIGZpbGw9IiNiZWNmZmYiLz4NCjwvc3ZnPg0K");
     */

  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK/SURBVHgB7VZLctpAEO0eQbIMuYG4gW8QGXsfbgA+QUhVjNkBO+wsgk8A3MDZByyfILkBygnCMkkZTd58BAIJEEZmE3cVjKaH6X68/onofxeWV5UvWKoUyi5/ngzpyCLg/ASrS4IH8upsKi8rdTqiCGLuxvZHB8LqSzbPvuNJMTHEzoPatefBc4dGmEWO7N7l60kZmXEBXUBLRu7lJ8+jZxDDQMMr0WsxxbZEPD/lnu9rfQthkNSOMXKH8484Dygn0Qxw35+RFLdaI53qAl0P1HN4avJEM1LF+RSMDGTLcykH4ehBG4RxPM7oz7ysQcXEOCyAEdmOqQFw3j2EEV5xglhj8eCkyzeTTtoFDSR0OrhZywPIKoDWuXKuQMz4evx228W8gHDCcFSSsWTcE0iAPzEkEY6yABEpJk1JSqdNGUQ54ZtxHYDLqBh110XSdnD/XjYrO20kGdhQkllFXnonJBzMF+SSka3NjFONNM9Bqc72ADvfKOmnPUbJ4sM8o3BuKuVR/c6cRdVj8ikc7Oqq6QDUHEAHpMMksKub0DNfcO+brzaF1KuC39knZLV80E+hNcQIDck3OkREpTUnbsyKS+mCfiMbWP3NAEhWNTlPrG2dR8Ui5khYx65mwaoThIdHsNuPfpsAgDJUrVhd8J/s/JX4gBbeMHbYOGa0+t/z/nqHTTLA9N6siwmZzbGalo6jekE9pvaRsLfoqneb7hUS6BcGQp+yO1YV4604xgCLEm2brDJQFNEk3Er/kma2NGutpfkxQXN2AIK30m/arqitOQ4UzfQ3HHJ/ktlxAoCl3zKwSv+CZgmal53D0jz26QBZMpBCv21IKrE8C0WVEd6KeJQlvvsBiOiX8qseIqnxne8V3ywSeyd0fqWc+wqQiW++jiMxDCzpXzrOWEb5AHCEmlQ/wMeDapN5vvW+yC75Bw5iWDDDKVClAAAAAElFTkSuQmCC");
}

#chat-panel #chat-enter-icon:focus {
  outline: none;
}

.error-input {
  border: 1px solid red !important;
}

.error-input:hover {
  padding: 5px 10px;
  width: 98%;
  border: 1px solid red;
}

.mbottom {
  margin-top: 7px !important;
}

.v-application p {
    margin-bottom: 10px!important;
}

.mbottom-25 {
  margin-bottom: 5px !important;
}
</style>
