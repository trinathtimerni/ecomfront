<template>
  <div>
    <div
      class=" text-center pt-4"
      style="min-width: 100%; border-bottom: 1px solid #DDD"
    >
      <p style="font-size: 17px; font-weight: 600; letter-spacing:2px;">CREATE AN ACCOUNT</p>
    </div>
    
    <div class="col-md-4 col-lg-3 px-7 mx-auto">
      <div style="margin-top: 50px">
        <div v-if="error" class="align-center p-1 mb-2" style="background-color:red">
                        <a class="ml-5"><span style="color:white">{{error}}</span></a>
                    </div>
        <v-form ref="regForm" v-model="valid" lazy-validation>
          <label style="font-weight: 600">Name: </label>
          <v-text-field
            v-model="form.name"
            dense
            style="border-radius: 0px"
            :rules="nameRules"
            required
            outlined
          ></v-text-field>
          <label style="font-weight: 600">Email: </label>
          <v-text-field
            v-model="form.email"
            dense
            style="border-radius: 0px"
            :rules="emailRules"
            required
            outlined
          ></v-text-field>
          <label style="font-weight: 600">Phone: </label>
          <v-text-field
            v-model="form.phone"
            dense
            style="border-radius: 0px"
            :rules="phoneRules"
            required
            outlined
          ></v-text-field>
          <label style="font-weight: 600">Password </label>
          <v-text-field
            v-model="form.password"
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
            v-model="form.checkbox"
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
            @click="saveRegister()"
          >
            Create Account
          </v-btn>
        </v-form>
        <div class="text-center py-4">
          <span
            style="font-family: 'Open Sans'; font-size: 17px; font-weight: 200"
          >
            We treat your personal data with care; please find our
            <span style="text-decoration: underline">privacy notice here</span>.
          </span>
          <h6 class="pt-2">Already Have an Account?</h6>
            <v-btn @click="showLogin()"
              block
              style="border-radius: 0px; background-color: white"
              class="mt-4"
              outlined 
            >
              Sign In
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
    form: {
      name: "",
      email: "",
       phone: "",
      password: "",
      checkbox: false,
    },
    loading: false,
    error: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length >= 8 || "Name requires at least 3 characters",
    ],
    phoneRules: [
      (v) => !!v || "Phone is required",
      (v) => v.length >= 11 || "Phone requires at least 11 characters",
    ],
    showpassword: false,
  }),
  methods: {
    saveRegister()
    {
      console.log("validate")
      this.error = ""
      this.loading = true
      let valid = true;
      this.$refs.regForm.validate();
      this.$refs.regForm.inputs.forEach((input) => {
        if (input.hasError) {
          this.loading = false
          valid = false;
        }
      });
      if (!valid) {
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
    showLogin()
    {
      this.$router.push("/login");
    }
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