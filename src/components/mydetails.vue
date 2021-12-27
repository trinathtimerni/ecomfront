<template>
    <div class="col-md-8">
        <div class="text-center pb-5">
            <span style="font-size: 30px; margin-top: 15px; ">My Details</span>
        </div>
        <div class="my-details">
            <div class="my-details-all">
            <div class="details-title">
                <a class="mr-3">
                    <v-icon> mdi-account-multiple-outline </v-icon>
                </a>
                <h5 class="title-name">Personal Details</h5>
            </div>
            <div class="details">
                <button type="button" class="details-btn" @click="personalDetails()">Add Account Details</button>
                </div>            
            </div>
            <p class="details-des">Add personal details to check out quicker</p>
        </div>
        <div class="my-details">
            <div class="my-details-all">
            <div class="details-title">
                <a class="mr-3">
                    <v-icon> mdi-account-multiple-outline </v-icon>
                </a>
                <h5 class="title-name">Sign In Details</h5>
            </div>
            <div class="details">
                <button type="button" class="details-btn">Change Email</button>
                </div>            
            </div>
            <div class="details-title mb-2">
                <label for="email" class="pt-1">Email : </label>
                <p class="ml-1"> {{ user.email}}</p>
                </div>
            <div class="details-title d-block">
                <label for="email" class="pt-1">Password : </label>
                <input class="ml-1" type="password" :value="user.password" style="border:none">
            </div>
            <div class="details">
                <button type="button" class="details-btn" @click="editPassword()">Change Password</button>
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
        personalDetails()
        {
            this.$router.push("/personal_details")
        },
        editPassword()
        {
            this.$router.push("/edit_password")
        }
    }
}
</script>

<style>
.my-details{
    border-top: 1px solid #d8d8d8;
    padding:16px;
    font-family: 'Open Sans', sans-serif;
}
.my-details-all{
    flex-direction: column;
    width:100%;
}
.title-name{
    color: #141414;
    margin-top: 0;
    font-size: 20px;
    font-weight: 300;
    line-height: 30px;
    letter-spacing: initial;
    text-transform: none;
    margin-bottom: 0;
}
.details-des{
    font-size:14px;
}
@media only screen and (min-width: 768px){
    .details-btn {
        margin-bottom: 24px;
        padding: 8px 16px;
        width: auto;
    }
    .details{
        float: right;
    }
    .my-details-all{
        display:block;
    }
    .details-title{
        margin: 0 0 32px;
        display: inline-flex;
    }
}
.details-btn{
    background-color: #ffff;
    color: black;
    border: 1px solid #000!important;
    text-align: center;
    height:auto!important;
    padding: 9px 20px;
    line-height: 1;
    font-weight: 300;
    border-radius: 0!important;
    font-size: 16px;
    min-width: 200px;
    text-transform: none;
}
</style>