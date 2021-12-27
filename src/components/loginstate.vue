<template>
  <v-container>
      <v-row>
          <div class="col-md-5 login_state mt-10 m-auto">
              <h4 class="mb-10">Welcome to secure checkout</h4>
              <div class="login_body">
              <div>
              
              
                  <label for="sign_in" class="login_label">
                      <div class="d-flex login_header">
                          <v-radio-group class="mt-0 mb-0" v-model="login">
                          <v-radio @click="getlogin()" color="black" value="login"></v-radio>
                          </v-radio-group>
                          <p class="mt-1">Sign In</p>
                        </div>
                        <div class="ml-3">
                            Checkout faster with save details
                        </div>
                  </label>
        <div v-if="login_data" class="login_state_login">
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
          <v-btn
            block
            style="border-radius: 0px"
            class="mt-2"
            color="black"
            :disabled="!valid"
            dark
            @click="loginsubmit()"
          >
            Login
          </v-btn>
        </v-form>
      </div>
              </div>
              </div>
              <div class="login_body">
              <div>
              
                  <label for="sign_in" class="login_label">
                      <div class="d-flex login_header">
                        <v-radio-group class="mt-0 mb-0" v-model="guest">
                          <v-radio @click="getguest()" color="black" value="login"></v-radio>
                          </v-radio-group>
                          <p class="mt-1">Guest Checkout</p>

                        </div>
                        <div class="ml-3">
                            Checkout faster with save details
                        </div>
                  </label>
              </div>
              </div>
          </div>
      </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        login_data: false,
        valid: true,
        login:false,
        guest:false,
        guest_id: "",
    email: "",
    password: "",
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
        getlogin(){
            this.guest = false
            this.login_data = true
        },
        getguest()
        {
            this.login_data = false
            this.login = false
        },
    loginsubmit()
    {
      this.validation_errors = [];
      this.error_message = "";

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
          this.saveStorageData(response.data);
          this.$refs.form.validate();
          
            this.$router.push("/click_collect");

        })
        .catch((error) => {
          this.error_message = error.response.data.message;

          if (error.response.data.errors) {
            for (let key in error.response.data.errors) {
              this.validation_errors.push(error.response.data.errors[key][0]);
            }
          }
        });
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
}
</script>

<style>
    .login_label{
        width:100%;
        border: 1px solid #ddd;
        padding:16px;
        text-align:left;
        min-height: 48px;
        min-width:48px;
        font-weight: 200;
    }
    .login_state_login{
        padding:20px;
        border: 1px solid black;
        padding-top: 40px;
    }
    .login_check{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    text-indent: -9999px;
    }
    .v-icon.v-icon.v-icon--link {
      background-color:transparent!important;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height:45px!important;
  }
    .login_body input[type=radio]:checked~label .login_header::before {
        background-color: #000;
        box-shadow: inset 0 0 0 4px #fff;
    }
    .login_body input[type=radio]~label .login_header::before {
    border-radius: 50%;
    vertical-align: sub;
    }
    .login_check~label .login_header::before {
    content: "";
    display: inline-block;
    border: 1px solid #6b6b6b;
    width: 20px;
    min-width: 20px;
    height: 20px;
    margin-right: 8px;
    -webkit-transition: .4s;
    -moz-transition: .4s;
    transition: .4s;
    }
    .login_header{
        position: relative;
        font-weight: 600;
    }
</style>