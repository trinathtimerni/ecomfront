<template>
    <div class="col-md-8">
        <div class="text-center">
        <div class="pb-5">
            <span style="font-size: 30px; margin-top: 15px; ">Wish <v-icon>mdi-heart-outline</v-icon>  List</span>
        </div>
        <div class="mx-5">
            <p>This is your space to save the things you love</p>
        </div>
        <div class="my-5">
            <button type="button" @click="toHome()" class="wish-btn">Create a New Wish List</button>
        </div>
        </div>
        <div class="mb-5 wishlist">
            <a class="wishlist-item" v-for="wish in wishlist" :key="wish.id">
                <div class="item-img">
                    <div class="image-alt">
                        <img :src="`${baseEnvLocal}${wish.product.main_image}`" alt="item" />
                    </div>
                </div>
                <div class="wishlist-content">
                <div class="mt-2 mb-3 item-list">
                    <h6>My wish List</h6>
                    <span class="item-list-count ml-2">({{wishlist.length}})</span>
                </div>
                <div class="item-list">
                    <v-icon>mdi-eye</v-icon>
                    <p class="mb-1 ml-2">Private</p>
                </div>
                <div>
                    <button type="button">Edit Name</button>
                    <span> | </span>
                    <button type="button" @click="deleteWish(wish.id)">Delete List</button>
                </div>
                </div>
            </a>
        </div>
    </div>
</template>
 
<script>
import {mapActions,mapState} from "vuex"
export default {
    data: () => ({
        baseEnvLocal: baseEnv,
    }),
    async created(){
        this.getWishlist();
    },
    computed: {
    ...mapState("wishlist", ["wishlist"]),
    },
    methods: {
        ...mapActions("wishlist",["getWishlist"]),
        deleteWish(id)
        {
             if (confirm("Are you sure Delete this Wish?")) {
        this.$store
          .dispatch("wishlist/deleteWish", id)
          .then((res) => {
            this.message = res.data.message;
            this.getWishlist();
          })
          .catch(() => {});
      }
        },
        toHome() {
      this.$router.push("/");
    },
    }
}
</script>

<style>
.wish-btn{
    background-color: #000;
    color:#fff;
    min-width:80px;
    font-size:14px;
    padding:14px 24px;
    height: auto;
    text-transform: none;
}
.item-list{
    display:flex;
    margin-top: 0px;
    display: -moz-box;
    display: flex;
    min-width: 0px;
    max-width: 100%;
}
.wishlist-content{
    flex: 1 0;
    text-align: left;
    -moz-box-align: start;
    align-items: flex-start;
    -moz-box-pack: justify;
    justify-content: space-between;
    display: -moz-box;
    display: flex;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    flex-direction: column;
    min-width: 0px;
    margin-top: 12px;
    margin-bottom: 10px;
}
.item-img{
    flex: 1 0 79px;
    display: inline-block;
    margin-right: 16px;
    max-width: 79px;
    height: 105px;
}
.image-alt{
    display: flex;
    width: 100%;
    height: 100%;
    -moz-box-align: center;
    align-items: center;
    overflow: hidden;
}
.wishlist{
    width:100%;
}
.wishlist-content button{
    text-decoration: underline;
    text-align: center;
    padding: 5px 0 5px 0;
    line-height: 1;
    font-weight: 300;
    font-size: 15px;
    text-transform: none;
    background-color: transparent;
}
@media only screen and (min-width: 1024px){
    .wishlist-item {
        padding: 16px 0;
    }
}
.wishlist-item{
    text-decoration: none;
    display:flex;
    flex-direction: row;
    text-align: left;
    -moz-box-align: stretch;
    align-items: stretch;
    border: none;
    border-bottom: 1px solid #d8d8d8;
    width: 100%;
    cursor: pointer;
    font-family: inherit;
    background: transparent;
}
.wishlist-item:first-child{
    border-top: 1px solid #ddd;
}
</style>