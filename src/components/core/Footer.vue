<template>
  <div class="footer-bg">
    <v-container class="footer-area">
      <!-- <v-col cols="12" class="text-center">
        <vsa-list densed height="10">
          <vsa-item>
            <vsa-heading> This is the heading</vsa-heading>
            <vsa-content> This is the content </vsa-content>
          </vsa-item>
        </vsa-list></v-col
      > -->
      <v-row>
        <div class="py-5 we-know pt-10 pb-10">
          <v-col cols="12" class="text-center">
            <h3>BE IN THE KNOW</h3>
            <p>
              Get inspiration, new arrivals and the latest offers to your inbox
            </p>
            <v-dialog v-model="signUpModal" ref="signUpModal" max-height="500" max-width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  style="background-color: #00000000"
                  color="#000"
                  text
                  outlined
                  large
                  v-bind="attrs"
                  v-on="on"
                >
                  <p class="pt-4 px-3">Sign me up for Emails</p>
                </v-btn>
              </template>
              <v-card>
                
                <div class="text-center d-flex pt-4">
                  <v-spacer></v-spacer>
                  <p class="mb-0">Sign Up for Emails</p>
                  <v-spacer></v-spacer>
                  <a class="mr-2" @click="signUpModal = false"><v-icon>mdi-close</v-icon></a>
                </div>
                <v-divider></v-divider>
                
                <div class="d-flex flex-row">
                  <div class="col-md-6 px-4 py-4">
                    <div v-if="error" class="align-center p-1 mb-2" style="background-color:red">
                        <a class="ml-5"><span style="color:white">{{error}}</span></a>
                    </div>
                    <v-form @submit.prevent="saveRegister" ref="regForm" lazy-validation>
                      <label>Name: </label>
                      <v-text-field
                        v-model="form.name"
                        dense
                        outlined
                        :rules="[() => !!form.name || 'Enter Name']"
                        style="border-radius: 0px"
                        required
                      ></v-text-field>
                      <label>Email: </label>
                      <v-text-field
                        type="email"
                        v-model="form.email"
                        dense
                        style="border-radius: 0px"
                        :rules="emailRules"
                        required
                        outlined
                      ></v-text-field>
                      <label>Password: </label>
                      <v-text-field
                      type="password"
                        v-model="form.password"
                        dense
                        :rules="[() => !!form.password || 'Enter Password']"
                        style="border-radius: 0px"
                        required
                        outlined
                      ></v-text-field>
                      <v-checkbox
                      class="mt-n1"
                        v-model="checkbox"
                        :rules="[v => !!v || 'You must agree to continue!']"
                        label="I agree to the terms & policy"
                        required
                      ></v-checkbox>
                      <v-btn block type="submit" :loading="loading" :disabled="loading" style="border-radius: 0px;" class="mt-2" color="black" dark>
                        Submit
                      </v-btn>
                    </v-form>
                  </div>
                  <div class="col-md-6 px-0 py-0 mt-n4">
                    <v-img
                      src="../../assets/img/email-sign-up-banner.jpeg"
                      aspect-ratio="0.8"
                    ></v-img>
                  </div>
                </div>
              </v-card>
            </v-dialog>
          </v-col>
        </div>
      </v-row>
      <v-row>
        <div class="py-5 knowledge">
          <v-col cols="12" class="text-center">
            <a class="knowledge-title" href="#">NEVER KNOWINGLY UNDERSOLD SINCE 2021</a>
          </v-col>
        </div>
      </v-row>
      <v-row>
        <v-col class="col-md-12">
          <v-row align="center" class="py-5">
            <div class="col-md-3 col-sm-6 col-6">
              <div
                class="border-bottom">
                Help
              </div>
              <ul>
                <li v-for="item in fitems" :key="item.id">
                  <a
                    href="#"

                    >{{item.name}}</a
                  >
                </li>
                
              </ul>
              <div
                class="border-bottom pt-3">
                Deliveries
              </div>
              <ul>
                <li v-for="delivery in deliveries" :key="delivery.id">
                  <a
                    href="#"
                    >{{delivery.name}}</a
                  >
                </li>
              </ul>
            </div>
            <div class="col-md-3 col-sm-6 col-6">
              <div
                class="border-bottom">
                Shopping
              </div>
              <ul>
                <li v-for="shopping in shoppings" :key="shopping.id">
                  <a
                    href="#"
                    >{{shopping.name}}</a>
                </li>
              </ul>
            </div>
            <div class="col-md-3 col-sm-6 col-6">
              <div
                class="border-bottom"
              >
                More from us
              </div>
              <ul>
                <li v-for="shopping in shoppings" :key="shopping.id">
                  <a
                    href="#"
                    
                    >{{shopping.name}}</a
                  >
                </li>
              </ul>
            </div>
            <div class="col-md-3 col-sm-6 col-6">
              <div
                class="border-bottom">
                Finance
              </div>
              <ul>
                <li v-for="shopping in shoppings" :key="shopping.id">
                  <a
                    href="#"
                    
                    >{{shopping.name}}</a>
                </li>
              </ul>
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="social-btn py-6" align="center">
          <button style="background-color:transparent"
            v-for="(item, i) in items"
            :key="i"
            :href="item.href"
            class="ml-0 mr-16"
            color="black"
            square
            target="_blank"
          >
            <v-icon v-text="item.icon" />
          </button>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
    <v-footer class="py-4 footer" light height="auto"> </v-footer>
  </div>
