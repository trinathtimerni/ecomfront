<template>
    <div class="col-md-8">
        <div class="address-title m-auto align-center justify-content-center d-flex">
           <h3> Edit  Address</h3>
        </div>
        <div class="col-md-9 m-auto">
       <v-form class="py-6" @submit.prevent="updateAddress" ref="regForm" v-model="valid" lazy-validation>
          <label class="mb-3 delivery-label">Title: </label>
          <v-select dense class="mr-3"
          :items="titles" v-model="title.id"
          label="Select Title"
          :item-value="item => item.id"
          :item-text="item => item.name"
          outlined
        ></v-select>
              <label class="mb-3 delivery-label">First Name: </label>
              <v-text-field
                v-model="first_name"
                :rules="rules"
                dense
                style="border-radius: 0px"
                required
                outlined
              ></v-text-field>
              <input type="hidden" v-model="address_id">
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
                :rules="emailRules"
                dense
                style="border-radius: 0px; width:50%"
                required
                outlined
              ></v-text-field>
              <label class="mb-3 delivery-label">Phone Number: </label>
              <div class="d-flex" style="width:70%">
                <v-autocomplete dense class="mr-3"
          :items="countries" v-model="country_code.id"
          label="Select Country Code"
          :item-value="item => item.id"
          :item-text="item => '+'+ item.phonecode+' ( '+item.nicename+' )'"
          outlined
        ></v-autocomplete>
                <v-text-field
                :rules="phoneRules"
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
                  <v-autocomplete dense
          :items="countries" v-model="country.id"
          item-text="nicename"
          outlined
        ></v-autocomplete>
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
    </div>
</template>
 
<script>
import {mapActions,mapState} from "vuex"
export default {
     data: () => ({
        valid: true,
        isValidate: false,
        email: "",
        title: {
            id: '',
            name: ''
        },
        method: "",
        address_id: "",
        first_name: "",
        last_name: "",
        country_code: {
          id: '',
          phonecode: '',
          nicename: ''
        },
        country: {
          id: '',
          phonecode: '',
          nicename: ''
        },
        phone: "",
        address: "",
        address1:"",
        house_no: "",
        city: "",
        post_code:"",
        manual:false,
        addresses: [],
        rules: [
        (value) => !!value || "Name Field Required.",
        (v) => v.length >= 3 || "Name Requires at least 3 characters",
        ],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        phoneRules: [
          (value) => !!value || "Phone Field Required.",
        (v) => v.length >= 10 || "Phone Number Requires at least 10 characters",
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
        this.getCountries();
        this.addressDetails(this.$route.params.id);
    },
    computed: {
    ...mapState("category", ["countries"]),
    },
    methods: {
        ...mapActions("category",["getCountries"]),
       updateAddress()
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
    async addressDetails(id){
        await axios.get('api/get_delivery_addresses').then(res => {
                this.addresses = res.data;
            })
        let new_address = this.addresses.filter((newAdd) => newAdd.id == id)
        console.log("new address paichi", this.addresses)
        if(new_address){
            let mt = this.titles.filter((t) => t.id == new_address[0].title)
             console.log("new title paichi", mt)
            this.title.id = mt[0].id
            this.title.name = mt[0].name
            this.first_name = new_address[0].first_name
            this.last_name = new_address[0].last_name
            this.email = new_address[0].email
            let ct = this.countries.filter((t) => t.id == new_address[0].country_code)
            this.country_code.id = ct[0].id
            this.country_code.phonecode = ct[0].phonecode
            this.country_code.nicename = ct[0].nicename
            this.phone = new_address[0].phone
            this.address_id = new_address[0].id
            this.address = new_address[0].address
            this.house_no = new_address[0].house_no
            this.address1 = new_address[0].address1
            this.city = new_address[0].city
            this.post_code = new_address[0].post_code
            console.log("new address paichi", new_address[0].title)
        }
    },
    manualAddress()
    {
        this.manual = true
    },
    addresssubmit() {
      let data = {
        title: this.title.id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        country_code: this.country_code.id,
        phone: this.phone,
        address_id: this.address_id,
        country: this.country.id,
        address: this.address,
        address1: this.address1,
        house_no: this.house_no,
        city: this.city,
        post_code: this.post_code
      };
      this.$store.dispatch("address/UpdateAddress",data).then(
        this.$store.dispatch("address/getAddresses"),
          this.$router.push("/address_book")
      )
      
    } 
    }
}
</script>

<style>
.v-btn:not(.v-btn--round).v-size--default {
    height:45px!important;
  }
</style>