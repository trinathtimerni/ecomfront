<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-card class="mb-1 mt-3">
        <v-data-table :headers="headers" :items="products" sort-by="calories" class="elevation-1 px-2">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Products</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer>
                <v-col md="6" class="mx-auto" v-if="message == 'Product deleted'">
                  <v-alert type="success">{{message}}</v-alert>
                </v-col>
              </v-spacer>
              <v-btn color="primary" dark class="mb-2" to="/dashboard/add_product">New Products</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.name }}</td>

                <td>
                  <img
                    class="mr-2"
                    width="60"
                    :src="`${baseEnvLocal}${item.main_image}`"
                  />
                </td>
                <td>{{ item.price }} ৳</td>
                <td>{{ item.description }}</td>
                <td>{{ item.category.name }}</td>
                <!-- <td>{{ item.created_by ? item.user.name : "" }}</td> -->

                <td>
                  <v-btn
                    color="primary"
                    small
                    class="mr-2"
                    link
                    :to="'/dashboard/edit_product/' + item.id"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn color="error" small class="mr-2" @click="removeProduct(item.id)">
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
          text: "Title",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Image", value: "main_image" },
        { text: "Price", value: "price" },
        { text: "Description", value: "description" },
        { text: "Category", value: "category.title" },
        // { text: "By", value: "created_by" },

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("product", ["products"]),
  },

  created() {
    this.GetProducts();
  },

  methods: {
    ...mapActions("product", ["GetProducts"]),

    removeProduct(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("product/Delete", id)
          .then((res) => {
            console.log("delete res",res);
            this.message = res.data.message;
            this.GetProducts();
          })
          .catch(() => {});
      }
    },
  },
};
</script>
