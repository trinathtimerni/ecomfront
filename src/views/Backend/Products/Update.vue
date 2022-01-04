<template>
  <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation enctype="multipart/form-data" class="mt-2">
    <v-card class="pa-5">
      <div class="card-body">
    <fieldset class="form-group border py-1 px-3">
      <legend class="w-auto px-2" style="float:none; font-size:21px;">Edit Product:</legend>
    
      
    <v-row>
      <v-col md="4" cols="12">
          <v-text-field
            v-model="product.name"
            :error-messages="errors.name"
            label="Title"
            required
          ></v-text-field>
      </v-col>
      <v-col md="4" cols="12">
          <v-text-field
            label="Price"
            required
            type="number"
            v-model="product.price"
            :error-messages="errors.price"
          ></v-text-field>
      </v-col>
      <v-col md="4" cols="12">
        <v-select
            v-model="product.category_id"
            :error-messages="errors.category_id"
            :items="categories"
            item-text="name"
            item-value="id"
            label="Category"
            required
          ></v-select>
      </v-col>

          <v-col md="5" cols="12">
          <v-text-field
            v-model="product.short_description"
            :error-messages="errors.short_description"
            label="Short Description"
            required
          ></v-text-field>
      </v-col>
      <v-col md="3" cols="12">
          <v-text-field
            label="Quantity"
            required
            type="number"
            v-model="product.quantity"
            :error-messages="errors.quantity"
          ></v-text-field>
      </v-col>
      <v-col md="4" cols="12">
        <v-select
            v-model="product.brand_id"
            :error-messages="errors.brand_id"
            :items="brands"
            item-text="name"
            item-value="id"
            label="Brand"
            required
          ></v-select>
      </v-col>
      <v-col md="8" cols="12">
          <v-textarea
            name="input-10-1"
            v-model="product.description"
            class="desc"
            label="Description"
            :error-messages="errors.description"
          ></v-textarea>
      </v-col>
      <v-col md="4" cols="12">
        <v-file-input
            type="file"
            v-model="files"
            @change="ProductImagePreview"
            required
            :error-messages="errors.image"
            label="Product Photo"
          ></v-file-input>
          <div id="image_preview">
            <div class="mb-1" v-if="url">
                <img class="img-thumbnail" style="height:150px; width:180px" :src="url" alt=""/>
            </div>
            
          </div>
      </v-col>
    </v-row>
    

    <v-btn
      type="submit"
      color="primary"
      class="mr-4 mt-4"
      :loading="loading"
      :disabled="loading"
    >Submit</v-btn>
    
    </fieldset>
    </div>
    </v-card>
  </v-form>

  <!-- </v-card> -->
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    errors: [],
    valid: true,
    url:null,
    baseEnvLocal: baseEnv,
    loader: null,
    loading: false,
    menu: false,
    menu1: false,
    is_Featureds: [
      { value: 0, text: "No" },
      { value: 1, text: "Yes" },
    ],

    features: [],
    files: [],
  }),
  created() {
    this.GetCats();
    this.BrandData();
    this.ShowProduct();
  },
  computed: {
    ...mapState("category", ["categories"]),
    ...mapState("brand", ["brands"]),
    ...mapState("product", ["product"]),
  },
  methods: {
    ...mapActions("category", ["GetCats"]),
    ...mapActions("brand", ["BrandData"]),
    ShowProduct() {
      let id = this.$route.params.id;
      console.log(id);
      this.$store.dispatch("product/Show", id).then(() => {
        this.url = `${baseEnv}${this.product.main_image}`;
      });
      
    },
    save() {
      this.loading = true;
     let isValidate = true;
      this.$refs.form.validate();
      this.$refs.form.inputs.forEach((input) => {
        if (input.hasError) {
          isValidate = false;
        }
      });
      if (!isValidate) {
        return;
      }
      this.loading = true;
      let formData = new FormData();
    formData.append('image',this.files);
    for (let field in this.product) {
        formData.append(field, this.product[field]);
      }
      formData.append('id',this.product.id);
      console.log("formData paichi", formData);
      this.$store
        .dispatch("product/UpdateProduct", formData)
        .then(() => {
          this.loading = false;

          this.$router.push("/dashboard/products");
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          console.log(err.response.data.errors);
          this.loading = false;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    ProductImagePreview(payload) {
      const file = payload;
      if (file) {
        this.url = URL.createObjectURL(file);
        URL.revokeObjectURL(file); // free memory
      } else {
        this.url =  null
      }
    }
  },
};
</script>