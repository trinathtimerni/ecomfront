// import { axios } from "vue/types/umd";

export default {
    namespaced: true,

    state: () => ({
        products: [],
        department_products: [],
        brand_products: [],
        product: {},
        discount: {},
        delivery_types:[],
        special_days:[],
        color_images: [],
        loader: false,
    }),

    getters: {
        products(state) {
            return state.products;
        },
        delivery_types(state){
            return state.delivery_types;
        },
        special_days(state){
            return state.special_days;
        },
        color_images(state){
            return state.color_images;
        },
        product(state){
            return state.product;
        },
        discount(state){
            return state.discount;
        }
    },

    mutations: {
        populateCategoryProduct(state, newProduct) {
            state.products = newProduct;
        },
        populateDepartmentProduct(state,newDepartmentProduct){
            state.department_products = newDepartmentProduct;
        },
        populateBrandProduct(state,newBrandProduct){
            state.brand_products = newBrandProduct;
        },
        populateProductGalleryImages(state, newImages ) {
            state.color_images = newImages;
        },
        populateProductDetails(state,details) {
            state.product = details;
        },
        populateSearchProducts(state,search_products){
            state.products = search_products;
        },
        populateDeliveryTypes(state,delivery) {
            state.delivery_types = delivery;
        },
        populateSpecialDays(state,special) {
            state.special_days = special;
        },
        populateCouponDiscount(state,discount){
            state.discount = discount
        },
        PRODUCT_DATA(state, products) {
            state.products = products;
          },
          DATA_SEARCH(state, products) {
            state.product_by_category = products;
          },
          // eslint-disable-next-line no-unused-vars
          SHOW(state, product) {
            state.product = product;
          },
          // eslint-disable-next-line no-unused-vars
          CREATED(state) {},
          // eslint-disable-next-line no-unused-vars
          UPDATE(state) {},
        LOADER(state,payload){
            state.loader = payload
        }
    },

    actions: {
        getCategoryProducts({ commit }, Apiarg) {
            return new Promise((resolve, reject) => {
                axios.post('api/product/get_category_products',Apiarg)
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateCategoryProduct",res.data);
                  commit('LOADER',false)
            })
                .catch((error) => {
                    commit('LOADER',false)
                  reject(error);
                });
            });
          },
          updateSearchProducts({commit},newSearchProducts){
            return new Promise((resolve, reject) => {
                  commit("populateSearchProducts",newSearchProducts);
            });
          },
          getDepartmentProducts({ commit }, Apiarg) {
            return new Promise((resolve, reject) => {
                axios.post('api/product/get_department_products',Apiarg)
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateDepartmentProduct",res.data);
            })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          getBrandProducts({ commit }, Apiarg) {
            return new Promise((resolve, reject) => {
                axios.post('api/product/get_brand_products',Apiarg)
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateBrandProduct",res.data);
            })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          getProductsGalleryImages({ commit }, Apiarg)
          {
            return new Promise((resolve, reject) => {
                axios.post('api/product/get_product_gallery_images',Apiarg)
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateProductGalleryImages",res.data);
            })
            
                .catch((error) => {
                  reject(error);
                });
            });
          },
          getProductDetails({ commit }, Apiarg)
          {
            return new Promise((resolve, reject) => {
                axios.get('api/product/get_product_details/'+Apiarg)
            .then(res => {
                resolve(res);
                  commit("populateProductDetails",res.data);
            })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          getDeliveryTypes({commit}){
            return new Promise((resolve, reject) => {
                axios.get('api/get_delivery_types')
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateDeliveryTypes",res.data);
            })
            .catch((error) => {
              reject(error);
            });
          });
        },
        
        getCouponDiscount({commit},data){
            return new Promise((resolve,reject)=>{
                axios.post('api/get_coupon_discount',data)
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateCouponDiscount",res.data);
            })
            .catch((error) => {
              reject(error);
            });
            });
        },
        GetProducts({ commit }) {
            return new Promise((resolve, reject) => {
              axios
                .get("/api/product")
                .then((result) => {
                  console.log(result.data.products.data);
                  resolve(result);
                  commit("PRODUCT_DATA", result.data.products.data);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          AddProduct({ commit }, data) {
            return new Promise((resolve, reject) => {
              axios
                .post("/api/product", data)
                .then((result) => {
                  resolve(result);
                  commit("CREATED");
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },

          UpdateProduct({ commit }, data) {
            return new Promise((resolve, reject) => {
              axios
                .post("/api/update_product", data)
                .then((result) => {
                  resolve(result);
                  commit("UPDATE");
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        
          DataSearch({ commit }, search_params) {
            return new Promise((resolve, reject) => {
              axios
                .get(
                  Config.BASE_URL +
                    "/api/product/search-products?page=1&category_id=" +
                    (search_params ? search_params : "")
                )
                .then((result) => {
                  resolve(result);
                  commit("DATA_SEARCH", result.data.products.data);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          Show({ commit }, id) {
            return new Promise((resolve, reject) => {
              console.log(id);
              axios
                .get("/api/product/" + id)
                .then((result) => {
                  resolve(result);
                  commit("SHOW", result.data.product);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          Delete({ commit }, id) {
            return new Promise((resolve, reject) => {
              axios
                .delete("/api/product/" + id)
                .then((result) => {
                  resolve(result);
                  commit("SHOW", result.data.product);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
    }
}