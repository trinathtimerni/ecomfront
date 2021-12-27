<template>
  <v-container>
    <v-row>
      <div class="pt-10" v-bind:class="{ 'col-md-6': !finish, 'col-md-12': finish }">
        <v-stepper alt-labels v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">
              Delivery
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 2" step="2">
              Review
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              Complete
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-content step="1">
          <div class="box">
            <div class="box-item" @click="deliveryCheck()">
              <a>
                <v-icon style="font-size:36px"> mdi-truck-outline </v-icon>
              </a>
              <p>Delivery</p>
            </div>
            <div class="box-item" @click="collectionCheck()">
              <a>
                <v-icon style="font-size:36px">
                  mdi-cloud-print-outline
                </v-icon>
              </a>
              <p>Collection</p>
            </div>
          </div>
          <div class="delivery-address" v-if="delivery">
            <div class="delivery-title my-5">
              <h4>Your Delivery details</h4>
            </div>
            <v-form class="py-6" @submit.prevent="saveAddress" ref="regForm" v-model="valid" lazy-validation>
              <label class="mb-3 delivery-label">Title: </label>
              <v-text-field
                v-model="title"
                :rules="rules"
                dense
                style="border-radius: 0px; width:50%"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">First Name: </label>
              <v-text-field
                v-model="first_name"
                :rules="rules"
                dense
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">Last Name: </label>
              <v-text-field
                v-model="last_name"
                :rules="rules"
                dense
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">Email: </label>
              <v-text-field
                v-model="email"
                :rules="rules"
                dense
                style="border-radius: 0px; width:50%"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">Phone Number: </label>
              <div class="d-flex" style="width:70%">
                <v-select dense class="mr-3"
          :items="countries" v-model="country_code"
          label="Select Country Code"
          :item-value="item => item.id"
          :item-text="item => '+'+ item.phonecode+' ( '+item.nicename+' )'"
          outlined
        ></v-select>
                <v-text-field
                :rules="rules"
                  v-model="phone"
                  dense
                  style="border-radius: 0px"
                  required
                  outlined
                ></v-text-field>
              </div>
              <div v-if="!manual">
              <label class="mb-3 delivery-label"
                >Start Typing your Address or postcode
              </label>
              <v-text-field
                v-model="address"
                :rules="rules"
                dense
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              </div>
              <a @click="manualAddress()"><p>Enter Address Manually</p></a>
              <div v-if="manual">
                  <label class="mb-3 delivery-label"
                >Country
              </label>
                  <v-select dense
          :items="countries" v-model="country"
          item-text="nicename"
          outlined
        ></v-select>
        <label class="mb-3 delivery-label"
                >House Name/ Number
              </label>
                  <v-text-field
                  class="mr-5"
                  v-model="house_no"
                  dense
                  style="border-radius: 0px"
                  required
                  outlined
                ></v-text-field>
                <label class="mb-3 delivery-label"
                >Address Line 1
              </label>
                  <v-text-field
                  class="mr-5"
                  v-model="address1"
                  dense
                  style="border-radius: 0px"
                  required
                  outlined
                ></v-text-field>
                <label class="mb-3 delivery-label"
                >Town / City
              </label>
                  <v-text-field
                  class="mr-5"
                  v-model="city"
                  dense
                  style="border-radius: 0px"
                  required
                  outlined
                ></v-text-field>
                <label class="mb-3 delivery-label"
                >PostCode
              </label>
                  <v-text-field 
                  class="mr-5"
                  v-model="post_code"
                  dense
                  style="border-radius: 0px; max-width: 60%"
                  required
                  outlined
                ></v-text-field>
              </div>
              <v-btn type="submit"
                block
                style="border-radius: 0px"
                class="mt-2"
                color="black"
                :disabled="!valid"
                dark
              >
                Submit
              </v-btn>
            </v-form>
          </div>
          <div class="address-collection" v-if="collection">
            <v-form ref="form" v-model="valid" lazy-validation>
              <label style="font-weight: 600">Collection Point: </label>
              <v-text-field
                v-model="collection_point"
                dense
                :rules="rules"
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>

              <v-btn
                block
                style="border-radius: 0px"
                class="mt-2"
                color="black"
                :disabled="!valid"
                dark
                @click="collectionsubmit()"
              >
                Submit
              </v-btn>
            </v-form>
          </div>
          <div class="review" v-if="delivery_details">
            <h5 class="mt-6 review-title">
                Delivery Details
              </h5>
              <div>
                <p>{{new_addresses.first_name}} {{new_addresses.last_name}}</p>
                <p>{{new_addresses.address}}</p>
                <p>+{{new_addresses.country_code}}{{new_addresses.phone}}</p>
              </div>
              <h5 class="review-title mt-5">
                Email
              </h5>
              <div>
                <p>{{user.email}}</p>
              </div>
          <div class="d-flex">
            <v-checkbox class="mt-0">

            </v-checkbox>
            <a class="mt-1">Set as your default delivery Address</a>
          </div>
              <div class="mt-4">
                <button @click="changeAddress()" v-if="uses" class="review-btn">
                  Change Address
                </button>
                <button v-else @click="deliverymethod" class="review-btn">
                  Use this Address
                </button>
              </div>
          </div>
          <div class="review" v-if="delivery_method">
            <h5 class="my-6 review-title">
                Delivery Method
              </h5>
              <div class="delivery_body">
              <div>
                  <label for="delivery_in" class="delivery_label" v-for="delivery in delivery_types" :key="delivery.id">
                      <div class="d-flex delivery_header">
                          <v-radio-group class="mt-0 mb-0" v-model="method">
                          <v-radio color="black" :value="delivery.id"></v-radio>
                          </v-radio-group>
                          <p class="mt-1">{{delivery.name}} within {{delivery.time}} {{delivery.period}} $ {{delivery.price}}</p>
                        </div>
                        <div class="ml-3 mt-2">
                            {{delivery.description}}
                        </div>
                  </label>
              </div>
              </div>
              <div class="mt-4">
                <button class="review-btn" @click="review()">
                  Continue to Payment
                </button>
              </div>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-row class="mt-8 review">
            <h4 class="primary-title mb-5">Review And Pay</h4>
            <v-col md="5" sm="12">
              <h5 class="review-title">
                Delivery Details
              </h5>
              <div>
                <p>{{new_addresses.first_name}} {{new_addresses.last_name}}</p>
                <p>{{new_addresses.address}}</p>
                <p>+{{new_addresses.country_code}}{{new_addresses.phone}}</p>
              </div>
              <h5 class="review-title mt-5">
                Email
              </h5>
              <div>
                <p>{{user.email}}</p>
              </div>
              <div class="mt-4">
                <button class="review-btn">
                  Edit Delivery Details
                </button>
              </div>
            </v-col>
            <v-col md="7" sm="12">
              <h5 class="review-title">
                Delivery Method
              </h5>
              <div>
                <p>{{main_delivery.name}} within {{main_delivery.time}} {{main_delivery.period}} $ {{main_delivery.price}}</p>
                <p>{{main_delivery.description}}</p>
              </div>
            </v-col>
            <div class="mt-3 promotion" @click="promotion = true">
              <p>Add a Promotional Code (optional)</p>
            </div>
            <div class="d-flex" style="width:50%" v-if="promotion">
              <v-text-field class="mt-2"
                v-model="apply"
                dense
                style="border-radius: 0px; width:10%"
                required
                outlined
              ></v-text-field>
              <a class="apply-btn" @click="checkCoupon()">Apply</a>
            </div>
            <div>
              <h5 class="my-6 review-title">
                Choose Your Payment Method
              </h5>
              <div class="delivery_body">
              <div>
                  <label for="delivery_in" class="delivery_label">
                      <div class="d-flex payment_header">
                          <v-radio-group class="mt-0 mb-0" v-model="payment_type">
                          <v-radio color="black" value="card"></v-radio>
                          </v-radio-group>
                          <p class="mt-1">Credit / Debit Card</p>
                        </div>
                  </label>
                  <label for="delivery_in" class="delivery_label">
                      <div class="d-flex payment_header">
                          <v-radio-group class="mt-0 mb-0" v-model="payment_type">
                          <v-radio color="black" value="paypal"></v-radio>
                          </v-radio-group>
                          <p class="mt-1">Paypal</p>
                        </div>
                  </label>
              </div>
              </div>
            <div class="total-basket">
            <p class="mb-2 mt-4">
            Basket Total:
            <span class="border-none ml-3 float-right">
              $ {{ carts.reduce((acc, item) => acc + item.cart_price, 0) }}
            </span>
          </p>
            </div>
            <div class="total-basket">
          <p class="mb-2 mt-4">
            Delivery Charge:
            <span class="border-none ml-3 float-right">
              {{this.delivery_charge}}
            </span>
          </p>
            </div>
            <div>
            <div class="order-total d-flex float-right mb-2">
              <p class="mb-2">
              Order Total:
              </p>
            <span class="border-none ml-3 mt-2 float-right">
              $ {{ this.total }}
            </span>
            </div>
            </div>
            <div class="clearfix py-4">
              </div>
            <div class="float-right mb-2">
              <button class="pay-btn" @click="ordersubmit()" type="button">Pay Now</button>
            </div>
            </div>
            
            <v-row justify="center">
    <v-dialog
      v-model="addressbook"
      persistent
      max-width="700px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Address Book</span>
          <v-spacer></v-spacer>
          <v-icon
            color="blue darken-1"
            text
            @click="addressbook = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <ul class="address-list mt-15">
            <li class="address-item" @click="addAddress()">
                <a class="address-link">
                    <v-icon style="font-size:40px">mdi-plus</v-icon>
                    <span>Add New Address</span>
                </a>
            </li>
            <li class="address-main" v-for="address in addresses" :key="address.id">
                <span class="address-name">{{address.title}} {{address.first_name}} {{address.last_name}}</span>
                <div class="address-block mt-5 mb-4">
                    <span>{{address.address}}</span>
                    <span>{{address.address1}}</span>
                    <span>{{address.city}}</span>
                    <span>{{address.post_code}}</span>
                    <span>{{address.country}}</span>
                </div>
                <div class="address-phone mt-2 mb-4">
                    <span>+{{address.country_code}}{{address.phone}}</span>
                </div>
                <div class="action-list d-flex">
                <button class="apply-btn" @click="useAddress(address)">Use Address</button>    
                </div>
            </li>
        </ul>
          </v-container>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-row justify="center">
    <v-dialog
      v-model="addaddress"
      persistent
      max-width="700px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Address</span>
          <v-spacer></v-spacer>
          <v-icon
            color="blue darken-1"
            text
            @click="addaddress = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
           <v-form class="py-6" @submit.prevent="saveAddress" ref="regForm" v-model="valid" lazy-validation>
              <label class="mb-3 delivery-label">Title: </label>
              <v-text-field
                v-model="title"
                :rules="rules"
                dense
                style="border-radius: 0px; width:50%"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">First Name: </label>
              <v-text-field
                v-model="first_name"
                :rules="rules"
                dense
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">Last Name: </label>
              <v-text-field
                v-model="last_name"
                :rules="rules"
                dense
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">Email: </label>
              <v-text-field
                v-model="email"
                :rules="rules"
                dense
                style="border-radius: 0px; width:50%"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">Phone Number: </label>
              <div class="d-flex" style="width:70%">
                <v-select dense class="mr-3"
          :items="countries" v-model="country_code"
          label="Select Country Code"
          :item-value="item => item.id"
          :item-text="item => '+'+ item.phonecode+' ( '+item.nicename+' )'"
          outlined
        ></v-select>
                <v-text-field
                :rules="rules"
                  v-model="phone"
                  dense
                  style="border-radius: 0px"
                  required
                  outlined
                ></v-text-field>
              </div>
              <div v-if="!manual">
              <label class="mb-3 delivery-label"
                >Start Typing your Address or postcode
              </label>
              <v-text-field
                v-model="address"
                :rules="rules"
                dense
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              </div>
              <a @click="manualAddress()"><p>Enter Address Manually</p></a>
              <div v-if="manual">
                  <label class="mb-3 delivery-label"
                >Country
              </label>
                  <v-select dense
          :items="countries" v-model="country"
          item-text="nicename"
          outlined
        ></v-select>
        <label class="mb-3 delivery-label"
                >House Name/ Number
              </label>
                  <v-text-field
                  class="mr-5"
                  v-model="house_no"
                  dense
                  style="border-radius: 0px"
                  required
                  outlined
                ></v-text-field>
                <label class="mb-3 delivery-label"
                >Address Line 1
              </label>
                  <v-text-field
                  class="mr-5"
                  v-model="address1"
                  dense
                  style="border-radius: 0px"
                  required
                  outlined
                ></v-text-field>
                <label class="mb-3 delivery-label"
                >Town / City
              </label>
                  <v-text-field
                  class="mr-5"
                  v-model="city"
                  dense
                  style="border-radius: 0px"
                  required
                  outlined
                ></v-text-field>
                <label class="mb-3 delivery-label"
                >PostCode
              </label>
                  <v-text-field 
                  class="mr-5"
                  v-model="post_code"
                  dense
                  style="border-radius: 0px; max-width: 60%"
                  required
                  outlined
                ></v-text-field>
              </div>
              <v-btn type="submit"
                block
                style="border-radius: 0px"
                class="mt-2"
                color="black"
                :disabled="!valid"
                dark
              >
                Submit
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-container class="mt-4">
	      <v-row>
        <div class="jumbotron" v-if="finish">
            <h2 class="text-center">YOUR ORDER HAS BEEN RECEIVED</h2>
          <h3 class="text-center" v-if="payment">Thank you for your payment, it’s processing</h3>
          
          <p class="text-center">Your order # is: {{confirm.order.order_id}}</p>
          <p class="text-center">You will receive an order confirmation email with details of your order and a link to track your process.</p>
            <center><div class="btn-group mt-6">
                <a href="#" class="btn btn-lg btn-warning">Finish</a>
            </div></center>
        </div>
        </v-row>
      </v-container>
        </v-stepper-content>
        </v-stepper>
        
      
  
  </div>
      <div class="col-md-1" v-if="!finish"></div>
      <div class="col-md-4 mt-2 basket_list" v-if="!finish">
        <div class="d-flex">
          <h5 class="mr-2">Basket</h5>
          <span class="">({{ carts.length }} item )</span>
        </div>
        <div
          class="check-item bl-b"
          v-for="(cart, index) in carts"
          :key="index"
        >
          <div>
            <img :src="`${baseEnvLocal}${cart.main_image}`" alt="item" />
          </div>
          <div>
            <div class="item-heading check-content">
              <div class="d-item-flex">
                <p class="w-70 mb-n3">
                  {{ cart.name }}
                </p>
              </div>
            </div>

            <div class="check-quantity d-flex">
              <p class="mb-n2 mt-4">
                Quantity:
                <input
                  class="border-none"
                  type="text"
                  v-model="cart.cart_quantity"
                  readonly
                />
              </p>
              <span class="float-right mt-4">$ {{ cart.cart_price }}</span>
            </div>
          </div>
        </div>
        <div class="check-quantity">
          <p class="mb-n2 mt-4">
            Basket Total:
            <span class="border-none float-right">
              $ {{ carts.reduce((acc, item) => acc + item.cart_price, 0) }}
            </span>
          </p>
          </div>
          <div v-if="step==2">
           <p class="mb-n2 mt-4">
            Delivery Charge
            <span class="border-none float-right">
              {{ delivery_charge }}
            </span>
          </p>
          <p class="mb-n2 mt-4">
            Total
            <span class="border-none float-right">
              {{ total }}
            </span>
          </p>
          <p class="mt-2">(Excluding Delivery Charge)</p>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    baseEnvLocal: baseEnv,
    temp: {},
    // user: [],
    temp_decrement: {},
    delivery: false,
    addressbook:false,
    addaddress:false,
    uses:false,
    delivery_details: false,
    delivery_method: false,
    new_addresses: [],
    main_delivery: [],
    delivery_charge: 0,
    total: 0,
    valid: true,
    isValidate: false,
    promotion: false,
    payment_type: "",
    payment: false,
    confirm: [],
    collection: false,
    email: "",
    title: "",
    apply: "",
    method: "",
    first_name: "",
    last_name: "",
    country_code: "",
    step: 1,
    finish: false,
    manual:false,
    phone: "",
    address: "",
    address1: "",
    collection_point: "",
    rules: [
      (value) => !!value || "This Field Required.",
      (v) => v.length >= 5 || "Requires Min 8 characters",
    ],
  }),
