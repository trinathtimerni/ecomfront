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
        LOADER(state,payload){
            state.loader = payload
        }
    },

    actions: {
        // async getCategoryProducts(ctx,Apiarg){
        //     console.log(Apiarg)
        //     let products = await axios.post('api/product/get_category_products',Apiarg)
        //     .then(res => {
        //         console.log(res.data)
        //         return res.data;
        //     })
        //     .catch(error => console.log(error));

        //     ctx.commit('populateCategoryProduct', products);
        // },
        getCategoryProducts({ commit }, Apiarg) {
            commit('LOADER',true)
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
            commit('LOADER',true)
            return new Promise((resolve, reject) => {
                  commit("populateSearchProducts",newSearchProducts);
                  commit('LOADER',false)
            });
          },
          getDepartmentProducts({ commit }, Apiarg) {
            commit('LOADER',true)
            return new Promise((resolve, reject) => {
                axios.post('api/product/get_department_products',Apiarg)
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateDepartmentProduct",res.data);
                  commit('LOADER',false)
            })
                .catch((error) => {
                    commit('LOADER',false)
                  reject(error);
                });
            });
          },
          getBrandProducts({ commit }, Apiarg) {
            commit('LOADER',true)
            console.log(Apiarg)
            return new Promise((resolve, reject) => {
                axios.post('api/product/get_brand_products',Apiarg)
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateBrandProduct",res.data);
                  commit('LOADER',false)
            })
                .catch((error) => {
                    commit('LOADER',false)
                  reject(error);
                });
            });
          },
          getProductsGalleryImages({ commit }, Apiarg)
          {
            commit('LOADER',true)
            return new Promise((resolve, reject) => {
                axios.post('api/product/get_product_gallery_images',Apiarg)
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateProductGalleryImages",res.data);
                  commit('LOADER',false)
            })
            //   axios
            //     .post(Config.BASE_URL + "/api/product", data)
            //     .then((result) => {
            //       resolve(result);
            //       commit("CREATED");
            //     })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          getProductDetails({ commit }, Apiarg)
          {
            commit('LOADER',true)
            return new Promise((resolve, reject) => {
                axios.get('api/product/get_product_details/'+Apiarg)
            .then(res => {
                console.log("main data paichi",res.data)
                resolve(res);
                  commit("populateProductDetails",res.data);
                  commit('LOADER',false)
            })
            //   axios
            //     .post(Config.BASE_URL + "/api/product", data)
            //     .then((result) => {
            //       resolve(result);
            //       commit("CREATED");
            //     })
                .catch((error) => {
                  reject(error);
                  commit('LOADER',false)
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
        getSpecialDays({commit}){
            return new Promise((resolve, reject) => {
                axios.get('api/special-days')
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateSpecialDays",res.data);
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
        }
    }
}