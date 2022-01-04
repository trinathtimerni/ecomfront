<template>
     <div class="col-md-4">
        <div class="d-flex flex-column top-margin">
            <div>
                <div style="font-size: 20px; font-weight: 200">Hello {{user.name}}</div>
                <div class="my-4" style="font-size: 14px; font-weight: 200">You have {{user.credit}} credit</div>
            </div>
            <div class="d-flex flex-column padding-right-list">                    
                <div class="py-3 account-sidebar">
                <v-icon color="#888888" class="mr-4">mdi-dots-grid</v-icon>    Account Overview
                </div>
                <div class="py-3 account-sidebar">
                <v-icon color="#888888" class="mr-4">mdi-format-list-bulleted</v-icon>    Track My last Order
                </div>
                <div class="py-3 account-sidebar" @click="myDetails()">
                <v-icon color="#888888" class="mr-4">mdi-account</v-icon>    My Details
                </div>

                <div class="py-3 account-sidebar" @click="AddressBook()">
                <v-icon color="#888888" class="mr-4">mdi-home-outline</v-icon>    Address Book
                </div>
                <div class="py-3 account-sidebar" @click="myOrders()">
                <v-icon color="#888888" class="mr-4">mdi-calendar-month-outline</v-icon>    Recent Orders
                </div>

            </div>
        </div>
     </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
export default {
    async created() {
        this.getUser();
        console.log(localStorage.getItem("auth_token"))
    },
    computed: {
        ...mapState("homepage",["user"])
    },
    methods: {
        ...mapActions("homepage", ["getUser"]),
        myDetails()
        {
            this.$router.push("/my_details")
        },
        myOrders()
        {
            this.$store.dispatch("order/getOrders").then(
               this.$router.push("/my_orders").catch(() => {})
            ).catch(() => {});
        },
        wishList()
        {
            this.$store.dispatch("wishlist/getWishlist").then(
                this.$router.push("/wish_list").catch(() => {})
            ).catch(() => {});
        },
        AddressBook()
        {
            this.$store.dispatch("address/getAddresses").then(
                this.$router.push("/address_book")
            ).catch(() => {});
            
        }
    }
}
</script>

<style>
    .account-sidebar{
        border-top: 1px solid #DDD; 
        font-weight: 300;
    }
</style>