</template>

<script>
export default {
  name: "CoreFooter",
  data: () => ({
    form: {
      name: "",
      email: "",
      password: "",
      aggree: false
    },
    checkbox: false,
    error: "",
    loading:false,
    signUpModal: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    fitems: [
      {
        id: 1,
        name: "Customer service"
      },
      {
        id: 2,
        name: "Contact Us"
      },
      {
        id: 3,
        name: "Our Shops"
      },
      {
        id: 4,
        name: "Our Services"
      },
      {
        id: 5,
        name: "Product recall & Safety Notice"
      }
    ],
    deliveries: [
      {
        id: 1,
        name: "Track your order"
      },
      {
        id: 2,
        name: "Delivery & Collection"
      },
      {
        id: 3,
        name: "Returns & refunds"
      }
    ],
    shoppings: [
      {
        id: 1,
        name: "Wish List"
      },
      {
        id: 2,
        name: "Buying guides"
      },
      {
        id: 3,
        name: "Inspiration"
      },
      {
        id: 4,
        name: "Gift Cards & vouchers"
      },
      {
        id: 5,
        name: "Shop by Brand"
      },
      {
        id: 6,
        name: "Gift Cards & vouchers"
      },
      {
        id: 7,
        name: "Terms & Conditions"
      },
      {
        id: 8,
        name: "Our Privacy notice"
      },
      {
        id: 9,
        name: "Offers"
      }
    ],
    shoppings: [
      {
        id: 1,
        name: "Wish List"
      },
      {
        id: 2,
        name: "Buying guides"
      },
      {
        id: 3,
        name: "Inspiration"
      },
      {
        id: 4,
        name: "Gift Cards & vouchers"
      },
      {
        id: 5,
        name: "Shop by Brand"
      },
      {
        id: 6,
        name: "Gift Cards & vouchers"
      },
      {
        id: 7,
        name: "Terms & Conditions"
      },
      {
        id: 8,
        name: "Our Privacy notice"
      },
      {
        id: 9,
        name: "Offers"
      }
    ],
    items: [
      {
        href: "#!",
        icon: "mdi-twitter"
      },
      {
        href: "#!",
        icon: "mdi-instagram"
      },
      {
        href: "#!",
        icon: "mdi-facebook"
      },
      {
        href: "#!",
        icon: "mdi-youtube"
      },
      {
        href: "#!",
        icon: "mdi-pinterest"
      }
    ]
  }),
  methods: {
    saveRegister()
    {
      console.log("validate")
      this.error = ""
      this.loading = true
      let isValidate = true;
      this.$refs.regForm.validate();
      this.$refs.regForm.inputs.forEach((input) => {
        if (input.hasError) {
          this.loading = false
          isValidate = false;
        }
      });
      if (!isValidate) {
        this.loading = false
        return;
      }
      this.$store.dispatch("homepage/registrationUser",this.form).then(
        (response) => {
          this.loading = false
          if(response.error){
            this.error = response.error
          }
          else{
            this.reset()
            this.signUpModal = false
            this.$router.push("/login")
          }
          console.log("another test")
          console.log("response",response)
          
        }
      )
        .catch(() => {
          this.loading = false
        });
    },
    reset() {
      this.$refs.regForm.reset();
    },
  }
};
</script>
<style scoped>
li {
  line-height: 2;
}
ul {
  padding-top: 10px;
}
.modal-card {
  font-family: "Open Sans";
}

.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
    background-color: #000!important;
}

@media only screen and (max-width: 600px){
  .v-application .mr-16 {
    margin-right: 2px!important;
  }
}

</style>
