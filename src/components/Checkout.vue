<template>
  <v-container>
    <!-- offer Page Start -->
    <main class="checkout-wrapper">
      <div class="container py-5">
        <div class="col-md-12 bl-b">
          <div class="row">
            <div class="offset-md-4 col-md-8 my-n8">
              <!-- <div class="busket-wrapper-heading">
                    <p style="font-size: 17px; color: #666; font-weight: bold"> Basket </p>
                    <img src="assets/img/nortons.png" alt="">
                  </div> -->
              <p
                style="
                  font-size: 18px;
                  color: #666;
                  font-weight: 300;
                  letter-spacing: 1px;
                "
              >
                BASKET
              </p>
            </div>
          </div>
        </div>
        <div class="checkout-grid">
          <div class="checkout-grid-content">
            <div class="summary-sm d-sm-block d-md-none bl-b">
              <div class="total-cal">
                <p>Total (excluding delivery):</p>
                <p>£49.00</p>
              </div>

              <div class="add-to-busket">
                <button class="add-to-busket busket-list">
                  Continue to checkout
                </button>
              </div>
            </div>
            <div class="check-item bl-b" v-for="(cart, index) in carts" :key="index">
              <div>
                <img :src="`${baseEnvLocal}${cart.main_image}`" alt="item" />
              </div>
              <div>
                <div class="item-heading">
                  <div class="d-item-flex">
                    <p class="w-70 mb-n3">
                      {{cart.name}}
                    </p>
                    <a
                      @click="removeCart(cart.cart_id)"
                      style="color: black; text-decoration: underline"
                      class="remove"
                      >Remove item</a
                    >
                  </div>
                  <div>
                    <p class="mb-n1">Currently in stock online</p>
                  </div>
                </div>

                <div>
                  <p class="mb-n2" style="font-weight: 600">Quantity:</p>
                  <div class="d-item-flex">
                    <div class="input-group">
                      <div class="input-group-btn">
                        <div id="down" class="btn-up" @click="decrementQuantity(cart)">
                          <!-- <i class="fas fa-minus"></i>
                                            &#8722; -->
                          -
                        </div>
                      </div>
                      <div class="input-group-btn">
                        <input
                          type="text"
                          id="myNumber"
                          class="btn-up input-number"
                          v-model="cart.cart_quantity"
                        />
                      </div>

                      <div class="input-group-btn">
                        <div id="down" class="btn-up" @click="incrementQuantity(cart)">
                          <!-- <i class="fas fa-minus"></i>
                                            &#8722; -->
                          +
                        </div>
                      </div>
                    </div>
                    <div class="amount">
                      <p>£{{cart.cart_price}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="check-item bl-b">
              <div>
                <img src="../assets/img/item.png" alt="item" />
              </div>
              <div>
                <div class="item-heading">
                  <div class="d-item-flex">
                    <p class="w-70 mb-n3">
                      Kin V-Neck Gathered Back Jersey Dress, Khaki, XS
                    </p>
                    <a
                      href="#"
                      style="color: black; text-decoration: underline"
                      class="remove"
                      >Remove item</a
                    >
                  </div>
                  <div>
                    <p class="mb-n1">Currently in stock online</p>
                  </div>
                </div>

                <div>
                  <p class="mb-n2" style="font-weight: 600">Quantity:</p>
                  <div class="d-item-flex">
                    <div class="input-group">
                      <div class="input-group-btn">
                        <div id="down" class="btn-up" onclick=" down('0')">
                          -
                        </div>
                      </div>
                      <div class="input-group-btn">
                        <input
                          type="text"
                          id="myNumber"
                          class="btn-up input-number"
                          value="1"
                        />
                      </div>

                      <div class="input-group-btn">
                        <div id="up" class="btn-up" onclick="up('100')">+</div>
                      </div>
                    </div>
                    <div class="amount">
                      <p>£147.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="mt-4 d-none d-md-block">
              <a
                class="remove"
                style="
                  font-size: 15px;
                  text-decoration: underline;
                  color: black;
                  font-weight: 300;
                "
                @click="$router.push('/')"
                >Continue Shoping</a
              >
            </div>
          </div>
          <div class="summary d-none d-md-block">
            <div class="summary-content">
              <div class="summary-content-title">
                <p class="mb-n1"><strong>Summary</strong></p>
                <div class="bl-b">
                  <p
                    style="
                      font-family: 'Open Sans';
                      font-weight: 300;
                      letter-spacing: 1px;
                    "
                  >
                    Spend a further £17.01 to qualify for FREE Standard UK
                    mainland delivery. Our Click & collect service is FREE for
                    orders over £30
                  </p>
                  <p class="mb-n2">
                    &#10003; Free Standard UK Mainland delivery
                  </p>
                  <p>More delivery options at checkout</p>
                </div>
              </div>
              <div class="total-cal">
                <p>Total (excluding delivery):</p>
                <p>£ {{carts.reduce((acc, item) => acc + item.cart_price, 0)}}</p>
              </div>

              <div class="add-to-busket">
                <button class="add-to-busket busket-list" @click="clickCollect()">
                  Continue to checkout
                </button>
              </div>

              <div class="payment-method">
                <a href="#"
                  ><img
                    class="payemt_img"
                    src="assets/img/payment-icons1.svg"
                    alt=""
                /></a>
              </div>
            </div>
          </div>
          <div class="summary-sm d-sm-block d-md-none">
            <div class="summary-content">
              <div class="summary-content-title">
                <div class="pt-15">
                  <p>Spend a further £1.00 to qualify for:</p>
                  <p>&#10003; Free Standard UK Mainland delivery</p>
                  <p>More delivery options at checkout</p>
                </div>
              </div>
            </div>
            <div class="total-cal">
              <p>Total (excluding delivery):</p>
              <p>£49.00</p>
            </div>

            <div class="add-to-busket">
              <button class="add-to-busket busket-list">
                Continue to checkout
              </button>
            </div>
            <div class="mb-3 text-center">
              <a href="#" class="remove">Continue Shoping</a>
            </div>

            <div class="payment-method">
              <a href="#"
                ><img
                  class="payemt_img"
                  src="assets/img/payment-icons1.svg"
                  alt=""
              /></a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </v-container>
</template>
<script>
import {mapActions,mapState} from "vuex"
export default {
  name: "Checkout",
  data: () => ({
    baseEnvLocal: baseEnv,
    temp: {},
    // user: [],
    temp_decrement: {},
  }),
  computed: {
    ...mapState("cart", ["carts"]),
  },
  async created() {
    this.getCarts();
  },
  methods: {
    ...mapActions("cart", ["getCarts"]),
    clickCollect(){
      if(localStorage.getItem("auth_token") != null){
        this.$router.push("/click_collect")
      }
      else{
        this.$router.push("/login_state")
      }
    },
    incrementQuantity(item) {
      this.carts.forEach((element) => {
        if (element.pro_id == item.id) {
          this.temp = element;
        }
      });

      if (this.temp.cart_quantity >= 0) {
        let cart_price = (this.temp.cart_quantity + 1) * this.temp.product_price
        let data = {
          cart_id: this.temp.cart_id,
          price: cart_price,
          product_id: this.temp.pro_id,
          quantity: this.temp.cart_quantity + 1,
        };

        this.$store.dispatch("cart/UpdateCart", data).then(this.getCarts());
      } else {
        return;
      }
    },
    decrementQuantity(item) {
      this.carts.forEach((element) => {
        if (element.pro_id == item.id) {
          this.temp_decrement = element;
        }
      });
      if (this.temp_decrement.cart_quantity <= 1) {
        return;
      }
      let cart_price = (this.temp_decrement.cart_quantity - 1) * this.temp_decrement.product_price
      let data = {
        cart_id: this.temp_decrement.cart_id,
        product_id: this.temp_decrement.pro_id,
        price: cart_price,
        quantity: this.temp_decrement.cart_quantity - 1,
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
  }
};
</script>
