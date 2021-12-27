<template>
  <div>
    <div
      class=" text-center pt-2"
      style="min-width: 100%; border-bottom: 1px solid #DDD"
    >
      <p style="font-size: 17px; font-weight: 600">Reset Password</p>
    </div>
    
    <div class="col-md-4 col-lg-3 px-7 mx-auto">
        <p>Enter your email address for your account and we'll send a reset link.</p>

        <p>The single-use link will expire after 24 hours.</p>
      <div style="margin-top: 30px">
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
            Send Password reset link
          </v-btn>
        </v-form>
        
        <div class="text-center py-4" @click="showSignin()">
          <span
            style="font-family: 'Open Sans'; font-size: 16px; font-weight: 300; text-decoration:underline;cursor:pointer"
          >
            Back to Sign In
          </span>
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
    showSignin()
    {
      this.$router.push("/login");
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