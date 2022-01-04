<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-card class="mb-1 mt-3">
        <v-data-table :headers="headers" :items="orders" sort-by="calories" class="elevation-1 px-2">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Orders</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer>
                <v-col md="6" class="mx-auto" v-if="message == 'Product deleted'">
                  <v-alert type="success">{{message}}</v-alert>
                </v-col>
              </v-spacer>
              
            </v-toolbar>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>
                  {{item.order_id}}
                </td>
                <td>{{item.user.name}}</td>
                <td>{{ item.total }} ৳</td>
                <td>{{ item.payment_status }}</td>
                <td v-if="item.status == 0">
                <span class="btn-warning pa-1 text-white" color="primary">Pending</span></td>
                <td v-else-if="item.status == 1">
                <span class="btn-success pa-1" color="primary">Approved</span></td>
                <td v-else-if="item.status == 2">
                <span class="btn-success pa-1" color="primary">Processing</span></td>
                <td v-else-if="item.status == 3">
                <span class="btn-success pa-1" color="primary">Shipped</span></td>
                <td v-else-if="item.status == 4">
                <span class="btn-success pa-1" color="primary">Delivered</span></td>
                    <td v-else-if="item.status == 5">
                <span class="btn-danger" color="primary">Rejected</span></td>
                <td>

                    <v-btn v-if="item.status == 0" color="primary" small class="mr-2" @click="acceptOrder(item.id,1)">
                      Accept
                  </v-btn>
                    <v-btn v-if="item.status == 0" color="warning" small class="mr-2" @click="acceptOrder(item.id,5)">
                      Reject
                  </v-btn>
                  <v-btn
                    color="primary"
                    small
                    class="mr-2"
                    link
                    :to="'/dashboard/edit_order/' + item.id"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  
                  <v-btn color="error" small class="mr-2" @click="removeOrder(item.id)">
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="Data">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Tables",
  data() {
    return {
      message: {},
      baseEnvLocal: baseEnv,
      headers: [
        {
          text: "Order Id",
          align: "start",
          sortable: false,
          value: "order_id",
        },
        { text: "Buyer", value: "buyer" },
        { text: "total", value: "total" },
        { text: "payment_status", value: "payment_status" },
        { text: "status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("order", ["orders"]),
  },

  created() {
    this.getOrders();
  },

  methods: {
    ...mapActions("order", ["getOrders"]),

    removeOrder(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("order/Delete", id)
          .then((res) => {
            console.log("delete res",res);
            this.message = res.data.message;
            this.getOrders();
          })
          .catch(() => {});
      }
    },
    acceptOrder(id,status) {
      if (confirm("Are you sure you want to accept this order?")) {
          let order = {
              id:id,
              status:status
          }
        this.$store
          .dispatch("order/accept", order)
          .then((res) => {
            this.message = res.data.message;
            this.getOrders();
          })
          .catch(() => {});
      }
    },
  },
};
</script>
