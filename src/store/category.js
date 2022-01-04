// import { axios } from "vue/types/umd";

  export default {
    namespaced: true,

    state: () => ({
        categories: [],
        category: {},
        category_colors: [],
        category_delivery: [],
        category_price: {},
        brands: [],
        cat_brands: [],
        countries: [],
        loader: false,
    }),

    getters: {
        categories(state) {
            return state.categories;
        },
        category_colors(state) {
            return state.category_colors;
        },
        cat_brands(state){
            return state.cat_brands;
        },
        category()
        {
            return state.category;
        },
        category_delivery(state) {
            return state.category_delivery;
        },
        brands(state) {
            return state.brands;
        },
        countries(state) {
            return state.countries;
        }
    },

    mutations: {
        populateCategories(state, newCategories) {
            state.categories = newCategories;
        },
        populateCategoryBrands(state, newBrands) {
            state.brands = newBrands;
        },
        populateCategoryColors(state, newColors) {
            state.category_colors = newColors;
        },
        populateCategoryDelivery(state, newDelivery) {
            state.category_delivery = newDelivery;
        },
        populateCategoryPrice(state, newPrice) {
            state.category_price = newPrice;
        },
        populateCategory(state, category_id){
            let category = state.categories.filter((product) => product.slug == category_id)
            state.category = category
        },
        SHOW(state, category) {
            state.category = category;
          },
        populateCountries(state,newCountries){
            state.countries = newCountries;
        },
        populateCatBrands(state,newBrands){
            state.cat_brands = newBrands;
        },
        Category_Data(state, categories){
            state.categories = categories;
        },
        CREATED(state) {},
        UPDATED(state) {},
        LOADER(state,payload){
            state.loader = payload;
        }
    },

    actions: {
        async getCategories(ctx){
            let categories = await axios.get('api/all_cat_sub_chid').then((response) => {
                ctx.commit('populateCategories', response.data);
            })
        },
        async getCategoryBrands(ctx,apiArg){
            await axios.get('api/product/get_category_brands/'+apiArg).then((response) => {
                ctx.commit('populateCategoryBrands', response.data);
            })
        },
        AddCategory({ commit }, data) {
            return new Promise((resolve, reject) => {
              axios
                .post("/api/category", data)
                .then((result) => {
                  resolve(result);
                  commit("CREATED");
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        UpdateCategory({ commit }, data) {
            return new Promise((resolve, reject) => {
              axios
                .post("/api/category_update", data)
                .then((result) => {
                  resolve(result);
                  commit("UPDATED");
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },

        GetCats({ commit }) {
            return new Promise((resolve, reject) => {
              axios
                .get("/api/category")
                .then((result) => {
                  console.log(result.data.categories.data);
                  resolve(result);
                  commit("Category_Data", result.data.categories.data);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        

        async getCategory(ctx,apiArg){
            ctx.commit('LOADER',true)
            ctx.commit('populateCategory',apiArg)
            ctx.commit('LOADER',false)
        },
        async getCategoryPrice(ctx,apiArg)
        {
            ctx.commit('populateCategoryPrice',apiArg)
        },
        Show({ commit }, id) {
            return new Promise((resolve, reject) => {
              console.log(id);
              axios
                .get("/api/category/" + id)
                .then((result) => {
                  resolve(result);
                  commit("SHOW", result.data.category);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          Delete({ commit }, id) {
            return new Promise((resolve, reject) => {
              axios
                .delete("/api/category/" + id)
                .then((result) => {
                  resolve(result);
                  commit("SHOW", result.data.category);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        
    }
}