async created() {
    this.getCarts();
    this.getUser();
    this.getAddresses();
    this.getDeliveryTypes();
    this.checkAddress();
  },
  computed: {
    ...mapState("cart", ["carts"]),
    ...mapState("homepage", ["user"]),
    ...mapState("address",["addresses"]),
    ...mapState("category", ["countries"]), 
    ...mapState("product", ["delivery_types"]), 
  },
  methods: {
    ...mapActions("cart", ["getCarts"]),
    ...mapActions("homepage", ["getUser"]),
    ...mapActions("address", ["getAddresses"]),
    ...mapActions("category",["getCountries"]),
    ...mapActions("product",["getDeliveryTypes"]),
    deliveryCheck() {
      this.getAddresses()
      let check = this.addresses
      console.log("length",check.length,check)
      if(check.length > 0){
        this.delivery = false
        if(check.length > 1){
          let address = check.slice(check.length - 1, check.length)
          this.new_addresses = address[0]
        }
        else{
          this.new_addresses = check[0]
        }
        this.delivery_details = true
        this.uses = true
        this.delivery_method = true
      }
      else{
        this.delivery = true;
        this.collection = false;
      }
      
    },
    checkCoupon()
    {
      if(this.apply == null){
        alert("Product Coupon/Discount code cannot be Empty")
      }
      else{
        this.$store.dispatch("",this.apply).then(
          response=>{
            
          }
        )
      }
    },
    useAddress(address)
    {
      this.new_addresses = address
      this.addressbook = false
    },
    review(){
      this.step = 2
      console.log(this.method)
      let delivery = this.delivery_types.filter((delivery) =>delivery.id == this.method)
      console.log(delivery)
      this.main_delivery = delivery[0]
      this.delivery_charge = delivery[0].price
      this.total = parseFloat(this.carts.reduce((acc, item) => acc + item.cart_price, 0)) + parseFloat(this.delivery_charge)
    },
    ordersubmit()
    {
      let guest_id = ""
      let user_id = ""
      if(localStorage.getItem("auth_token")!= null){
        let user = JSON.parse(localStorage.getItem("user_data"))
        user_id = user.id
      }
      else{
        guest_id = localStorage.getItem("guest_id")
      }
      let data = {
        cart: this.carts,
        total:this.total,
        user_id:user_id,
        guest_id:guest_id,
        payment_type: this.payment_type,
        delivery_charge: this.delivery_charge,
        shipping_address: this.new_addresses.id,
      }
      console.log("data",data)
      this.$store.dispatch("order/addOrder",data).then( (response) =>{
        this.confirm = response.data
        this.finish = true
        this.step = 3
        this.$store.dispatch("cart/getCarts")
      }
        
      )
    },
    manualAddress()
    {
        this.manual = true
    },
    changeAddress(){
      this.addressbook = true
    },
    checkAddress()
    {
      console.log("ok ache")
      console.log("address",this.addresses)
      if(this.addresses.length > 0){
        this.delivery = false
        this.delivery_details = true
        let length = this.addresses.length;
        if(length > 1){
          this.new_addresses = this.addresses[0].slice(0,length)
        }
        else{
          this.new_addresses = this.addresses[0]
        }
        console.log("address-list",this.new_addresses)
        this.uses = true
        this.delivery_method = true
      }
    },
    saveAddress()
    {
      console.log("validate")
      let isValidate = true;
      this.$refs.regForm.validate();
      this.$refs.regForm.inputs.forEach((input) => {
        if (input.hasError) {
          isValidate = false;
        }
      });
      if (!isValidate) {
        return;
      }
      this.addresssubmit()
    },
    collectionCheck() {
      this.collection = true;
      this.delivery = false;
    },
    addAddress()
    {
      this.addressbook = false
      this.addaddress = true
    },
    deliverymethod()
    {
      this.uses = true
      this.delivery_method = true
    },
    addresssubmit() {
      console.log(this.user.email);
      let data = {
        title: this.title,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        country_code: this.country_code,
        phone: this.phone,
        address: this.address,
        address1: this.address1,
        house_no: this.house_no,
        city: this.city,
        post_code: this.post_code
      };
      this.$store.dispatch("address/AddAddress",data).then(
          this.$router.push("/address_book")
      )
      this.new_addresses = data;
      console.log(this.new_addresses);
      this.delivery = false;
      this.collection = false;
      this.delivery_details = true
    }
  }
};
</script>

