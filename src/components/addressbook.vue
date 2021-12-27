<template>
    <div class="col-md-8">
        <div class="address-title m-auto align-center justify-content-center d-flex">
           <h3> Address Book</h3>
        </div>
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
                    <a class="edit-link px-2" @click="editAddress(address)">Edit</a>
                    <a class="delete-link px-2" @click="deleteAddress(address)">Delete</a>
                </div>
            </li>
        </ul>
    </div>
</template>
 
<script>
import {mapState,mapActions} from "vuex"
export default {
    computed: {
        ...mapState("address",["addresses"])
    },
    async created()
    {
        this.getAddresses();
    },
methods: {
    ...mapActions("address",["getAddresses"]),
    addAddress()
    {
        this.$router.push('/add_address')
    },
    editAddress(address)
    {
        // this.$store.dispatch("address/EditAddress",address.id).then(
            this.$router.push({name: "EditAddress", params: { id: address.id}})    
        // )
        
    },
    deleteAddress(id)
        {
             if (confirm("Are you sure Delete this Address?")) {
        this.$store
          .dispatch("address/deleteAddress", id)
          .then((res) => {
            this.message = res.data.message;
            this.getAddresses();
          })
          .catch(() => {});
      }
        }
}
}
</script>

<style>
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
</style>