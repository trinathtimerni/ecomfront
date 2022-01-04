<template>
  <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation enctype="multipart/form-data" class="mt-2">
    <v-card class="pa-5">
      <div class="card-body">
    <fieldset class="form-group border py-1 px-3">
      <legend class="w-auto px-2" style="float:none; font-size:21px;">Add New Category:</legend>
    
      
    <v-row>
      <v-col md="4" cols="12">
          <v-text-field
            v-model="category.name"
            :error-messages="errors.name"
            label="name"
            required
          ></v-text-field>
      </v-col>
      <v-col md="8" cols="12">
          <v-text-field
            label="description"
            required
            type="text"
            v-model="category.description"
            :error-messages="errors.description"
          ></v-text-field>
      </v-col>
    </v-row>
    

    <v-btn
      style="max-height:37px"
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
    loader: null,
    loading: false,
    menu1: false,
    category: {
      name: "",
      description: "",
    },
  }),
  created() {
  },
  computed: {
  },
  methods: {
    save() {
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
      
      this.$store
        .dispatch("category/AddCategory", this.category)
        .then(() => {
          this.loading = false;

          this.$router.push("/dashboard/categories");
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
  },
};
</script>