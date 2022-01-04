<template>
    <div class="container">
        <div class="d-flex flex-row flex-wrap">
            <AccountSidebar />
            <div class="col-md-8">
                <div class="text-center">
                    <span style="font-size: 30px; margin-top: 15px; ">My Account</span>
                </div>
                <div class="d-flex flex-row flex-wrap justify-content-between" style="margin-top: 40px">
                    <div class="col-md-6 d-flex flex-column">
                        <div class="px-3" style="border-top: 1px solid #DDD">
                            <div class="py-5">
                                <div class="py-1" style="font-size: 14px; font-weight: 600">
                                    My Details
                                </div>
                                <div class="py-1 pb-2" style="font-size: 14px; font-weight: 300">
                                    Update your personal details, password & manage payment cards.
                                </div>
                                <div class="py-1" style="font-size: 14px; font-weight: 300">
                                    <div style="text-decoration: underline" @click="myDetails()">View My details</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>        
    </div>
</template>
<script>
import AccountSidebar from "../components/accountsidebar.vue"
import {mapActions} from "vuex"
export default {
    components: {
        AccountSidebar,
    },
    async created() {
        this.getUser();
        console.log(localStorage.getItem("auth_token"))
    },
    methods: {
        ...mapActions("homepage", ["getUser"]),
        myDetails()
        {
            this.$router.push("/my_details")
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
<style scoped>
.top-margin{
    margin-top: 50px;
}
.padding-right-list{
    padding-right: 50px;
}
@media screen and (max-width: 480px) {
  .top-margin{
    margin-top: 10px;
}
.padding-right-list{
    padding-right: 5px
}
}
</style>