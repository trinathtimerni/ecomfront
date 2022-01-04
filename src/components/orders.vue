<template>
  <div class="col-md-8">
      <div class="d-flex">
          <h4 class="mt-2">Your Orders</h4>
          <v-spacer></v-spacer>
          <div class="search pt-2">
          <v-text-field
            dense
            v-model="orderSearch"
            append-icon="mdi-magnify"
            placeholder="search"
            outlined
            flat
            hide-details
            class=""
          ></v-text-field>
        </div>
       </div>
       <v-row class="mt-5">

           <div class="col-md-10">
               <v-card color="lighten">

    <v-tabs v-model="tab"
      background-color="transparent"
      color="lighten"
      grow
    >
      <v-tab>
        Order List
      </v-tab>
      <v-tab>
        Cancel Order
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item >
        <v-card
          color="lighten"
          flat
        >
          <v-card-text>
            <div v-if="orders.length">
            <v-row v-for="order in orders" :key="order.id">
                <div class="col-md-9 p-5 pt-5 pb-2" >
                    <p class="pb-1"><strong>Order Date: {{$moment(order.created_at).format('MMMM Do YYYY') }}</strong></p>
                    <div class="d-flex">
                        <div class="item-content">
                            <a> Order Id: {{order.order_id}}, Current Status <span v-if="order.status == 0">
                <span class="btn-warning pa-1 text-white" color="primary">Pending</span></span>
                <span v-else-if="order.status == 1">
                <span class="btn-success pa-1" color="primary">Approved</span></span>
                <span v-else-if="order.status == 2">
                <span class="btn-success pa-1" color="primary">Processing</span></span>
                <span v-else-if="order.status == 3">
                <span class="btn-success pa-1" color="primary">Shipped</span></span>
                <span v-else-if="order.status == 4">
                <span class="btn-success pa-1" color="primary">Delivered</span></span>
                    <span v-else-if="order.status == 5">
                <span class="btn-danger" color="primary">Rejected</span></span>
                 </a>
                            <p> Total Amount: {{order.total}}</p>
                            <p> Payment Status: {{order.payment_status}}</p>
                            <p> Number of Products: {{order.order_details.length}}</p>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-3">
                    <button class="my-1 order-btn" @click="cancelOrder(order.id,5)" v-if="order.status == 0">Cancel</button>
                    <button class="my-1 order-btn">Buy it Again</button>
                    <button class="my-1 order-btn">View Item</button>
                </div>
            </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
      </v-tab-item>
      <v-tab-item>

      </v-tab-item>
    </v-tabs-items>
  </v-card>
           </div>
           <div class="col-md-2">
            </div>
       </v-row>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex"
export default {
    data: () => ({
        orderSearch: "",
        tab: null,
        tab1: null,
        tab2: null,
        baseEnvLocal: baseEnv,
        items: [
          'Orderlist', 'Buy Again', 'Cancelled Order',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    async created(){
      this.getOrders();
    },
    computed:{
      ...mapState("order", ["orders"]),
    },
    methods: {
      ...mapActions("order", ["getOrders"]),
      cancelOrder(id,status) {
      if (confirm("Are you sure you want to cancel this order?")) {
          let order = {
              id:id,
              status:status
          }
        this.$store
          .dispatch("order/accept", order)
          .then((res) => {
            this.message = res.data.message;
            location.reload(true);
          })
          .catch(() => {});
      }
    },
    }
}
</script>

<style>
.order-btn{
  border-radius:0!important;
  border: 1px solid black!important;
  background-color: rgb(241, 240, 240);
  font-size: 14px;
  height:33px!important;
  padding:4px 20px!important;
  color: #000!important;
  text-transform: none!important;
}
.item-content p{
  margin-bottom:2px;
  font-family: cursive;
}
.image-item img{
  max-height:97px;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
  position: relative;
  overflow: hidden;
}
.image-item {
  max-height:97px;
  min-width:97px;
}
.order-view-btn{
  border-radius:0!important;
  border: 1px solid #fff!important;
  background-color: #000;
  font-size: 14px;
  height:33px!important;
  padding:4px 20px!important;
  color: #fff!important;
  text-transform: none!important;
}
</style>