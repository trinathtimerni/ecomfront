<template>
    <div class="col-md-8">
        <div class="address-title m-auto align-center justify-content-center d-flex">
           <h3> Personal Details </h3>
        </div>
        <div class="col-md-9 m-auto">
          <div v-if="error" class="align-center p-1 mb-2" v-bind:class="background">
                <a class="ml-5"><span style="color:white">{{error}}</span></a>
          </div>
       <v-form class="py-6" @submit.prevent="updatePersonalDetails" ref="regForm" v-model="valid" lazy-validation>
              <label class="mb-3 delivery-label">Title: </label>
              <v-select dense class="mr-3"
              :items="titles" v-model="title.id"
              label="Select Title"
              :item-value="item => item.id"
              :item-text="item => item.name"
              outlined
            ></v-select>
              <label class="mb-3 delivery-label">Name: </label>
              <v-text-field
                v-model="name"
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
              <label class="mb-3 delivery-label">Date of Birth: </label>
              <v-text-field type="text" placeholder="mm/dd/yy" v-model="date_of_birth">

              </v-text-field>
              <label class="mb-3 delivery-label">Phone Number: </label>
              
                <v-text-field
                :rules="rules"
                  v-model="phone"
                  dense
                  style="border-radius: 0px"
                  label="e.g: +8801711111111"
                  required
                  outlined
                ></v-text-field>
              
              <v-btn type="submit"
                block
                :loading="loading"
                style="border-radius: 0px"
                class="mt-2"
                color="black"
                :disabled="!valid && loading"
                dark
              >
                Save Changes
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
        email: "",
        menu: "",
        title: {
          id: '',
          name: ''
        },
        method: "",
        name: "",
        date_of_birth: "",
        phone: "",
        loading: false,
        error: "",
        rules: [
        (value) => !!value || "This Field Required.",
        (v) => v.length >= 5 || "Requires Min 8 characters",
        ],
         titles:[
          {id:1,name:'Mr'},
          {id:2,name:'Mrs'},
          {id:3,name:'Miss'},
          {id:4,name:'Dr.'},
          {id:5,name:'Engr.'},
        ]
    }),
    async created(){
        this.getUser();
        this.setUser();
    },
    computed: {
    ...mapState("homepage", ["user"]), 
    },
    methods: {
        ...mapActions("homepage", ["getUser"]),
       updatePersonalDetails()
     {
       this.loading = true
      console.log("validate",this.user)
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
      this.updateDetails()
    },
    setUser()
    {
        this.email = this.user.email
        this.name = this.user.name
        this.title.id = this.user.title
        this.date_of_birth = this.user.date_of_birth
        this.phone = this.user.phone
    },
    updateDetails() {
      let data = {
        title: this.title,
        name: this.name,
        date_of_birth: this.date_of_birth,
        email: this.email,
        country_code: this.country_code,
        phone: this.phone,
      };
      this.$store.dispatch("user/UpdateDetails",data).then(
          response => {
            this.loading = false
            if(response.error){
              this.background = "background-color: red"
              this.error = response.error
            }
            else{
              this.background = "background-color: green"
              this.error = response.success
            }
          }
      )
    },
    reset() {
      this.$refs.regForm.reset();
    }, 
  }
}
</script>

<style>
.v-btn:not(.v-btn--round).v-size--default {
    height:45px!important;
  }
</style>