<template>
    <div class="col-md-8">
        <div class="address-title m-auto align-center justify-content-center d-flex">
           <h3> Change Password</h3>
        </div>
        <div class="col-md-9 m-auto">
          <div v-if="error" class="align-center p-1 mb-2" v-bind:class="background">
                <a class="ml-5"><span style="color:white">{{error}}</span></a>
          </div>
       <v-form class="py-6" @submit.prevent="updatePassword" ref="regForm" v-model="valid" lazy-validation>
              
              <label class="mb-3 delivery-label">Current Password </label>
              <v-text-field
                v-model="password"
                type="password"
                :rules="rules"
                dense
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">New Password</label>
              <v-text-field
                v-model="new_password"
                :rules="rules"
                dense
                type="password"
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">New Passwod</label>
              <v-text-field
                v-model="confirm_password"
                :rules="rules"
                dense
                type="password"
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              <v-btn type="submit"
                block
                :loading = loading
                style="border-radius: 0px"
                class="mt-2"
                color="black"
                :disabled="!valid && loading"
                dark
              >
                Submit
              </v-btn>
            </v-form>
            </div>
    </div>
</template>
 
<script>
import {mapActions,mapState} from "vuex"
export default {
     data: () => ({
        valid: true,
        isValidate: false,
        password: "",
        loading: false,
        new_password: "",
        confirm_password: "",
        error: "",
        background: "",
        rules: [
        (value) => !!value || "This Field Required.",
        (v) => v.length >= 5 || "Requires Min 8 characters",
        ],
    }),
    async created(){

    },
    computed: {

    },
    methods: {

       updatePassword()
     {
      console.log("validate")
      this.loading = true
      let isValidate = true;
      this.$refs.regForm.validate();
      this.$refs.regForm.inputs.forEach((input) => {
        if (input.hasError) {
          isValidate = false;
          this.loading = true
        }
      });
      if (!isValidate) {
        this.loading = false
        return;
      }
      this.passwordsubmit()
    },
    passwordsubmit() {
      let data = {
        current_password: this.password,
        new_password: this.new_password,
        confirm_password: this.confirm_password
      };
      this.$store.dispatch("user/PasswordChange",data).then(
          response => {
            this.loading = false
            if(response.password_error){
              this.reset()
              this.background = "background-color: red"
              this.error = response.password_error
            }
            else{
              this.reset()
              this.background = "background-color: green"
              this.error = response.success
            }
          }
      )
      
    },
    reset() {
      this.$refs.regForm.reset();
    }
    }
}
</script>

<style>
.v-btn:not(.v-btn--round).v-size--default {
    height:45px!important;
  }
</style>