<style>
.check-content p {
  font-size: 15px;
}
.delivery-label {
  font-weight: 600;
}
.promotion p{
  text-decoration: underline;
}
.check-item {
  border-top: 1px solid #ddd;
  padding-top: 20px;
}
.basket_list {
  border-left: 1px solid #ddd;
}
.check-item img {
  height: 60px;
}
.order-total{
  border-top: 1px solid #ddd;
  text-align: right;
}
.order-total p{
  font-size: 18px!important;
 }
.check-quantity {
  justify-content: space-between;
}
.check-quantity p {
  font-size: 14px;
}
.box-item {
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid #ddd;
  min-height: 160px;
  flex-direction: column;
}
.box-item a {
  border: 1px solid #ddd;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 20px;
}
.primary-title{
  font-size:17px;
  font-weight: 500;
}
.review-title{
  font-size:15px;
  font-weight: 600;
}
.review p{
  font-size:14px;
  margin-bottom: 4px;
}
.review p:first-child{
  margin-top:10px;
}
.review-btn{
  border-radius:0!important;
  border: 1px solid black!important;
  background-color: #fff;
  font-size: 15px;
  color: #000!important;
  text-transform: none!important;
}
.apply-btn{
  background-color: #000;
    padding: 10px 20px 0px 20px;
    color: #fff!important;
    font-size: 14px;
    max-height: 45px;
    margin-top: 3px;
}
.pay-btn{
    background-color: #000;
    padding: 20px!important;
    color: #fff!important;
    font-size: 14px;
    max-height: 45px;
}
.delivery_label{
        width:100%;
        border: 1px solid #ddd;
        padding:16px;
        text-align:left;
        min-height: 48px;
        min-width:48px;
        font-weight: 200;
    }
    .delivery-label .v-input__control{
      height:10px!important;
    }
    .login_state_login{
        padding:20px;
        border: 1px solid black;
        padding-top: 40px;
    }
    .v-icon.v-icon.v-icon--link {
      background-color:transparent!important;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height:45px!important;
  }
    .delivery_body input[type=radio]:checked~label .delivery_header::before {
        background-color: #000;
        box-shadow: inset 0 0 0 4px #fff;
    }
    .delivery_header,.payment_header{
        position: relative;
        font-weight: 600;
    }
    .payment_header .v-input__control {
    height: 10px;
    }
  @media only screen and (min-width: 768px){
  .address-list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0;
      justify-content: space-between;
  }
  .address-list .address-item {
      width: calc(50% - 12px);
      flex: 0 0 auto;
      margin: 0 0 24px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 256px;
      padding: 24px;
  }


  .address-block span{
      margin-top:5px;
  }
  .address-link{
      align-items: center;
      display: flex;
      flex-direction: column;
  }
  }
  .action-list a{
      text-decoration: underline!important;
  }
  .address-item,.address-main{
      align-items: center;
      border-style: dashed;
      border: 1px solid #ddd;
      width: calc(50% - 12px);
      min-height: 238px;
      padding: 24px!important;
      margin-bottom:24px;
  }
  .address-name{
      font-weight: bold;
      font-size:13px;
  }
  .total-basket{
    text-align: right;
    justify-content: space-between;
  }
</style>
