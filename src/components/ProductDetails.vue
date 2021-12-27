<template>
  <v-container style="font-size: 'Open Sans'">
    <!-- basket Page Start -->
    <main class="py-5">
      <div class="container-fluid">
        <div class="basket-grid">
          <div class="basket-left-item">
            <div class="d-sm-block d-md-none">
              <div>
                <h3>{{product.details.name}}</h3>
              </div>
              <div class="exclusive">
                <div>
                  <div class="exclusive-paragraph">
                    <p>Exclusive to Classypicker</p>
                  </div>
                  <div class="rattig-flex">
                    <p>£{{product.details.price}}</p>
                    <ul class="rating d-flex">
                        <div v-for="index in 5" :key="index">
                           <li class="fa fa-star" v-if="product.details.review >= index"></li>
                           <li class="far fa-star" v-else></li>
                        </div>
                      <li>
                        <span>(8 reviews)</span>  
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="gird-2">
              <div v-for="(images, index) in color_images" :key="index" class="basket-left-text" @click="overlayToggle(images.image)">
                <inner-image-zoom
                  :src="`${baseEnvLocal}${images.image}`"
                  :zoomSrc="`${baseEnvLocal}${images.image}`"
                  zoomType="hover"
                />
              </div>
            </div>
            <div class="gird-3">
              <div class="basket-left-text" v-for="(images, index) in color_images" :key="index">
                <img :src="`${baseEnvLocal}${images.image}`" alt="" />
              </div>
              <!-- <div>
                <img :src="require('@/assets/img/img-3.jpg')" alt="" />
              </div>
              <div>
                <img :src="require('@/assets/img/img-3.jpg')" alt="" />
              </div> -->
            </div>
            <div class="d-sm-none d-md-block">
              <div class="py-4 text-center">
                <p
                  style="
                    font-family: 'Open Sans';
                    font-weight: 300;
                    font-size: 17px;
                    letter-spacing: 1px;
                  "
                >
                  For a chance to be featured on Classypicker.com, share your
                  pictures on Instagram by mentioning Classypicker with the
                  hashtag #LoveClassypicker 
                </p>
              </div>
              <div class="add-photo-feature">
                <div>
                  <div class="position-relative overly-hover">
                    <img
                      class="img-hover"
                      src="../assets/img/9a_Gift_50_GiftsForDad_Lifestyle.dam.35x23x720.ts=1615984925527.jpg"
                      alt=""
                    />
                    <div class="overly">
                      <div class="test-absolute">
                        <a href="#">@lidesdpko</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="feature-here bl-b bl-t">
                  <div>
                    <p>
                      <strong><i class="fas fa-upload"></i></strong> Your photo
                      could be featured here!
                      <a href="#"><strong>Add to photo</strong> </a>
                    </p>
                  </div>
                </div>
              </div>

              <div class="add-photo text-center mt-5 d-none d-md-block">
                <button class="add-to-busket">Add to photo</button>
              </div>
            </div>
          </div>
          <div class="basket-right-item">
            <div class="basket-right-wrapper">
              <div class="d-none d-md-block">
                <div>
                  <div style="font-size: 20px; font-weight: 400">
                    {{product.details.name}}
                  </div>
                </div>
                <div class="exclusive">
                  <div>
                    <div class="exclusive-paragraph">
                      <p style="font-family: 'Open Sans'; font-weight: 300">
                        Exclusive to Classypicker
                      </p>
                    </div>
                    <div class="rattig-flex">
                      <p>${{product.details.price}}</p>
                      <ul class="rating d-flex">
                        <div v-for="index in 5" :key="index">
                           <li class="fa fa-star" v-if="product.details.review >= index"></li>
                           <li class="far fa-star" v-else></li>
                        </div>
                       
                        
                        <!-- <li class="fa fa-star"></li>
                        <li class="fa fa-star"></li>
                        <li class="far fa-star"></li> -->
                        <li>
                          <span>(8 reviews)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="free-click-wrapper">
                <p v-if="product.details.delivery">{{product.details.delivery.name}} {{product.details.delivery.price}} </p>
                <a style="color: #000; font-size: 13px"
                  >View delivery & returns options</a
                >
              </div>
              <div class="color-wrapper">
                <p><span>Color:</span>{{product.details.colors}}</p>
                <div>
                  <ul class="color-btn-width d-flex flex-wrap" v-if="product.colors">
                    <li v-for="color in product.colors" :key="color.id">
                      <div class="color-btn red-btn d-flex">
                        <div
                          class="mr-2"
                          style="
                            width: 27px;
                            border-radius: 50%;
                            background-color: #a2dbfa;
                          "
                        ></div>
                        <div style="font-weight: 300">{{color.name}}</div>
                      </div>
                    </li>
                    <!-- <li>
                      <div class="color-btn red-btn d-flex">
                        <div
                          class="mr-2"
                          style="
                            width: 27px;
                            border-radius: 50%;
                            background-color: #ff616d;
                          "
                        ></div>
                        <div style="font-weight: 300">ZOMATO</div>
                      </div>
                    </li> -->
                  </ul>
                </div>
                <div>
                  <div class="mt-4 d-flex justify-content-between">
                    <p><span>Size:</span>M</p>
                    <p>
                      <a
                        style="
                          color: #000;
                          font-size: 13px;
                          text-decoration: underline;
                        "
                        href="#"
                        class="size-guide"
                        >Size guide</a
                      >
                    </p>
                  </div>
                  <ul class="size-wrapper" v-if="product.sizes">
                    <li class="size-item" v-for="size in product.sizes" :key="size.id">
                      <div class="size-btn py-2">{{size.sizes.size}}</div>
                    </li>
                    <!-- <li class="size-item">
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
                    </li> -->
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div class="pb-3">
                <p v-if="product.details.quantity > product.details.minimum_quantity">Currently in stock online</p>
                <p v-else>Currently Out of Stock</p>
              </div>
              <div class="add-to-busket">
                <button
                  class="add-to-busket busket-list"
                  style="border-radius: 0px" v-if="!CheckCart(product.details.id)" @click="AddCart(product.details)"
                >
                  Add to your basket
                </button>
                <button @click="addWishlist(product.details)"
                  style="border-radius: 0px"
                  class="add-to-busket wish-list"
                >
                  <i class="far fa-heart"></i> Add to wish-list
                </button>
              </div>
              <div>
                <div class="checkstock bl-b d-none d-md-block">
                  <a
                    @click="shareModal = true"
                    href="#"
                    style="color: #000"
                    class="checkstock1"
                  >
                    <i class="fas fa-share"></i>
                    Share
                  </a>
                  <a href="#" style="color: #000" class="checkstock2">
                    <i class="fas fa-map-marker-alt"></i>Check in-store stock
                  </a>
                </div>
                <div class="checkstock bl-b d-sm-block d-md-none">
                  <a href="#" class="checkstock1">
                    <i class="fas fa-share"></i>
                    Share
                  </a>
                </div>
                <div class="d-none d-md-block">
                  <div class="metarial bl-b pt-20">
                    <p><strong>Material</strong>- 100% cotton</p>
                  </div>
                  <div class="metarial bl-b pt-20">
                    <p>
                      Care Instructions - Machine washable at 30°C, Do not
                      tumble dry
                    </p>
                  </div>
                  <div class="metarial pt-20">
                    <p><strong>More From</strong>- Kin</p>
                  </div>
                </div>
              </div>
              <div class="d-sm-block d-md-none">
                <div class="py-4 text-center">
                  <p class="chance">
                     For a chance to be featured on Classypicker.com, share your
                  pictures on Instagram by mentioning Classypicker with the
                  hashtag #LoveClassypicker
                  </p>
                </div>
                <div class="add-photo-feature1">
                  <div>
                    <div class="position-relative overly-hover">
                      <img
                        class="img-hover"
                        src="assets/img/9a_Gift_50_GiftsForDad_Lifestyle.dam.35x23x720.ts=1615984925527.jpg"
                        alt=""
                      />
                      <div class="overly">
                        <div class="test-absolute">
                          <a href="#">@lidesdpko</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="add-photo text-center mt-5">
                  <button class="add-to-busket">Add to photo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-description mt-5">
        <div class="container-fluid">
          <div class="prouction-grid">
            <div class="product-content">
              <p class="product-title"><strong>PRODUCT DESCRIPTION</strong></p>
              <p>
              {{delHtmlTag(product.details.description)}}  
              </p>

              
              <p>
                <a href="#" class="learn-text"
                  >Learn more about mass balance here.</a
                >
              </p>
            </div>
            <div class="product-content">
              <p class="product-title">
                <strong>PRODUCT SPECIFICATION</strong>
              </p>
              <ul class="product-text">
                <li><strong>Product Code - </strong>{{product.details.product_id}}</li>
                <!-- <li>
                  <strong>Washing Instructions- </strong>Machine washable at
                  30°C
                </li>
                <li>
                  <strong>Type &amp; Number of Pockets- </strong>Two concealed
                  side pockets
                </li> -->
                <!-- <li><strong>Sleeve Type- </strong>Short Sleeve</li>
                <li><strong>Dress Shape- </strong>Straight, T Shirt</li>
                <li><strong>Length- </strong>Midi</li>
                <li><strong>Lining Type- </strong>Unlined</li>
                <li><strong>Neckline- </strong>V-Neck</li> -->
                <li><strong>Brand- </strong>{{product.details.brand.name}}</li>
                <div v-if="product.details.specification">
                  <li v-for="(spec,sl) in JSON.parse(product.details.specification)" :key="sl"><strong>{{ spec.split('-')[0] }}- </strong>{{ spec.split('-')[1] }}</li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <v-dialog v-model="shareModal" max-width="700">
        <v-card>
          <div
            style="background-color: #fff; border-bottom: 1px solid #ccc"
            class="text-center py-1 pt-4"
          >
            <p style="color: #000">Share Product</p>
          </div>

          <div class="px-4 py-4">
            <div class="d-flex flex-row pt-4">
              <v-text-field
                placeholder="http://eback.timetechri.co.uk/product_101_M_Red"
                outlined
                dense
                style="border-radius: 0px"
              />
              <v-btn
                color="black"
                dark
                style="border-radius: 0px; height: 45px; margin-top: -5px"
                >Copy Link</v-btn
              >
            </div>
            <div
              style="
                margin-top: -13px;
                margin-bottom: 10px;
                font-family: 'Open Sans';
                font-weight: 300;
              "
            >
              You can copy this link to share to your network
            </div>
            <div>
              <span class="pr-6" style="border-bottom: 1px solid #ccc">
                Share Now
              </span>
            </div>
            <div class="d-flex pt-2">
              <ShareNetwork
                network="facebook"
                url="https://news.vuejs.org/issues/180"
                title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                quote="The hot reload is so fast it\'s near instant. - Evan You"
                hashtags="vuejs,vite"
              >
                <i
                  style="color: black"
                  class="mr-4 fab fa-facebook-f fa-lg"
                ></i>
              </ShareNetwork>

              <ShareNetwork
                network="linkedin"
                url="https://news.vuejs.org/issues/180"
                title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                quote="The hot reload is so fast it\'s near instant. - Evan You"
                hashtags="vuejs,vite"
              >
                <i
                  style="color: black"
                  class="mr-4 fab fa-linkedin-in fa-lg"
                ></i>
              </ShareNetwork>

              <ShareNetwork
                network="pinterest"
                url="https://news.vuejs.org/issues/180"
                title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                quote="The hot reload is so fast it\'s near instant. - Evan You"
                hashtags="vuejs,vite"
              >
                <i
                  style="color: black"
                  class="mr-4 fab fa-pinterest-p fa-lg"
                ></i>
              </ShareNetwork>
              <ShareNetwork
                network="whatsapp"
                url="https://news.vuejs.org/issues/180"
                title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                quote="The hot reload is so fast it\'s near instant. - Evan You"
                hashtags="vuejs,vite"
              >
                <i style="color: black" class="mr-4 fab fa-whatsapp fa-lg"></i>
              </ShareNetwork>
              <ShareNetwork
                network="twitter"
                url="https://news.vuejs.org/issues/180"
                title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                quote="The hot reload is so fast it\'s near instant. - Evan You"
                hashtags="vuejs,vite"
              >
                <i style="color: black" class="mr-4 fab fa-twitter fa-lg"></i>
              </ShareNetwork>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </main>

    <div @click="overlayToggle()">
      <div class="overlay" v-show="overlay">
        <div class="desktop-view">
          <div class="d-flex flex-row">
          <div class="side-image-slider col-md-3">
            <div class="d-flex flex-column" v-for="(images, index) in color_images" :key="index">
              <!-- <img class="my-1" style="max-width: 80px; height: auto" src="/img/img-3.44087e2a.jpg" /> -->
              <img class="my-1" style="max-width: 80px; height: auto" :src="`${baseEnvLocal}${images.image}`" alt="" />
            </div>
          </div>

          <div class="primary-view col-md-8">
            <!-- <inner-image-zoom
              src="/img/img-3.44087e2a.jpg"
              zoomSrc="/img/img-3.44087e2a.jpg"
              zoomType="hover"
            /> -->
            <inner-image-zoom v-if="temp_image"
                  :src="`${baseEnvLocal}${temp_image}`"
                  :zoomSrc="`${baseEnvLocal}${temp_image}`"
                  zoomType="hover"
                />
          </div>
          </div>
        </div>
      </div>
      
    </div>
  </v-container>
