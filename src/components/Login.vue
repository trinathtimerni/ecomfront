<template>
  <div>
    <div
      class=" text-center pt-2"
      style="min-width: 100%; border-bottom: 1px solid #DDD"
    >
      <p style="font-size: 17px; font-weight: 600">Sign In</p>
    </div>
    
    <div class="col-md-4 col-lg-3 px-7 mx-auto">
      <div style="margin-top: 50px">
        <div v-if="error" class="align-center p-1 mb-2" style="background-color:red">
                        <a class="ml-5"><span style="color:white">{{error}}</span></a>
                    </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <label style="font-weight: 600">Email: </label>
          <v-text-field
            v-model="email"
            dense
            style="border-radius: 0px"
            :rules="emailRules"
            required
            outlined
          ></v-text-field>
          <label style="font-weight: 600">Password </label>
          <v-text-field
            v-model="password"
            :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpassword ? 'text' : 'password'"
            dense
            style="border-radius: 0px"
            @click:append="showpassword = !showpassword"
            outlined
            required
          ></v-text-field>
          <v-checkbox
            class="mt-n1"
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Remember Me"
            required
          ></v-checkbox>
          <v-btn
            block
            style="border-radius: 0px"
            class="mt-2"
            color="black"
            :loading="loading"
            :disabled="!valid && loading"
            dark
            @click="loginsubmit()"
          >
            Login
          </v-btn>
        </v-form>
        <div class="text-center py-4" @click="showreset = !showreset">
          <span
            style="
              font-family: 'Open Sans';
              font-size: 17px;
              font-weight: 200;
              text-decoration: underline; cursor:pointer
            "
          >
            Need help with password ?
          </span>
        </div>
        <div v-if="showreset">
             <v-btn @click="showReset()"
              block
              style="border-radius: 0px; background-color: white"
              class="mt-4"
              outlined 
            >
              Reset my Password
            </v-btn>
             <v-btn @click="showLoginModal()"
              block
              style="border-radius: 0px; background-color: white"
              class="mt-4"
              outlined 
            >
              Email me secure link to sign in
            </v-btn>
        </div>
        <div class="text-center py-4">
          <span
            style="font-family: 'Open Sans'; font-size: 17px; font-weight: 200"
          >
            We treat your personal data with care; please find our
            <span style="text-decoration: underline">privacy notice here</span>.
          </span>
            <v-btn @click="showSignup()"
              block
              style="border-radius: 0px; background-color: white"
              class="mt-4"
              outlined 
            >
              Sign Up
            </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    valid: true,
    checkbox: false,
    email: "",
    guest_id: "",
    password: "",
    loading: false,
    showreset: false,
    error: "",
    props: {
       signUpModal: false
    },
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    showpassword: false,
  }),
  methods: {
    loginsubmit()
    {
      this.loading = true
      this.validation_errors = [];
      this.error = "";
      this.clearStorageData();
      if(localStorage.getItem("guest_id")){
        this.guest_id = localStorage.getItem("guest_id")
      }
      let form = {
        email: this.email,
        password: this.password,
        guest_id: this.guest_id,
      };
      axios
        .post("/api/login", form)
        .then((response) => {
          this.$refs.form.validate();
          if(response.data.success){
            this.saveStorageData(response.data);
            this.loading = false
            this.$store.dispatch("cart/getCarts")
            this.$router.push("/account");
          }
          else{
            this.loading = false;
            this.error = response.data.message
          }
        })
        .catch((error) => {
          this.loading = false
          this.error = error.response.data.message;
          if (error.response.data.errors) {
            for (let key in error.response.data.errors) {
              this.validation_errors.push(error.response.data.errors[key][0]);
            }
          }
        });
    },
    showSignup()
    {
      this.$router.push("/signup");
    },
    showReset(){
      this.$router.push("/reset");
    },
    showLoginModal()
    {
      this.signUpModal = true;
    },
    clearStorageData() {
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    },
    saveStorageData(response) {
      localStorage.setItem("is_authenticated", 1);
      localStorage.setItem("auth_token", response.access_token);
      localStorage.setItem("user_data", JSON.stringify(response.user));
    },

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  }
};
</script>
<style>
  .v-icon.v-icon.v-icon--link {
      background-color:transparent!important;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height:45px!important;
  }
</style>