</template>

<script>
import {mapState, mapActions} from "vuex";
import InnerImageZoom from "vue-inner-image-zoom";
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";

export default {
  name: "ProductDetails",
  components: {
    "inner-image-zoom": InnerImageZoom,
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
  baseEnvLocal: baseEnv,
  user_id: "",
  temp_image: "",
  guest_id: "",
  images: {
          thumbs: [
            {
              id: 1,
              url: '/img/img-3.44087e2a.jpg'
            },
            {
              id: 2,
              url: '/img/img-3.44087e2a.jpg'
            },
            {
              id: 2,
              url: '/img/img-3.44087e2a.jpg'
            },
            {
              id: 2,
              url: '/img/img-3.44087e2a.jpg'
            },
            {
              id: 2,
              url: '/img/img-3.44087e2a.jpg'
            },
            {
              id: 2,
              url: '/img/img-3.44087e2a.jpg'
            }
          ],
          normal_size: [
            {
              id: 1,
              url: '/img/img-3.44087e2a.jpg'
            },
            {
              id: 2,
              url: '/img/img-3.44087e2a.jpg'
            }
          ],
          large_size: [
            {
              id: 1,
              url: '/img/img-3.44087e2a.jpg'
            },
            {
              id: 2,
              url: '/img/img-3.44087e2a.jpg'
            }
          ]
    },
    shareModal: false,
    overlay: false,
    // product: [],
    product_id: "",
    shareUrl: "http://eback.timetechri.co.uk/product_101_M_Red",
  }),
  created() {
    this.shareUrl = this.$route;
    this.productDetails();
    this.ProductGalleryImages();
    console.log(this.shareUrl);
  },
  computed: {
    ...mapState("product", ["product"]),
    ...mapState("product", ["color_images"]),
    ...mapState("cart", ["carts"]),
  },
  methods: {
    ...mapActions("cart", ["getCarts"]),
    overlayToggle(image) {
      this.temp_image = image;
      this.overlay = !this.overlay;
    },
    addWishlist(product){
      if(localStorage.getItem("auth_token") != null){
        let data = {
          product_id: product.id
        }
        this.$store.dispatch("wishlist/addWish",data).then(
          this.$router.push("/wish_list")
        ).catch(() => {});
      }
      else{
        this.$router.push("/login");
      }
    },
    delHtmlTag(str){
     var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
    },
    async productDetails(){
      await this.$store
        .dispatch("product/getProductDetails", this.$route.params.id
        )
        .then(() => {})
        .catch(() => {});
        // this.product = this.$store.getters['product/product']
        // console.log("product",this.product)
    },
    AddCart(item) {
      if (localStorage.getItem("auth_token") != null) {
        let user = JSON.parse(localStorage.getItem("user_data"));
        console.log(user)
        this.user_id = user.id;
      }
      else if(localStorage.getItem("guest_id") != null){
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
          localStorage.setItem("guest_id",this.guest_id)
          this.getCarts();
        })
        .catch(() => {});
    },
    CheckCart(productId) {
      return (
        this.carts.find((item) => item.pro_id == productId) != undefined
      );
    },
    async ProductGalleryImages() {
      this.$store
        .dispatch("product/getProductsGalleryImages", {
          product_id: this.$route.params.id,
        })
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.scroller-at-right .thumb-list .responsive-image[data-v-033bd07e], .scroller-at-left .thumb-list .responsive-image[data-v-033bd07e] {
    width: auto !important;
    height: 13% !important;
}

.overlay-object {
  position: relative;
  width: 400px;
  height: 200px;
  background-color: rgb(149, 150, 149);
  color: #fff;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: 555;
  background-color: #00000055;
}

main {
  padding: 0px;
  margin: 0px;
}
.color-wrapper > p {
  padding-bottom: 0px !important;
}
.exclusive {
  padding-bottom: 0px;
}
.size-wrapper {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0px -9px 12px 0;
}
.product-content p{
  text-align: justify;
}
</style>
